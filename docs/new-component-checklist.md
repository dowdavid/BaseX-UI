# New Component Checklist

Every new BaseX UI component must complete ALL of the following steps. This ensures agents can discover, recommend, and correctly use every component.

The template files live in `packages/components/src/_template/`.

---

## 1. Component Code

**Directory**: `packages/components/src/{name}/`

- [ ] `{name}.tsx` — Component implementation
  - StyleX for **static styles only** (font, color, padding, border, cursor, flex)
  - Global CSS for **animated properties** (height, transform, opacity driven by Base UI data attributes)
  - `keepMounted` on any part that needs close animation
  - Stable CSS class `basex-{name}-{part}` on parts targeted by global CSS
  - `sx` prop on **every** part for consumer overrides
  - `forwardRef` on every part
- [ ] `index.ts` — Barrel export of component + all prop types

## 2. Manifest (Agent Intelligence)

**File**: `packages/components/src/{name}/manifest.json`

Copy from `_template/manifest.json` and fill in:

- [ ] `name`, `description`, `category`, `baseComponent`
- [ ] `anatomy` — JSX tree showing part composition
- [ ] `parts` — Per-part object with `element`, `description`, `props` (with types, defaults, required flags), `dataAttributes`, `cssVariables`
- [ ] `cssRequirements` — Global CSS rules needed (or `null` if none)
- [ ] `tokens` — List of all design tokens the component uses
- [ ] `intents` — 2-5 intents with `intent`, `signals` (keywords agents match on), `reasoning`, `composition` (JSX blueprint)
- [ ] `avoidWhen` — 2-4 anti-patterns with `scenario`, `reasoning`, `alternative`
- [ ] `examples` — 3+ usage examples with `name`, `description`, `code`

## 3. Documentation

**File**: `packages/components/src/{name}/{name}.md`

Copy from `_template/component.md` and fill in:

- [ ] Anatomy section
- [ ] Examples section
- [ ] CSS Requirements section (if applicable)
- [ ] Per-part API Reference (Props table + Data attributes table + CSS Variables table per part)
- [ ] When to Use / When NOT to Use

## 4. Global CSS (if component has animations)

**File**: Consumer's global stylesheet (demonstrated in `apps/playground/src/index.css`)

- [ ] Animation rules inside `@layer priority1 { ... }`
- [ ] Stable CSS class `.basex-{name}-{part}` as selector
- [ ] `[data-starting-style]` / `[data-ending-style]` for open/close
- [ ] Uses animation preset values (never invent new duration/easing):
  - State: 100ms ease-out
  - Expand: 200ms ease-in-out
  - Move: 200ms ease-in-out
  - Enter: 200ms ease-out
  - Exit: 100ms ease-out

## 5. Intelligence Integration

**File**: `packages/intelligence/intents.json`

- [ ] Add all `intents` from the manifest to the `intents` array (with `component` field added)
- [ ] Add all `avoidWhen` from the manifest to the `antiPatterns` array (with `component` field added)

## 6. MCP Server Registration

**File**: `packages/mcp-server/src/data.ts`

- [ ] Add manifest import: `import {name}Manifest from '../../components/src/{name}/manifest.json';`
- [ ] Add to `ComponentManifest` union type
- [ ] Add to `components` Map: `['{name}', {name}Manifest]`
- [ ] Add animation preset mapping in `getComponentSetup()` → `presetMap`

**File**: `packages/mcp-server/tsconfig.json`

- [ ] Add to `include`: `"../components/src/{name}/manifest.json"`

## 7. Package Exports

**File**: `packages/components/src/index.ts`

- [ ] Export component and all prop types from barrel

**File**: `packages/components/package.json`

- [ ] Add subpath export: `./{name}` → `dist/{name}/index.js` + types

**File**: `packages/components/tsup.config.ts`

- [ ] Add entry: `src/{name}/index.ts`

## 8. Playground Demo

**File**: `apps/playground/src/App.tsx`

- [ ] Add import
- [ ] Add demo section showing basic usage + key variations
- [ ] Add any required global CSS to `apps/playground/src/index.css`

## 9. Verification

After all files are in place:

- [ ] `pnpm build` passes across all packages
- [ ] `pnpm typecheck` passes (if available)
- [ ] Playground demo renders correctly
- [ ] MCP server serves the component via `list_components`, `get_component`, `get_component_setup`
- [ ] `resolve_intent` returns the component for at least one intent signal
- [ ] `check_usage` catches at least one anti-pattern

---

## Quick Reference: File Touchpoints

| Step | File(s) |
|------|---------|
| Component | `packages/components/src/{name}/{name}.tsx`, `index.ts` |
| Manifest | `packages/components/src/{name}/manifest.json` |
| Docs | `packages/components/src/{name}/{name}.md` |
| Global CSS | `apps/playground/src/index.css` (demo) |
| Intents | `packages/intelligence/intents.json` |
| MCP data | `packages/mcp-server/src/data.ts` |
| MCP tsconfig | `packages/mcp-server/tsconfig.json` |
| Barrel | `packages/components/src/index.ts` |
| Package exports | `packages/components/package.json` |
| Build entry | `packages/components/tsup.config.ts` |
| Playground | `apps/playground/src/App.tsx` |
