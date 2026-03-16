# BaseX UI

> This file extends `~/.claude/CLAUDE.md`. Global conventions (git, code style, engineering preferences, voice) apply unless overridden here.

## What This Is

An AI-first, accessible React component library built on Base UI and styled with StyleX. Ships 24+ components with machine-readable manifests, an intelligence layer for intent-based component resolution, an MCP server for AI agent discovery, and a CLI for scaffolding. The monorepo includes a Vite playground for dev testing and a Fumadocs/Next.js documentation site.

## Stack

- Runtime: Node >= 20
- Package manager: pnpm 9.15.4 (strict, no hoisting)
- Monorepo: pnpm workspaces (`packages/*`, `apps/*`)
- Build: tsup (ESM only, dts generation)
- Framework: React 19, Base UI 1.2.0
- Styling: StyleX 0.17.5 (tokens, themes, sx prop override pattern)
- Color system: OKLCH palette generation
- Docs: Next.js 15.3 + Fumadocs 15 + Tailwind 4.2 + next-themes
- Playground: Vite 6 + React 19
- Testing: Vitest 4
- CI: GitHub Actions (Node 20, frozen lockfile, build, test, lint, format)
- Deployment: Vercel (playground at apps/playground/dist)

## UI Stack (Enforced)

- Components: `@basex-ui/components` — import from `@basex-ui/components`
- Icons: `lucide-react` — import from `lucide-react`
- Styles: `@basex-ui/styles` — import themes (`lightTheme`, `darkTheme`), utilities (`focusRing`, `capitalize`)
- Tokens: `@basex-ui/tokens` — import design tokens, presets, OKLCH utilities
- Only use these libraries. Do not introduce others without asking.

## Monorepo Layout

```
packages/
  components/     24+ styled Base UI wrappers with manifests
  styles/         lightTheme, darkTheme, focusRing, capitalize
  tokens/         StyleX design tokens, OKLCH color system, presets
  intelligence/   Intent resolution, anti-pattern detection, animation presets
  mcp-server/     MCP tools: list/search/resolve/get components and tokens
  cli/            init, add, theme, list commands

apps/
  playground/     Vite SPA — dev sandbox, component demos (port 5173)
  docs/           Next.js + Fumadocs — documentation site (port 3001)
```

## Component Pattern

Each component lives in `packages/components/src/{name}/` with:
- `{name}.tsx` — Base UI wrapper + StyleX styling, forwardRef, sx prop
- `{name}.md` — User-facing markdown docs
- `manifest.json` — Machine-readable metadata (anatomy, parts, props, intents, anti-patterns, examples)
- `index.ts` — Barrel export

Compound component pattern with dot notation: `Accordion.Root`, `Accordion.Item`, `Accordion.Header`, `Accordion.Trigger`, `Accordion.Panel`.

## Docs App Pattern

Demo files live in `apps/docs/components/demos/{name}-demo.tsx`. Each exports named demo functions that use the shared `Preview` component from `@/components/preview`. No per-demo theme handling — theme tokens are applied globally via `BaseXThemeSync` on `<html>`.

Animation CSS for all components is in `apps/docs/app/basex-animations.css` (keep in sync with `apps/playground/src/index.css`).

MDX content is in `apps/docs/content/docs/components/{name}.mdx`.

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

When working with Base UI, StyleX, Fumadocs, or the MCP SDK, consult the relevant installed skill/docs before writing or changing code. Skills override model memory.

## Project-Specific Rules

- Playground is the source of truth for component demos. Docs demos must match playground exactly.
- Every component needs a manifest.json for AI discoverability.
- StyleX sx prop is always the last prop applied (deterministic override).
- Base UI handles accessibility; we handle styling and composition.
- OKLCH for all color work. No hex/rgb in tokens.

## Non-Goals

- Server-side components (everything is client-rendered)
- CSS-in-JS alternatives (StyleX is the only styling solution)
- Non-React framework support

## Known Risks

- StyleX unplugin compatibility with Next.js can be fragile across versions
- Portal-based components (dialog, drawer, popover, combobox) need theme tokens on `<html>` to render correctly in docs (solved via BaseXThemeSync)
- Animation CSS is duplicated between playground and docs (single source would be better long-term)
