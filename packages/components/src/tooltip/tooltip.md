# Tooltip

A small, non-interactive label that appears on hover or focus to describe a UI element. Built on [Base UI Tooltip](https://base-ui.com/react/components/tooltip).

Use Tooltip for short, supplemental hints. For floating panels with interactive content (buttons, forms, links), use [Popover](./popover) instead.

## Anatomy

```tsx
<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger />
    <Tooltip.Portal>
      <Tooltip.Positioner>
        <Tooltip.Popup>
          <Tooltip.Arrow />
        </Tooltip.Popup>
      </Tooltip.Positioner>
    </Tooltip.Portal>
  </Tooltip.Root>
</Tooltip.Provider>
```

- **Provider** -- Coordinates a shared delay group across sibling tooltips. Optional, but required for delay-group behavior.
- **Root** -- Manages open state and provides context to child parts.
- **Trigger** -- The element the tooltip describes. Opens on hover and focus, closes on blur and Escape.
- **Portal** -- Renders content into a React portal.
- **Positioner** -- Positions the popup relative to the trigger.
- **Popup** -- The floating tooltip label. `role="tooltip"` and `aria-describedby` are wired automatically.
- **Arrow** -- An arrow pointing from the popup to the trigger.

## Examples

### Basic

```tsx
<Tooltip.Root>
  <Tooltip.Trigger>Save</Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Positioner>
      <Tooltip.Popup>Saves your changes</Tooltip.Popup>
    </Tooltip.Positioner>
  </Tooltip.Portal>
</Tooltip.Root>
```

### With delay

```tsx
<Tooltip.Root>
  <Tooltip.Trigger delay={300}>Hover me</Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Positioner>
      <Tooltip.Popup>Opens after 300ms</Tooltip.Popup>
    </Tooltip.Positioner>
  </Tooltip.Portal>
</Tooltip.Root>
```

### Shared delay group

Wrap multiple tooltips in `Tooltip.Provider` so moving between them skips the open delay after the first one is shown.

```tsx
<Tooltip.Provider delay={600}>
  <Tooltip.Root>
    <Tooltip.Trigger>Bold</Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.Positioner>
        <Tooltip.Popup>Bold (⌘B)</Tooltip.Popup>
      </Tooltip.Positioner>
    </Tooltip.Portal>
  </Tooltip.Root>
  <Tooltip.Root>
    <Tooltip.Trigger>Italic</Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.Positioner>
        <Tooltip.Popup>Italic (⌘I)</Tooltip.Popup>
      </Tooltip.Positioner>
    </Tooltip.Portal>
  </Tooltip.Root>
</Tooltip.Provider>
```

### Tooltip on a disabled trigger

Disabled buttons don't fire pointer events. Wrap the control in a focusable element and put `Tooltip.Trigger` on the wrapper.

```tsx
<Tooltip.Root>
  <Tooltip.Trigger render={<span tabIndex={0} aria-disabled="true" />}>
    <button disabled>Submit</button>
  </Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Positioner>
      <Tooltip.Popup>Fill out all required fields first</Tooltip.Popup>
    </Tooltip.Positioner>
  </Tooltip.Portal>
</Tooltip.Root>
```

## CSS Requirements

```css
@layer priority1 {
  .basex-tooltip-popup {
    opacity: 1;
    transform: scale(1);
    transition:
      opacity 150ms ease-out,
      transform 150ms ease-out;
  }
  .basex-tooltip-popup[data-starting-style],
  .basex-tooltip-popup[data-ending-style] {
    opacity: 0;
    transform: scale(0.95);
  }
  @media (prefers-reduced-motion: reduce) {
    .basex-tooltip-popup {
      transition: none;
    }
    .basex-tooltip-popup[data-starting-style],
    .basex-tooltip-popup[data-ending-style] {
      opacity: 1;
      transform: none;
    }
  }
}
```

## API Reference

### Tooltip.Provider

| Prop         | Type     | Default | Description                                                                            |
| ------------ | -------- | ------- | -------------------------------------------------------------------------------------- |
| `delay`      | `number` | `600`   | Milliseconds to wait before opening any tooltip in the group.                          |
| `closeDelay` | `number` | `0`     | Milliseconds to wait before closing.                                                   |
| `timeout`    | `number` | `400`   | If a tooltip closes within this window, the next tooltip in the group opens instantly. |

### Tooltip.Root

| Prop           | Type                      | Default | Description                           |
| -------------- | ------------------------- | ------- | ------------------------------------- |
| `open`         | `boolean`                 | --      | Controlled open state.                |
| `onOpenChange` | `(open: boolean) => void` | --      | Callback when open state changes.     |
| `defaultOpen`  | `boolean`                 | `false` | Initial uncontrolled open state.      |
| `disabled`     | `boolean`                 | `false` | When true, the tooltip will not open. |

### Tooltip.Trigger

| Prop         | Type           | Default | Description                                   |
| ------------ | -------------- | ------- | --------------------------------------------- |
| `delay`      | `number`       | `600`   | Per-trigger override of the open delay (ms).  |
| `closeDelay` | `number`       | `0`     | Per-trigger override of the close delay (ms). |
| `sx`         | `StyleXStyles` | --      | StyleX styles for consumer overrides.         |

#### Data attributes

| Attribute         | Description                       |
| ----------------- | --------------------------------- |
| `data-popup-open` | Present when the tooltip is open. |

### Tooltip.Positioner

| Prop         | Type                                     | Default    | Description                    |
| ------------ | ---------------------------------------- | ---------- | ------------------------------ |
| `side`       | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'`    | Preferred side of the trigger. |
| `alignment`  | `'start' \| 'center' \| 'end'`           | `'center'` | Alignment along the side.      |
| `sideOffset` | `number`                                 | `6`        | Offset from the trigger (px).  |
| `sx`         | `StyleXStyles`                           | --         | StyleX styles for overrides.   |

### Tooltip.Popup

| Prop | Type           | Default | Description                           |
| ---- | -------------- | ------- | ------------------------------------- |
| `sx` | `StyleXStyles` | --      | StyleX styles for consumer overrides. |

#### Data attributes

| Attribute             | Description                       |
| --------------------- | --------------------------------- |
| `data-open`           | Present when the tooltip is open. |
| `data-starting-style` | Present during open animation.    |
| `data-ending-style`   | Present during close animation.   |

### Tooltip.Arrow

| Prop | Type           | Default | Description                           |
| ---- | -------------- | ------- | ------------------------------------- |
| `sx` | `StyleXStyles` | --      | StyleX styles for consumer overrides. |

## When to Use

- Labeling icon-only buttons or compact controls
- Short, supplemental hints triggered by hover or focus
- Toolbars and rows of related controls (with `Tooltip.Provider` for shared delay)

## When NOT to Use

- **Interactive content** -- use [Popover](./popover) for floating panels that contain buttons, links, or forms
- **Rich link previews** -- use [PreviewCard](./preview-card) for hover previews of content
- **Critical information** -- tooltips are hidden by default and unreachable on touch; use inline text or `Field.Description`
- **Disabled triggers** -- wrap the disabled control in a focusable span; native `disabled` buttons don't fire pointer events
