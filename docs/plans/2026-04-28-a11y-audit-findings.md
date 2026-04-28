# Accessibility & Quality Audit — Findings

**Date:** 2026-04-28
**Pass:** P1 + P2 quality pass (`docs/plans/2026-04-28-p1-p2-quality-pass.md`)
**Method:** Static audit (axe-core installed but not run via in-test infra
this pass — RTL/jsdom infra is P3). Source-level grep for known
bad-pattern signatures; `axe-core` and `@axe-core/react` installed for
future browser-side use.

---

## Accent color audit (closed in this pass)

Searched for `colorPrimary*` references in component source.

| Component       | Result                                                                                                                                                                                                                                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accordion       | clean                                                                                                                                                                                                                                                                                                               |
| alert-dialog    | clean (added scroll-exception comment on viewport)                                                                                                                                                                                                                                                                  |
| autocomplete    | clean (decorative `<X>` got `aria-hidden`; List scroll documented)                                                                                                                                                                                                                                                  |
| avatar          | clean                                                                                                                                                                                                                                                                                                               |
| button          | **allowed** — `variant='solid' color='default'` is the canonical accent CTA                                                                                                                                                                                                                                         |
| checkbox        | clean (selected fill already `colorText`; decorative icons aria-hidden)                                                                                                                                                                                                                                             |
| checkbox-group  | clean                                                                                                                                                                                                                                                                                                               |
| collapsible     | clean (chevron icon aria-hidden)                                                                                                                                                                                                                                                                                    |
| combobox        | **fixed** — `itemIndicator color: colorPrimary` removed (inherits parent currentColor); decorative icons aria-hidden; List scroll documented                                                                                                                                                                        |
| context-menu    | clean (new component; indicator colors removed at write time)                                                                                                                                                                                                                                                       |
| dialog          | clean (close icon aria-hidden; viewport + panel scroll documented)                                                                                                                                                                                                                                                  |
| drawer          | clean (close icon aria-hidden; viewport + panel scroll documented)                                                                                                                                                                                                                                                  |
| field           | clean                                                                                                                                                                                                                                                                                                               |
| fieldset        | clean                                                                                                                                                                                                                                                                                                               |
| form            | clean                                                                                                                                                                                                                                                                                                               |
| input           | clean                                                                                                                                                                                                                                                                                                               |
| menu            | **fixed** — `checkboxItemIndicator` and `radioItemIndicator` `color: colorPrimary` removed (inherits parent currentColor)                                                                                                                                                                                           |
| menubar         | clean                                                                                                                                                                                                                                                                                                               |
| meter           | **fixed** — `indicator backgroundColor: colorPrimary` → `colorText`                                                                                                                                                                                                                                                 |
| navigation-menu | clean (chevron icon aria-hidden; content scroll documented)                                                                                                                                                                                                                                                         |
| number-field    | clean                                                                                                                                                                                                                                                                                                               |
| popover         | clean                                                                                                                                                                                                                                                                                                               |
| preview-card    | **exception (flagged)** — `Trigger color: colorPrimary` is a link-color usage. Not a selection state, but doesn't fit any of the three sanctioned accent uses in DESIGN.md. Recommend design review: keep as link convention OR convert to `colorText` with hover underline (matches Linear/Notion link treatment). |
| progress        | **fixed** — `indicator backgroundColor: colorPrimary` → `colorText`                                                                                                                                                                                                                                                 |
| radio           | clean (rootChecked already `colorText`)                                                                                                                                                                                                                                                                             |
| scroll-area     | clean                                                                                                                                                                                                                                                                                                               |
| select          | **fixed** — `itemIndicator color: colorPrimary` removed; decorative icons already aria-hidden; List scroll documented                                                                                                                                                                                               |
| separator       | clean                                                                                                                                                                                                                                                                                                               |
| slider          | **fixed** — `indicator backgroundColor` and `thumb backgroundColor` `colorPrimary` → `colorText`; updated explanatory comment                                                                                                                                                                                       |
| switch          | clean (checked fill already `colorText`)                                                                                                                                                                                                                                                                            |
| tabs            | clean (`tabActive` already `colorText`/`colorTextInverse`)                                                                                                                                                                                                                                                          |
| toast           | clean                                                                                                                                                                                                                                                                                                               |
| toggle          | clean (pressed already `colorText`/`colorTextInverse`)                                                                                                                                                                                                                                                              |
| toggle-group    | clean (itemPressed already `colorText`/`colorTextInverse`)                                                                                                                                                                                                                                                          |
| toolbar         | clean (itemPressed already `colorText`/`colorTextInverse`) — separately, removed scale-on-`:active` transform per ToggleItem uniform-width fix                                                                                                                                                                      |
| tooltip         | clean                                                                                                                                                                                                                                                                                                               |

**Net result:** zero `colorPrimary*` selection-state references remain across
35 + 1 (Context Menu) components. The only remaining usages are:

1. `button.tsx` — solid default Button (the sanctioned CTA pattern)
2. `preview-card.tsx` — Trigger link color (flagged exception, see above)
3. `toolbar.tsx` — comment only

---

## Scrollbar consistency audit (closed in this pass)

Sidebar: **wrapped in `ScrollArea.Root + Viewport + Scrollbar + Thumb`** —
the most-visible scroller in the docs site is now branded. Layout
restructured to keep `<nav>` as the outer positioning shell (sticky desktop
/ fixed mobile drawer) with ScrollArea inside.

Components — exception clauses documented inline in source:

| Surface                               | Decision                                                                                                                                                                                                                                           |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Select.List` overflow                | Native — Base UI listbox manages own focus + arrow-key scroll                                                                                                                                                                                      |
| `Combobox.List` overflow              | Native — same reason                                                                                                                                                                                                                               |
| `Autocomplete.List` overflow          | Native — same reason                                                                                                                                                                                                                               |
| `NavigationMenu.Content` overflow     | Native — Base UI primitive manages focus                                                                                                                                                                                                           |
| `Dialog.viewport` (backdrop) overflow | Native — fixed centered overlay; ScrollArea would break centering                                                                                                                                                                                  |
| `Dialog.panel` overflow               | Native — Panel relies on its own scroll event + ResizeObserver to set `data-scroll-top/-bottom` for sticky shadow effects. **Tracked as follow-up:** refactor Panel onto ScrollArea with a viewport ref so the scroll-state attributes still work. |
| `AlertDialog.viewport` overflow       | Native — same reason as Dialog                                                                                                                                                                                                                     |
| `Drawer.viewport` overflow            | Native — fixed full-screen with directional alignment                                                                                                                                                                                              |
| `Drawer.panel` overflow               | Native — same reason as Dialog.panel; same follow-up                                                                                                                                                                                               |
| `ScrollArea` itself                   | This _is_ the wrapper                                                                                                                                                                                                                              |

Docs site horizontal scroll:

| Surface                                                         | Decision                                                                                                                            |
| --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `Markdown` code blocks (`overflowX: auto`)                      | Leave native — inline code blocks; horizontal browser scrollbar is the established convention; ScrollArea here would over-engineer. |
| `Preview`, `CodeToggle`, `ComponentDocPage` (`overflowX: auto`) | Same reason.                                                                                                                        |
| `App.tsx` main (`overflowY: auto`)                              | Page-level scroll; document scroll is fine.                                                                                         |

---

## Easy wins applied

- `aria-hidden="true"` added to decorative icons inside aria-labelled chrome:
  - `Dialog`, `Drawer` close `<X>` icons
  - `Accordion`, `Collapsible`, `NavigationMenu` chevron icons
  - `Checkbox` check + minus icons
  - `Combobox` chevron, clear-X, item-check, item-X icons
  - `Autocomplete` clear-X icon
- `aria-hidden="true"` added to docs-site decorative SVGs: hamburger menu,
  GitHub logo, mobile/desktop logo marks (`App.tsx`, `Sidebar.tsx`)
- `Select` already had `aria-hidden` on its decorative chevrons + check —
  pattern was started but inconsistently applied; this pass extends it.
- `Toast` already had `aria-hidden` on its `<X>` close icon.

## Items deferred to P3 a11y sprint

These require either design judgment per component or RTL/jsdom test
infrastructure to validate. Tracked here so they don't get lost.

### 1. Opacity-based disabled states

15 components currently use `opacity: 0.64` for disabled visuals
(autocomplete, menubar, accordion, checkbox, toolbar (×2), toggle-group,
combobox, context-menu, toggle, collapsible, fieldset, menu, button, switch).
DESIGN.md disallows opacity for disabled (low contrast against most surfaces;
compounds when nested). The replacement is per-component:

- color → `colorTextMuted`
- borderColor → `colorBorderMuted`
- backgroundColor → `colorMuted` where filled

Doing this correctly requires looking at each component disabled in light +
dark mode and choosing the right tokens — not a single grep+replace. Punted
to P3 to give it a coherent design pass.

### 2. Form components: aria-describedby wiring

`Field.Description` and `Field.Error` are present but the audit didn't
verify their IDs are wired to the input via `aria-describedby` in every
demo path. Needs RTL+axe in a real DOM to verify; punted.

### 3. Focus management in compound primitives

Dialog/Drawer/Popover focus trap behavior is delegated to Base UI but a
real axe-core run in the dev server would surface any regressions caused by
StyleX styling overlays (e.g., focus ring not visible on certain bg
contrasts). Punted to a browser-driven a11y pass.

### 4. Color contrast spot checks

`colorTextMuted` against `colorMuted` in disabled states — likely fine
(both light tokens), but a contrast audit per theme is not done. Punted.

### 5. axe-core in tests

`axe-core` and `@axe-core/react` are installed but not wired into the
component test suites. Test infra rework (RTL + jsdom env in
`packages/components`) is a separate sprint per the v0.1 release plan's P3
section.

### 6. PreviewCard.Trigger link color

See Accent audit table above. One-line design call — keep accent (link
convention) or move to `colorText` (DESIGN.md strictness). Defer to design
review.

---

## Out of scope for this audit

- CLI expansion (deferred — needs architectural pass)
- Visual regression / Theme Studio / npm housekeeping (separate sprints)
- RTL test infrastructure (P3)
