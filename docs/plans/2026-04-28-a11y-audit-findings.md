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

## Theme contrast audit (added 2026-04-28, P3 follow-up)

After the categorical pass landed, Dave asked for a real OKLCH-math
contrast sweep on **both themes**. Static audits (no browser; deltas are
computed against base/dark theme overrides in
`packages/styles/src/themes.stylex.ts` and
`packages/tokens/src/tokens.stylex.ts`). Borderline items tagged "needs
visual confirmation in dev server". Token-level fixes consolidate to a
short list — see "Proposed token surgery" at the bottom.

### Dark-mode findings

#### P0 — must fix before ship

- **switch** (`switch/switch.tsx:40-46`): unchecked `Switch.Thumb`
  uses `colorTextInverse` (dark L=0.15) on track `colorBorder` (dark
  L=0.35) → delta 0.20, fails 3:1 for non-text UI. Thumb reads darker
  than track — visually inverted vs intent. Fix: thumb `colorText`
  when not checked, OR introduce a `colorThumb` token that flips per
  theme.
- **menu / menubar / context-menu destructive item** (`menu/menu.tsx:91-100`,
  `menubar/menubar.tsx`, `context-menu/context-menu.tsx`):
  `itemDestructive color: colorDestructive` (dark L=0.65) on transparent
  (resolves to `colorSurface` dark L=0.20) → ~3.5:1, **fails AA 4.5:1
  for normal text**. Fix: add a `colorDestructiveText` token tuned for
  fg-on-surface in both themes, OR override `colorDestructive` in dark
  to L ≥0.78.
- **button outlineDestructive / ghostDestructive** (`button/button.tsx:97-123`):
  same root cause — `color: colorDestructive` on transparent fails AA
  in dark. Same token-level fix.

#### P1 — should fix soon

- **slider / progress / meter empty track**: `colorMuted` (dark L=0.25)
  on `colorSurface` (dark L=0.20), delta 0.05 — empty track effectively
  invisible. Fix: introduce `colorTrack` token (~L=0.30 dark, ~L=0.93
  light).
- **separator + popover/tooltip/preview-card borders**:
  `colorBorderMuted` (dark L=0.28) on `colorSurfaceRaised` (dark L=0.24)
  delta 0.04 — borders dissolve from inside. Fix: bump dark
  `colorBorderMuted` to ~L=0.36, dark `colorBorder` to ~L=0.42.
- **dialog / alert-dialog / drawer popups**: shadow-only edge definition
  → `shadowLg` (dark/light overlay) on dark backdrop is ineffective. Fix:
  add `borderWidth/borderColor: colorBorderMuted` (with the L bump above)
  on popups so the modal has a defined edge in dark.
- **avatar fallback** (`avatar/avatar.tsx:26-38`): `colorMutedForeground`
  (dark L=0.65) on `colorMuted` (dark L=0.25) delta 0.40, ~4.0:1, fails
  AA for normal text initials. Fix: bump dark `colorMutedForeground` to
  ≥L=0.72 or use `colorText` for initials.
- **scroll-area thumb**: `colorIcon` has **no dark-theme override** —
  works by coincidence at L=0.6. Make explicit.
- **select/combobox/autocomplete itemDisabled**: `colorTextMuted` on
  surface in dark sits at the AA threshold. Needs visual confirmation.

#### P2 — borderline / needs visual confirm

- **focus ring** in dark: `colorFocusRing` (L=0.55) on surface (L=0.20)
  → ratio ~3.1:1, just clears 3:1 for non-text. Consider bumping dark
  ring to L=0.65.
- **toast description on default toast**: `colorTextMuted` on dark
  surface ~4.5:1, at AA threshold.
- **placeholder text** (input/select/combobox/autocomplete/number-field):
  `colorTextPlaceholder` (L=0.48) on dark surface (L=0.20) → ~2.5:1, fails
  AA but placeholders are typically exempt.
- **tabs inactive chip**: `colorMuted` chip on `colorSurface` delta 0.05
  in dark — chips blend into page. Inactive text borderline AA.
- **slider thumb hover halo**: `colorMuted` halo on dark surface — almost
  invisible. Not critical (thumb itself is visible).

#### Verified clean (dark)

- button solid default/secondary/destructive (solid bg + `*Contrast` fg)
- checkbox/radio/switch checked, toggle/toggle-group pressed, tabs active
  (all the colorText/colorTextInverse pair)
- toast destructive bg + Contrast fg
- menu/select/combobox/autocomplete highlighted item
  (`colorMuted` bg + `colorText` fg, delta 0.68)
- fieldset/form/field structural styles
- collapsible/accordion trigger text, navigation-menu/toolbar/menubar
  trigger text (`colorText` on transparent)
- mobile overlay backdrop literal (`oklch(0 0 0 / 0.4)`) — theme-agnostic
  intentional dim
- alert-dialog/dialog footer `color-mix(... colorBorder ... 50%)` —
  token-based, will inherit dark `colorBorder` and remain visible

### Light-mode findings

#### P0 — must fix before ship

- **navigation-menu viewportArrow** (`navigation-menu/navigation-menu.tsx:109`):
  `backgroundColor: colorBorderMuted` (light L=0.91) on page bg L=1.0 →
  delta 0.09, arrow effectively invisible against white page. Fix:
  `colorBorder` or a dedicated `colorPopoverBorder`.
- **menubar root border** (`menubar/menubar.tsx:16,20`): `colorBorderMuted`
  (L=0.91) on `colorSurface` (L=0.99) delta 0.08 — container outline
  barely visible. Use `colorBorder`.
- **toast destructive description**: `colorDestructiveContrast` (L=0.98)
  on `colorDestructive` (L=0.55) delta 0.43 → ~4.5:1 — at AA threshold
  for normal text. Needs visual confirmation in dev server.

#### P1 — should fix soon

- **All floating-surface borders** dissolve in light (delta ≤0.09):
  autocomplete popup, combobox popup, select popup, menu popup, context-menu
  popup, navigation-menu viewport, popover, preview-card, toast, tooltip.
  All use `colorBorderMuted` (L=0.91) on `colorSurface`/`colorSurfaceRaised`
  (L=0.99–1.0). Recommendation: floating surfaces in light should use
  `colorBorder` (L=0.85) — `shadowMd/Lg` opacity 0.05–0.08 is too subtle on
  white to compensate. Better still: add a dedicated `colorPopoverBorder`.
- **Form-field boundaries fail WCAG 1.4.11 (3:1)** in light:
  `input.tsx:17`, `field.tsx:47`, `select.tsx:25`, `combobox.tsx:49`,
  `autocomplete.tsx:27`, `number-field.tsx:21`, plus checkbox unchecked
  (`checkbox.tsx:20`), radio unchecked (`radio.tsx:31`), switch off-state
  (`switch.tsx:20-21`) — all `colorBorder` (L=0.85) on white delta 0.14
  → ~1.5:1. Fix: darken light `colorBorder` to ~L=0.75, or add
  `colorBorderStrong` for form-field outlines.
- **All in-popup separators** (`menu.tsx:136`, `context-menu.tsx:104`,
  `popover.tsx:29`, `tooltip.tsx:32`, `select.tsx:232`,
  `preview-card.tsx:41`, `navigation-menu.tsx:109`,
  `separator/separator.tsx:12,20`, `number-field.tsx:41`,
  `toolbar.tsx:23`): `colorBorderMuted` on light surface — invisible.
  Use `colorBorder`.
- **focus ring** in light: `colorFocusRing` (L=0.7) on surface (L≈1) →
  ~2.7–3.0:1, borderline-fail of WCAG 1.4.11. Fix: light theme override
  `colorFocusRing` to ~L=0.55.
- **avatar fallback** (`avatar.tsx:32-33`): `colorMutedForeground`
  (L=0.45) on `colorMuted` (L=0.93) delta 0.48 → ~4.5:1, exactly at AA
  threshold. Borderline.
- **tabs inactive chip text** same threshold issue.
- **tooltip + popover surface** = `colorSurfaceRaised` (L=1.0) on `#fff`
  page — body indistinguishable from page; relies entirely on (failing)
  border + (subtle) shadow. Recommend: light tooltip should invert to
  dark surface (`colorText` bg + `colorTextInverse` fg, Linear-style)
  OR raise border weight materially.
- **scroll-area thumb rest** (`scroll-area.tsx:65`): `colorIcon` (L=0.6)
  on light surface delta 0.39 → ~3:1 borderline. Consider `colorTextMuted`.

#### P2 — borderline / cosmetic

- **`colorPrimary` as link text** (preview-card Trigger) on white: ~3.0:1,
  fails AA 4.5:1 for body text. Already flagged in earlier audit; reaffirm
  under contrast lens.
- **destructive on white** (`field.tsx:36`, toast description, combobox/menu
  destructive items): `colorDestructive` L=0.55 vs L=0.99 delta 0.44 →
  ~4.5:1, at threshold. Borderline at small sizes.
- **success on white** if ever used as text: `colorSuccess` L=0.65 → ~3.3:1,
  fails AA. Currently only used as fill.
- **disabled opacity 0.64** on light: text falls from L=0.15 to ~L=0.46 vs
  L=0.99 → ~5.5:1, still passes AA. Token-vs-opacity directive remains a
  DESIGN.md correctness issue (already deferred), not a contrast failure
  in light.
- **slider thumb hover halo**: `colorMuted` (L=0.93) halo on white delta
  0.06 — barely visible. Recommend `colorBorder`.

#### Verified clean (light)

- accordion, collapsible: token-safe.
- button solid: `colorPrimaryContrast` on `colorPrimary` ~3:1, matches
  industry CTA convention; visual confirmation recommended.
- button outline/ghost: `colorText` fg, fine.
- meter/progress filled bar: `colorText` on `colorMuted` track — strong.
- radio/switch checked, checkbox checked, toggle/toggle-group pressed,
  tabs active, toolbar pressed (all the canonical `colorText`/`colorTextInverse`
  pair).
- dialog/alert-dialog/drawer chrome: surface + text tokens fine; borders
  share the floating-surface concern above.
- decorative SVGs in `apps/docs/src/App.tsx` and `Sidebar.tsx`: all
  `currentColor` / `fill="none"`, no hex literals.

### Proposed token surgery (consolidates both themes)

This is the shortlist for the separate token-pass branch. One PR, focused
on `packages/styles/src/themes.stylex.ts` and
`packages/tokens/src/tokens.stylex.ts`, then a sweep of consumers:

1. **Add `colorIcon` dark-theme override** (formalize the L=0.6
   coincidence: light L=0.6, dark L=0.65).
2. **Bump dark `colorBorder` to ~L=0.42 and dark `colorBorderMuted` to
   ~L=0.36** (fixes separators + popup edges + many P1 dark-mode items).
3. **Darken light `colorBorder` to ~L=0.75** (fixes form-field 3:1) AND
   bump light `colorBorderMuted` to ~L=0.85 (fixes floating surface
   borders + separators).
4. **Add `colorBorderStrong`** as the explicit form-field outline token,
   so we don't conflate dividers with field boundaries.
5. **Add `colorPopoverBorder`** for floating-surface borders so they
   don't share semantics with separators.
6. **Add `colorTrack`** (slider/progress/meter empty track) — dark
   ~L=0.30, light ~L=0.88.
7. **Add `colorDestructiveText`** (and optionally `colorSuccessText`,
   `colorPrimaryText`) tuned for fg-on-surface AA in both themes —
   distinct from the bg-fill `colorDestructive*` family.
8. **Override `colorFocusRing`** per theme: light ~L=0.55, dark ~L=0.65.
9. **Switch unchecked thumb**: either swap to `colorText` (no token
   change) or introduce `colorThumb` for clarity.
10. **Avatar fallback**: bump `colorMutedForeground` dark to ~L=0.72 OR
    swap fallback initials to `colorText` (no token change).
11. **Decide tooltip surface in light**: invert (Linear-style dark tooltip
    on light page) OR keep current and rely on `colorPopoverBorder` from
    (5).

After (1)–(8), most P0/P1 items resolve without touching consumer
component source (the tokens are already plumbed through). (9)–(11) are
per-component decisions. Visual regression sweep recommended after the
token branch lands; that is itself a separate sprint.

---

## Out of scope for this audit

- CLI expansion (deferred — needs architectural pass)
- Visual regression / Theme Studio / npm housekeeping (separate sprints)
- RTL test infrastructure (P3)
