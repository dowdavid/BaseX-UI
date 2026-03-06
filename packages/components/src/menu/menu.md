# Menu

A dropdown menu triggered by a button, supporting items, checkbox items, radio items, submenus, and keyboard navigation. Built on [Base UI Menu](https://base-ui.com/react/components/menu).

## Anatomy

```tsx
<Menu.Root>
  <Menu.Trigger />
  <Menu.Portal>
    <Menu.Positioner>
      <Menu.Popup>
        <Menu.Item />
        <Menu.Separator />
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
</Menu.Root>
```

- **Root** -- Provides menu state and context. Does not render a DOM element.
- **Trigger** -- The button that opens the menu.
- **Portal** -- Renders the popup in a React portal.
- **Positioner** -- Handles popup positioning relative to the trigger.
- **Popup** -- The menu popup container.
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

### Basic dropdown menu

```tsx
<Menu.Root>
  <Menu.Trigger>Options</Menu.Trigger>
  <Menu.Portal>
    <Menu.Positioner>
      <Menu.Popup>
        <Menu.Item>Edit</Menu.Item>
        <Menu.Item>Duplicate</Menu.Item>
        <Menu.Separator />
        <Menu.Item destructive>Delete</Menu.Item>
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
</Menu.Root>
```

### Menu with groups

```tsx
<Menu.Root>
  <Menu.Trigger>View</Menu.Trigger>
  <Menu.Portal>
    <Menu.Positioner>
      <Menu.Popup>
        <Menu.Group>
          <Menu.GroupLabel>Layout</Menu.GroupLabel>
          <Menu.Item>Grid</Menu.Item>
          <Menu.Item>List</Menu.Item>
        </Menu.Group>
        <Menu.Separator />
        <Menu.Group>
          <Menu.GroupLabel>Sort</Menu.GroupLabel>
          <Menu.Item>Name</Menu.Item>
          <Menu.Item>Date</Menu.Item>
        </Menu.Group>
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
</Menu.Root>
```

### Menu with checkbox items

```tsx
<Menu.Root>
  <Menu.Trigger>View</Menu.Trigger>
  <Menu.Portal>
    <Menu.Positioner>
      <Menu.Popup>
        <Menu.CheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>
          <Menu.CheckboxItemIndicator />
          Show Grid
        </Menu.CheckboxItem>
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
</Menu.Root>
```

### Submenu

```tsx
<Menu.Root>
  <Menu.Trigger>File</Menu.Trigger>
  <Menu.Portal>
    <Menu.Positioner>
      <Menu.Popup>
        <Menu.Item>New</Menu.Item>
        <Menu.SubmenuRoot>
          <Menu.SubmenuTrigger>Open Recent</Menu.SubmenuTrigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item>file1.txt</Menu.Item>
                <Menu.Item>file2.txt</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.SubmenuRoot>
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
</Menu.Root>
```

## CSS Requirements

Menu popup animations use global CSS with Base UI data attributes:

```css
@layer priority1 {
  .basex-menu-popup {
    opacity: 1;
    transform: scale(1);
    transition: opacity 150ms ease-out, transform 150ms ease-out;
  }
  .basex-menu-popup[data-starting-style],
  .basex-menu-popup[data-ending-style] {
    opacity: 0;
    transform: scale(0.95);
  }
}
```

## API Reference

### Menu.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | -- | Whether the menu is open (controlled). |
| `onOpenChange` | `(open: boolean, event: Event) => void` | -- | Callback when open state changes. |

### Menu.Trigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sx` | `StyleXStyles` | -- | StyleX styles for consumer overrides. |

#### Data attributes

| Attribute | Description |
|-----------|-------------|
| `data-popup-open` | Present when the menu popup is open. |
| `data-disabled` | Present when the trigger is disabled. |

### Menu.Item

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `destructive` | `boolean` | `false` | Whether the item is styled as a destructive action. |
| `closeOnClick` | `boolean` | `true` | Whether clicking the item closes the menu. |
| `disabled` | `boolean` | `false` | Whether the item is disabled. |
| `sx` | `StyleXStyles` | -- | StyleX styles for consumer overrides. |

#### Data attributes

| Attribute | Description |
|-----------|-------------|
| `data-highlighted` | Present when the item is highlighted. |
| `data-disabled` | Present when the item is disabled. |

### Menu.Separator

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sx` | `StyleXStyles` | -- | StyleX styles for consumer overrides. |

## When to Use

- Dropdown action menus triggered by a button
- Menus with checkbox or radio items for toggling settings
- Nested/cascading menus for complex actions
- Menus with grouped and labeled sections

## When NOT to Use

- **Always-visible navigation** -- use NavigationMenu or a nav bar
- **Form value selection** -- use Select or Combobox
- **Right-click context menu** -- use ContextMenu
