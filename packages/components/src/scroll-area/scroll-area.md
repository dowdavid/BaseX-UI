# Scroll Area

A scrollable region with custom-styled scrollbars overlaid on native scroll. Native scrolling, keyboard navigation, touch gestures, and RTL are preserved — only the scrollbar visuals are replaced. Scrollbars fade in on hover/scroll and respect `prefers-reduced-motion`.

## Anatomy

```
<ScrollArea.Root>
  <ScrollArea.Viewport>
    {/* scrollable content */}
  </ScrollArea.Viewport>
  <ScrollArea.Scrollbar orientation="vertical">
    <ScrollArea.Thumb />
  </ScrollArea.Scrollbar>
  <ScrollArea.Scrollbar orientation="horizontal">
    <ScrollArea.Thumb />
  </ScrollArea.Scrollbar>
  <ScrollArea.Corner />
</ScrollArea.Root>
```

## Examples

### Basic (vertical)

```tsx
<ScrollArea.Root style={{ width: 240, height: 200 }}>
  <ScrollArea.Viewport>
    {Array.from({ length: 40 }).map((_, i) => (
      <p key={i}>Line {i + 1}</p>
    ))}
  </ScrollArea.Viewport>
  <ScrollArea.Scrollbar orientation="vertical">
    <ScrollArea.Thumb />
  </ScrollArea.Scrollbar>
</ScrollArea.Root>
```

### Horizontal

```tsx
<ScrollArea.Root style={{ width: 320 }}>
  <ScrollArea.Viewport>
    <div style={{ display: 'flex', gap: 8, padding: 8 }}>{chips}</div>
  </ScrollArea.Viewport>
  <ScrollArea.Scrollbar orientation="horizontal">
    <ScrollArea.Thumb />
  </ScrollArea.Scrollbar>
</ScrollArea.Root>
```

### Both axes (with corner)

```tsx
<ScrollArea.Root style={{ width: 320, height: 200 }}>
  <ScrollArea.Viewport>
    <table>{rows}</table>
  </ScrollArea.Viewport>
  <ScrollArea.Scrollbar orientation="vertical">
    <ScrollArea.Thumb />
  </ScrollArea.Scrollbar>
  <ScrollArea.Scrollbar orientation="horizontal">
    <ScrollArea.Thumb />
  </ScrollArea.Scrollbar>
  <ScrollArea.Corner />
</ScrollArea.Root>
```

### Inside a Dialog

```tsx
<Dialog.Panel>
  <ScrollArea.Root style={{ maxHeight: 320 }}>
    <ScrollArea.Viewport>{longContent}</ScrollArea.Viewport>
    <ScrollArea.Scrollbar orientation="vertical">
      <ScrollArea.Thumb />
    </ScrollArea.Scrollbar>
  </ScrollArea.Root>
</Dialog.Panel>
```

## CSS Requirements

Scrollbar fade and thumb sizing rely on Base UI data attributes and CSS variables, so this rule must live in a global stylesheet inside `@layer priority1`:

```css
@layer priority1 {
  /* Hide native scrollbars on the viewport */
  .basex-scroll-area-viewport::-webkit-scrollbar {
    display: none;
  }

  /* Scrollbar fade — State preset: 100ms ease-out */
  .basex-scroll-area-scrollbar {
    opacity: 0;
    transition: opacity 100ms cubic-bezier(0, 0, 0.2, 1);
    position: absolute;
  }
  .basex-scroll-area-scrollbar[data-orientation='vertical'] {
    top: 0;
    bottom: 0;
    right: 0;
  }
  .basex-scroll-area-scrollbar[data-orientation='horizontal'] {
    left: 0;
    right: 0;
    bottom: 0;
  }
  .basex-scroll-area-scrollbar[data-hovering],
  .basex-scroll-area-scrollbar[data-scrolling] {
    opacity: 1;
  }
  .basex-scroll-area-thumb[data-orientation='vertical'] {
    height: var(--scroll-area-thumb-height);
    width: 100%;
  }
  .basex-scroll-area-thumb[data-orientation='horizontal'] {
    width: var(--scroll-area-thumb-width);
    height: 100%;
  }
  .basex-scroll-area-corner {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 10px;
    height: 10px;
  }

  @media (prefers-reduced-motion: reduce) {
    .basex-scroll-area-scrollbar {
      transition-duration: 0ms;
    }
  }
}
```

## API Reference

### Root

| Prop                    | Type                                           | Default | Description                                                 |
| ----------------------- | ---------------------------------------------- | ------- | ----------------------------------------------------------- |
| `overflowEdgeThreshold` | `number \| { xStart?; xEnd?; yStart?; yEnd? }` | `0`     | Pixel threshold before overflow-edge data attrs are applied |
| `sx`                    | `StyleXStyles`                                 | —       | StyleX overrides                                            |

#### Data attributes

| Attribute               | Description                                        |
| ----------------------- | -------------------------------------------------- |
| `data-scrolling`        | Present while the user is scrolling                |
| `data-has-overflow-x`   | Present when content is wider than the viewport    |
| `data-has-overflow-y`   | Present when content is taller than the viewport   |
| `data-overflow-x-start` | Present when there is overflow on the inline-start |
| `data-overflow-x-end`   | Present when there is overflow on the inline-end   |
| `data-overflow-y-start` | Present when there is overflow on the block-start  |
| `data-overflow-y-end`   | Present when there is overflow on the block-end    |

### Viewport

| Prop | Type           | Default | Description      |
| ---- | -------------- | ------- | ---------------- |
| `sx` | `StyleXStyles` | —       | StyleX overrides |

### Scrollbar

| Prop          | Type                         | Default      | Description                                                  |
| ------------- | ---------------------------- | ------------ | ------------------------------------------------------------ |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Whether the scrollbar controls vertical or horizontal scroll |
| `keepMounted` | `boolean`                    | `false`      | Keep in the DOM when the viewport isn't scrollable           |
| `sx`          | `StyleXStyles`               | —            | StyleX overrides                                             |

#### Data attributes

| Attribute             | Description                               |
| --------------------- | ----------------------------------------- |
| `data-orientation`    | `'horizontal'` or `'vertical'`            |
| `data-hovering`       | Present when the pointer is over the area |
| `data-scrolling`      | Present while the user is scrolling       |
| `data-has-overflow-x` | Present when content is wider             |
| `data-has-overflow-y` | Present when content is taller            |

### Thumb

| Prop | Type           | Default | Description      |
| ---- | -------------- | ------- | ---------------- |
| `sx` | `StyleXStyles` | —       | StyleX overrides |

#### Data attributes

| Attribute          | Description                    |
| ------------------ | ------------------------------ |
| `data-orientation` | `'horizontal'` or `'vertical'` |

#### CSS variables

| Variable                     | Description                             |
| ---------------------------- | --------------------------------------- |
| `--scroll-area-thumb-height` | The thumb height (vertical scrollbars)  |
| `--scroll-area-thumb-width`  | The thumb width (horizontal scrollbars) |

### Corner

| Prop | Type           | Default | Description      |
| ---- | -------------- | ------- | ---------------- |
| `sx` | `StyleXStyles` | —       | StyleX overrides |

## When to Use

- A bounded scroll region inside a card, drawer, dialog, or panel that needs a custom-styled scrollbar
- Horizontal scrolling rows of chips, tags, thumbnails, or other inline content
- Tables or grids that overflow in both directions and need a corner element

## When NOT to Use

- Whole-document or viewport scrolling — let the browser handle that
- Virtualized lists with thousands of items — pair with a virtualization library or skip
- Containers that should grow with their content — a plain `<div>` is enough
