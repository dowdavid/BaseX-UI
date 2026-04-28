# ContextMenu

A right-click (or long-press on touch) context menu, supporting items, checkbox items, radio items, submenus, and keyboard navigation. Built on [Base UI ContextMenu](https://base-ui.com/react/components/context-menu).

## Anatomy

```tsx
<ContextMenu.Root>
  <ContextMenu.Trigger />
  <ContextMenu.Portal>
    <ContextMenu.Positioner>
      <ContextMenu.Popup>
        <ContextMenu.Item />
        <ContextMenu.Separator />
      </ContextMenu.Popup>
    </ContextMenu.Positioner>
  </ContextMenu.Portal>
</ContextMenu.Root>
```

- **Root** -- Provides context menu state and context. Does not render a DOM element.
- **Trigger** -- The area that opens the menu on right-click or long press. Renders a `<div>`, not a button.
- **Portal** -- Renders the popup in a React portal.
- **Positioner** -- Positions the popup at the pointer.
- **Popup** -- The context menu popup container.
- **Item** -- A menu item with keyboard navigation support.
- **LinkItem** -- A menu item that renders as an anchor link.
- **Group** -- Groups related items together.
- **GroupLabel** -- A label for a group of items.
- **Separator** -- A visual separator between items.
- **CheckboxItem** -- A toggleable checkbox menu item.
- **CheckboxItemIndicator** -- Visual indicator for checkbox items.
- **RadioGroup** -- Groups radio items for single selection.
- **RadioItem** -- A radio-button-style menu item.
- **RadioItemIndicator** -- Visual indicator for radio items.
- **SubmenuRoot** -- Container for a nested submenu.
- **SubmenuTrigger** -- The item that opens a submenu.
- **Arrow** -- An optional arrow pointing to the trigger.
- **Backdrop** -- An optional backdrop behind the menu.

## Examples

### Basic context menu

```tsx
<ContextMenu.Root>
  <ContextMenu.Trigger>Right-click here</ContextMenu.Trigger>
  <ContextMenu.Portal>
    <ContextMenu.Positioner>
      <ContextMenu.Popup>
        <ContextMenu.Item>Cut</ContextMenu.Item>
        <ContextMenu.Item>Copy</ContextMenu.Item>
        <ContextMenu.Item>Paste</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item destructive>Delete</ContextMenu.Item>
      </ContextMenu.Popup>
    </ContextMenu.Positioner>
  </ContextMenu.Portal>
</ContextMenu.Root>
```

### Context menu with groups

```tsx
<ContextMenu.Root>
  <ContextMenu.Trigger>Right-click here</ContextMenu.Trigger>
  <ContextMenu.Portal>
    <ContextMenu.Positioner>
      <ContextMenu.Popup>
        <ContextMenu.Group>
          <ContextMenu.GroupLabel>Edit</ContextMenu.GroupLabel>
          <ContextMenu.Item>Cut</ContextMenu.Item>
          <ContextMenu.Item>Copy</ContextMenu.Item>
        </ContextMenu.Group>
        <ContextMenu.Separator />
        <ContextMenu.Group>
          <ContextMenu.GroupLabel>View</ContextMenu.GroupLabel>
          <ContextMenu.Item>Zoom In</ContextMenu.Item>
          <ContextMenu.Item>Zoom Out</ContextMenu.Item>
        </ContextMenu.Group>
      </ContextMenu.Popup>
    </ContextMenu.Positioner>
  </ContextMenu.Portal>
</ContextMenu.Root>
```

### Context menu with a submenu

```tsx
<ContextMenu.Root>
  <ContextMenu.Trigger>Right-click here</ContextMenu.Trigger>
  <ContextMenu.Portal>
    <ContextMenu.Positioner>
      <ContextMenu.Popup>
        <ContextMenu.Item>Open</ContextMenu.Item>
        <ContextMenu.SubmenuRoot>
          <ContextMenu.SubmenuTrigger>Share</ContextMenu.SubmenuTrigger>
          <ContextMenu.Portal>
            <ContextMenu.Positioner>
              <ContextMenu.Popup>
                <ContextMenu.Item>Email</ContextMenu.Item>
                <ContextMenu.Item>Copy Link</ContextMenu.Item>
              </ContextMenu.Popup>
            </ContextMenu.Positioner>
          </ContextMenu.Portal>
        </ContextMenu.SubmenuRoot>
      </ContextMenu.Popup>
    </ContextMenu.Positioner>
  </ContextMenu.Portal>
</ContextMenu.Root>
```

## CSS Requirements

Context menu popup animations use global CSS with Base UI data attributes:

```css
@layer priority1 {
  .basex-context-menu-popup {
    opacity: 1;
    transform: scale(1);
    transition:
      opacity 150ms ease-out,
      transform 150ms ease-out;
  }
  .basex-context-menu-popup[data-starting-style],
  .basex-context-menu-popup[data-ending-style] {
    opacity: 0;
    transform: scale(0.95);
  }
}
```

## API Reference

### ContextMenu.Root

| Prop           | Type                                    | Default | Description                                    |
| -------------- | --------------------------------------- | ------- | ---------------------------------------------- |
| `open`         | `boolean`                               | --      | Whether the context menu is open (controlled). |
| `onOpenChange` | `(open: boolean, event: Event) => void` | --      | Callback when open state changes.              |

### ContextMenu.Trigger

Renders a `<div>` that opens the menu on right-click or long press.

| Prop | Type           | Default | Description                           |
| ---- | -------------- | ------- | ------------------------------------- |
| `sx` | `StyleXStyles` | --      | StyleX styles for consumer overrides. |

#### Data attributes

| Attribute       | Description                            |
| --------------- | -------------------------------------- |
| `data-pressed`  | Present when the trigger is activated. |
| `data-disabled` | Present when the trigger is disabled.  |

### ContextMenu.Item

| Prop           | Type           | Default | Description                                         |
| -------------- | -------------- | ------- | --------------------------------------------------- |
| `destructive`  | `boolean`      | `false` | Whether the item is styled as a destructive action. |
| `closeOnClick` | `boolean`      | `true`  | Whether clicking the item closes the menu.          |
| `disabled`     | `boolean`      | `false` | Whether the item is disabled.                       |
| `sx`           | `StyleXStyles` | --      | StyleX styles for consumer overrides.               |

#### Data attributes

| Attribute          | Description                           |
| ------------------ | ------------------------------------- |
| `data-highlighted` | Present when the item is highlighted. |
| `data-disabled`    | Present when the item is disabled.    |

### ContextMenu.Separator

| Prop | Type           | Default | Description                           |
| ---- | -------------- | ------- | ------------------------------------- |
| `sx` | `StyleXStyles` | --      | StyleX styles for consumer overrides. |

## When to Use

- Right-click or long-press contextual actions on an element
- Per-row actions in tables, files, or canvas elements
- Secondary actions that supplement a visible primary control

## When NOT to Use

- **Menu triggered by a visible button** -- use Menu
- **Form value selection** -- use Select or Combobox
- **The only way to access an action** -- right-click is not discoverable; always provide an alternative path
