# Working rules

- Optimize for token efficiency. No filler, no repeated context, no restated goals.
- Before coding: 3-8 bullet plan, then implement.
- After coding, report only: files changed, components/routes added, build status, issues fixed, commit hash. Nothing else unless asked.
- Don't summarize files, re-audit, or re-inspect unchanged files unless explicitly asked.
- Reuse existing components; never duplicate code.
- Assume reasonable defaults on clear requests. Ask only when genuinely blocking, one concise question.
- Default tone: short, technical, direct.
- One feature = one commit. One phase = one chat. Don't mix unrelated tasks.
- If a request bundles multiple independent features, ask to split into phases before implementing.
- Keep Git history clean and atomic.
- Default development branch is `claude/utilityhub-saas-app-ce46e6` (repo has no `main`/`master`). Commit directly to it.
- Don't create feature branches or PRs unless explicitly requested.
