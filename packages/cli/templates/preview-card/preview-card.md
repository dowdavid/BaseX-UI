# Preview Card

A hover-triggered card that shows a preview of linked content. Built on [Base UI PreviewCard](https://base-ui.com/react/components/preview-card).

## Anatomy

```tsx
<PreviewCard.Root>
  <PreviewCard.Trigger />
  <PreviewCard.Portal>
    <PreviewCard.Positioner>
      <PreviewCard.Popup>
        <PreviewCard.Arrow />
        {/* preview content */}
      </PreviewCard.Popup>
    </PreviewCard.Positioner>
  </PreviewCard.Portal>
</PreviewCard.Root>
```

- **Root** -- Manages hover/focus state and provides context to child parts.
- **Trigger** -- The link or element that triggers the preview card on hover.
- **Portal** -- Renders content into a React portal.
- **Positioner** -- Positions the popup relative to the trigger.
- **Popup** -- The floating preview content container.
- **Arrow** -- An arrow pointing from the popup to the trigger.

## Examples

### Basic preview card

```tsx
<PreviewCard.Root>
  <PreviewCard.Trigger href="#">Hover me</PreviewCard.Trigger>
  <PreviewCard.Portal>
    <PreviewCard.Positioner>
      <PreviewCard.Popup>A simple preview of the linked content.</PreviewCard.Popup>
    </PreviewCard.Positioner>
  </PreviewCard.Portal>
</PreviewCard.Root>
```

### With arrow

```tsx
<PreviewCard.Root>
  <PreviewCard.Trigger href="#">Link</PreviewCard.Trigger>
  <PreviewCard.Portal>
    <PreviewCard.Positioner sideOffset={8}>
      <PreviewCard.Popup>
        <PreviewCard.Arrow />
        Preview content with arrow.
      </PreviewCard.Popup>
    </PreviewCard.Positioner>
  </PreviewCard.Portal>
</PreviewCard.Root>
```

## CSS Requirements

```css
@layer priority1 {
  .basex-preview-card-popup {
    opacity: 1;
    transform: translateY(0);
    transition:
      opacity 200ms ease-out,
      transform 200ms ease-out;
  }
  .basex-preview-card-popup[data-starting-style],
  .basex-preview-card-popup[data-ending-style] {
    opacity: 0;
    transform: translateY(-4px);
  }
}
```

## API Reference

### PreviewCard.Root

| Prop           | Type                      | Default | Description                       |
| -------------- | ------------------------- | ------- | --------------------------------- |
| `open`         | `boolean`                 | --      | Controlled open state.            |
| `onOpenChange` | `(open: boolean) => void` | --      | Callback when open state changes. |
| `defaultOpen`  | `boolean`                 | `false` | Initial uncontrolled open state.  |
| `delay`        | `number`                  | `600`   | Delay (ms) before card appears.   |
| `closeDelay`   | `number`                  | `300`   | Delay (ms) before card hides.     |

### PreviewCard.Trigger

| Prop | Type           | Default | Description                           |
| ---- | -------------- | ------- | ------------------------------------- |
| `sx` | `StyleXStyles` | --      | StyleX styles for consumer overrides. |

#### Data attributes

| Attribute         | Description                            |
| ----------------- | -------------------------------------- |
| `data-popup-open` | Present when the preview card is open. |

### PreviewCard.Positioner

| Prop         | Type                                     | Default    | Description                    |
| ------------ | ---------------------------------------- | ---------- | ------------------------------ |
| `side`       | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Preferred side of the trigger. |
| `sideOffset` | `number`                                 | `8`        | Offset from the trigger (px).  |
| `sx`         | `StyleXStyles`                           | --         | StyleX styles for overrides.   |

### PreviewCard.Popup

| Prop | Type           | Default | Description                           |
| ---- | -------------- | ------- | ------------------------------------- |
| `sx` | `StyleXStyles` | --      | StyleX styles for consumer overrides. |

#### Data attributes

| Attribute             | Description                     |
| --------------------- | ------------------------------- |
| `data-open`           | Present when the card is open.  |
| `data-starting-style` | Present during open animation.  |
| `data-ending-style`   | Present during close animation. |

### PreviewCard.Arrow

| Prop | Type           | Default | Description                           |
| ---- | -------------- | ------- | ------------------------------------- |
| `sx` | `StyleXStyles` | --      | StyleX styles for consumer overrides. |

## When to Use

- Previewing linked content on hover (user profiles, articles)
- Showing additional context without navigating away
- Rich preview cards for links in social or content apps

## When NOT to Use

- **Interactive content** -- use Popover for buttons, forms, or actions
- **Navigation menus** -- use NavigationMenu
- **Simple tooltips** -- use Tooltip for brief text labels
