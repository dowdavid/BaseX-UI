# Popover

A floating content panel that appears next to a trigger element. Built on [Base UI Popover](https://base-ui.com/react/components/popover).

## Anatomy

```tsx
<Popover.Root>
  <Popover.Trigger />
  <Popover.Portal>
    <Popover.Positioner>
      <Popover.Popup>
        <Popover.Arrow />
        <Popover.Title />
        <Popover.Description />
        <Popover.Close />
      </Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
</Popover.Root>
```

- **Root** -- Manages open state and provides context to child parts.
- **Trigger** -- The element that toggles the popover.
- **Portal** -- Renders content into a React portal.
- **Positioner** -- Positions the popup relative to the trigger.
- **Popup** -- The floating content container.
- **Arrow** -- An arrow pointing from the popup to the trigger.
- **Title** -- An accessible title for the popover.
- **Description** -- A description providing additional context.
- **Close** -- A button that closes the popover.

## Examples

### Basic popover

```tsx
<Popover.Root>
  <Popover.Trigger>Info</Popover.Trigger>
  <Popover.Portal>
    <Popover.Positioner>
      <Popover.Popup>This is a popover with some content.</Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
</Popover.Root>
```

### With title and description

```tsx
<Popover.Root>
  <Popover.Trigger>Details</Popover.Trigger>
  <Popover.Portal>
    <Popover.Positioner>
      <Popover.Popup>
        <Popover.Title>Settings</Popover.Title>
        <Popover.Description>Configure your preferences here.</Popover.Description>
        <Popover.Close />
      </Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
</Popover.Root>
```

### With arrow

```tsx
<Popover.Root>
  <Popover.Trigger>Open</Popover.Trigger>
  <Popover.Portal>
    <Popover.Positioner sideOffset={8}>
      <Popover.Popup>
        <Popover.Arrow />
        Content with arrow pointing to the trigger.
      </Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
</Popover.Root>
```

## CSS Requirements

```css
@layer priority1 {
  .basex-popover-popup {
    opacity: 1;
    transform: scale(1);
    transition:
      opacity 150ms ease-out,
      transform 150ms ease-out;
  }
  .basex-popover-popup[data-starting-style],
  .basex-popover-popup[data-ending-style] {
    opacity: 0;
    transform: scale(0.95);
  }
}
```

## API Reference

### Popover.Root

| Prop           | Type                      | Default | Description                       |
| -------------- | ------------------------- | ------- | --------------------------------- |
| `open`         | `boolean`                 | --      | Controlled open state.            |
| `onOpenChange` | `(open: boolean) => void` | --      | Callback when open state changes. |
| `defaultOpen`  | `boolean`                 | `false` | Initial uncontrolled open state.  |

### Popover.Trigger

| Prop | Type           | Default | Description                           |
| ---- | -------------- | ------- | ------------------------------------- |
| `sx` | `StyleXStyles` | --      | StyleX styles for consumer overrides. |

#### Data attributes

| Attribute         | Description                       |
| ----------------- | --------------------------------- |
| `data-popup-open` | Present when the popover is open. |

### Popover.Positioner

| Prop         | Type                                     | Default    | Description                    |
| ------------ | ---------------------------------------- | ---------- | ------------------------------ |
| `side`       | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Preferred side of the trigger. |
| `alignment`  | `'start' \| 'center' \| 'end'`           | `'center'` | Alignment along the side.      |
| `sideOffset` | `number`                                 | `8`        | Offset from the trigger (px).  |
| `sx`         | `StyleXStyles`                           | --         | StyleX styles for overrides.   |

### Popover.Popup

| Prop | Type           | Default | Description                           |
| ---- | -------------- | ------- | ------------------------------------- |
| `sx` | `StyleXStyles` | --      | StyleX styles for consumer overrides. |

#### Data attributes

| Attribute             | Description                       |
| --------------------- | --------------------------------- |
| `data-open`           | Present when the popover is open. |
| `data-starting-style` | Present during open animation.    |
| `data-ending-style`   | Present during close animation.   |

### Popover.Arrow

| Prop | Type           | Default | Description                           |
| ---- | -------------- | ------- | ------------------------------------- |
| `sx` | `StyleXStyles` | --      | StyleX styles for consumer overrides. |

### Popover.Title

| Prop | Type           | Default | Description                           |
| ---- | -------------- | ------- | ------------------------------------- |
| `sx` | `StyleXStyles` | --      | StyleX styles for consumer overrides. |

### Popover.Description

| Prop | Type           | Default | Description                           |
| ---- | -------------- | ------- | ------------------------------------- |
| `sx` | `StyleXStyles` | --      | StyleX styles for consumer overrides. |

### Popover.Close

| Prop | Type           | Default | Description                           |
| ---- | -------------- | ------- | ------------------------------------- |
| `sx` | `StyleXStyles` | --      | StyleX styles for consumer overrides. |

## When to Use

- Contextual information or help text near a trigger
- Small interactive panels (settings, quick actions)
- Rich content that doesn't warrant a full dialog

## When NOT to Use

- **Simple tooltips** -- use Tooltip for non-interactive hover text
- **Complex forms** -- use Dialog for modal workflows
- **Navigation menus** -- use NavigationMenu or Menu
