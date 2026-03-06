# NavigationMenu

A site navigation component with hover-triggered dropdown content panels. Built on [Base UI NavigationMenu](https://base-ui.com/react/components/navigation-menu).

## Anatomy

```tsx
<NavigationMenu.Root>
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Trigger />
      <NavigationMenu.Content />
    </NavigationMenu.Item>
    <NavigationMenu.Item>
      <NavigationMenu.Link />
    </NavigationMenu.Item>
  </NavigationMenu.List>
  <NavigationMenu.Portal>
    <NavigationMenu.Positioner>
      <NavigationMenu.Popup>
        <NavigationMenu.Viewport />
      </NavigationMenu.Popup>
    </NavigationMenu.Positioner>
  </NavigationMenu.Portal>
</NavigationMenu.Root>
```

- **Root** -- The `<nav>` container providing state and context.
- **List** -- The list of navigation items.
- **Item** -- A single navigation item (can have a Trigger+Content or just a Link).
- **Trigger** -- A button that opens a content panel on hover or click.
- **Content** -- The dropdown content panel for a trigger.
- **Link** -- A direct navigation link item.
- **Portal** -- Renders the popup in a React portal.
- **Positioner** -- Handles popup positioning.
- **Popup** -- The popup container.
- **Viewport** -- The animated viewport that sizes to the active content.
- **Backdrop** -- An optional backdrop behind the popup.
- **Icon** -- A chevron icon that rotates when open.
- **Arrow** -- An optional arrow pointing to the trigger.

## Examples

### Basic navigation menu

```tsx
<NavigationMenu.Root>
  <NavigationMenu.List>
    <NavigationMenu.Item value="products">
      <NavigationMenu.Trigger>
        Products <NavigationMenu.Icon />
      </NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <a href="/products/a">Product A</a>
        <a href="/products/b">Product B</a>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="/about">About</NavigationMenu.Link>
    </NavigationMenu.Item>
  </NavigationMenu.List>
  <NavigationMenu.Portal>
    <NavigationMenu.Positioner>
      <NavigationMenu.Popup>
        <NavigationMenu.Viewport />
      </NavigationMenu.Popup>
    </NavigationMenu.Positioner>
  </NavigationMenu.Portal>
</NavigationMenu.Root>
```

### Links only

```tsx
<NavigationMenu.Root>
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="/">Home</NavigationMenu.Link>
    </NavigationMenu.Item>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="/about">About</NavigationMenu.Link>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>
```

## CSS Requirements

NavigationMenu animations use global CSS with Base UI data attributes:

```css
@layer priority1 {
  .basex-navigation-menu-popup {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 200ms ease-out, transform 200ms ease-out;
  }
  .basex-navigation-menu-popup[data-starting-style],
  .basex-navigation-menu-popup[data-ending-style] {
    opacity: 0;
    transform: translateY(-4px);
  }
  .basex-navigation-menu-content {
    opacity: 1;
    transition: opacity 200ms ease-out;
  }
  .basex-navigation-menu-content[data-starting-style],
  .basex-navigation-menu-content[data-ending-style] {
    opacity: 0;
  }
}
```

## API Reference

### NavigationMenu.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string \| null` | -- | The currently open item value (controlled). |
| `defaultValue` | `string \| null` | `null` | The initially open item. |
| `onValueChange` | `(value: string \| null) => void` | -- | Callback when the open item changes. |
| `delay` | `number` | `50` | Delay in ms before opening on hover. |
| `closeDelay` | `number` | `50` | Delay in ms before closing on pointer leave. |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | The orientation of the menu. |
| `sx` | `StyleXStyles` | -- | StyleX styles for consumer overrides. |

### NavigationMenu.Trigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sx` | `StyleXStyles` | -- | StyleX styles for consumer overrides. |

#### Data attributes

| Attribute | Description |
|-----------|-------------|
| `data-popup-open` | Present when the content is visible. |

### NavigationMenu.Link

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | -- | The URL the link navigates to. |
| `sx` | `StyleXStyles` | -- | StyleX styles for consumer overrides. |

## When to Use

- Site-wide header navigation with dropdown panels
- Mega menus with multi-column layouts
- Navigation with both link items and dropdown content

## When NOT to Use

- **Action menus** -- use Menu
- **Mobile navigation** -- use Drawer
- **Application menus (File/Edit/View)** -- use Menubar
