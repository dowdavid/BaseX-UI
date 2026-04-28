# P1 + P2 Quality Pass

**Date:** 2026-04-28
**Goal:** Close the design-system drift surfaced during the v0.2.1 ship and move the project from 7.8 → ~8.5/10 of its self-rating.
**Source:** `docs/plans/2026-04-27-v0.1-oss-release-plan.md` "Path to 9+ rating" P1 + P2.
**Out of scope (deferred):** CLI expansion to all 35 components (P2 #6) — needs its own architectural pass to bundle component sources into the CLI tarball at build time. Visual regression, Theme Studio, npm housekeeping (deprecate orphan, Trusted Publishing, token rotation) — all separate.

> **Read this whole file before touching code.** A fresh-context agent should be able to pick up cold.

---

## The accent color rule (agreed 2026-04-28)

This is the canonical rule the audit pass enforces. Codify it in a new root-level `DESIGN.md` first, then audit and fix every component against it.

**Accent (`colorPrimary`, the brand orange) is used in exactly three places:**

1. **Default solid Button.** The primary CTA pattern. `Button` with `variant='solid'` and `color='default'` keeps `colorPrimary` background + `colorPrimaryContrast` foreground. This is the only "selection-y" component that gets accent.
2. **Hover states on focusable interactive elements that aren't selection controls.** Subtle accent touch to signal "you can act here". Use sparingly.
3. **Brand moments.** Logomark, marketing surfaces in the docs site, OG cards. Not component chrome.

**Selection states use theme-inverting tokens:**

- Filled background → `tokens.colorText` (near-black in light mode, near-white in dark)
- Foreground on that fill → `tokens.colorTextInverse`
- These swap with light/dark mode automatically and read as restrained / premium.

Applies to anything that expresses "active / on / pressed / checked / selected / highlighted":

- Checkbox checked, Switch on, Radio checked, Toggle pressed, ToolbarToggleItem active _(already done in earlier pass — verify still correct)_
- Tabs active tab _(already done — already filled-block with `colorText`)_
- Slider track fill + thumb (when in range / focused)
- Progress bar fill
- Menu highlighted item, Menu CheckboxItem checked, Menu RadioItem checked
- Select highlighted item, Select selected ItemIndicator
- NavigationMenu link active state
- Combobox highlighted item, Autocomplete highlighted item

**Status colors stay isolated:**

- `colorDestructive*` for destructive actions only (delete buttons, error fields)
- `colorSuccess*` for success states only
- `colorMuted` / `colorMutedForeground` for disabled / secondary surfaces
- These never borrow from accent and never substitute for `colorText`-as-selection.

**Components NOT allowed to use accent on selection:** any component not on the explicit allow-list above. If a future component genuinely needs branded selection (e.g., a `Star` favorite control), it gets explicit design review and is documented as an exception in `DESIGN.md`.

### Why this rule

Industry split on this: shadcn/Tailwind/Material apply accent everywhere selection happens (8+ orange spots per form, generic-SaaS feel). Linear/Notion/Vercel/Stripe/Apple HIG reserve accent for the single primary action (premium / restrained / designer-y). BaseX is partway in the second camp already (Toggle, Tabs); this rule completes the move.

---

## What to do, in order

### 1. Write `DESIGN.md` at the repo root

Single root-level document, canonical reference for design tokens + rules. Per Dave's global `~/.claude/CLAUDE.md`: _"DESIGN.md is the single source of design truth. Load and apply its tokens. Flag values not in the system."_

Structure:

```markdown
# BaseX UI Design System

## Tokens

(reference: link to packages/tokens/src/tokens.stylex.ts and themes.stylex.ts)

## Accent color rule

(paste the rule from this plan verbatim)

## Selection state rule

(paste the rule from this plan verbatim)

## Status color isolation

(paste the rule from this plan verbatim)

## Disabled state

- Use muted color tokens (colorTextMuted, colorBorderMuted) — not opacity — for contrast-safe disabled states. (Existing rule from manifests; reaffirm here.)

## Focus ring

- Every interactive element applies `focusRing` from `@basex-ui/styles`. 2px solid `colorFocusRing` outline on `:focus-visible`.

## Hover states

- Always wrap hover styles in `@media (hover: hover) and (pointer: fine)` to avoid sticky-hover on touch devices. Already a project convention; reaffirm here.
```

### 2. Audit every component for accent color usage

Run this to find every place `colorPrimary` (or any of its variants) is referenced in component source:

```bash
grep -rn "colorPrimary" packages/components/src/ --include="*.tsx"
```

For each match, classify:

- **Allowed** — Button `variant='solid' color='default'` styles, or rule-rule-rule (rare hover states / brand moments).
- **Violation** — any "selected/active/checked/on" state on a non-Button component using `colorPrimary*`.

Fix every violation by replacing with the theme-inverting pair (`colorText` background + `colorTextInverse` foreground). Where the existing code uses `colorPrimaryHover` for a checked-hover, replace with `colorText` (no-op since the hover state on a "selected" thing should not change the fill — see Tabs `tabActive` for the pattern).

**Required: audit ALL 35 components, not just the obvious suspects.** Don't skip ahead to the ones you guess will be wrong — visit each. Document the audit result inline (component name → "clean" or "fixed: X → Y").

Components to audit (all 35):
accordion, alert-dialog, autocomplete, avatar, button, checkbox, checkbox-group, collapsible, combobox, dialog, drawer, field, fieldset, form, input, menu, menubar, meter, navigation-menu, number-field, popover, preview-card, progress, radio, scroll-area, select, separator, slider, switch, tabs, toast, toggle, toggle-group, toolbar, tooltip.

### 3. Toolbar fix

`packages/components/src/toolbar/toolbar.tsx` currently has an animation on `Toolbar.ToggleItem` that changes width per active state. Result: items with different active/inactive widths next to each other create visual gaps and uneven button widths in a toolbar group.

**Fix:**

- Remove the width animation entirely.
- Make `Toolbar.ToggleItem` uniform width across all states (active / inactive / hover).
- Verify in `apps/docs/src/pages/ToolbarPage.tsx` that the demo group reads as visually uniform.

### 4. Scrollbar consistency — use `ScrollArea` everywhere

We already ship `Scroll.Area` (`packages/components/src/scroll-area/`). The convention going forward: **wherever a component or demo has overflow scroll, route through `ScrollArea.Root` + `Viewport` + `Scrollbar` instead of native browser scrollbars.**

User specifically called out: _"I remember being on a component in particular, can't remember what one it was, but there was a different scroll. So I want scroll if there's scroll on any of the components to be the behavior that we use in the scroll area component."_

Audit:

```bash
grep -rn "overflow.*\(auto\|scroll\)" packages/components/src/ apps/docs/src/ --include="*.tsx" --include="*.ts"
```

For each native overflow scroller in component source or docs:

- If the scroll is internal to a component's chrome (e.g., a long Menu list, Select dropdown viewport, Combobox popup, NavigationMenu viewport, scrollable Dialog content): wrap with `ScrollArea`.
- If the scroll is on the docs sidebar or any docs page panel: same treatment.

**Caveat:** Base UI primitives like `Select.Viewport`, `NavigationMenu.Viewport`, `Combobox.Popup` may already have built-in scroll behavior with their own scrollbar handling — check before forcing `ScrollArea` on top, since wrapping primitives that manage their own focus / scroll could break keyboard navigation. If unsure, leave the primitive's native viewport alone but ensure the visual scrollbar matches the `ScrollArea` rendering by sharing styles.

Document any decision to leave a native scroller in place inline (one-line comment in the file explaining why).

### 5. Accessibility audit + obvious fixes

Install axe-core, run against each component demo, fix obvious wins. **Don't try to one-shot complex a11y issues** (like designing focus-trap behavior for novel patterns) — surface those as follow-ups.

Setup:

```bash
pnpm add -Dw axe-core @axe-core/react
```

Then either:

- Add an axe-core check inside the existing component test files (with jsdom env for the components/ package), OR
- Run axe in the dev server and capture findings (manual but more realistic).

Pragmatic recommendation: skip RTL+jsdom infra in this pass (P3 work, separate sprint). Instead, run axe in the dev server (browser console after each demo loads) and **document findings** in `docs/plans/2026-04-28-a11y-audit-findings.md`. Fix the easy wins inline (missing `aria-label`, role mismatches, contrast issues that are CSS-only). Defer harder items (focus management, novel focus traps, complex live region behavior) to a P3 follow-up sprint.

Easy wins to look for proactively:

- Icon-only buttons without `aria-label`
- Decorative SVGs without `aria-hidden="true"`
- Disabled states using `opacity: 0.64` (low contrast — should be muted token colors per the existing manifests' `disabledState` rule)
- Form components without `Field.Description` / `Field.Error` wired to `aria-describedby`
- Color contrast on text against muted/disabled surfaces (use a11y devtools to spot-check)

### 6. Context Menu component (P2 #1)

Build `packages/components/src/context-menu/`. Full Base UI compound API following the existing Menu pattern. Compound parts (per Base UI docs):

`Root, Trigger, Portal, Positioner, Popup, Item, Separator, RadioGroup, RadioItem, RadioItemIndicator, CheckboxItem, CheckboxItemIndicator, SubmenuRoot, SubmenuTrigger, Group, GroupLabel, Backdrop, Arrow`

Reference the existing `packages/components/src/menu/menu.tsx` since Menu and ContextMenu share most styling — you may be able to extract shared styles and reuse them, OR write Context Menu standalone for now and refactor to share later.

Required output:

- `context-menu.tsx` — the wrapped components
- `index.ts` — barrel export
- `manifest.json` — metadata for AI discovery
- `context-menu.md` — user-facing docs
- `context-menu.test.ts` — same floor pattern as the other tests (createElement + isValidElement + parts + displayName)
- Add subpath export to `packages/components/package.json` `exports` block
- Add `apps/docs/src/pages/ContextMenuPage.tsx` demo page
- Register in `apps/docs/src/registry.ts`
- Update component count from 35 → 36 in: `CLAUDE.md` (×2), `apps/docs/src/content/mcp-server/index.md`, `packages/mcp-server/README.md`, `CHANGELOG.md`

### 7. Verify

After everything above:

```bash
pnpm install
pnpm build       # must succeed; OG cards regenerate including new context-menu page
pnpm typecheck   # must be green
pnpm test:ci     # must be green
pnpm lint        # must be green (1 pre-existing warning in apps/docs/src/App.tsx:230 is OK, untouched)
pnpm format:check
```

If anything fails, fix root cause — do not bypass.

### 8. Commit and push (no PR — push direct to a feature branch, open PR)

Branch name: `chore/p1-p2-quality-pass`

Suggested commit splits (one logical change per commit, per Dave's git conventions):

1. `docs(design): add DESIGN.md with accent color + selection rules`
2. `refactor(components): apply accent color rule across all components` (the audit + fixes — one commit, listing each component touched in body)
3. `fix(toolbar): uniform width on ToggleItem; remove width animation`
4. `refactor: route overflow scrollers through ScrollArea component` (or split per area if huge)
5. `feat(context-menu): add Context Menu component`
6. `chore: update component counts to 36 across docs and CLAUDE.md`
7. `docs(plans): record a11y audit findings + queued fixes` (the new findings doc)

Open PR with `--assignee dowdavid` per Dave's global rules. Include a summary listing every component fixed in (2) and the count of native scrollers replaced in (4).

### 9. Update the parent plan

After the PR merges, in `docs/plans/2026-04-27-v0.1-oss-release-plan.md`'s "Path to 9+ rating" section, mark P1 items 1–4 and P2 #5 (Context Menu) as `[x]`. Leave P2 #6 (CLI expansion), P3, P4, P5 untouched — those are separate sprints.

---

## Constraints / things NOT to do

- **Do NOT do CLI expansion in this pass.** Architectural decision deferred (option B: bundle component sources into CLI tarball — needs its own design + build + test session).
- **Do NOT do RTL test infrastructure.** The current test floor is `createElement + isValidElement`; that's the v0.1 promise. Real RTL + axe-core-in-tests is P3, separate sprint.
- **Do NOT touch the npm housekeeping items** (deprecate orphan, Trusted Publishing, token rotation). User explicitly deferred those.
- **Do NOT change the Toggle / Checkbox / Switch / Radio inversion fix from earlier.** Those are correct per the rule. Verify they're still correct during the audit pass; don't regress them.
- **Do NOT bump the component count claim until Context Menu actually exists.** Updating "35 → 36" comes at the end of step 6, not the start.
- **Do NOT accept "looks fine" without auditing.** The user explicitly asked for every component to be checked, not the ones I guess are wrong.
- **Do NOT delete the `Tabs.Indicator` part.** It's intentionally `display: none` but kept in the public API for compound completeness — see the comment in `tabs.tsx`.

---

## Estimated wall-clock for me

- DESIGN.md: 5 min
- Accent audit + fixes: 25-35 min (35 components × read + classify + fix where needed)
- Toolbar: 3 min
- Scrollbar consistency: 15-25 min (depends on how many native scrollers found)
- A11y audit (browser axe + easy wins + findings doc): 20-30 min
- Context Menu: 15-25 min
- Verify + commit + push + PR: 5 min

Total realistic: **~90-130 min** wall clock from a clean context start. Bug-fix wildcards possible on a11y and scrollbar replacement (Base UI primitive interaction with `ScrollArea` is the riskiest unknown).

---

## Done definition

- [ ] `DESIGN.md` exists at repo root with the accent + selection + status rules
- [ ] All 35 components audited; zero `colorPrimary*` references on selection states (only the Button solid-default exception remains)
- [ ] Toolbar `ToggleItem` is uniform width with no width animation; demo confirms
- [ ] Every internal native scroller in components and docs that's safely wrappable is routed through `ScrollArea`
- [ ] A11y audit findings document exists; obvious wins are fixed
- [ ] Context Menu component shipped with full Base UI compound parity
- [ ] Component count updated to 36 in all 4 places
- [ ] Build + typecheck + test + lint + format all green
- [ ] PR opened, assigned to dowdavid, summary lists what changed per area
