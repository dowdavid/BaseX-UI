# Playground as Docs Site

**Date:** 2026-03-16
**Status:** Approved

## What This Is

Replace the Fumadocs/Next.js docs site (`apps/docs/`) with an enhanced version of the existing Vite playground. The playground becomes the canonical documentation site for BaseX UI. StyleX works natively, zero hacks.

## Why

The StyleX + Next.js integration is fundamentally broken. The webpack timing mismatch between StyleX's `PROCESS_ASSETS_STAGE_SUMMARIZE` hook and Next.js's late CSS asset creation required a custom `StyleXCSSBridge` plugin. Even with the bridge, webpack caching causes styles to disappear across restarts. The playground renders everything correctly by default because Vite + StyleX just works.

Maintaining two apps (playground for dev, docs for users) that show the same components with the same demos is duplicate work. The playground IS the docs.

## Design

### Architecture

Single Vite SPA with React Router. No SSR, no webpack, no Tailwind.

```
┌─────────────────────────────────────────────────┐
│  Sidebar          │  Main Content               │
│  ┌─────────────┐  │  ┌───────────────────────┐  │
│  │ Search [  ] │  │  │ Component Title       │  │
│  ├─────────────┤  │  │ Description            │  │
│  │ About       │  │  ├───────────────────────┤  │
│  │ Getting     │  │  │ Import snippet        │  │
│  │  Started    │  │  │ Live Demo + View Code │  │
│  │ Components ▾│  │  │ Props Table           │  │
│  │  Accordion  │  │  │ Parts / Anatomy       │  │
│  │  Button     │  │  │ Data Attributes       │  │
│  │  ...        │  │  │ CSS Requirements      │  │
│  │ Intelligence│  │  └───────────────────────┘  │
│  │ MCP Server  │  │                             │
│  │ CLI         │  │                             │
│  └─────────────┘  │                             │
└─────────────────────────────────────────────────┘
```

### Routes

```
/                        → About (project vision)
/getting-started         → Getting Started guide
/components/accordion    → Accordion docs + demos
/components/button       → Button docs + demos
/components/...          → 24 component pages
/intelligence            → Intelligence overview
/intelligence/intent-resolution
/intelligence/anti-patterns
/intelligence/animation-system
/mcp-server              → MCP Server overview
/mcp-server/discovery-tools
/mcp-server/intent-tools
/mcp-server/setup-tools
/cli                     → CLI docs
```

### Sidebar

Grouped sections with collapsible component list. Search input at the top filters all pages by name and description. Active page highlighted. Mobile hamburger menu (already exists).

### Component Pages

Three zones per page:

1. **Header** — Component name, description, import snippet
2. **Demos** — Live interactive demos (existing playground pages), each with a "View Code" toggle that reveals syntax-highlighted JSX
3. **Reference** — Rendered from the package `.md` file (anatomy, props tables, data attributes, CSS requirements)

### Guide Pages

Pure markdown rendered with react-markdown. No demos. Covers About, Getting Started, Intelligence, MCP Server, CLI. Content sourced from `src/content/` directory.

### Code Preview

Each demo section has a "View Code" toggle. Code strings stored alongside demo components as raw string exports. Syntax highlighted with Shiki at build time.

### Search

Fuse.js client-side fuzzy search over page names, descriptions, and headings. Sidebar filter input.

## Tech Stack

### New dependencies
- `react-router` v7 — URL routing, SPA fallback
- `react-markdown` + `remark-gfm` — Markdown to React (tables, strikethrough)
- `shiki` — Syntax highlighting (build time via Vite plugin)
- `fuse.js` — Client-side fuzzy search

### Kept
- Vite 6
- React 19
- StyleX 0.17.5
- @stylexjs/unplugin 0.17.5
- lucide-react
- @basex-ui/components, tokens, styles

### Removed (with apps/docs/)
- next, fumadocs-core, fumadocs-mdx, fumadocs-ui
- tailwindcss, postcss
- next-themes
- StyleXCSSBridge webpack hack

## Content Sources

| Content | Source | Location |
|---------|--------|----------|
| Component demos | Existing playground pages | `src/pages/` |
| Component API docs | Package markdown files | `packages/components/src/{name}/{name}.md` |
| About | New content (user writes) | `src/content/about.md` |
| Getting Started | Port from docs MDX | `src/content/getting-started.md` |
| Intelligence | Port from docs MDX | `src/content/intelligence/` |
| MCP Server | Port from docs MDX | `src/content/mcp-server/` |
| CLI | Port from docs MDX | `src/content/cli.md` |

## What Gets Deleted

The entire `apps/docs/` directory (~50 files):
- next.config.mjs (StyleXCSSBridge)
- Fumadocs configuration
- Tailwind + PostCSS configuration
- 33 demo files (replaced by playground pages)
- 24 MDX files (replaced by package .md files)
- basex-theme-sync.tsx (already in playground via useEffect)
- Shared preview component (already in playground)

## Non-Goals

- SSR/SSG (component library docs don't need SEO)
- MDX (plain markdown covers everything needed)
- Tailwind (StyleX handles all styling)
- Auto-generated API docs from TypeScript types (package .md files are manually maintained and richer)

## Success Criteria

- Every component page shows live demos + full API reference
- All guide content (Getting Started, Intelligence, MCP, CLI) is accessible
- URL routing with shareable deep links
- Sidebar search works across all pages
- Code preview toggle on every demo
- Dark/light theme switching
- Mobile responsive
- Clean, sharp design with good typography and whitespace
- Deploys to same URL as current docs site
