# BaseX UI

> This file extends `~/.claude/CLAUDE.md`. Global conventions (git, code style, engineering preferences, voice) apply unless overridden here.

## What This Is

An AI-first, accessible React component library built on Base UI and styled with StyleX. Ships 36 components with machine-readable manifests, an intelligence layer for intent-based component resolution, an MCP server for AI agent discovery, and a CLI for scaffolding. The monorepo includes a Vite docs site with URL routing, sidebar search, markdown guide pages, and live component demos.

## Stack

- Runtime: Node >= 20
- Package manager: pnpm 9.15.4 (strict, no hoisting)
- Monorepo: pnpm workspaces (`packages/*`, `apps/*`)
- Build: tsup (ESM only, dts generation)
- Framework: React 19, Base UI 1.2.0
- Styling: StyleX 0.17.5 (tokens, themes, sx prop override pattern)
- Color system: OKLCH palette generation
- Docs: Vite 6 + React 19 + React Router 7 + react-markdown + Shiki + Fuse.js
- Testing: Vitest 4
- CI: GitHub Actions (Node 20, frozen lockfile, build, test, lint, format)
- Deployment: Vercel (docs at apps/docs/dist)

## UI Stack (Enforced)

- Components: `@basex-ui/components` — import from `@basex-ui/components`
- Icons: `lucide-react` — import from `lucide-react`
- Styles: `@basex-ui/styles` — import themes (`lightTheme`, `darkTheme`), utilities (`focusRing`, `capitalize`)
- Tokens: `@basex-ui/tokens` — import design tokens, presets, OKLCH utilities
- Only use these libraries. Do not introduce others without asking.

## Monorepo Layout

```
packages/
  components/     36 styled Base UI wrappers with manifests
  styles/         lightTheme, darkTheme, focusRing, capitalize
  tokens/         StyleX design tokens, OKLCH color system, presets
  intelligence/   Intent resolution, anti-pattern detection, animation presets
  mcp-server/     MCP tools: list/search/resolve/get components and tokens
  cli/            init, add, theme, list commands

apps/
  docs/           Vite SPA — docs site + component demos (port 5173)
```

## Component Pattern

Each component lives in `packages/components/src/{name}/` with:

- `{name}.tsx` — Base UI wrapper + StyleX styling, forwardRef, sx prop
- `{name}.md` — User-facing markdown docs
- `manifest.json` — Machine-readable metadata (anatomy, parts, props, intents, anti-patterns, examples)
- `index.ts` — Barrel export

Compound component pattern with dot notation: `Accordion.Root`, `Accordion.Item`, `Accordion.Header`, `Accordion.Trigger`, `Accordion.Panel`.

## Docs Architecture

A single Vite SPA with React Router provides:

- `registry.ts` — single source of truth for all pages (components, guides, sections)
- `Sidebar.tsx` — search (Fuse.js), collapsible sections, active page highlighting
- `Markdown.tsx` — react-markdown + remark-gfm + Shiki syntax highlighting
- `ComponentDocPage.tsx` — renders import snippet + live demos + API reference markdown
- `GuidePage.tsx` — renders guide markdown from `src/content/`

Demo pages live in `apps/docs/src/pages/{Name}Page.tsx`. Each uses the `Preview` component with an optional `code` prop for View Code toggle.

Guide content lives in `apps/docs/src/content/` as `.md` files imported via `?raw`.

Component API docs are imported directly from `packages/components/src/{name}/{name}.md`.

Animation CSS is in `apps/docs/src/index.css`.

## Scripts

```
pnpm build          Build all packages and apps
pnpm dev            Dev all packages and apps in parallel
pnpm test           Vitest watch mode
pnpm test:ci        Vitest single run
pnpm lint           ESLint across packages/ and apps/
pnpm format         Prettier write
pnpm format:check   Prettier check (CI)
```

## Skills Policy (Always-On)

When working with Base UI, StyleX, or the MCP SDK, consult the relevant installed skill/docs before writing or changing code. Skills override model memory.

## Project-Specific Rules

- All demos and guide content live in `apps/docs/`.
- Every component needs a manifest.json for AI discoverability.
- StyleX sx prop is always the last prop applied (deterministic override).
- Base UI handles accessibility; we handle styling and composition.
- OKLCH for all color work. No hex/rgb in tokens.

## Non-Goals

- Server-side components (everything is client-rendered)
- CSS-in-JS alternatives (StyleX is the only styling solution)
- Non-React framework support

## Known Risks

- Portal-based components (dialog, drawer, popover, combobox) need theme tokens on `<html>` to render correctly (solved via useEffect theme sync in App.tsx)
- Shiki bundles all language grammars, making the production build large (~1MB main chunk). Could be optimized with dynamic imports or a reduced language set.
