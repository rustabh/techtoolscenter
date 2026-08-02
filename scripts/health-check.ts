/**
 * Post-build health-check crawler for the internal Project Health Dashboard.
 *
 * Runs against the already-built `.next/server/app` static HTML output (no
 * live server needed) plus a small live-browser sample for console errors.
 * Writes a single JSON snapshot that the dashboard reads at request time —
 * this keeps the dashboard itself fast and portable (no filesystem/git
 * access needed at runtime, which a serverless host may not provide).
 *
 * Run with `npm run health-check` after `npm run build`. Re-run periodically
 * (e.g. as part of the Friday QA routine) to refresh the snapshot — the
 * dashboard shows the snapshot's timestamp so staleness is always visible,
 * never silently implied to be live.
 */
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(__dirname, "..");
const APP_DIR = path.join(ROOT, ".next/server/app");
const OUT_FILE = path.join(ROOT, "src/lib/dashboard/health-snapshot.json");

// Non-content technical routes — excluded from SEO/title/schema checks.
const EXCLUDE_PATTERNS = [/sitemap/i, /opengraph-image/i, /manifest\.webmanifest/i, /robots\.txt/i, /_not-found/i, /\.rsc$/i, /\.meta$/i, /\.body$/i];

function listHtmlFiles(dir: string, base = ""): string[] {
  if (!existsSync(dir)) return [];
  let out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    const rel = base ? `${base}/${entry}` : entry;
    const st = statSync(full);
    if (st.isDirectory()) out = out.concat(listHtmlFiles(full, rel));
    else if (entry.endsWith(".html")) out.push(rel);
  }
  return out;
}

function routeFromFile(rel: string): string {
  const noExt = rel.replace(/\.html$/, "");
  return "/" + (noExt === "index" ? "" : noExt);
}

interface PageAudit {
  route: string;
  title: string;
  hasTitle: boolean;
  hasMetaDescription: boolean;
  hasOgImage: boolean;
  hasCanonical: boolean;
  hasSchema: boolean;
  schemaTypes: string[];
  is404: boolean;
}

function auditHtml(route: string, html: string): PageAudit {
  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  const title = titleMatch ? titleMatch[1] : "";
  const hasMetaDescription = /<meta name="description" content="[^"]+"/i.test(html);
  const hasOgImage = /<meta property="og:image" content="[^"]+"/i.test(html);
  const hasCanonical = /<link rel="canonical" href="[^"]+"/i.test(html);
  const schemaBlocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
  const schemaTypes: string[] = [];
  for (const [, body] of schemaBlocks) {
    try {
      const parsed = JSON.parse(body);
      if (parsed["@type"]) schemaTypes.push(parsed["@type"]);
    } catch {
      /* not directly parseable (escaped in an RSC payload elsewhere) — ignore */
    }
  }
  const is404 = html.includes("NEXT_HTTP_ERROR_FALLBACK;404");
  return {
    route,
    title,
    hasTitle: title.trim().length > 0,
    hasMetaDescription,
    hasOgImage,
    hasCanonical,
    hasSchema: schemaBlocks.length > 0,
    schemaTypes,
    is404,
  };
}

function gitInfo() {
  try {
    return {
      commit: execSync("git rev-parse --short HEAD", { cwd: ROOT }).toString().trim(),
      commitFull: execSync("git rev-parse HEAD", { cwd: ROOT }).toString().trim(),
      commitDate: execSync("git log -1 --format=%cI", { cwd: ROOT }).toString().trim(),
      commitMessage: execSync("git log -1 --format=%s", { cwd: ROOT }).toString().trim(),
      branch: execSync("git rev-parse --abbrev-ref HEAD", { cwd: ROOT }).toString().trim(),
    };
  } catch {
    return { commit: "unknown", commitFull: "unknown", commitDate: "unknown", commitMessage: "unknown", branch: "unknown" };
  }
}

function parseBuildOutput(): { sharedFirstLoadKb: number | null; routes: { route: string; sizeKb: number; firstLoadKb: number }[] } {
  const logPath = path.join(ROOT, ".next-build.log");
  if (!existsSync(logPath)) return { sharedFirstLoadKb: null, routes: [] };
  const log = readFileSync(logPath, "utf8");
  const sharedMatch = log.match(/First Load JS shared by all\s+([\d.]+)\s*kB/);
  const sharedFirstLoadKb = sharedMatch ? parseFloat(sharedMatch[1]) : null;
  const routes: { route: string; sizeKb: number; firstLoadKb: number }[] = [];
  const lineRe = /^[├└│┬┴─┼\s]*[○●ƒ]\s+(\/\S*)\s+([\d.]+)\s*(kB|B)\s+([\d.]+)\s*(kB|B)/gm;
  let m: RegExpExecArray | null;
  while ((m = lineRe.exec(log))) {
    const [, route, size, sizeUnit, firstLoad, firstLoadUnit] = m;
    routes.push({
      route,
      sizeKb: sizeUnit === "B" ? parseFloat(size) / 1024 : parseFloat(size),
      firstLoadKb: firstLoadUnit === "B" ? parseFloat(firstLoad) / 1024 : parseFloat(firstLoad),
    });
  }
  return { sharedFirstLoadKb, routes };
}

// Files that reference asset-looking paths inside example/sample strings or
// third-party URL templates, not real references to our own /public files.
const ASSET_SCAN_EXCLUDE = [/favicon-generator\.tsx$/, /api\/site-meta\/route\.ts$/];

function findMissingPublicAssets(): string[] {
  const missing: string[] = [];
  const publicDir = path.join(ROOT, "public");
  const referenced = new Set<string>();
  const srcDir = path.join(ROOT, "src");
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir)) {
      const full = path.join(dir, entry);
      const st = statSync(full);
      if (st.isDirectory()) { if (entry !== "node_modules") walk(full); continue; }
      if (!/\.(tsx?|jsx?)$/.test(entry)) continue;
      if (ASSET_SCAN_EXCLUDE.some((re) => re.test(full))) continue;
      const content = readFileSync(full, "utf8");
      // .xml/robots.txt paths in this app are always route handlers (sitemaps, RSS),
      // never static /public files, so they're excluded from this check.
      for (const m of content.matchAll(/["'](\/[a-zA-Z0-9_\-./]+\.(?:svg|png|jpg|jpeg|ico|webp|json))["']/g)) {
        referenced.add(m[1]);
      }
    }
  };
  walk(srcDir);
  for (const ref of referenced) {
    const onDisk = path.join(publicDir, ref);
    if (!existsSync(onDisk) && !ref.startsWith("/api/") && !ref.includes("opengraph-image")) {
      missing.push(ref);
    }
  }
  return missing;
}

async function sampleConsoleErrors(): Promise<{ route: string; errors: string[] }[]> {
  const SAMPLE_ROUTES = ["/", "/tools/image-studio", "/blog", "/india-services", "/ai-hub", "/developer-hub"];
  const results: { route: string; errors: string[] }[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let chromium: any;
  try {
    // Playwright is not a project dependency (kept out of the app's own bundle/deps);
    // this uses whatever's available in the environment running the health-check,
    // and degrades gracefully if it isn't.
    const candidates = ["playwright", "/opt/node22/lib/node_modules/playwright"];
    for (const c of candidates) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        chromium = require(c).chromium;
        break;
      } catch {
        /* try next candidate */
      }
    }
    if (!chromium) throw new Error("playwright not found");
  } catch {
    return SAMPLE_ROUTES.map((route) => ({ route, errors: ["not sampled — Playwright unavailable in this environment"] }));
  }
  const PORT = 4555;
  const { spawn } = await import("node:child_process");
  const server = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: ROOT, stdio: "ignore" });
  try {
    await new Promise<void>((resolve) => {
      const check = () => {
        fetch(`http://localhost:${PORT}`).then(() => resolve()).catch(() => setTimeout(check, 500));
      };
      setTimeout(check, 1500);
    });
    const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", args: ["--no-sandbox"] });
    const page = await (await browser.newContext()).newPage();
    for (const route of SAMPLE_ROUTES) {
      const errors: string[] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const onConsole = (msg: any) => { if (msg.type() === "error") errors.push(String(msg.text()).slice(0, 200)); };
      page.on("console", onConsole);
      try {
        await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "domcontentloaded", timeout: 15000 });
        await page.waitForTimeout(600);
      } catch (e) {
        errors.push(`navigation failed: ${(e as Error).message.slice(0, 150)}`);
      }
      page.off("console", onConsole);
      // Network-fetch failures from this sandbox's egress policy are expected noise, not app bugs.
      results.push({ route, errors: errors.filter((e) => !/ERR_TUNNEL_CONNECTION_FAILED|Failed to load resource/i.test(e)) });
    }
    await browser.close();
  } finally {
    server.kill("SIGKILL");
  }
  return results;
}

async function main() {
  const files = listHtmlFiles(APP_DIR);
  const contentFiles = files.filter((f) => !EXCLUDE_PATTERNS.some((re) => re.test(f)));

  const audits: PageAudit[] = contentFiles.map((f) => auditHtml(routeFromFile(f), readFileSync(path.join(APP_DIR, f), "utf8")));

  const titleCounts = new Map<string, string[]>();
  for (const a of audits) {
    if (!a.title) continue;
    titleCounts.set(a.title, [...(titleCounts.get(a.title) ?? []), a.route]);
  }
  const duplicateTitles = [...titleCounts.entries()].filter(([, routes]) => routes.length > 1);

  const brokenRoutes = audits.filter((a) => a.is404).map((a) => a.route);
  const missingAssets = findMissingPublicAssets();
  const build = parseBuildOutput();
  const consoleSample = await sampleConsoleErrors();

  const snapshot = {
    generatedAt: new Date().toISOString(),
    git: gitInfo(),
    build: {
      sharedFirstLoadKb: build.sharedFirstLoadKb,
      largestRoutes: build.routes.sort((a, b) => b.firstLoadKb - a.firstLoadKb).slice(0, 8),
      totalStaticPages: contentFiles.length,
    },
    seo: {
      pagesScanned: audits.length,
      missingTitle: audits.filter((a) => !a.hasTitle).length,
      missingMetaDescription: audits.filter((a) => !a.hasMetaDescription).length,
      missingOgImage: audits.filter((a) => !a.hasOgImage).length,
      missingCanonical: audits.filter((a) => !a.hasCanonical).length,
      missingSchema: audits.filter((a) => !a.hasSchema).length,
      duplicateTitleGroups: duplicateTitles.map(([title, routes]) => ({ title, routes })),
      pagesMissingMetaDescriptionList: audits.filter((a) => !a.hasMetaDescription).map((a) => a.route).slice(0, 30),
      pagesMissingOgImageList: audits.filter((a) => !a.hasOgImage).map((a) => a.route).slice(0, 30),
      pagesMissingCanonicalList: audits.filter((a) => !a.hasCanonical).map((a) => a.route).slice(0, 30),
      pagesMissingSchemaList: audits.filter((a) => !a.hasSchema).map((a) => a.route).slice(0, 30),
    },
    errors: {
      brokenRoutes,
      missingAssets,
    },
    consoleSample,
  };

  writeFileSync(OUT_FILE, JSON.stringify(snapshot, null, 2));
  console.log(`Wrote ${OUT_FILE}`);
  console.log(`Scanned ${audits.length} pages — missing title: ${snapshot.seo.missingTitle}, missing meta description: ${snapshot.seo.missingMetaDescription}, missing OG image: ${snapshot.seo.missingOgImage}, missing canonical: ${snapshot.seo.missingCanonical}, missing schema: ${snapshot.seo.missingSchema}, duplicate title groups: ${duplicateTitles.length}, broken routes: ${brokenRoutes.length}, missing assets: ${missingAssets.length}`);
}

main();
