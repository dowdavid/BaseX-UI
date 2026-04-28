# Menubar

A horizontal container for multiple menus, providing keyboard navigation between menu triggers. Built on [Base UI Menubar](https://base-ui.com/react/components/menubar).

## Anatomy

```tsx
<Menubar>
  <Menu.Root>
    <Menu.Trigger />
    <Menu.Portal>
      <Menu.Positioner>
        <Menu.Popup>
          <Menu.Item />
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  </Menu.Root>
</Menubar>
```

- **Menubar** -- The container that groups multiple `Menu.Root` components with shared keyboard navigation.

## Examples

### Basic application menubar

```tsx
<Menubar>
  <Menu.Root>
    <Menu.Trigger>File</Menu.Trigger>
    <Menu.Portal>
      <Menu.Positioner>
        <Menu.Popup>
          <Menu.Item>New</Menu.Item>
          <Menu.Item>Open</Menu.Item>
          <Menu.Item>Save</Menu.Item>
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  </Menu.Root>
  <Menu.Root>
    <Menu.Trigger>Edit</Menu.Trigger>
    <Menu.Portal>
      <Menu.Positioner>
        <Menu.Popup>
          <Menu.Item>Undo</Menu.Item>
          <Menu.Item>Redo</Menu.Item>
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  </Menu.Root>
</Menubar>
```

### Disabled menubar

```tsx
<Menubar disabled>
  <Menu.Root>
    <Menu.Trigger>File</Menu.Trigger>
    ...
  </Menu.Root>
</Menubar>
```

## API Reference

### Menubar

| Prop          | Type                         | Default        | Description                                            |
| ------------- | ---------------------------- | -------------- | ------------------------------------------------------ |
| `modal`       | `boolean`                    | `true`         | Whether the menubar is modal when a menu is open.      |
| `disabled`    | `boolean`                    | `false`        | Whether the entire menubar is disabled.                |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | The orientation of the menubar.                        |
| `loopFocus`   | `boolean`                    | `true`         | Whether to loop keyboard focus back to the first item. |
| `sx`          | `StyleXStyles`               | --             | StyleX styles for consumer overrides.                  |

#### Data attributes

| Attribute          | Description                           |
| ------------------ | ------------------------------------- |
| `data-orientation` | The orientation of the menubar.       |
| `data-disabled`    | Present when the menubar is disabled. |

## When to Use

- Application-style menu bars (File, Edit, View, Help)
- Grouping multiple related dropdown menus with shared keyboard navigation
- Desktop-like application interfaces

## When NOT to Use

- **Single dropdown menu** -- use Menu alone
- **Site navigation with dropdowns** -- use NavigationMenu
- **Toolbar with buttons** -- use Toolbar
