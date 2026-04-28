# BaseX UI Design System

The single source of design truth for this repo. Per `~/.claude/CLAUDE.md`:
_"DESIGN.md is the single source of design truth. Load and apply its tokens.
Flag values not in the system."_

If a design needs a value not defined here, do not hardcode it — propose a new
token in `packages/tokens/src/tokens.stylex.ts` and document it here first.

---

## Tokens

Canonical definitions live in code, not in this doc:

- Design tokens: [`packages/tokens/src/tokens.stylex.ts`](packages/tokens/src/tokens.stylex.ts)
- Light/dark themes: [`packages/tokens/src/themes.stylex.ts`](packages/tokens/src/themes.stylex.ts)
- Color presets / OKLCH utilities: [`packages/tokens/src/presets.ts`](packages/tokens/src/presets.ts), [`packages/tokens/src/oklch.ts`](packages/tokens/src/oklch.ts)

Always import via `@basex-ui/tokens`. Never inline raw oklch/hex/rgb in component
source. Spacing, typography, radii, motion, and elevation tokens are likewise
the only sanctioned values.

---

## Accent color rule

Accent (`colorPrimary`, the BaseX brand orange) is used in **exactly three
places** across the entire system:

1. **Default solid Button.** The primary CTA pattern.
   `Button` with `variant='solid'` and `color='default'` keeps `colorPrimary`
   background + `colorPrimaryContrast` foreground. This is the only
   "selection-y" component that gets accent.
2. **Hover states on focusable interactive elements that aren't selection
   controls.** Subtle accent touch to signal "you can act here". Use sparingly.
3. **Brand moments.** Logomark, marketing surfaces in the docs site, OG cards.
   Not component chrome.

**Why:** Industry split — shadcn/Tailwind/Material apply accent everywhere
selection happens (8+ orange spots per form, generic-SaaS feel).
Linear/Notion/Vercel/Stripe/Apple HIG reserve accent for the single primary
action (premium / restrained / designer-y). BaseX picks the second camp.

---

## Selection state rule

Anything that expresses **active / on / pressed / checked / selected /
highlighted** uses theme-inverting tokens:

- Filled background → `tokens.colorText` (near-black light, near-white dark)
- Foreground on that fill → `tokens.colorTextInverse`
- These swap with light/dark mode automatically and read as restrained / premium.

Components covered:

- Checkbox checked, Switch on, Radio checked, Toggle pressed,
  ToolbarToggleItem active
- Tabs active tab
- Slider track fill + thumb (when in range / focused)
- Progress bar fill
- Meter bar fill
- Menu highlighted item, Menu CheckboxItem checked, Menu RadioItem checked
- ContextMenu highlighted/checked items (mirrors Menu)
- Menubar highlighted item
- Select highlighted item, Select selected ItemIndicator
- NavigationMenu link active state
- Combobox highlighted item, Autocomplete highlighted item
- ToggleGroup pressed item

**Hover on a selected element does NOT change the fill.** A selected thing
stays in its `colorText` fill on hover — see `tabActive` in `tabs.tsx` for the
canonical pattern.

**Components NOT allowed to use accent on selection:** anything not on the
explicit allow-list above (which is empty by design — no component is on the
allow-list except the default solid Button described under "Accent color
rule"). If a future component genuinely needs branded selection (e.g., a
`Star` favorite control), it requires explicit design review and is documented
here as an exception.

---

## Status color isolation

- `colorDestructive*` → destructive actions only (delete buttons, error fields)
- `colorSuccess*` → success states only
- `colorMuted` / `colorMutedForeground` → disabled / secondary surfaces
- These never borrow from accent and never substitute for `colorText`-as-selection.

---

## Disabled state

Use muted color tokens (`colorTextMuted`, `colorBorderMuted`,
`colorMutedForeground`) — **not opacity** — for contrast-safe disabled
states. Opacity-based disabled fails contrast against most surfaces and
compounds when nested. Reaffirms the existing rule from component manifests'
`disabledState`.

---

## Focus ring

Every interactive element applies `focusRing` from `@basex-ui/styles`.
2px solid `colorFocusRing` outline on `:focus-visible`. Never use the browser
default outline. Never disable focus visibility.

---

## Hover states

Always wrap hover styles in `@media (hover: hover) and (pointer: fine)` to
avoid sticky-hover on touch devices. Project-wide convention.

---

## Scroll behavior

Wherever a component or demo has overflow scroll, route through
`ScrollArea.Root + Viewport + Scrollbar` from `@basex-ui/components/scroll-area`
instead of native browser scrollbars. Native scrollbars are reserved for the
document root only.

Exception: Base UI primitives that manage their own viewport scroll
(`Select.Viewport`, `Combobox.Popup`, `NavigationMenu.Viewport`,
`Menu.Popup` if internally scrollable) keep their built-in scroll behavior to
preserve keyboard navigation and focus management. Where this applies, the
component file documents the exception inline.
