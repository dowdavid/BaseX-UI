# Build Plan — Next 5 Components

> Components 21–25: Number Field, Popover, Preview Card, Progress, Radio
>
> Each component follows the [10-step checklist](../new-component-checklist.md) exactly.

---

## Component 1: Number Field

**Base UI**: `@base-ui/react/number-field`
**Category**: `forms`

### Parts

| Part | Base UI Part | Element | Notes |
|------|-------------|---------|-------|
| Root | `NumberField.Root` | `<div>` | Groups all parts, manages state. Props: `value`, `defaultValue`, `onValueChange`, `min`, `max`, `step`, `smallStep`, `largeStep`, `disabled`, `readOnly`, `required`, `invalid`, `allowWheelScrub`, `format` (Intl.NumberFormat options) |
| Group | `NumberField.Group` | `<div>` | Visual grouping wrapper for Input + buttons (styled border container) |
| Input | `NumberField.Input` | `<input>` | The numeric text input |
| Increment | `NumberField.Increment` | `<button>` | +1 step button (ChevronUp or Plus icon) |
| Decrement | `NumberField.Decrement` | `<button>` | -1 step button (ChevronDown or Minus icon) |
| ScrubArea | `NumberField.ScrubArea` | `<div>` | Optional: drag-to-scrub area for pointer-based adjustment |
| ScrubAreaCursor | `NumberField.ScrubAreaCursor` | `<span>` | Optional: custom cursor shown during scrub |

### Design Decisions

- **Variant axes**: `size` (sm/md/lg) on Group — matches Input sizing (32px/36px/40px)
- **No color axis** — form inputs use neutral palette only
- **Group layout**: Input flanked by Increment/Decrement buttons inside a bordered container (like a stepper). Buttons use `tokens.colorMuted` background on hover.
- **Icons**: `ChevronUp` / `ChevronDown` from lucide-react (size 14)
- **ScrubArea**: Omitted from default export — advanced feature, consumers can compose from Base UI directly
- **Animations**: State preset (100ms ease-out) on button hover/focus. No enter/exit animations.
- **Disabled state**: Standard opacity 0.5 + muted colors + not-allowed cursor on entire Group
- **Data attributes**: `[data-disabled]`, `[data-readonly]`, `[data-required]`, `[data-valid]`, `[data-invalid]`, `[data-scrubbing]`
- **CSS variables**: `--number-field-input-width` (optional, for fixed-width inputs)

### Global CSS

None required — no expand/enter/exit animations. All transitions handled via StyleX (State preset on buttons).

### Intents (for manifest)

1. **numeric-input** — signals: `number input`, `quantity`, `amount`, `numeric field`, `stepper` — when user needs to enter a number with optional constraints
2. **quantity-selector** — signals: `quantity picker`, `item count`, `how many`, `increment decrement` — for e-commerce quantity or count selection
3. **range-constrained-number** — signals: `min max number`, `bounded input`, `clamped value` — when number must stay within min/max range

### Anti-patterns

1. **Slider is better for visual range selection** — if user wants to select from a continuous range with visual feedback, use Slider instead
2. **Input is better for free-text numbers** — if no increment/decrement is needed and format validation is external, plain Input may suffice
3. **Select is better for small fixed sets** — if choosing from 3-10 predefined numbers (e.g., shirt sizes), use Select

### File Touchpoints

| File | Action |
|------|--------|
| `packages/components/src/number-field/number-field.tsx` | Create: Root, Group, Input, Increment, Decrement parts |
| `packages/components/src/number-field/index.ts` | Barrel export |
| `packages/components/src/number-field/manifest.json` | Full manifest |
| `packages/components/src/number-field/number-field.md` | Documentation |
| `packages/intelligence/intents.json` | Add 3 intents + 3 anti-patterns |
| `packages/mcp-server/src/data.ts` | Register component + presets |
| `packages/mcp-server/tsconfig.json` | Add manifest include |
| `packages/components/src/index.ts` | Add barrel export |
| `packages/components/package.json` | Add subpath export |
| `packages/components/tsup.config.ts` | Add build entry |
| `apps/playground/src/pages/NumberFieldPage.tsx` | Demo page |
| `apps/playground/src/App.tsx` | Register page |
| `docs/plans/component-roadmap.md` | Mark Done, set Popover as Next |

---

## Component 2: Popover

**Base UI**: `@base-ui/react/popover`
**Category**: `feedback`

### Parts

| Part | Base UI Part | Element | Notes |
|------|-------------|---------|-------|
| Root | `Popover.Root` | — | State container (no DOM). Props: `open`, `defaultOpen`, `onOpenChange`, `delay`, `closeDelay` |
| Trigger | `Popover.Trigger` | `<button>` | Element that toggles popover |
| Positioner | `Popover.Positioner` | `<div>` | Handles floating positioning. Props: `side`, `alignment`, `sideOffset`, `alignmentOffset`, `collisionPadding` |
| Popup | `Popover.Popup` | `<div>` | The popover content panel |
| Arrow | `Popover.Arrow` | `<div>` | Optional arrow pointing to trigger |
| Title | `Popover.Title` | `<h2>` | Accessible title |
| Description | `Popover.Description` | `<p>` | Accessible description |
| Close | `Popover.Close` | `<button>` | Close button inside popover |
| Backdrop | `Popover.Backdrop` | `<div>` | Optional backdrop overlay |

### Design Decisions

- **No variant/color/size axes** — content container, styled neutrally like Dialog Popup
- **Popup styling**: `colorSurface` bg, `radiusMd` border-radius, `shadowMd` box-shadow, `borderWidthDefault` border in `colorBorder`, padding `space4`
- **Arrow**: Styled with `colorSurface` fill, matching popup border
- **Close button**: Optional `showCloseButton` prop on Popup (default false, unlike Dialog which defaults true) — popovers are typically dismissed by clicking outside
- **Icons**: X from lucide-react for close button
- **Animations**: Enter preset (200ms ease-out) for popup fade+scale in, Exit preset (100ms ease-out) for fade+scale out. Uses `keepMounted` on Popup + global CSS with `[data-starting-style]` / `[data-ending-style]`
- **Data attributes**: `[data-open]`, `[data-closed]`, `[data-side="top|right|bottom|left"]`, `[data-alignment="start|center|end"]`
- **Stable CSS classes**: `basex-popover-popup`, `basex-popover-backdrop`

### Global CSS

```css
@layer priority1 {
  .basex-popover-popup {
    opacity: 1;
    transform: scale(1);
    transition:
      opacity 200ms cubic-bezier(0, 0, 0.2, 1),
      transform 200ms cubic-bezier(0, 0, 0.2, 1);
  }
  .basex-popover-popup[data-starting-style],
  .basex-popover-popup[data-ending-style] {
    opacity: 0;
    transform: scale(0.95);
  }
}
```

### Intents

1. **contextual-info** — signals: `popover`, `info popup`, `more details`, `supplementary content` — show additional info anchored to a trigger
2. **inline-form** — signals: `inline edit`, `edit in place`, `popover form`, `quick edit` — small form in a floating panel
3. **rich-tooltip** — signals: `interactive tooltip`, `actionable tooltip`, `popover with buttons` — tooltip-like but with interactive content

### Anti-patterns

1. **Dialog is better for complex forms** — if content requires scrolling or has many fields, use Dialog
2. **Tooltip is better for plain text hints** — if content is non-interactive text only, use Tooltip
3. **Menu is better for action lists** — if popover would contain only a list of clickable actions, use Menu

### File Touchpoints

Same 13-file pattern as Number Field, under `packages/components/src/popover/`.

---

## Component 3: Preview Card

**Base UI**: `@base-ui/react/preview-card`
**Category**: `data-display`

### Parts

| Part | Base UI Part | Element | Notes |
|------|-------------|---------|-------|
| Root | `PreviewCard.Root` | — | State container (no DOM). Props: `open`, `defaultOpen`, `onOpenChange`, `delay`, `closeDelay` |
| Trigger | `PreviewCard.Trigger` | `<a>` | Element that shows card on hover (typically a link) |
| Positioner | `PreviewCard.Positioner` | `<div>` | Floating positioning |
| Popup | `PreviewCard.Popup` | `<div>` | The preview card content |
| Arrow | `PreviewCard.Arrow` | `<div>` | Optional arrow |

### Design Decisions

- **No variant/color/size axes** — content preview container, neutral styling
- **Popup styling**: `colorSurface` bg, `radiusMd` border-radius, `shadowLg` box-shadow, `borderWidthDefault` border in `colorBorder`, maxWidth `320px`, overflow hidden
- **Content slots**: No opinionated sub-parts for image/title/description — consumer composes freely inside Popup. This keeps the component lightweight and flexible.
- **Arrow**: Same pattern as Popover
- **Animations**: Enter preset (200ms ease-out) fade+scale in, Exit preset (100ms ease-out) fade+scale out. Same CSS pattern as Popover.
- **Hover-triggered**: Opens on hover after delay (default 600ms from Base UI), no click interaction
- **Data attributes**: `[data-open]`, `[data-closed]`, `[data-side]`, `[data-alignment]`
- **Stable CSS classes**: `basex-preview-card-popup`

### Global CSS

```css
@layer priority1 {
  .basex-preview-card-popup {
    opacity: 1;
    transform: scale(1);
    transition:
      opacity 200ms cubic-bezier(0, 0, 0.2, 1),
      transform 200ms cubic-bezier(0, 0, 0.2, 1);
  }
  .basex-preview-card-popup[data-starting-style],
  .basex-preview-card-popup[data-ending-style] {
    opacity: 0;
    transform: scale(0.95);
  }
}
```

### Intents

1. **link-preview** — signals: `preview card`, `link preview`, `hover card`, `url preview` — show a preview of linked content on hover
2. **user-profile-card** — signals: `user card`, `profile hover`, `avatar preview`, `person card` — show user info on hover

### Anti-patterns

1. **Popover is better for interactive content** — if the card needs buttons/forms, use Popover (click-triggered, dismissible)
2. **Tooltip is better for plain text** — if only showing a short text hint, use Tooltip
3. **Dialog is better for detailed views** — if showing extensive content that needs scrolling, use Dialog

### File Touchpoints

Same 13-file pattern, under `packages/components/src/preview-card/`.

---

## Component 4: Progress

**Base UI**: `@base-ui/react/progress`
**Category**: `feedback`

### Parts

| Part | Base UI Part | Element | Notes |
|------|-------------|---------|-------|
| Root | `Progress.Root` | `<div>` | Container. Props: `value` (number \| null), `min`, `max` |
| Track | `Progress.Track` | `<div>` | Background track bar |
| Indicator | `Progress.Indicator` | `<div>` | Filled portion of the bar |
| Label | Custom `<label>` | `<label>` | Custom part (not in Base UI) — accessible label |
| Value | Custom `<span>` | `<span>` | Custom part — displays percentage text |

### Design Decisions

- **Variant axes**: `size` (sm/md/lg) on Track — 4px/8px/12px height (matches Meter exactly)
- **Color axis**: `color` (default/secondary/destructive) on Indicator — same as Meter
- **Indeterminate state**: When `value` is `null`, show animated indeterminate bar via global CSS (`@keyframes` translateX loop). Data attribute: `[data-indeterminate]`
- **Track styling**: Same as Meter — `colorMuted` bg, `radiusFull` border-radius, overflow hidden
- **Indicator styling**: Same as Meter — fills width via CSS variable `--progress-indicator-width`, smooth width transition (Move preset 200ms ease-in-out)
- **Indicator width**: Base UI provides `--progress-value` CSS variable on Root — Indicator uses `width: calc(var(--progress-value, 0) * 1%)`
- **Label/Value**: Custom parts following Meter pattern (not Base UI parts). Label uses `fontSizeSm`/`fontWeightMedium`, Value uses `fontSizeSm`/`colorTextMuted`
- **Accessibility**: `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax` — handled by Base UI Root
- **Data attributes**: `[data-indeterminate]`, `[data-complete]`, `[data-progressing]`
- **Stable CSS classes**: `basex-progress-indicator` (for indeterminate animation)

### Global CSS

```css
@layer priority1 {
  /* Indeterminate animation */
  @keyframes basex-progress-indeterminate {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(250%); }
  }
  .basex-progress-indicator[data-indeterminate] {
    width: 30% !important;
    animation: basex-progress-indeterminate 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
}
```

### Intents

1. **task-progress** — signals: `progress bar`, `loading bar`, `completion indicator`, `percentage bar` — show how far along a task is
2. **upload-progress** — signals: `upload progress`, `file upload`, `transfer progress` — track file upload or data transfer
3. **indeterminate-loading** — signals: `loading indicator`, `indeterminate progress`, `processing` — show activity without known completion

### Anti-patterns

1. **Meter is better for static values** — if showing a measurement (disk usage, battery), use Meter — Progress implies a task moving toward completion
2. **Spinner is better for brief waits** — if the operation takes < 2 seconds, a spinner/skeleton is less distracting
3. **Toast is better for completion notification** — don't keep a progress bar at 100% — notify completion with a Toast

### File Touchpoints

Same 13-file pattern, under `packages/components/src/progress/`.

---

## Component 5: Radio

**Base UI**: `@base-ui/react/radio-group` + `@base-ui/react/radio`
**Category**: `forms`

### Parts

| Part | Base UI Part | Element | Notes |
|------|-------------|---------|-------|
| Group | `RadioGroup.Root` | `<div>` | Container managing selection. Props: `value`, `defaultValue`, `onValueChange`, `disabled`, `readOnly`, `required` |
| Root | `Radio.Root` | `<button>` | Individual radio button. Props: `value` (string) |
| Indicator | `Radio.Indicator` | `<span>` | The visual dot/circle inside the radio |

### Design Decisions

- **Naming**: Export as `Radio.Group`, `Radio.Root`, `Radio.Indicator` — consistent with how CheckboxGroup is separate but Radio naturally nests
- **Variant axes**: `size` (sm/md/lg) on Root — 16px/20px/24px circle
- **No color axis** — radio uses primary color when checked, neutral when unchecked (same as Checkbox)
- **Root styling**: Circular (`borderRadius: radiusFull`), `borderWidthThick` border in `colorBorder`, `transparent` bg. Checked: `colorPrimary` border + bg
- **Indicator styling**: Inner filled circle (white dot) inside checked radio — `colorPrimaryContrast`, centered, scaled to ~40% of root size
- **Indicator animation**: `keepMounted`, global CSS scale animation (Enter: 200ms ease-out scale 0→1, Exit: 100ms ease-out scale 1→0) — matches Checkbox indicator pattern
- **Group layout**: `display: flex`, `flexDirection: column`, `gap: space2`. Supports `orientation` prop for horizontal layout.
- **Disabled state**: Standard opacity 0.5 + muted styling on both Group and individual Root
- **Data attributes**: Root: `[data-checked]`, `[data-unchecked]`, `[data-disabled]`, `[data-readonly]`, `[data-required]`
- **Stable CSS classes**: `basex-radio-indicator`
- **Icons**: None — pure CSS circle indicator (no lucide icons needed)

### Global CSS

```css
@layer priority1 {
  .basex-radio-indicator {
    opacity: 1;
    transform: scale(1);
    transition:
      opacity 100ms cubic-bezier(0, 0, 0.2, 1),
      transform 100ms cubic-bezier(0, 0, 0.2, 1);
  }
  .basex-radio-indicator[data-unchecked] {
    opacity: 0;
    transform: scale(0.5);
  }
}
```

### Intents

1. **single-selection** — signals: `radio`, `radio button`, `single choice`, `one of many`, `mutually exclusive` — choose exactly one option from a set
2. **option-group** — signals: `option group`, `radio group`, `choice group`, `selection list` — present a group of mutually exclusive options
3. **preference-setting** — signals: `preference`, `setting toggle`, `mode selection`, `theme picker` — select a preference from predefined values

### Anti-patterns

1. **Select is better for many options** — if more than 5-7 options, use Select to avoid vertical space bloat
2. **Checkbox is better for multi-select** — if user can pick multiple items, use Checkbox or CheckboxGroup
3. **Switch is better for binary toggles** — if choosing between on/off or enabled/disabled, use Switch

### File Touchpoints

Same 13-file pattern, under `packages/components/src/radio/`.

---

## Build Order & Rationale

| Order | Component | Rationale |
|-------|-----------|-----------|
| 1 | **Number Field** | Marked **Next** on roadmap. Form input — builds on Input pattern. No animations. Simplest of the 5. |
| 2 | **Popover** | Foundation for Preview Card (similar overlay pattern). Must build first so Preview Card can reference its CSS pattern. |
| 3 | **Preview Card** | Reuses Popover's floating/animation pattern. Simpler (hover-only, no interactive content parts). |
| 4 | **Progress** | Standalone feedback component. Mirrors Meter closely — fastest build since patterns are nearly identical. |
| 5 | **Radio** | Form control mirroring Checkbox. Closes out the batch with a familiar pattern. |

## Per-Component Build Steps (repeated for each)

Each component follows the 10-step checklist in exact order:

1. **Component Code** — `{name}.tsx` + `index.ts`
2. **Manifest** — `manifest.json` with parts, intents, avoidWhen, examples
3. **Documentation** — `{name}.md` with anatomy, API reference, examples
4. **Global CSS** — Add to `apps/playground/src/index.css` (if component has animations)
5. **Intelligence Integration** — Add intents + anti-patterns to `packages/intelligence/intents.json`
6. **MCP Server Registration** — Update `data.ts` + `tsconfig.json`
7. **Package Exports** — Update barrel `index.ts`, `package.json` subpath, `tsup.config.ts` entry
8. **Playground Demo** — Create `{Name}Page.tsx`, register in `App.tsx`
9. **Update Roadmap** — Mark Done, advance Next pointer
10. **Verification** — `pnpm build` + `pnpm typecheck`

## Summary

- **5 components**, **65+ files** touched across packages
- **3 with global CSS** (Popover, Preview Card, Radio) + **1 with keyframe animation** (Progress indeterminate)
- **1 without any animations** (Number Field)
- **15 new intents** + **15 new anti-patterns** added to intelligence layer
- Roadmap advances from 20/36 → 25/36 Done (69% complete)
