# BaseX UI — Project Plan

## Status

**Current phase:** Build
**Next task:** CLI expansion — expand `add` to all 36 components

---

## Active Sprint: CLI Expansion

**Goal:** `basex-ui add <component>` works for all 36 components, not just `button` and `accordion`.
**Source:** `docs/plans/2026-04-27-v0.1-oss-release-plan.md` P2 #6.

### The problem

`packages/cli/src/commands/add.ts` has two issues at scale:

1. **Hardcoded registry** — `COMPONENTS` only lists `button` and `accordion`.
2. **Inline string templates** — `getButtonSource()` / `getAccordionSource()` embed source as giant template literals. This doesn't scale to 36 components and drifts from the real source.

### Architecture decision

**Bundle real component files at build time.** During the CLI's `tsup` build, run a prebuild script that copies each component's files from `packages/components/src/{name}/` into `packages/cli/templates/{name}/`. At runtime, `add` reads from the bundled templates.

- `packages/cli/package.json` already lists `"templates"` in `files`, so npm publish picks them up automatically.
- Runtime reads a static file from a known path — no network, no dynamic import, no tarball extraction.
- Source drift is impossible — templates ARE the component source.

### Tasks

- [x] **1. Write the prebuild script** — `packages/cli/scripts/bundle-templates.ts` _(2026-04-28)_
- [x] **2. Rewrite `scaffoldComponent`** — generic file-copy from templates, cssRequirements note printed _(2026-04-28)_
- [x] **3. Expand the COMPONENTS registry** — all 36 components, 13 portal components flagged _(2026-04-28)_
- [x] **4. Wire `updateIntents` and `updateLlmsTxt`** — both stubs now functional _(2026-04-28)_
- [x] **5. Update integration tests** — 329 tests passing, all 36 templates covered _(2026-04-28)_
- [x] **6. Verify and ship** — build + typecheck + test:ci + lint all green _(2026-04-28)_

### Constraints

- Do not duplicate source. Templates are copied, not re-written.
- Do not change any component source files during this sprint — read-only from `packages/components/src/`.
- Do not expand `init` or `theme` in this sprint. `add` only.
- If a component's source imports from sibling components (e.g. a composite), note it in the CLI output but do not try to auto-resolve transitive deps.

### Done definition

- `basex-ui add <any-of-36-components>` scaffolds the correct files into `src/components/ui/{name}/`
- Portal components print a theme-sync note
- Components with `cssRequirements` in manifest print the CSS block
- `pnpm build && pnpm test:ci && pnpm lint` green
- Integration tests cover all 36 component templates
- PR merged to main

---

## Backlog

### Near-term (v0.2 / v0.3)

- **Docs bundle size <500KB gzipped** — currently 372KB gzipped dominated by Shiki bundling every grammar. Lazy-load or swap to Starry Night.
- **Visual regression baseline** — Chromatic or Percy in CI, snapshot every component × variant × state.
- **Example integrations** — `examples/nextjs/`, `examples/remix/`, `examples/vite-react/`
- **Animation guide** — doc page connecting `@basex-ui/intelligence` animation presets to component usage.

### v1.0

- **Type-level docs** — TSDoc on every public prop.
- **Migration guides** — from shadcn/ui, Radix, Headless UI.
- **Theme studio** — interactive token editor in docs → exports custom theme file.
- **AI agent quickstart** — end-to-end MCP server walkthrough.
- **Performance budget** — per-component bundle size tracked in CI.

### Dave-only (npm dashboard required)

- Deprecate orphan `@basex-ui/mcp-server@0.2.0` on npm
- Set up Trusted Publishing (OIDC) for all 6 packages, remove `NPM_TOKEN`
- Rotate npm token
