# Accordion Component Design

## Overview

First compound component for BaseX UI. Built on `@base-ui/react/accordion`, styled with StyleX. Sets the pattern for all future multi-part components.

## API

```tsx
<Accordion.Root variant="default" size="md">
  <Accordion.Item value="item-1">
    <Accordion.Header>
      <Accordion.Trigger>Section Title</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>Content here</Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>
```

### Parts

| Part    | Element    | Styled | Notes                                     |
| ------- | ---------- | ------ | ----------------------------------------- |
| Root    | `<div>`    | Yes    | Container, gap for outline variant        |
| Item    | `<div>`    | Yes    | Border/background per variant             |
| Header  | `<h3>`     | No     | Structural for a11y, no visual styles     |
| Trigger | `<button>` | Yes    | Height/padding per size, built-in chevron |
| Panel   | `<div>`    | Yes    | Animated height, inner padding            |

### Props

`variant` and `size` live on Root, flow via React context. Each part gets `sx` for overrides.

All Base UI props pass through: `value`, `defaultValue`, `onValueChange`, `multiple`, `disabled`, `orientation`, `keepMounted`, `hiddenUntilFound`.

## Variants

- **`default`** (default) — Bordered items stacked flush. `borderBottom: 1px solid colorBorder`, last item no border.
- **`outline`** — Separate bordered cards. `border: 1px solid colorBorder`, `borderRadius: radiusMd`, `backgroundColor: colorSurface`. Root gap: `space2`.
- **`ghost`** — No borders, no background. Minimal.

## Sizes

| Size | Trigger Height | Padding Inline | Font Size  | Panel Padding (top inline bottom) |
| ---- | -------------- | -------------- | ---------- | --------------------------------- |
| sm   | 40px           | space2         | fontSizeSm | space2 space2 space3              |
| md   | 44px           | space3         | fontSizeMd | space3 space3 space4              |
| lg   | 48px           | space4         | fontSizeLg | space4 space4 space5              |

## Trigger Details

- Full-width flex row, `justifyContent: space-between`, `alignItems: center`
- Hover: `colorMuted` background
- Font: `fontFamilySans`, `fontWeightMedium`
- Focus ring: `2px solid colorFocusRing`, `outlineOffset: 2px`
- Built-in chevron SVG, rotates 180deg on `data-open` via `motionDurationNormal` + `motionEaseOut`

## Panel Animation

- `height: 0` → `height: var(--accordion-panel-height)` transition
- `overflow: hidden` during animation
- `motionDurationNormal`, `motionEaseOut`
- Uses `data-starting-style` / `data-ending-style` data attributes

## Disabled State

`opacity: 0.64`, `pointerEvents: none` — matches Button pattern.

## Intelligence

### Intents

1. **collapsible-sections** — "accordion", "collapse", "expand", "sections", "FAQ", "collapsible"
2. **show-hide-content** — "show more", "reveal", "toggle content", "expandable"
3. **faq-list** — "FAQ", "questions", "answers", "help", "Q&A"

### Anti-patterns

1. Tabbed navigation → Use Tabs
2. Single collapsible section → Use Collapsible directly
3. Step-by-step wizard → Use a stepper pattern

## Files

- `packages/components/src/accordion/accordion.tsx`
- `packages/components/src/accordion/index.ts`
- `packages/components/src/accordion/manifest.json`
- `packages/components/src/accordion/accordion.md`
- Update `packages/components/src/index.ts`
- Update `packages/intelligence/intents.json`
- Update `packages/mcp-server/src/data.ts`
- Add to playground for visual testing
