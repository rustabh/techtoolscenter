import type { DevResource } from "./types";
import { builtinDevTools } from "./builtin";

export const externalDevResources: DevResource[] = [
  {
    "slug": "html",
    "name": "HTML",
    "category": "languages",
    "description": "The markup language that defines the structure and content of every web page, standardized under the WHATWG living standard.",
    "officialUrl": "https://developer.mozilla.org/en-US/docs/Web/HTML",
    "tags": [
      "markup",
      "web",
      "standard",
      "html5"
    ],
    "pricing": "Free",
    "openSource": true,
    "badge": "Popular",
    "icon": "FileCode2",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "css",
    "name": "CSS",
    "category": "languages",
    "description": "The stylesheet language used to control layout, color, and visual presentation across web pages and applications.",
    "officialUrl": "https://developer.mozilla.org/en-US/docs/Web/CSS",
    "tags": [
      "styling",
      "layout",
      "web",
      "standard"
    ],
    "pricing": "Free",
    "openSource": true,
    "badge": "Popular",
    "icon": "Palette",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "javascript",
    "name": "JavaScript",
    "category": "languages",
    "description": "The dynamic scripting language that powers interactivity in browsers and, via runtimes like Node.js, on servers as well.",
    "officialUrl": "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    "tags": [
      "scripting",
      "web",
      "ecmascript",
      "runtime"
    ],
    "pricing": "Free",
    "openSource": true,
    "badge": "Popular",
    "icon": "Braces",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "typescript",
    "name": "TypeScript",
    "category": "languages",
    "description": "A statically typed superset of JavaScript from Microsoft that compiles to plain JS, catching type errors before runtime.",
    "officialUrl": "https://www.typescriptlang.org",
    "docsUrl": "https://www.typescriptlang.org/docs",
    "tags": [
      "typed",
      "javascript",
      "compiler",
      "static-typing"
    ],
    "pricing": "Free",
    "openSource": true,
    "badge": "Trending",
    "icon": "FileJson",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "php",
    "name": "PHP",
    "category": "languages",
    "description": "A widely used server-side scripting language built for the web, powering a large share of the world's dynamic websites.",
    "officialUrl": "https://www.php.net",
    "tags": [
      "backend",
      "scripting",
      "server-side",
      "web"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Code",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "react",
    "name": "React",
    "category": "frameworks",
    "description": "A component-based JavaScript library from Meta for building user interfaces out of reusable, composable pieces.",
    "officialUrl": "https://react.dev",
    "docsUrl": "https://react.dev/learn",
    "tags": [
      "ui",
      "components",
      "jsx",
      "spa"
    ],
    "pricing": "Free",
    "openSource": true,
    "badge": "Popular",
    "icon": "Atom",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "nextjs",
    "name": "Next.js",
    "category": "frameworks",
    "description": "A React framework from Vercel that adds server rendering, routing, and full-stack conventions on top of React.",
    "officialUrl": "https://nextjs.org",
    "docsUrl": "https://nextjs.org/docs",
    "tags": [
      "react",
      "ssr",
      "fullstack",
      "routing"
    ],
    "pricing": "Free",
    "openSource": true,
    "badge": "Trending",
    "icon": "Layers",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "vue",
    "name": "Vue",
    "category": "frameworks",
    "description": "An approachable progressive JavaScript framework for building UIs, known for its gentle learning curve and single-file components.",
    "officialUrl": "https://vuejs.org",
    "docsUrl": "https://vuejs.org/guide/introduction.html",
    "tags": [
      "ui",
      "components",
      "spa",
      "progressive"
    ],
    "pricing": "Free",
    "openSource": true,
    "badge": "Popular",
    "icon": "Layers",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "angular",
    "name": "Angular",
    "category": "frameworks",
    "description": "A full-featured, opinionated TypeScript framework from Google for building large-scale enterprise web applications.",
    "officialUrl": "https://angular.dev",
    "docsUrl": "https://angular.dev/overview",
    "tags": [
      "typescript",
      "enterprise",
      "spa",
      "components"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Component",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "svelte",
    "name": "Svelte",
    "category": "frameworks",
    "description": "A framework that shifts work to compile time, producing highly optimized vanilla JavaScript instead of shipping a runtime library.",
    "officialUrl": "https://svelte.dev",
    "docsUrl": "https://svelte.dev/docs",
    "tags": [
      "compiler",
      "reactive",
      "components",
      "lightweight"
    ],
    "pricing": "Free",
    "openSource": true,
    "badge": "Trending",
    "icon": "Zap",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "astro",
    "name": "Astro",
    "category": "frameworks",
    "description": "A content-focused web framework built around shipping minimal JavaScript by default, with an islands architecture for interactivity.",
    "officialUrl": "https://astro.build",
    "docsUrl": "https://docs.astro.build",
    "tags": [
      "static-site",
      "islands",
      "content",
      "performance"
    ],
    "pricing": "Free",
    "openSource": true,
    "badge": "Trending",
    "icon": "Sparkles",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "solidjs",
    "name": "SolidJS",
    "category": "frameworks",
    "description": "A declarative UI library that combines a React-like component model with fine-grained reactivity and no virtual DOM.",
    "officialUrl": "https://www.solidjs.com",
    "docsUrl": "https://docs.solidjs.com",
    "tags": [
      "reactive",
      "components",
      "performance",
      "jsx"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Boxes",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "preact",
    "name": "Preact",
    "category": "frameworks",
    "description": "A fast, lightweight alternative to React with the same modern API packed into a much smaller footprint.",
    "officialUrl": "https://preactjs.com",
    "tags": [
      "react-alternative",
      "lightweight",
      "components",
      "spa"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Feather",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "vite",
    "name": "Vite",
    "category": "frontend",
    "description": "A fast frontend build tool that uses native ES modules for near-instant dev server startup and hot module replacement.",
    "officialUrl": "https://vitejs.dev",
    "docsUrl": "https://vitejs.dev/guide",
    "tags": [
      "build-tool",
      "bundler",
      "dev-server",
      "esm"
    ],
    "pricing": "Free",
    "openSource": true,
    "badge": "Trending",
    "icon": "Zap",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "webpack",
    "name": "Webpack",
    "category": "frontend",
    "description": "A highly configurable module bundler for JavaScript applications, long the standard choice for production frontend builds.",
    "officialUrl": "https://webpack.js.org",
    "docsUrl": "https://webpack.js.org/concepts",
    "tags": [
      "bundler",
      "build-tool",
      "modules",
      "configuration"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Boxes",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "turbopack",
    "name": "Turbopack",
    "category": "frontend",
    "description": "A Rust-based incremental bundler from the Next.js team, built as a much faster successor to Webpack.",
    "officialUrl": "https://turbo.build/pack",
    "docsUrl": "https://turbo.build/pack/docs",
    "tags": [
      "bundler",
      "rust",
      "build-tool",
      "incremental"
    ],
    "pricing": "Free",
    "openSource": true,
    "badge": "New",
    "icon": "Cpu",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "eslint",
    "name": "ESLint",
    "category": "frontend",
    "description": "A pluggable static analysis tool that finds and fixes problems in JavaScript and TypeScript code according to configurable rules.",
    "officialUrl": "https://eslint.org",
    "docsUrl": "https://eslint.org/docs/latest",
    "tags": [
      "linting",
      "code-quality",
      "javascript",
      "static-analysis"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Terminal",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "prettier",
    "name": "Prettier",
    "category": "frontend",
    "description": "An opinionated code formatter that enforces a consistent style automatically across JavaScript, CSS, and many other languages.",
    "officialUrl": "https://prettier.io",
    "docsUrl": "https://prettier.io/docs/en",
    "tags": [
      "formatting",
      "code-style",
      "javascript",
      "css"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "SquareCode",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "biome",
    "name": "Biome",
    "category": "frontend",
    "description": "A single fast, Rust-based toolchain that combines linting and formatting for JavaScript, TypeScript, JSX and JSON in one binary, aimed at replacing separate ESLint and Prettier setups.",
    "officialUrl": "https://biomejs.dev",
    "docsUrl": "https://biomejs.dev/guides/getting-started",
    "tags": [
      "linting",
      "formatting",
      "rust",
      "toolchain"
    ],
    "pricing": "Free",
    "openSource": true,
    "badge": "Trending",
    "icon": "Wind",
    "addedOn": "2026-08-13"
  },
  {
    "slug": "rollup",
    "name": "Rollup",
    "category": "frontend",
    "description": "An ES-module-native bundler known for producing smaller, cleaner output than many alternatives — the bundler underneath several popular build tools, including Vite's production build.",
    "officialUrl": "https://rollupjs.org",
    "docsUrl": "https://rollupjs.org/introduction",
    "tags": [
      "bundler",
      "esm",
      "build-tool",
      "tree-shaking"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Layers",
    "addedOn": "2026-08-13"
  },
  {
    "slug": "parcel",
    "name": "Parcel",
    "category": "frontend",
    "description": "A zero-configuration web application bundler that auto-detects the right build pipeline for your project's file types with no config file required to get started.",
    "officialUrl": "https://parceljs.org",
    "docsUrl": "https://parceljs.org/getting-started/webapp",
    "tags": [
      "bundler",
      "zero-config",
      "build-tool"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "PackageOpen",
    "addedOn": "2026-08-13"
  },
  {
    "slug": "tailwind-css",
    "name": "Tailwind CSS",
    "category": "css-libraries",
    "description": "A utility-first CSS framework that lets developers build custom designs directly in markup without writing separate stylesheets.",
    "officialUrl": "https://tailwindcss.com",
    "docsUrl": "https://tailwindcss.com/docs",
    "tags": [
      "utility-first",
      "css",
      "styling",
      "responsive"
    ],
    "pricing": "Free",
    "openSource": true,
    "badge": "Popular",
    "icon": "Wind",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "bootstrap",
    "name": "Bootstrap",
    "category": "css-libraries",
    "description": "One of the earliest and most widely adopted CSS frameworks, offering a grid system and prebuilt components out of the box.",
    "officialUrl": "https://getbootstrap.com",
    "docsUrl": "https://getbootstrap.com/docs",
    "tags": [
      "css",
      "grid",
      "components",
      "responsive"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Grid3x3",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "bulma",
    "name": "Bulma",
    "category": "css-libraries",
    "description": "A modern CSS framework based on Flexbox that provides responsive layout and styling classes without any JavaScript dependency.",
    "officialUrl": "https://bulma.io",
    "docsUrl": "https://bulma.io/documentation",
    "tags": [
      "css",
      "flexbox",
      "responsive",
      "no-js"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Columns3",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "material-ui",
    "name": "Material UI",
    "category": "ui-kits",
    "description": "A comprehensive React component library implementing Google's Material Design system, with theming and enterprise support options.",
    "officialUrl": "https://mui.com",
    "docsUrl": "https://mui.com/material-ui/getting-started",
    "tags": [
      "react",
      "material-design",
      "components",
      "theming"
    ],
    "pricing": "Freemium",
    "icon": "LayoutGrid",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "chakra-ui",
    "name": "Chakra UI",
    "category": "ui-kits",
    "description": "A React component library focused on accessibility and developer ergonomics, with a composable styling system.",
    "officialUrl": "https://chakra-ui.com",
    "docsUrl": "https://chakra-ui.com/docs",
    "tags": [
      "react",
      "accessibility",
      "components",
      "theming"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Blocks",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "shadcn-ui",
    "name": "Shadcn UI",
    "category": "ui-kits",
    "description": "A collection of copy-in, Radix-based React components styled with Tailwind CSS that you own and customize directly in your codebase.",
    "officialUrl": "https://ui.shadcn.com",
    "docsUrl": "https://ui.shadcn.com/docs",
    "tags": [
      "react",
      "tailwind",
      "radix",
      "components"
    ],
    "pricing": "Free",
    "openSource": true,
    "badge": "Trending",
    "icon": "Component",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "mantine",
    "name": "Mantine",
    "category": "ui-kits",
    "description": "A full-featured React component library with over a hundred components and hooks, including built-in dark mode support.",
    "officialUrl": "https://mantine.dev",
    "docsUrl": "https://mantine.dev/getting-started",
    "tags": [
      "react",
      "components",
      "hooks",
      "dark-mode"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "LayoutGrid",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "ant-design",
    "name": "Ant Design",
    "category": "ui-kits",
    "description": "An enterprise-oriented React design system from Alibaba, providing a large set of polished, data-dense components.",
    "officialUrl": "https://ant.design",
    "docsUrl": "https://ant.design/docs/react/introduce",
    "tags": [
      "react",
      "enterprise",
      "components",
      "design-system"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Table2",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "21st-dev",
    "name": "21st.dev",
    "category": "component-libraries",
    "description": "A community-driven marketplace of ready-to-use React and Tailwind CSS components and snippets that developers can browse and publish.",
    "officialUrl": "https://21st.dev",
    "tags": [
      "react",
      "tailwind",
      "snippets",
      "marketplace"
    ],
    "pricing": "Freemium",
    "badge": "New",
    "icon": "Puzzle",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "aceternity-ui",
    "name": "Aceternity UI",
    "category": "component-libraries",
    "description": "A library of visually striking, animation-heavy Tailwind CSS and Framer Motion components aimed at landing pages and portfolios.",
    "officialUrl": "https://ui.aceternity.com",
    "tags": [
      "tailwind",
      "animation",
      "framer-motion",
      "snippets"
    ],
    "pricing": "Freemium",
    "badge": "Trending",
    "icon": "Sparkles",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "magic-ui",
    "name": "Magic UI",
    "category": "component-libraries",
    "description": "An open-source collection of animated, copy-paste components built with React, Tailwind CSS, and Motion for marketing sites.",
    "officialUrl": "https://magicui.design",
    "tags": [
      "react",
      "tailwind",
      "animation",
      "marketing"
    ],
    "pricing": "Freemium",
    "icon": "Sparkles",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "react-bits",
    "name": "React Bits",
    "category": "component-libraries",
    "description": "A collection of animated, interactive React components and effects that developers can copy directly into their projects.",
    "officialUrl": "https://reactbits.dev",
    "tags": [
      "react",
      "animation",
      "snippets",
      "interactive"
    ],
    "pricing": "Freemium",
    "icon": "Blocks",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "origin-ui",
    "name": "Origin UI",
    "category": "component-libraries",
    "description": "A large set of copy-paste Tailwind CSS components built on top of shadcn/ui primitives for common application UI patterns.",
    "officialUrl": "https://originui.com",
    "tags": [
      "tailwind",
      "shadcn",
      "snippets",
      "components"
    ],
    "pricing": "Free",
    "icon": "LayoutTemplate",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "float-ui",
    "name": "Float UI",
    "category": "component-libraries",
    "description": "A set of free and premium Tailwind CSS component blocks and templates for building marketing and application pages quickly.",
    "officialUrl": "https://floatui.com",
    "tags": [
      "tailwind",
      "blocks",
      "templates",
      "snippets"
    ],
    "pricing": "Freemium",
    "icon": "LayoutTemplate",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "hyperui",
    "name": "HyperUI",
    "category": "component-libraries",
    "description": "A free, open-source library of copy-paste Tailwind CSS components covering common marketing and application UI sections.",
    "officialUrl": "https://hyperui.dev",
    "tags": [
      "tailwind",
      "free",
      "snippets",
      "components"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "LayoutTemplate",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "tailwind-ui",
    "name": "Tailwind UI",
    "category": "component-libraries",
    "description": "The official premium component and template library from the Tailwind CSS team, covering marketing, application, and e-commerce UI.",
    "officialUrl": "https://tailwindui.com",
    "tags": [
      "tailwind",
      "official",
      "templates",
      "components"
    ],
    "pricing": "Paid",
    "icon": "LayoutTemplate",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "preline",
    "name": "Preline",
    "category": "component-libraries",
    "description": "An open-source Tailwind CSS component library with interactive JavaScript-powered UI elements for building admin panels and websites.",
    "officialUrl": "https://preline.co",
    "tags": [
      "tailwind",
      "components",
      "javascript",
      "admin"
    ],
    "pricing": "Freemium",
    "icon": "Blocks",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "flowbite",
    "name": "Flowbite",
    "category": "component-libraries",
    "description": "An open-source component library and UI kit built on Tailwind CSS, including a companion React and Vue component set.",
    "officialUrl": "https://flowbite.com",
    "tags": [
      "tailwind",
      "components",
      "react",
      "vue"
    ],
    "pricing": "Freemium",
    "openSource": true,
    "icon": "Blocks",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "daisyui",
    "name": "DaisyUI",
    "category": "component-libraries",
    "description": "A plugin for Tailwind CSS that adds semantic component class names like btn and card on top of Tailwind's utility classes.",
    "officialUrl": "https://daisyui.com",
    "docsUrl": "https://daisyui.com/docs/install",
    "tags": [
      "tailwind",
      "plugin",
      "components",
      "class-names"
    ],
    "pricing": "Freemium",
    "openSource": true,
    "badge": "Popular",
    "icon": "Gem",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "node-js",
    "name": "Node.js",
    "category": "backend",
    "description": "A JavaScript runtime built on Chrome's V8 engine, letting developers write server-side code in the same language used in the browser.",
    "officialUrl": "https://nodejs.org",
    "docsUrl": "https://nodejs.org/en/docs",
    "tags": [
      "javascript",
      "runtime",
      "server"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Server",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "express",
    "name": "Express",
    "category": "backend",
    "description": "A minimal, unopinionated web framework for Node.js used to build APIs and web servers with a thin layer of routing and middleware.",
    "officialUrl": "https://expressjs.com",
    "tags": [
      "node",
      "javascript",
      "framework",
      "api"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Server",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "laravel",
    "name": "Laravel",
    "category": "backend",
    "description": "A PHP framework with expressive syntax and built-in tooling for routing, ORM, queues, and authentication, aimed at rapid full-stack development.",
    "officialUrl": "https://laravel.com",
    "docsUrl": "https://laravel.com/docs",
    "tags": [
      "php",
      "framework",
      "mvc"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Server",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "django",
    "name": "Django",
    "category": "backend",
    "description": "A batteries-included Python web framework that emphasizes fast development with a built-in ORM, admin panel, and security defaults.",
    "officialUrl": "https://www.djangoproject.com",
    "docsUrl": "https://docs.djangoproject.com",
    "tags": [
      "python",
      "framework",
      "orm"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Server",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "flask",
    "name": "Flask",
    "category": "backend",
    "description": "A lightweight Python microframework that gives developers just routing and templating out of the box, leaving architecture choices to the app.",
    "officialUrl": "https://flask.palletsprojects.com",
    "tags": [
      "python",
      "microframework",
      "wsgi"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Server",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "spring-boot",
    "name": "Spring Boot",
    "category": "backend",
    "description": "An opinionated extension of the Spring Framework for Java that removes boilerplate configuration and makes it fast to stand up production-ready services.",
    "officialUrl": "https://spring.io/projects/spring-boot",
    "tags": [
      "java",
      "framework",
      "enterprise"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Server",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "asp-net",
    "name": "ASP.NET",
    "category": "backend",
    "description": "Microsoft's cross-platform framework for building web APIs and applications on .NET, with strong typing and integrated tooling in Visual Studio.",
    "officialUrl": "https://dotnet.microsoft.com/en-us/apps/aspnet",
    "tags": [
      "dotnet",
      "csharp",
      "framework"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Server",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "ruby-on-rails",
    "name": "Ruby on Rails",
    "category": "backend",
    "description": "A convention-over-configuration web framework for Ruby that popularized fast, opinionated scaffolding for database-backed applications.",
    "officialUrl": "https://rubyonrails.org",
    "docsUrl": "https://guides.rubyonrails.org",
    "tags": [
      "ruby",
      "framework",
      "mvc"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Server",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "fastapi",
    "name": "FastAPI",
    "category": "backend",
    "description": "A modern Python web framework for building APIs with automatic OpenAPI docs, async support, and validation driven by type hints.",
    "officialUrl": "https://fastapi.tiangolo.com",
    "tags": [
      "python",
      "api",
      "async"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Server",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "nestjs",
    "name": "NestJS",
    "category": "backend",
    "description": "A structured Node.js framework layered on Express or Fastify, bringing Angular-style modules and dependency injection to backend development.",
    "officialUrl": "https://nestjs.com",
    "docsUrl": "https://docs.nestjs.com",
    "tags": [
      "node",
      "typescript",
      "framework"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Server",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "go-fiber",
    "name": "Go Fiber",
    "category": "backend",
    "description": "An Express-inspired web framework for Go built on the fasthttp engine, favoring low overhead and a familiar routing API.",
    "officialUrl": "https://gofiber.io",
    "docsUrl": "https://docs.gofiber.io",
    "tags": [
      "go",
      "framework",
      "performance"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Server",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "mysql",
    "name": "MySQL",
    "category": "databases",
    "description": "A widely deployed open-source relational database known for reliability and broad hosting support, with an optional paid enterprise edition.",
    "officialUrl": "https://www.mysql.com",
    "docsUrl": "https://dev.mysql.com/doc/",
    "tags": [
      "sql",
      "relational",
      "database"
    ],
    "pricing": "Freemium",
    "openSource": true,
    "icon": "Database",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "postgresql",
    "name": "PostgreSQL",
    "category": "databases",
    "description": "An advanced open-source relational database praised for standards compliance, extensibility, and strong support for complex queries and data types.",
    "officialUrl": "https://www.postgresql.org",
    "docsUrl": "https://www.postgresql.org/docs/",
    "tags": [
      "sql",
      "relational",
      "database"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Database",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "mongodb",
    "name": "MongoDB",
    "category": "databases",
    "description": "A document-oriented NoSQL database storing flexible JSON-like records, available self-hosted or as the managed Atlas cloud service.",
    "officialUrl": "https://www.mongodb.com",
    "docsUrl": "https://www.mongodb.com/docs",
    "tags": [
      "nosql",
      "document",
      "database"
    ],
    "pricing": "Freemium",
    "openSource": true,
    "icon": "Database",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "redis",
    "name": "Redis",
    "category": "databases",
    "description": "An in-memory key-value store used for caching, queues, and pub/sub, valued for its speed and simple data structure commands.",
    "officialUrl": "https://redis.io",
    "docsUrl": "https://redis.io/docs/",
    "tags": [
      "cache",
      "in-memory",
      "key-value"
    ],
    "pricing": "Freemium",
    "openSource": true,
    "icon": "DatabaseZap",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "firebase",
    "name": "Firebase",
    "category": "databases",
    "description": "Google's hosted backend platform whose Firestore and Realtime Database offer schemaless, realtime-synced data storage for web and mobile apps.",
    "officialUrl": "https://firebase.google.com",
    "docsUrl": "https://firebase.google.com/docs",
    "tags": [
      "nosql",
      "realtime",
      "baas"
    ],
    "pricing": "Freemium",
    "icon": "Flame",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "supabase",
    "name": "Supabase",
    "category": "databases",
    "description": "A hosted backend platform built around PostgreSQL, bundling auth, storage, and realtime subscriptions as an open-source-inspired Firebase alternative.",
    "officialUrl": "https://supabase.com",
    "docsUrl": "https://supabase.com/docs",
    "tags": [
      "postgres",
      "baas",
      "backend"
    ],
    "pricing": "Freemium",
    "badge": "Trending",
    "icon": "DatabaseZap",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "neon",
    "name": "Neon",
    "category": "databases",
    "description": "A serverless Postgres platform that separates storage and compute, enabling instant database branching and scale-to-zero for dev workflows.",
    "officialUrl": "https://neon.tech",
    "docsUrl": "https://neon.tech/docs",
    "tags": [
      "postgres",
      "serverless",
      "database"
    ],
    "pricing": "Freemium",
    "badge": "New",
    "icon": "Zap",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "planetscale",
    "name": "PlanetScale",
    "category": "databases",
    "description": "A managed MySQL-compatible database platform built on Vitess, offering non-blocking schema changes and branch-based workflows for teams.",
    "officialUrl": "https://planetscale.com",
    "docsUrl": "https://planetscale.com/docs",
    "tags": [
      "mysql",
      "serverless",
      "database"
    ],
    "pricing": "Freemium",
    "icon": "Database",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "sqlite",
    "name": "SQLite",
    "category": "databases",
    "description": "A self-contained, serverless SQL database engine that reads and writes directly to a single file, common in mobile apps and local tooling.",
    "officialUrl": "https://www.sqlite.org",
    "docsUrl": "https://www.sqlite.org/docs.html",
    "tags": [
      "sql",
      "embedded",
      "database"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Database",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "github-pages",
    "name": "GitHub Pages",
    "category": "hosting",
    "description": "Free static site hosting served directly from a GitHub repository, commonly used for project docs, portfolios, and simple landing pages.",
    "officialUrl": "https://pages.github.com",
    "docsUrl": "https://docs.github.com/pages",
    "tags": [
      "static-hosting",
      "github",
      "free"
    ],
    "pricing": "Free",
    "icon": "Github",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "firebase-hosting",
    "name": "Firebase Hosting",
    "category": "hosting",
    "description": "Google's static and single-page-app hosting service, integrated with the rest of the Firebase suite and fronted by a global CDN.",
    "officialUrl": "https://firebase.google.com/products/hosting",
    "docsUrl": "https://firebase.google.com/docs/hosting",
    "tags": [
      "static-hosting",
      "cdn",
      "firebase"
    ],
    "pricing": "Freemium",
    "icon": "Flame",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "cloudflare",
    "name": "Cloudflare",
    "category": "hosting",
    "description": "A global CDN, DNS, and edge network provider that speeds up and protects websites, with hosting and security products layered on top.",
    "officialUrl": "https://www.cloudflare.com",
    "docsUrl": "https://developers.cloudflare.com",
    "tags": [
      "cdn",
      "dns",
      "security"
    ],
    "pricing": "Freemium",
    "icon": "Cloud",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "aws",
    "name": "AWS",
    "category": "cloud",
    "description": "Amazon's cloud platform offering hundreds of on-demand infrastructure services, from compute and storage to managed databases and machine learning.",
    "officialUrl": "https://aws.amazon.com",
    "docsUrl": "https://docs.aws.amazon.com",
    "tags": [
      "cloud",
      "infrastructure",
      "iaas"
    ],
    "pricing": "Freemium",
    "icon": "Cloud",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "azure",
    "name": "Microsoft Azure",
    "category": "cloud",
    "description": "Microsoft's cloud computing platform providing virtual machines, managed services, and deep integration with the .NET and Windows ecosystem.",
    "officialUrl": "https://azure.microsoft.com",
    "docsUrl": "https://learn.microsoft.com/azure",
    "tags": [
      "cloud",
      "infrastructure",
      "microsoft"
    ],
    "pricing": "Freemium",
    "icon": "Cloud",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "google-cloud",
    "name": "Google Cloud",
    "category": "cloud",
    "description": "Google's cloud platform spanning compute, storage, and data analytics services, notable for BigQuery and Kubernetes-native tooling.",
    "officialUrl": "https://cloud.google.com",
    "docsUrl": "https://cloud.google.com/docs",
    "tags": [
      "cloud",
      "infrastructure",
      "gcp"
    ],
    "pricing": "Freemium",
    "icon": "Cloud",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "digitalocean",
    "name": "DigitalOcean",
    "category": "cloud",
    "description": "A developer-friendly cloud provider known for straightforward pricing and simple virtual machines called Droplets, plus managed databases and Kubernetes.",
    "officialUrl": "https://www.digitalocean.com",
    "docsUrl": "https://docs.digitalocean.com",
    "tags": [
      "cloud",
      "vps",
      "infrastructure"
    ],
    "pricing": "Freemium",
    "icon": "HardDrive",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "vercel",
    "name": "Vercel",
    "category": "deployment",
    "description": "A deployment platform built around Next.js and frontend frameworks, offering git-connected builds, previews, and edge functions.",
    "officialUrl": "https://vercel.com",
    "docsUrl": "https://vercel.com/docs",
    "tags": [
      "frontend",
      "serverless",
      "ci-cd"
    ],
    "pricing": "Freemium",
    "badge": "Popular",
    "icon": "Rocket",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "netlify",
    "name": "Netlify",
    "category": "deployment",
    "description": "A static and JAMstack deployment platform with git-based builds, serverless functions, and preview deploys for every pull request.",
    "officialUrl": "https://www.netlify.com",
    "docsUrl": "https://docs.netlify.com",
    "tags": [
      "jamstack",
      "static-hosting",
      "ci-cd"
    ],
    "pricing": "Freemium",
    "icon": "Ship",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "cloudflare-pages",
    "name": "Cloudflare Pages",
    "category": "deployment",
    "description": "Cloudflare's git-connected static site and full-stack deployment product, built to run on the same edge network as its CDN.",
    "officialUrl": "https://pages.cloudflare.com",
    "docsUrl": "https://developers.cloudflare.com/pages",
    "tags": [
      "edge",
      "static-hosting",
      "ci-cd"
    ],
    "pricing": "Freemium",
    "icon": "Cloud",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "railway",
    "name": "Railway",
    "category": "deployment",
    "description": "A deployment platform for backend services and databases that provisions infrastructure from a git repo with minimal configuration.",
    "officialUrl": "https://railway.app",
    "docsUrl": "https://docs.railway.app",
    "tags": [
      "backend",
      "paas",
      "containers"
    ],
    "pricing": "Freemium",
    "icon": "Waypoints",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "render",
    "name": "Render",
    "category": "deployment",
    "description": "A unified cloud platform for hosting web services, static sites, background workers, and databases with automatic deploys from git.",
    "officialUrl": "https://render.com",
    "docsUrl": "https://render.com/docs",
    "tags": [
      "paas",
      "backend",
      "ci-cd"
    ],
    "pricing": "Freemium",
    "icon": "Container",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "fly-io",
    "name": "Fly.io",
    "category": "deployment",
    "description": "A platform for running full applications as lightweight VMs close to users across a distributed set of global regions.",
    "officialUrl": "https://fly.io",
    "docsUrl": "https://fly.io/docs",
    "tags": [
      "edge",
      "vms",
      "backend"
    ],
    "pricing": "Freemium",
    "icon": "Zap",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "git",
    "name": "Git",
    "category": "version-control",
    "description": "The distributed version control system underlying nearly all modern source control workflows, tracking history locally without a central server requirement.",
    "officialUrl": "https://git-scm.com",
    "docsUrl": "https://git-scm.com/doc",
    "tags": [
      "vcs",
      "distributed",
      "cli"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "GitBranch",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "github",
    "name": "GitHub",
    "category": "version-control",
    "description": "The most widely used git hosting platform, adding pull requests, issues, Actions CI/CD, and social discovery on top of git.",
    "officialUrl": "https://github.com",
    "docsUrl": "https://docs.github.com",
    "tags": [
      "git",
      "hosting",
      "ci-cd"
    ],
    "pricing": "Freemium",
    "icon": "Github",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "gitlab",
    "name": "GitLab",
    "category": "version-control",
    "description": "A git hosting platform bundling source control, CI/CD pipelines, and project planning into one integrated DevOps tool.",
    "officialUrl": "https://about.gitlab.com",
    "docsUrl": "https://docs.gitlab.com",
    "tags": [
      "git",
      "hosting",
      "devops"
    ],
    "pricing": "Freemium",
    "icon": "Gitlab",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "bitbucket",
    "name": "Bitbucket",
    "category": "version-control",
    "description": "Atlassian's git hosting platform, tightly integrated with Jira and Trello for teams already standardized on the Atlassian toolchain.",
    "officialUrl": "https://bitbucket.org",
    "tags": [
      "git",
      "hosting",
      "atlassian"
    ],
    "pricing": "Freemium",
    "icon": "GitFork",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "npm",
    "name": "npm",
    "category": "package-managers",
    "description": "The default package manager for Node.js, bundling both the CLI and the world's largest JavaScript package registry.",
    "officialUrl": "https://www.npmjs.com",
    "docsUrl": "https://docs.npmjs.com",
    "tags": [
      "node",
      "registry",
      "cli"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Package",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "pnpm",
    "name": "pnpm",
    "category": "package-managers",
    "description": "A fast, disk-space-efficient package manager for Node.js that uses a content-addressable store to avoid duplicating dependencies across projects.",
    "officialUrl": "https://pnpm.io",
    "tags": [
      "node",
      "monorepo",
      "cli"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Package",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "yarn",
    "name": "Yarn",
    "category": "package-managers",
    "description": "A package manager for JavaScript created as a faster, more deterministic alternative to early npm, now offering workspaces and Plug'n'Play installs.",
    "officialUrl": "https://yarnpkg.com",
    "docsUrl": "https://yarnpkg.com/getting-started",
    "tags": [
      "node",
      "workspaces",
      "cli"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Package",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "bun",
    "name": "Bun",
    "category": "package-managers",
    "description": "An all-in-one JavaScript runtime and package manager written for speed, bundling an installer, bundler, and test runner alongside its runtime.",
    "officialUrl": "https://bun.sh",
    "docsUrl": "https://bun.sh/docs",
    "tags": [
      "javascript",
      "runtime",
      "cli"
    ],
    "pricing": "Free",
    "openSource": true,
    "badge": "Trending",
    "icon": "Zap",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "composer",
    "name": "Composer",
    "category": "package-managers",
    "description": "The dependency manager for PHP, resolving and installing per-project libraries listed in a composer.json manifest.",
    "officialUrl": "https://getcomposer.org",
    "docsUrl": "https://getcomposer.org/doc/",
    "tags": [
      "php",
      "dependencies",
      "cli"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Package",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "lucide",
    "name": "Lucide",
    "category": "icons",
    "description": "A community-maintained fork of Feather Icons offering a large, consistent set of SVG icons with first-class React, Vue, and Svelte packages.",
    "officialUrl": "https://lucide.dev",
    "docsUrl": "https://lucide.dev/guide/",
    "tags": [
      "icons",
      "svg",
      "react",
      "open-source"
    ],
    "pricing": "Free",
    "openSource": true,
    "badge": "Popular",
    "icon": "Shapes",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "heroicons",
    "name": "Heroicons",
    "category": "icons",
    "description": "A hand-crafted icon set from the Tailwind CSS team, shipped in outline, solid, and mini variants for React and Vue.",
    "officialUrl": "https://heroicons.com",
    "tags": [
      "icons",
      "svg",
      "tailwind"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Shapes",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "tabler-icons",
    "name": "Tabler Icons",
    "category": "icons",
    "description": "A free, stroke-based icon library with thousands of pixel-perfect SVG icons covering everyday UI and product needs.",
    "officialUrl": "https://tabler.io/icons",
    "tags": [
      "icons",
      "svg",
      "stroke-icons"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Shapes",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "phosphor-icons",
    "name": "Phosphor Icons",
    "category": "icons",
    "description": "A flexible icon family with six weights per glyph, giving designers fine control over visual weight across an interface.",
    "officialUrl": "https://phosphoricons.com",
    "tags": [
      "icons",
      "svg",
      "icon-weights"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Shapes",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "font-awesome",
    "name": "Font Awesome",
    "category": "icons",
    "description": "One of the longest-running icon toolkits on the web, combining a large free set with paid Pro packs and extra icon styles.",
    "officialUrl": "https://fontawesome.com",
    "docsUrl": "https://docs.fontawesome.com",
    "tags": [
      "icons",
      "webfont",
      "svg"
    ],
    "pricing": "Freemium",
    "badge": "Popular",
    "icon": "Shapes",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "material-symbols",
    "name": "Material Symbols",
    "category": "icons",
    "description": "Google's variable icon set built around Material Design, adjustable for weight, fill, and optical size in a single font file.",
    "officialUrl": "https://fonts.google.com/icons",
    "docsUrl": "https://developers.google.com/fonts/docs/material_symbols",
    "tags": [
      "icons",
      "material-design",
      "variable-font"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Shapes",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "bootstrap-icons",
    "name": "Bootstrap Icons",
    "category": "icons",
    "description": "The official icon library for Bootstrap, a compact SVG set that also works cleanly outside of Bootstrap-based projects.",
    "officialUrl": "https://icons.getbootstrap.com",
    "tags": [
      "icons",
      "svg",
      "bootstrap"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Shapes",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "remix-icon",
    "name": "Remix Icon",
    "category": "icons",
    "description": "A neutral-style icon system with both outlined and filled variants for nearly every glyph, aimed at product interfaces.",
    "officialUrl": "https://remixicon.com",
    "tags": [
      "icons",
      "svg",
      "ui-icons"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Shapes",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "undraw",
    "name": "unDraw",
    "category": "illustrations",
    "description": "Open-source SVG illustrations with a recolorable accent, popular for quickly theming empty states and marketing pages.",
    "officialUrl": "https://undraw.co",
    "tags": [
      "illustrations",
      "svg",
      "empty-states"
    ],
    "pricing": "Free",
    "icon": "Image",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "storyset",
    "name": "Storyset",
    "category": "illustrations",
    "description": "Customizable, animatable illustration packs organized by theme, with color and pose editing available in the browser.",
    "officialUrl": "https://storyset.com",
    "tags": [
      "illustrations",
      "svg",
      "customizable"
    ],
    "pricing": "Freemium",
    "icon": "Image",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "drawkit",
    "name": "DrawKit",
    "category": "illustrations",
    "description": "Hand-drawn illustration packs across several distinct art styles, with free downloads alongside larger paid bundles.",
    "officialUrl": "https://drawkit.com",
    "tags": [
      "illustrations",
      "svg",
      "hand-drawn"
    ],
    "pricing": "Freemium",
    "icon": "Palette",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "manypixels",
    "name": "ManyPixels",
    "category": "illustrations",
    "description": "A growing library of flat-style illustrations in a consistent visual system, free to use with an optional Pro tier.",
    "officialUrl": "https://manypixels.co",
    "tags": [
      "illustrations",
      "svg",
      "flat-design"
    ],
    "pricing": "Freemium",
    "icon": "Brush",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "icons8",
    "name": "Icons8",
    "category": "illustrations",
    "description": "A large media library spanning icons, illustrations, and photos in matching styles, with paid plans for higher-res assets and full commercial use.",
    "officialUrl": "https://icons8.com",
    "tags": [
      "illustrations",
      "icons",
      "stock-photos"
    ],
    "pricing": "Freemium",
    "icon": "Layers",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "unsplash",
    "name": "Unsplash",
    "category": "illustrations",
    "description": "A vast, community-contributed library of high-resolution stock photography free to use under a permissive license.",
    "officialUrl": "https://unsplash.com",
    "tags": [
      "stock-photos",
      "images",
      "free-license"
    ],
    "pricing": "Free",
    "badge": "Popular",
    "icon": "Camera",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "pexels",
    "name": "Pexels",
    "category": "illustrations",
    "description": "A free stock photo and video platform with a searchable, tag-driven library contributed by independent photographers.",
    "officialUrl": "https://pexels.com",
    "tags": [
      "stock-photos",
      "stock-video",
      "images"
    ],
    "pricing": "Free",
    "icon": "Camera",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "pixabay",
    "name": "Pixabay",
    "category": "illustrations",
    "description": "A free media library covering photos, illustrations, vectors, and video clips, all released under Pixabay's own content license.",
    "officialUrl": "https://pixabay.com",
    "tags": [
      "stock-photos",
      "vectors",
      "images"
    ],
    "pricing": "Free",
    "icon": "Camera",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "lottiefiles",
    "name": "LottieFiles",
    "category": "animations",
    "description": "A hub for browsing, editing, and exporting Lottie animations, with a huge community marketplace of free and paid files.",
    "officialUrl": "https://lottiefiles.com",
    "docsUrl": "https://developers.lottiefiles.com",
    "tags": [
      "animation",
      "lottie",
      "json"
    ],
    "pricing": "Freemium",
    "icon": "Film",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "framer-motion",
    "name": "Framer Motion",
    "category": "animations",
    "description": "A production-ready animation library for React that has since been rebranded and merged into the broader Motion project at motion.dev.",
    "officialUrl": "https://motion.dev",
    "docsUrl": "https://motion.dev/docs",
    "tags": [
      "animation",
      "react",
      "gestures"
    ],
    "pricing": "Free",
    "openSource": true,
    "badge": "Popular",
    "icon": "Sparkles",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "gsap",
    "name": "GSAP",
    "category": "animations",
    "description": "A high-performance, framework-agnostic animation engine widely used for complex timelines, scroll effects, and SVG animation.",
    "officialUrl": "https://gsap.com",
    "docsUrl": "https://gsap.com/docs/v3/",
    "tags": [
      "animation",
      "javascript",
      "timelines"
    ],
    "pricing": "Free",
    "icon": "Sparkles",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "motion-one",
    "name": "Motion One",
    "category": "animations",
    "description": "A lightweight, dependency-free animation engine built on the Web Animations API, now developed alongside Framer Motion under the unified Motion brand.",
    "officialUrl": "https://motion.dev",
    "docsUrl": "https://motion.dev/docs",
    "tags": [
      "animation",
      "javascript",
      "waapi"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Film",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "animejs",
    "name": "Anime.js",
    "category": "animations",
    "description": "A compact JavaScript animation library with a simple API for animating CSS properties, SVG, and DOM attributes together.",
    "officialUrl": "https://animejs.com",
    "docsUrl": "https://animejs.com/documentation/",
    "tags": [
      "animation",
      "javascript",
      "svg"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Sparkles",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "chartjs",
    "name": "Chart.js",
    "category": "charts",
    "description": "A canvas-based charting library covering the common chart types, valued for its small footprint and simple configuration API.",
    "officialUrl": "https://chartjs.org",
    "docsUrl": "https://www.chartjs.org/docs/",
    "tags": [
      "charts",
      "canvas",
      "javascript"
    ],
    "pricing": "Free",
    "openSource": true,
    "badge": "Popular",
    "icon": "ChartColumn",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "recharts",
    "name": "Recharts",
    "category": "charts",
    "description": "A composable charting library built on React and D3, letting developers assemble charts from declarative components.",
    "officialUrl": "https://recharts.org",
    "docsUrl": "https://recharts.org/en-US/api",
    "tags": [
      "charts",
      "react",
      "d3"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "ChartColumn",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "apache-echarts",
    "name": "Apache ECharts",
    "category": "charts",
    "description": "A feature-rich charting engine handling everything from basic charts to geo maps and large-scale data, backed by the Apache Software Foundation.",
    "officialUrl": "https://echarts.apache.org",
    "docsUrl": "https://echarts.apache.org/handbook/en/get-started/",
    "tags": [
      "charts",
      "canvas",
      "data-visualization"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "ChartColumn",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "apexcharts",
    "name": "ApexCharts",
    "category": "charts",
    "description": "An SVG-based charting library with interactive, animated charts and framework wrappers for React, Vue, and Angular.",
    "officialUrl": "https://apexcharts.com",
    "docsUrl": "https://apexcharts.com/docs/",
    "tags": [
      "charts",
      "svg",
      "interactive"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "ChartColumn",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "nivo",
    "name": "Nivo",
    "category": "charts",
    "description": "A React charting library built on D3 and SVG/canvas/HTML renderers, with a large set of chart types and built-in theming.",
    "officialUrl": "https://nivo.rocks",
    "tags": [
      "charts",
      "react",
      "d3"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "ChartColumn",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "authjs",
    "name": "Auth.js",
    "category": "authentication",
    "description": "An open-source authentication library for JavaScript apps, formerly NextAuth.js, supporting OAuth, email, and credentials-based flows.",
    "officialUrl": "https://authjs.dev",
    "docsUrl": "https://authjs.dev/getting-started",
    "tags": [
      "authentication",
      "oauth",
      "sessions"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "KeyRound",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "clerk",
    "name": "Clerk",
    "category": "authentication",
    "description": "A hosted authentication and user-management platform offering prebuilt UI components alongside a generous free tier.",
    "officialUrl": "https://clerk.com",
    "docsUrl": "https://clerk.com/docs",
    "tags": [
      "authentication",
      "user-management",
      "sso"
    ],
    "pricing": "Freemium",
    "icon": "Fingerprint",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "firebase-authentication",
    "name": "Firebase Authentication",
    "category": "authentication",
    "description": "Google's managed authentication service supporting email, phone, and federated sign-in, integrated tightly with the rest of Firebase.",
    "officialUrl": "https://firebase.google.com/products/auth",
    "docsUrl": "https://firebase.google.com/docs/auth",
    "tags": [
      "authentication",
      "firebase",
      "oauth"
    ],
    "pricing": "Freemium",
    "icon": "ShieldCheck",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "supabase-auth",
    "name": "Supabase Auth",
    "category": "authentication",
    "description": "The authentication layer of Supabase, providing email, OAuth, and row-level-security-aware sessions on top of Postgres.",
    "officialUrl": "https://supabase.com/auth",
    "docsUrl": "https://supabase.com/docs/guides/auth",
    "tags": [
      "authentication",
      "supabase",
      "postgres"
    ],
    "pricing": "Freemium",
    "icon": "Lock",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "auth0",
    "name": "Auth0",
    "category": "authentication",
    "description": "An enterprise-grade identity platform offering configurable login flows, SSO, and extensive compliance features for larger applications.",
    "officialUrl": "https://auth0.com",
    "docsUrl": "https://auth0.com/docs",
    "tags": [
      "authentication",
      "sso",
      "identity"
    ],
    "pricing": "Freemium",
    "badge": "Popular",
    "icon": "KeyRound",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "sanity",
    "name": "Sanity",
    "category": "cms",
    "description": "A headless CMS built around a structured content API and a customizable, React-based editing studio.",
    "officialUrl": "https://sanity.io",
    "docsUrl": "https://www.sanity.io/docs",
    "tags": [
      "cms",
      "headless",
      "structured-content"
    ],
    "pricing": "Freemium",
    "icon": "FileStack",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "strapi",
    "name": "Strapi",
    "category": "cms",
    "description": "An open-source, self-hostable headless CMS with a customizable admin panel and a paid managed cloud option.",
    "officialUrl": "https://strapi.io",
    "docsUrl": "https://docs.strapi.io",
    "tags": [
      "cms",
      "headless",
      "self-hosted"
    ],
    "pricing": "Freemium",
    "icon": "FileStack",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "contentful",
    "name": "Contentful",
    "category": "cms",
    "description": "A hosted headless CMS built for large content teams, offering structured content modeling and a multi-space workflow.",
    "officialUrl": "https://contentful.com",
    "docsUrl": "https://www.contentful.com/developers/docs/",
    "tags": [
      "cms",
      "headless",
      "content-modeling"
    ],
    "pricing": "Freemium",
    "icon": "FileStack",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "hygraph",
    "name": "Hygraph",
    "category": "cms",
    "description": "A GraphQL-native headless CMS, formerly GraphCMS, built around federated content and multi-source schema stitching.",
    "officialUrl": "https://hygraph.com",
    "docsUrl": "https://hygraph.com/docs",
    "tags": [
      "cms",
      "headless",
      "graphql"
    ],
    "pricing": "Freemium",
    "icon": "FileStack",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "directus",
    "name": "Directus",
    "category": "cms",
    "description": "An open-source data platform that wraps an existing SQL database with an instant REST/GraphQL API and an admin app.",
    "officialUrl": "https://directus.io",
    "docsUrl": "https://docs.directus.io",
    "tags": [
      "cms",
      "headless",
      "self-hosted"
    ],
    "pricing": "Freemium",
    "icon": "FileStack",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "wordpress",
    "name": "WordPress",
    "category": "cms",
    "description": "The long-standing open-source publishing platform behind a large share of the web, self-hostable with a vast plugin and theme ecosystem.",
    "officialUrl": "https://wordpress.org",
    "docsUrl": "https://developer.wordpress.org",
    "tags": [
      "cms",
      "self-hosted",
      "blogging"
    ],
    "pricing": "Free",
    "openSource": true,
    "badge": "Popular",
    "icon": "Newspaper",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "playwright",
    "name": "Playwright",
    "category": "testing",
    "description": "Cross-browser end-to-end testing framework from Microsoft that automates Chromium, Firefox, and WebKit with a single API.",
    "officialUrl": "https://playwright.dev",
    "docsUrl": "https://playwright.dev/docs/intro",
    "tags": [
      "e2e",
      "browser-automation",
      "testing"
    ],
    "pricing": "Free",
    "openSource": true,
    "badge": "Popular",
    "icon": "TestTube",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "cypress",
    "name": "Cypress",
    "category": "testing",
    "description": "Developer-friendly end-to-end testing tool that runs directly in the browser for fast, debuggable test execution.",
    "officialUrl": "https://www.cypress.io",
    "docsUrl": "https://docs.cypress.io",
    "tags": [
      "e2e",
      "testing",
      "browser"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "FlaskConical",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "jest",
    "name": "Jest",
    "category": "testing",
    "description": "Widely used JavaScript test runner with built-in assertions, mocking, and snapshot testing out of the box.",
    "officialUrl": "https://jestjs.io",
    "docsUrl": "https://jestjs.io/docs/getting-started",
    "tags": [
      "unit-testing",
      "javascript",
      "test-runner"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Beaker",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "vitest",
    "name": "Vitest",
    "category": "testing",
    "description": "Vite-native unit test framework offering near-instant watch mode and a Jest-compatible API.",
    "officialUrl": "https://vitest.dev",
    "docsUrl": "https://vitest.dev/guide/",
    "tags": [
      "unit-testing",
      "vite",
      "test-runner"
    ],
    "pricing": "Free",
    "openSource": true,
    "badge": "Trending",
    "icon": "Zap",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "postman",
    "name": "Postman",
    "category": "testing",
    "description": "API client for building, testing, and sharing HTTP requests, with collections and automated test scripts.",
    "officialUrl": "https://www.postman.com",
    "docsUrl": "https://learning.postman.com/docs/getting-started/overview/",
    "tags": [
      "api-testing",
      "rest",
      "collaboration"
    ],
    "pricing": "Freemium",
    "icon": "Plug",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "insomnia",
    "name": "Insomnia",
    "category": "testing",
    "description": "Lightweight REST and GraphQL client focused on a clean interface for organizing and running API requests.",
    "officialUrl": "https://insomnia.rest",
    "docsUrl": "https://docs.insomnia.rest",
    "tags": [
      "api-testing",
      "graphql",
      "rest"
    ],
    "pricing": "Freemium",
    "openSource": true,
    "icon": "Webhook",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "lighthouse",
    "name": "Lighthouse",
    "category": "performance",
    "description": "Automated auditing tool from Google that scores pages on performance, accessibility, SEO, and best practices.",
    "officialUrl": "https://developer.chrome.com/docs/lighthouse",
    "docsUrl": "https://developer.chrome.com/docs/lighthouse/overview",
    "tags": [
      "auditing",
      "performance",
      "chrome"
    ],
    "pricing": "Free",
    "openSource": true,
    "badge": "Popular",
    "icon": "Gauge",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "webpagetest",
    "name": "WebPageTest",
    "category": "performance",
    "description": "Runs real-browser performance tests from multiple global locations and connection speeds with detailed waterfall breakdowns.",
    "officialUrl": "https://www.webpagetest.org",
    "docsUrl": "https://docs.webpagetest.org",
    "tags": [
      "performance",
      "waterfall",
      "real-device-testing"
    ],
    "pricing": "Freemium",
    "openSource": true,
    "icon": "Activity",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "gtmetrix",
    "name": "GTmetrix",
    "category": "performance",
    "description": "Page speed testing service that combines Lighthouse scoring with historical trend tracking and detailed recommendations.",
    "officialUrl": "https://gtmetrix.com",
    "tags": [
      "performance",
      "page-speed",
      "monitoring"
    ],
    "pricing": "Freemium",
    "icon": "Gauge",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "pagespeed-insights",
    "name": "PageSpeed Insights",
    "category": "performance",
    "description": "Google's free tool for checking real-world field data and lab performance scores for any public URL.",
    "officialUrl": "https://pagespeed.web.dev",
    "tags": [
      "performance",
      "core-web-vitals",
      "google"
    ],
    "pricing": "Free",
    "icon": "Gauge",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "bundlephobia",
    "name": "Bundlephobia",
    "category": "performance",
    "description": "Looks up the install size and gzip/minified cost of any npm package before you add it to a project.",
    "officialUrl": "https://bundlephobia.com",
    "tags": [
      "npm",
      "bundle-size",
      "javascript"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Cpu",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "sitespeed-io",
    "name": "sitespeed.io",
    "category": "performance",
    "description": "An open-source command-line toolset that runs real browser-based performance tests and Core Web Vitals tracking, built for self-hosting instead of relying on a hosted dashboard.",
    "officialUrl": "https://www.sitespeed.io",
    "docsUrl": "https://www.sitespeed.io/documentation",
    "tags": [
      "performance",
      "core-web-vitals",
      "self-hosted",
      "cli"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Timer",
    "addedOn": "2026-08-13"
  },
  {
    "slug": "unlighthouse",
    "name": "Unlighthouse",
    "category": "performance",
    "description": "Crawls an entire site and runs a Lighthouse audit on every discovered page at once, instead of testing one URL at a time.",
    "officialUrl": "https://unlighthouse.dev",
    "docsUrl": "https://unlighthouse.dev/guide/getting-started",
    "tags": [
      "lighthouse",
      "site-wide",
      "auditing",
      "cli"
    ],
    "pricing": "Free",
    "openSource": true,
    "badge": "New",
    "icon": "Lightbulb",
    "addedOn": "2026-08-13"
  },
  {
    "slug": "swagger-openapi",
    "name": "Swagger / OpenAPI",
    "category": "api-tools",
    "description": "Tooling ecosystem built around the OpenAPI Specification for designing, documenting, and generating clients for REST APIs.",
    "officialUrl": "https://swagger.io",
    "docsUrl": "https://swagger.io/docs/",
    "tags": [
      "api-docs",
      "openapi",
      "spec"
    ],
    "pricing": "Freemium",
    "openSource": true,
    "badge": "Popular",
    "icon": "Webhook",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "graphql",
    "name": "GraphQL",
    "category": "api-tools",
    "description": "Query language for APIs that lets clients request exactly the data they need from a single endpoint.",
    "officialUrl": "https://graphql.org",
    "docsUrl": "https://graphql.org/learn/",
    "tags": [
      "query-language",
      "api",
      "schema"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Network",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "hoppscotch",
    "name": "Hoppscotch",
    "category": "api-tools",
    "description": "Open-source, browser-based API request builder supporting REST, GraphQL, and WebSocket testing.",
    "officialUrl": "https://hoppscotch.io",
    "docsUrl": "https://docs.hoppscotch.io",
    "tags": [
      "api-testing",
      "rest",
      "graphql"
    ],
    "pricing": "Freemium",
    "openSource": true,
    "icon": "Plug",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "rapidapi",
    "name": "RapidAPI",
    "category": "api-tools",
    "description": "Marketplace and gateway for discovering, testing, and connecting to thousands of third-party public APIs.",
    "officialUrl": "https://rapidapi.com",
    "tags": [
      "api-marketplace",
      "discovery",
      "gateway"
    ],
    "pricing": "Freemium",
    "icon": "Globe",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "snyk",
    "name": "Snyk",
    "category": "security",
    "description": "Developer-focused security platform that scans dependencies, containers, and code for known vulnerabilities.",
    "officialUrl": "https://snyk.io",
    "docsUrl": "https://docs.snyk.io",
    "tags": [
      "vulnerability-scanning",
      "dependencies",
      "sca"
    ],
    "pricing": "Freemium",
    "icon": "ShieldAlert",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "owasp-zap",
    "name": "OWASP ZAP",
    "category": "security",
    "description": "Open-source web application scanner for finding vulnerabilities through automated and manual penetration testing.",
    "officialUrl": "https://www.zaproxy.org",
    "docsUrl": "https://www.zaproxy.org/docs/",
    "tags": [
      "penetration-testing",
      "web-security",
      "scanner"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Bug",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "have-i-been-pwned",
    "name": "Have I Been Pwned",
    "category": "security",
    "description": "Lets anyone check whether an email address or password has appeared in a known data breach.",
    "officialUrl": "https://haveibeenpwned.com",
    "docsUrl": "https://haveibeenpwned.com/API/v3",
    "tags": [
      "breach-check",
      "data-leak",
      "credentials"
    ],
    "pricing": "Free",
    "icon": "Fingerprint",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "lets-encrypt",
    "name": "Let's Encrypt",
    "category": "security",
    "description": "Nonprofit certificate authority issuing free, automated TLS certificates to secure websites.",
    "officialUrl": "https://letsencrypt.org",
    "docsUrl": "https://letsencrypt.org/docs/",
    "tags": [
      "tls",
      "certificates",
      "https"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Lock",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "docker",
    "name": "Docker",
    "category": "devops",
    "description": "Packages applications and their dependencies into portable containers that run consistently across environments.",
    "officialUrl": "https://www.docker.com",
    "docsUrl": "https://docs.docker.com",
    "tags": [
      "containers",
      "images",
      "devops"
    ],
    "pricing": "Free",
    "openSource": true,
    "badge": "Popular",
    "icon": "Container",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "kubernetes",
    "name": "Kubernetes",
    "category": "devops",
    "description": "Container orchestration system for automating deployment, scaling, and management of containerized workloads.",
    "officialUrl": "https://kubernetes.io",
    "docsUrl": "https://kubernetes.io/docs/home/",
    "tags": [
      "orchestration",
      "containers",
      "scaling"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Ship",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "github-actions",
    "name": "GitHub Actions",
    "category": "devops",
    "description": "CI/CD automation built into GitHub for running workflows on pushes, pull requests, and other repository events.",
    "officialUrl": "https://github.com/features/actions",
    "docsUrl": "https://docs.github.com/actions",
    "tags": [
      "ci-cd",
      "automation",
      "github"
    ],
    "pricing": "Freemium",
    "icon": "Workflow",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "jenkins",
    "name": "Jenkins",
    "category": "devops",
    "description": "Self-hosted automation server for building, testing, and deploying software through configurable pipelines.",
    "officialUrl": "https://www.jenkins.io",
    "docsUrl": "https://www.jenkins.io/doc/",
    "tags": [
      "ci-cd",
      "pipelines",
      "self-hosted"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Workflow",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "terraform",
    "name": "Terraform",
    "category": "devops",
    "description": "Infrastructure-as-code tool that lets teams define and provision cloud resources using a declarative configuration language.",
    "officialUrl": "https://www.terraform.io",
    "docsUrl": "https://developer.hashicorp.com/terraform/docs",
    "tags": [
      "iac",
      "provisioning",
      "cloud"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Cpu",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "ansible",
    "name": "Ansible",
    "category": "devops",
    "description": "Agentless automation tool for configuration management, application deployment, and orchestration using YAML playbooks.",
    "officialUrl": "https://www.ansible.com",
    "docsUrl": "https://docs.ansible.com",
    "tags": [
      "configuration-management",
      "automation",
      "yaml"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Terminal",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "sentry",
    "name": "Sentry",
    "category": "monitoring",
    "description": "Application monitoring platform that captures errors and performance traces with full stack context for faster debugging.",
    "officialUrl": "https://sentry.io",
    "docsUrl": "https://docs.sentry.io",
    "tags": [
      "error-tracking",
      "apm",
      "logging"
    ],
    "pricing": "Freemium",
    "openSource": true,
    "badge": "Popular",
    "icon": "Radar",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "better-stack",
    "name": "Better Stack",
    "category": "monitoring",
    "description": "Unified uptime monitoring, log management, and incident alerting platform for keeping production systems observable.",
    "officialUrl": "https://betterstack.com",
    "docsUrl": "https://betterstack.com/docs",
    "tags": [
      "uptime",
      "logging",
      "alerting"
    ],
    "pricing": "Freemium",
    "icon": "Activity",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "logrocket",
    "name": "LogRocket",
    "category": "monitoring",
    "description": "Session replay and monitoring tool that reconstructs user sessions alongside errors and performance metrics.",
    "officialUrl": "https://logrocket.com",
    "docsUrl": "https://docs.logrocket.com",
    "tags": [
      "session-replay",
      "monitoring",
      "frontend"
    ],
    "pricing": "Freemium",
    "icon": "Eye",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "google-analytics",
    "name": "Google Analytics",
    "category": "monitoring",
    "description": "Google's traffic and behavior analytics platform, tracking site visits, conversions, and audience data.",
    "officialUrl": "https://analytics.google.com",
    "tags": [
      "web-analytics",
      "traffic",
      "google"
    ],
    "pricing": "Free",
    "icon": "Activity",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "plausible",
    "name": "Plausible",
    "category": "monitoring",
    "description": "Privacy-focused, cookieless website analytics with a lightweight script and a simple, no-clutter dashboard.",
    "officialUrl": "https://plausible.io",
    "docsUrl": "https://plausible.io/docs",
    "tags": [
      "privacy-analytics",
      "cookieless",
      "lightweight"
    ],
    "pricing": "Paid",
    "openSource": true,
    "icon": "Eye",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "chatgpt",
    "name": "ChatGPT",
    "category": "ai-coding",
    "description": "A general-purpose conversational AI that can explain code, debug errors, and write snippets or scripts across many languages.",
    "officialUrl": "https://chat.openai.com",
    "tags": [
      "chatbot",
      "code-generation",
      "debugging"
    ],
    "pricing": "Freemium",
    "icon": "MessageCircle",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "claude",
    "name": "Claude",
    "category": "ai-coding",
    "description": "An AI assistant from Anthropic that can reason through code, write and refactor across large files, and hold long technical conversations.",
    "officialUrl": "https://claude.ai",
    "tags": [
      "chatbot",
      "code-generation",
      "reasoning"
    ],
    "pricing": "Freemium",
    "icon": "Bot",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "gemini",
    "name": "Gemini",
    "category": "ai-coding",
    "description": "Google's AI assistant that answers coding questions, generates code, and integrates with Google's broader app ecosystem.",
    "officialUrl": "https://gemini.google.com",
    "tags": [
      "chatbot",
      "code-generation"
    ],
    "pricing": "Freemium",
    "icon": "Sparkles",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "github-copilot",
    "name": "GitHub Copilot",
    "category": "ai-coding",
    "description": "An AI pair-programmer built into popular editors that suggests code completions and can generate whole functions from a comment.",
    "officialUrl": "https://github.com/features/copilot",
    "tags": [
      "editor-plugin",
      "autocomplete",
      "code-generation"
    ],
    "pricing": "Freemium",
    "icon": "Code",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "cursor",
    "name": "Cursor",
    "category": "ai-coding",
    "description": "An AI-first code editor built on VS Code that can edit multiple files, answer questions about a codebase, and run terminal commands.",
    "officialUrl": "https://cursor.com",
    "tags": [
      "editor",
      "code-generation",
      "multi-file-edit"
    ],
    "pricing": "Freemium",
    "icon": "Terminal",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "windsurf",
    "name": "Windsurf",
    "category": "ai-coding",
    "description": "An AI-powered code editor with an agentic mode that can plan and carry out multi-step coding tasks across a project.",
    "officialUrl": "https://windsurf.com",
    "tags": [
      "editor",
      "code-generation",
      "agentic"
    ],
    "pricing": "Freemium",
    "icon": "Terminal",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "bolt",
    "name": "Bolt",
    "category": "ai-coding",
    "description": "Generates a working full-stack web app from a text prompt and lets you keep iterating on it directly in the browser.",
    "officialUrl": "https://bolt.new",
    "tags": [
      "app-builder",
      "code-generation",
      "prompt-to-app"
    ],
    "pricing": "Freemium",
    "icon": "Zap",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "lovable",
    "name": "Lovable",
    "category": "ai-coding",
    "description": "Turns a text prompt into a working app or web frontend, aimed at quickly prototyping and shipping products with AI-generated code.",
    "officialUrl": "https://lovable.dev",
    "tags": [
      "app-builder",
      "code-generation",
      "prompt-to-app"
    ],
    "pricing": "Freemium",
    "icon": "Sparkles",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "v0",
    "name": "v0",
    "category": "ai-coding",
    "description": "Vercel's AI tool that generates React/Next.js UI components and pages from a text prompt or design reference.",
    "officialUrl": "https://v0.app",
    "tags": [
      "ui-generation",
      "code-generation",
      "prompt-to-app"
    ],
    "pricing": "Freemium",
    "icon": "SquareCode",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "continue-dev",
    "name": "Continue.dev",
    "category": "ai-coding",
    "description": "An open customizable AI coding assistant that plugs into editors, letting teams wire up their own models and prompts for autocomplete and chat.",
    "officialUrl": "https://continue.dev",
    "tags": [
      "editor-plugin",
      "autocomplete",
      "customizable"
    ],
    "pricing": "Freemium",
    "icon": "Cpu",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "codeium",
    "name": "Codeium",
    "category": "ai-coding",
    "description": "An AI code completion and chat assistant available as a plugin for many popular editors and IDEs.",
    "officialUrl": "https://codeium.com",
    "tags": [
      "editor-plugin",
      "autocomplete",
      "code-generation"
    ],
    "pricing": "Freemium",
    "icon": "Bot",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "tabnine",
    "name": "Tabnine",
    "category": "ai-coding",
    "description": "An AI code completion tool focused on privacy and team customization, offering suggestions trained on permissively licensed code.",
    "officialUrl": "https://tabnine.com",
    "tags": [
      "editor-plugin",
      "autocomplete",
      "privacy"
    ],
    "pricing": "Freemium",
    "icon": "Cpu",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "grok",
    "name": "Grok",
    "category": "ai-coding",
    "description": "xAI's conversational AI assistant, with a code-capable model that can explain, write and debug code alongside general-purpose chat.",
    "officialUrl": "https://grok.com",
    "tags": ["chatbot", "code-generation", "xai"],
    "pricing": "Freemium",
    "icon": "Sparkles",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "replit",
    "name": "Replit",
    "category": "ai-coding",
    "description": "A browser-based coding environment with an AI Agent that can scaffold, edit and run a full project from a prompt, no local setup required.",
    "officialUrl": "https://replit.com",
    "tags": ["online-ide", "ai-agent", "hosting"],
    "pricing": "Freemium",
    "icon": "Terminal",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "amazon-q-developer",
    "name": "Amazon Q Developer",
    "category": "ai-coding",
    "description": "AWS's AI coding assistant (formerly CodeWhisperer) — inline code suggestions, chat, and automated code reviews inside your editor.",
    "officialUrl": "https://aws.amazon.com/q/developer",
    "tags": ["editor-plugin", "autocomplete", "aws"],
    "pricing": "Freemium",
    "icon": "Bot",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "jetbrains-ai-assistant",
    "name": "JetBrains AI Assistant",
    "category": "ai-coding",
    "description": "Built-in AI for JetBrains IDEs (IntelliJ, PyCharm, WebStorm and more) — code completion, chat, refactoring and commit-message generation.",
    "officialUrl": "https://www.jetbrains.com/ai",
    "tags": ["ide", "autocomplete", "refactoring"],
    "pricing": "Freemium",
    "icon": "Code",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "sourcegraph-cody",
    "name": "Cody (Sourcegraph)",
    "category": "ai-coding",
    "description": "An AI coding assistant that uses codebase-wide context to answer questions, write code and explain unfamiliar parts of a large repository.",
    "officialUrl": "https://sourcegraph.com/cody",
    "tags": ["codebase-context", "chat", "autocomplete"],
    "pricing": "Freemium",
    "icon": "SquareCode",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "devin",
    "name": "Devin",
    "category": "ai-coding",
    "description": "An autonomous AI software engineer from Cognition that can plan, write, test and iterate on multi-step coding tasks with less hand-holding.",
    "officialUrl": "https://cognition.ai",
    "tags": ["ai-agent", "autonomous", "software-engineer"],
    "pricing": "Paid",
    "icon": "Bot",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "cline",
    "name": "Cline",
    "category": "ai-coding",
    "description": "An open-source AI coding agent that runs inside VS Code, able to edit files, run terminal commands and use the browser to complete tasks.",
    "officialUrl": "https://cline.bot",
    "tags": ["vs-code", "ai-agent", "open-source"],
    "pricing": "Free",
    "openSource": true,
    "icon": "Terminal",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "mdn-web-docs",
    "name": "MDN Web Docs",
    "category": "learning",
    "description": "A comprehensive reference and guide for HTML, CSS, and JavaScript maintained collaboratively, widely used as the canonical web platform documentation.",
    "officialUrl": "https://developer.mozilla.org",
    "tags": [
      "reference",
      "documentation",
      "web-standards"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "BookOpen",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "freecodecamp",
    "name": "freeCodeCamp",
    "category": "learning",
    "description": "A self-paced curriculum of coding lessons and certifications covering web development, data structures, and more, with hands-on coding challenges.",
    "officialUrl": "https://www.freecodecamp.org",
    "tags": [
      "curriculum",
      "certification",
      "self-paced"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "GraduationCap",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "the-odin-project",
    "name": "The Odin Project",
    "category": "learning",
    "description": "A structured, project-based curriculum for learning full-stack web development, curating free resources and exercises into a guided path.",
    "officialUrl": "https://www.theodinproject.com",
    "tags": [
      "curriculum",
      "full-stack",
      "project-based"
    ],
    "pricing": "Free",
    "openSource": true,
    "icon": "Compass",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "roadmap-sh",
    "name": "roadmap.sh",
    "category": "learning",
    "description": "Community-built visual roadmaps that lay out the skills and steps to learn different developer roles and technologies.",
    "officialUrl": "https://roadmap.sh",
    "tags": [
      "roadmap",
      "career-guide",
      "reference"
    ],
    "pricing": "Free",
    "icon": "Map",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "w3schools",
    "name": "W3Schools",
    "category": "learning",
    "description": "A beginner-friendly reference site with short tutorials and interactive try-it-yourself editors for HTML, CSS, JavaScript, and more.",
    "officialUrl": "https://www.w3schools.com",
    "tags": [
      "reference",
      "tutorials",
      "beginner"
    ],
    "pricing": "Free",
    "icon": "Book",
    "addedOn": "2026-07-31"
  },
  {
    "slug": "unocss",
    "name": "UnoCSS",
    "category": "css-libraries",
    "description": "An instant, on-demand atomic CSS engine that generates only the utility classes your markup actually uses, with a Tailwind-compatible preset for easy migration.",
    "officialUrl": "https://unocss.dev",
    "tags": ["css", "atomic-css", "tailwind-alternative", "vite"],
    "pricing": "Free",
    "openSource": true,
    "badge": "Trending",
    "icon": "Zap",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "pico-css",
    "name": "Pico CSS",
    "category": "css-libraries",
    "description": "A classless CSS framework that styles semantic HTML directly, so a plain document looks presentable with zero utility classes or component markup.",
    "officialUrl": "https://picocss.com",
    "tags": ["css", "classless", "minimal", "semantic-html"],
    "pricing": "Free",
    "openSource": true,
    "icon": "Feather",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "foundation-css",
    "name": "Foundation",
    "category": "css-libraries",
    "description": "Zurb's responsive front-end framework with a grid system, prebuilt UI components, and Sass customization, aimed at production marketing sites and web apps.",
    "officialUrl": "https://get.foundation",
    "tags": ["css", "framework", "responsive", "grid"],
    "pricing": "Free",
    "openSource": true,
    "icon": "Layers",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "surge-sh",
    "name": "Surge",
    "category": "hosting",
    "description": "A single command-line tool that publishes a static site straight from your terminal, with custom domains and free SSL and no dashboard required.",
    "officialUrl": "https://surge.sh",
    "tags": ["static-hosting", "cli", "frontend"],
    "pricing": "Freemium",
    "icon": "Rocket",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "gitlab-pages",
    "name": "GitLab Pages",
    "category": "hosting",
    "description": "Free static site hosting built into GitLab, deployed straight from your repository's CI/CD pipeline alongside your existing GitLab workflow.",
    "officialUrl": "https://docs.gitlab.com/ee/user/project/pages/",
    "tags": ["static-hosting", "gitlab", "ci-cd"],
    "pricing": "Free",
    "icon": "Gitlab",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "neocities",
    "name": "Neocities",
    "category": "hosting",
    "description": "Free static web hosting built around the open, personal-homepage web — upload plain HTML/CSS/JS and get a live site with no build step or framework required.",
    "officialUrl": "https://neocities.org",
    "tags": ["static-hosting", "personal-site", "html"],
    "pricing": "Freemium",
    "icon": "Globe",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "thunder-client",
    "name": "Thunder Client",
    "category": "api-tools",
    "description": "A lightweight REST client built as a VS Code extension, so you can test API requests without ever leaving your editor.",
    "officialUrl": "https://www.thunderclient.com",
    "tags": ["api-client", "vs-code", "rest"],
    "pricing": "Freemium",
    "icon": "FlaskConical",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "bruno-api-client",
    "name": "Bruno",
    "category": "api-tools",
    "description": "An open-source, offline-first API client that stores collections as plain text files in your own repository instead of a vendor's cloud account.",
    "officialUrl": "https://www.usebruno.com",
    "tags": ["api-client", "open-source", "offline", "git-friendly"],
    "pricing": "Free",
    "openSource": true,
    "badge": "Trending",
    "icon": "Network",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "stoplight",
    "name": "Stoplight",
    "category": "api-tools",
    "description": "A visual OpenAPI design and documentation platform for building API specs collaboratively before you write a single line of backend code.",
    "officialUrl": "https://stoplight.io",
    "tags": ["openapi", "api-design", "documentation"],
    "pricing": "Freemium",
    "icon": "Compass",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "linode-akamai",
    "name": "Linode (Akamai)",
    "category": "cloud",
    "description": "A developer-focused cloud provider known for simple, predictably priced virtual machines, now operating as part of Akamai's cloud computing services.",
    "officialUrl": "https://www.linode.com",
    "tags": ["vps", "compute", "cloud"],
    "pricing": "Paid",
    "icon": "Server",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "oracle-cloud-infrastructure",
    "name": "Oracle Cloud Infrastructure",
    "category": "cloud",
    "description": "Oracle's cloud platform, notable for an Always Free tier that includes small compute instances and storage with no time limit on the free usage.",
    "officialUrl": "https://www.oracle.com/cloud/",
    "tags": ["cloud", "free-tier", "compute"],
    "pricing": "Freemium",
    "badge": "Popular",
    "icon": "Cloud",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "vultr",
    "name": "Vultr",
    "category": "cloud",
    "description": "A cloud compute provider offering hourly-billed virtual machines across a large number of global data center locations, popular for quick, low-cost test servers.",
    "officialUrl": "https://www.vultr.com",
    "tags": ["vps", "cloud", "compute"],
    "pricing": "Paid",
    "icon": "HardDrive",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "mozilla-observatory",
    "name": "Mozilla Observatory",
    "category": "security",
    "description": "A free website scanner that checks your HTTP security headers and TLS configuration against modern best practices, with a pass/fail breakdown for each check.",
    "officialUrl": "https://developer.mozilla.org/en-US/observatory",
    "tags": ["security-headers", "scanner", "tls"],
    "pricing": "Free",
    "icon": "Radar",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "burp-suite-community",
    "name": "Burp Suite Community Edition",
    "category": "security",
    "description": "An intercepting proxy and manual testing toolkit for inspecting and modifying HTTP traffic — the free tier widely used for learning web application security testing.",
    "officialUrl": "https://portswigger.net/burp/communitydownload",
    "tags": ["pentesting", "proxy", "web-security"],
    "pricing": "Freemium",
    "icon": "Bug",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "security-headers",
    "name": "Security Headers",
    "category": "security",
    "description": "A one-click scanner that grades a site's HTTP response headers (CSP, HSTS, X-Frame-Options and more) and explains exactly what's missing.",
    "officialUrl": "https://securityheaders.com",
    "tags": ["security-headers", "scanner", "csp"],
    "pricing": "Free",
    "icon": "ShieldCheck",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "gitkraken",
    "name": "GitKraken",
    "category": "version-control",
    "description": "A visual Git client with a graphical commit graph, a built-in merge conflict editor, and integrations for GitHub, GitLab and Bitbucket issues.",
    "officialUrl": "https://www.gitkraken.com",
    "tags": ["git-gui", "git-client", "desktop"],
    "pricing": "Freemium",
    "badge": "Popular",
    "icon": "GitFork",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "sourcetree",
    "name": "Sourcetree",
    "category": "version-control",
    "description": "Atlassian's free desktop Git client, with a visual commit history, interactive rebase, and native support for Git LFS and submodules.",
    "officialUrl": "https://www.sourcetreeapp.com",
    "tags": ["git-gui", "git-client", "atlassian"],
    "pricing": "Free",
    "icon": "FolderGit2",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "gitea",
    "name": "Gitea",
    "category": "version-control",
    "description": "A lightweight, self-hosted Git service you run on your own server, with a GitHub-like UI for issues, pull requests and CI actions.",
    "officialUrl": "https://about.gitea.com",
    "tags": ["self-hosted", "git-server", "open-source"],
    "pricing": "Free",
    "openSource": true,
    "icon": "Server",
    "addedOn": "2026-08-01"
  },
  {
    "slug": "python",
    "name": "Python",
    "category": "languages",
    "description": "A general-purpose, readable language widely used for backend web development, data science, automation and scripting.",
    "officialUrl": "https://www.python.org",
    "docsUrl": "https://docs.python.org/3/",
    "tags": ["backend", "scripting", "data-science", "general-purpose"],
    "pricing": "Free",
    "openSource": true,
    "badge": "Popular",
    "icon": "Code",
    "addedOn": "2026-08-06"
  },
  {
    "slug": "go",
    "name": "Go",
    "category": "languages",
    "description": "A statically typed, compiled language from Google built for simplicity and performance, popular for backend services and CLI tools.",
    "officialUrl": "https://go.dev",
    "docsUrl": "https://go.dev/doc/",
    "tags": ["backend", "compiled", "concurrency", "google"],
    "pricing": "Free",
    "openSource": true,
    "badge": "Trending",
    "icon": "Code2",
    "addedOn": "2026-08-06"
  },
  {
    "slug": "d3js",
    "name": "D3.js",
    "category": "charts",
    "description": "A low-level JavaScript library for binding data to the DOM and building fully custom, highly interactive data visualizations.",
    "officialUrl": "https://d3js.org",
    "docsUrl": "https://d3js.org/getting-started",
    "tags": ["data-viz", "svg", "custom-charts", "javascript"],
    "pricing": "Free",
    "openSource": true,
    "badge": "Popular",
    "icon": "ChartColumn",
    "addedOn": "2026-08-06"
  },
  {
    "slug": "radix-ui",
    "name": "Radix UI",
    "category": "ui-kits",
    "description": "Unstyled, accessible component primitives (dialogs, dropdowns, popovers and more) that other design systems, including shadcn/ui, are built on top of.",
    "officialUrl": "https://www.radix-ui.com",
    "docsUrl": "https://www.radix-ui.com/primitives/docs/overview/introduction",
    "tags": ["headless", "accessibility", "primitives", "unstyled"],
    "pricing": "Free",
    "openSource": true,
    "badge": "Popular",
    "icon": "Component",
    "addedOn": "2026-08-06"
  },
  {
    "slug": "pip",
    "name": "pip",
    "category": "package-managers",
    "description": "Python's standard package installer, used to install and manage libraries from the Python Package Index (PyPI).",
    "officialUrl": "https://pip.pypa.io",
    "tags": ["python", "pypi", "packages"],
    "pricing": "Free",
    "openSource": true,
    "icon": "Package",
    "addedOn": "2026-08-06"
  },
  {
    "slug": "cargo",
    "name": "Cargo",
    "category": "package-managers",
    "description": "Rust's official package manager and build tool, handling dependencies, compiling, testing and publishing crates.",
    "officialUrl": "https://doc.rust-lang.org/cargo/",
    "tags": ["rust", "build-tool", "crates"],
    "pricing": "Free",
    "openSource": true,
    "icon": "Package",
    "addedOn": "2026-08-06"
  },
  {
    "slug": "rive",
    "name": "Rive",
    "category": "animations",
    "description": "A real-time interactive animation tool and runtime — design animations in its editor, then run them natively in web, mobile or game apps.",
    "officialUrl": "https://rive.app",
    "docsUrl": "https://rive.app/docs",
    "tags": ["interactive", "runtime", "design-tool"],
    "pricing": "Freemium",
    "icon": "Film",
    "addedOn": "2026-08-06"
  },
  {
    "slug": "grafana",
    "name": "Grafana",
    "category": "monitoring",
    "description": "An open-source dashboarding and observability platform for visualizing metrics, logs and traces from almost any data source.",
    "officialUrl": "https://grafana.com",
    "docsUrl": "https://grafana.com/docs/",
    "tags": ["dashboards", "observability", "open-source", "metrics"],
    "pricing": "Freemium",
    "openSource": true,
    "badge": "Popular",
    "icon": "Activity",
    "addedOn": "2026-08-06"
  },
  {
    "slug": "cs50",
    "name": "CS50 (Harvard)",
    "category": "learning",
    "description": "Harvard's introductory computer science course, free online, covering programming fundamentals, algorithms and web development from first principles.",
    "officialUrl": "https://cs50.harvard.edu",
    "tags": ["course", "fundamentals", "university", "free-course"],
    "pricing": "Free",
    "badge": "Popular",
    "icon": "GraduationCap",
    "addedOn": "2026-08-06"
  },
  {
    "slug": "lucia-auth",
    "name": "Lucia",
    "category": "authentication",
    "description": "A lightweight, framework-agnostic reference for building your own session-based authentication, rather than a heavier auth-as-a-service platform.",
    "officialUrl": "https://lucia-auth.com",
    "tags": ["sessions", "lightweight", "diy-auth"],
    "pricing": "Free",
    "openSource": true,
    "icon": "KeyRound",
    "addedOn": "2026-08-06"
  },
  {
    "slug": "keycloak",
    "name": "Keycloak",
    "category": "authentication",
    "description": "An open-source identity and access management server with single sign-on, social login and standards-based protocols, self-hostable for full control over your auth stack.",
    "officialUrl": "https://www.keycloak.org",
    "docsUrl": "https://www.keycloak.org/documentation",
    "tags": ["sso", "iam", "self-hosted", "oidc", "saml"],
    "pricing": "Free",
    "openSource": true,
    "icon": "Key",
    "addedOn": "2026-08-20"
  },
  {
    "slug": "k6",
    "name": "k6",
    "category": "testing",
    "description": "A developer-centric load and performance testing tool, scripted in JavaScript, for finding out how an API or app behaves under real traffic before users do.",
    "officialUrl": "https://k6.io",
    "docsUrl": "https://grafana.com/docs/k6/latest/",
    "tags": ["load-testing", "performance", "api-testing", "open-source"],
    "pricing": "Freemium",
    "openSource": true,
    "icon": "Gauge",
    "addedOn": "2026-08-20"
  },
  {
    "slug": "datadog",
    "name": "Datadog",
    "category": "monitoring",
    "description": "A unified observability platform combining infrastructure metrics, log management, APM traces and real-user monitoring in one dashboard.",
    "officialUrl": "https://www.datadoghq.com",
    "docsUrl": "https://docs.datadoghq.com",
    "tags": ["observability", "apm", "infrastructure", "logs"],
    "pricing": "Freemium",
    "icon": "BarChart3",
    "addedOn": "2026-08-20"
  },
  {
    "slug": "open-props",
    "name": "Open Props",
    "category": "css-libraries",
    "description": "A set of ready-to-use, well-considered CSS custom properties — colors, easings, shadows, gradients — for styling without a full utility framework or build step.",
    "officialUrl": "https://open-props.style",
    "docsUrl": "https://open-props.style/#getting-started",
    "tags": ["css-variables", "design-tokens", "lightweight", "no-build"],
    "pricing": "Free",
    "openSource": true,
    "icon": "Paintbrush",
    "addedOn": "2026-08-20"
  },
  {
    "slug": "aws-amplify",
    "name": "AWS Amplify",
    "category": "deployment",
    "description": "A full-stack platform for building and deploying web/mobile apps on AWS, bundling hosting, CI/CD, auth and backend resources behind one CLI and console.",
    "officialUrl": "https://aws.amazon.com/amplify/",
    "docsUrl": "https://docs.amplify.aws",
    "tags": ["aws", "full-stack", "ci-cd", "hosting"],
    "pricing": "Freemium",
    "icon": "CloudCog",
    "addedOn": "2026-08-20"
  },
  {
    "slug": "payload-cms",
    "name": "Payload CMS",
    "category": "cms",
    "description": "A TypeScript-native, self-hostable headless CMS where content models, admin UI and API are all defined in code rather than a separate visual builder.",
    "officialUrl": "https://payloadcms.com",
    "docsUrl": "https://payloadcms.com/docs",
    "tags": ["headless-cms", "typescript", "self-hosted", "open-source"],
    "pricing": "Freemium",
    "openSource": true,
    "icon": "Layers",
    "addedOn": "2026-08-20"
  },
  {
    "slug": "daisyui",
    "name": "DaisyUI",
    "category": "ui-kits",
    "description": "A Tailwind CSS plugin that adds semantic component class names (btn, card, modal) with built-in themes, so you write markup instead of stacking utility classes for every component.",
    "officialUrl": "https://daisyui.com",
    "docsUrl": "https://daisyui.com/docs/install/",
    "tags": ["tailwind", "css-only", "themes", "components"],
    "pricing": "Freemium",
    "openSource": true,
    "icon": "LayoutGrid",
    "addedOn": "2026-08-27"
  },
  {
    "slug": "hostinger",
    "name": "Hostinger",
    "category": "hosting",
    "description": "A budget shared, WordPress and VPS hosting provider aimed at solo developers and small sites, with a free domain and SSL bundled into longer-term plans.",
    "officialUrl": "https://www.hostinger.com",
    "docsUrl": "https://www.hostinger.com/tutorials",
    "tags": ["shared-hosting", "vps", "wordpress", "budget"],
    "pricing": "Paid",
    "icon": "HardDrive",
    "addedOn": "2026-08-27"
  },
  {
    "slug": "auto-animate",
    "name": "AutoAnimate",
    "category": "animations",
    "description": "A zero-config animation utility you drop onto an existing parent element to get smooth add/remove/reorder transitions, without writing keyframes or wiring up a full animation library.",
    "officialUrl": "https://auto-animate.formkit.com",
    "docsUrl": "https://auto-animate.formkit.com/#usage",
    "tags": ["animation", "zero-config", "react", "vue"],
    "pricing": "Free",
    "openSource": true,
    "icon": "Sparkles",
    "addedOn": "2026-08-27"
  },
  {
    "slug": "visx",
    "name": "visx",
    "category": "charts",
    "description": "Airbnb's collection of low-level, unopinionated visualization primitives that combine D3's math with React's rendering, for teams that want full control over a custom chart rather than a pre-styled chart component.",
    "officialUrl": "https://airbnb.io/visx",
    "docsUrl": "https://airbnb.io/visx/docs",
    "tags": ["react", "d3", "data-visualization", "low-level"],
    "pricing": "Free",
    "openSource": true,
    "icon": "ChartColumn",
    "addedOn": "2026-08-27"
  },
  {
    "slug": "pulumi",
    "name": "Pulumi",
    "category": "devops",
    "description": "An infrastructure-as-code tool that lets you define cloud resources in a real programming language (TypeScript, Python, Go) instead of a domain-specific config format, with state management handled by Pulumi Cloud or your own backend.",
    "officialUrl": "https://www.pulumi.com",
    "docsUrl": "https://www.pulumi.com/docs",
    "tags": ["iac", "cloud", "typescript", "automation"],
    "pricing": "Freemium",
    "icon": "Workflow",
    "addedOn": "2026-08-27"
  },
  {
    "slug": "javascript-info",
    "name": "JavaScript.info",
    "category": "learning",
    "description": "A free, deeply detailed modern JavaScript tutorial that goes from language fundamentals through browser APIs, async patterns and more advanced topics, with runnable examples throughout.",
    "officialUrl": "https://javascript.info",
    "tags": ["javascript", "tutorial", "free", "fundamentals"],
    "pricing": "Free",
    "icon": "GraduationCap",
    "addedOn": "2026-08-27"
  }
];

export const allDevResources: DevResource[] = [...builtinDevTools, ...externalDevResources];

export function getDevResource(slug: string): DevResource | undefined {
  return allDevResources.find((r) => r.slug === slug);
}

export function resourcesByCategory(category: string): DevResource[] {
  return allDevResources.filter((r) => r.category === category);
}

export function searchDevResources(query: string, limit = 24): DevResource[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return allDevResources
    .filter((r) => [r.name, r.description, r.category, r.tags.join(" ")].join(" ").toLowerCase().includes(q))
    .slice(0, limit);
}

export function featuredDevResources(limit = 8): DevResource[] {
  const featured = allDevResources.filter((r) => r.badge === "Popular" || r.badge === "Trending");
  return (featured.length ? featured : allDevResources).slice(0, limit);
}

export function trendingDevResources(limit = 8): DevResource[] {
  return allDevResources.filter((r) => r.badge === "Trending").slice(0, limit);
}

export function recentlyAddedDevResources(limit = 8): DevResource[] {
  return [...allDevResources].sort((a, b) => (a.addedOn < b.addedOn ? 1 : -1)).slice(0, limit);
}

export function communityFavoriteDevResources(limit = 8): DevResource[] {
  return allDevResources.filter((r) => r.badge === "Popular").slice(0, limit);
}
