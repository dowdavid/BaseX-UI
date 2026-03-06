# Drawer

A slide-out panel anchored to a screen edge for supplementary content, navigation, or forms. Supports swipe-to-dismiss, snap points, and nested drawers.

## Anatomy

```
<Drawer.Root>
  <Drawer.Trigger />
  <Drawer.Portal>
    <Drawer.Backdrop />
    <Drawer.Popup>
      <Drawer.Header>
        <Drawer.Title />
        <Drawer.Description />
      </Drawer.Header>
      <Drawer.Panel>
        {/* scrollable content */}
      </Drawer.Panel>
      <Drawer.Footer>
        <Drawer.Close />
      </Drawer.Footer>
    </Drawer.Popup>
  </Drawer.Portal>
</Drawer.Root>
```

## Examples

### Basic bottom drawer

```tsx
<Drawer.Root>
  <Drawer.Trigger render={<Button>Open drawer</Button>} />
  <Drawer.Portal>
    <Drawer.Backdrop />
    <Drawer.Popup>
      <Drawer.Header>
        <Drawer.Title>Drawer title</Drawer.Title>
        <Drawer.Description>A simple drawer with some content.</Drawer.Description>
      </Drawer.Header>
      <Drawer.Panel>
        <p>Drawer content goes here.</p>
      </Drawer.Panel>
      <Drawer.Footer>
        <Drawer.Close render={<Button>Close</Button>} />
      </Drawer.Footer>
    </Drawer.Popup>
  </Drawer.Portal>
</Drawer.Root>
```

### Form drawer

```tsx
const [open, setOpen] = useState(false);

<Drawer.Root open={open} onOpenChange={setOpen}>
  <Drawer.Trigger render={<Button>Add item</Button>} />
  <Drawer.Portal>
    <Drawer.Backdrop />
    <Drawer.Popup>
      <form onSubmit={handleSubmit} style={{ display: 'contents' }}>
        <Drawer.Header>
          <Drawer.Title>Add item</Drawer.Title>
          <Drawer.Description>Fill in the details below.</Drawer.Description>
        </Drawer.Header>
        <Drawer.Panel>{/* form fields */}</Drawer.Panel>
        <Drawer.Footer>
          <Drawer.Close render={<Button variant="ghost">Cancel</Button>} />
          <Button type="submit">Save</Button>
        </Drawer.Footer>
      </form>
    </Drawer.Popup>
  </Drawer.Portal>
</Drawer.Root>;
```

**Note:** Wrap the form around Header, Panel, and Footer with `display: contents` so it participates in the Popup's flex layout while still allowing native form submission.

### Navigation drawer (left-anchored)

```tsx
<Drawer.Root swipeDirection="left">
  <Drawer.Trigger render={<Button variant="ghost">Menu</Button>} />
  <Drawer.Portal>
    <Drawer.Backdrop />
    <Drawer.Popup showCloseButton={false}>
      <Drawer.Header>
        <Drawer.Title>Navigation</Drawer.Title>
      </Drawer.Header>
      <Drawer.Panel>
        <nav>
          <a href="/home">Home</a>
          <a href="/settings">Settings</a>
          <a href="/about">About</a>
        </nav>
      </Drawer.Panel>
    </Drawer.Popup>
  </Drawer.Portal>
</Drawer.Root>
```

## CSS Requirements

Backdrop fade, popup slide, and scroll indicator animations require global CSS inside `@layer priority1`:

```css
@layer priority1 {
  /* Drawer viewport — non-interactive when closed */
  .basex-drawer-viewport {
    pointer-events: none;
  }
  .basex-drawer-viewport:has(.basex-drawer-popup[data-open]),
  .basex-drawer-viewport:has(.basex-drawer-popup[data-ending-style]) {
    pointer-events: auto;
  }

  /* Drawer backdrop — 450ms smooth ease, swipe-reactive opacity */
  .basex-drawer-backdrop {
    opacity: calc(1 - var(--drawer-swipe-progress, 0));
    transition: opacity 450ms cubic-bezier(0.32, 0.72, 0, 1);
  }
  .basex-drawer-backdrop[data-starting-style],
  .basex-drawer-backdrop[data-ending-style] {
    opacity: 0;
  }
  .basex-drawer-backdrop[data-swiping] {
    transition-duration: 0ms;
  }
  .basex-drawer-backdrop[data-ending-style] {
    transition-duration: calc(var(--drawer-swipe-strength, 1) * 400ms);
  }

  /* Drawer popup slide — 450ms smooth ease, swipe-reactive transform */
  .basex-drawer-popup {
    will-change: transform;
    transition: transform 450ms cubic-bezier(0.32, 0.72, 0, 1);
  }
  .basex-drawer-popup[data-swiping] {
    transition-duration: 0ms;
  }
  .basex-drawer-popup[data-ending-style] {
    transition-duration: calc(var(--drawer-swipe-strength, 1) * 400ms);
  }
  /* Closed state — off-screen and hidden */
  .basex-drawer-popup--down:not([data-open]):not([data-starting-style]):not([data-ending-style]) {
    transform: translateY(100%);
    visibility: hidden;
  }
  .basex-drawer-popup--up:not([data-open]):not([data-starting-style]):not([data-ending-style]) {
    transform: translateY(-100%);
    visibility: hidden;
  }
  .basex-drawer-popup--left:not([data-open]):not([data-starting-style]):not([data-ending-style]) {
    transform: translateX(-100%);
    visibility: hidden;
  }
  .basex-drawer-popup--right:not([data-open]):not([data-starting-style]):not([data-ending-style]) {
    transform: translateX(100%);
    visibility: hidden;
  }
  /* Bottom (default): slide up */
  .basex-drawer-popup--down {
    transform: translateY(var(--drawer-swipe-movement-y, 0));
  }
  .basex-drawer-popup--down[data-starting-style],
  .basex-drawer-popup--down[data-ending-style] {
    transform: translateY(100%);
  }
  /* Top: slide down */
  .basex-drawer-popup--up {
    transform: translateY(var(--drawer-swipe-movement-y, 0));
  }
  .basex-drawer-popup--up[data-starting-style],
  .basex-drawer-popup--up[data-ending-style] {
    transform: translateY(-100%);
  }
  /* Left: slide from left */
  .basex-drawer-popup--left {
    transform: translateX(var(--drawer-swipe-movement-x, 0));
  }
  .basex-drawer-popup--left[data-starting-style],
  .basex-drawer-popup--left[data-ending-style] {
    transform: translateX(-100%);
  }
  /* Right: slide from right */
  .basex-drawer-popup--right {
    transform: translateX(var(--drawer-swipe-movement-x, 0));
  }
  .basex-drawer-popup--right[data-starting-style],
  .basex-drawer-popup--right[data-ending-style] {
    transform: translateX(100%);
  }

  /* Drawer panel scroll indicators — State: 100ms ease-out */
  .basex-drawer-panel {
    --_shadow-top: inset 0 8px 6px -6px transparent;
    --_shadow-bottom: inset 0 -8px 6px -6px transparent;
    box-shadow: var(--_shadow-top), var(--_shadow-bottom);
    transition: box-shadow 100ms cubic-bezier(0, 0, 0.2, 1);
  }
  .basex-drawer-panel[data-scroll-top] {
    --_shadow-top: inset 0 8px 6px -6px oklch(0 0 0 / 0.08);
  }
  .basex-drawer-panel[data-scroll-bottom] {
    --_shadow-bottom: inset 0 -8px 6px -6px oklch(0 0 0 / 0.08);
  }
}
```

## API Reference

### Root

| Prop                   | Type                                                        | Default  | Description                                                   |
| ---------------------- | ----------------------------------------------------------- | -------- | ------------------------------------------------------------- |
| `open`                 | `boolean`                                                   | —        | Controlled open state                                         |
| `defaultOpen`          | `boolean`                                                   | `false`  | Initial open state for uncontrolled mode                      |
| `onOpenChange`         | `(open: boolean, eventDetails: ChangeEventDetails) => void` | —        | Callback fired when the drawer opens or closes                |
| `onOpenChangeComplete` | `(open: boolean) => void`                                   | —        | Callback fired after animations complete                      |
| `modal`                | `boolean`                                                   | `true`   | Whether the drawer is modal                                   |
| `swipeDirection`       | `'up' \| 'down' \| 'left' \| 'right'`                       | `'down'` | Direction to swipe to dismiss; determines edge anchoring      |
| `snapPoints`           | `number[]`                                                  | —        | Array of snap points (0–1) the drawer can rest at when swiped |

### Trigger

| Prop     | Type                                             | Default | Description                          |
| -------- | ------------------------------------------------ | ------- | ------------------------------------ |
| `render` | `ReactElement \| (props, state) => ReactElement` | —       | Replace element (e.g. styled Button) |
| `sx`     | `StyleXStyles`                                   | —       | StyleX overrides                     |

#### Data attributes

| Attribute         | Description                          |
| ----------------- | ------------------------------------ |
| `data-popup-open` | Present when the drawer is open      |
| `data-disabled`   | Present when the trigger is disabled |

### Portal

| Prop          | Type                                     | Default | Description                                 |
| ------------- | ---------------------------------------- | ------- | ------------------------------------------- |
| `keepMounted` | `boolean`                                | —       | Keep in DOM when closed for exit animations |
| `container`   | `HTMLElement \| ShadowRoot \| RefObject` | —       | Target parent element                       |

### Backdrop

| Prop | Type           | Default | Description      |
| ---- | -------------- | ------- | ---------------- |
| `sx` | `StyleXStyles` | —       | StyleX overrides |

#### Data attributes

| Attribute             | Description                       |
| --------------------- | --------------------------------- |
| `data-open`           | Present when the drawer is open   |
| `data-closed`         | Present when the drawer is closed |
| `data-starting-style` | Present during entrance animation |
| `data-ending-style`   | Present during exit animation     |

### Popup

| Prop              | Type                                        | Default | Description                                  |
| ----------------- | ------------------------------------------- | ------- | -------------------------------------------- |
| `showCloseButton` | `boolean`                                   | `true`  | Whether to show the X close button top-right |
| `initialFocus`    | `boolean \| RefObject \| () => HTMLElement` | —       | Element to focus when drawer opens           |
| `finalFocus`      | `boolean \| RefObject \| () => HTMLElement` | —       | Element to focus when drawer closes          |
| `sx`              | `StyleXStyles`                              | —       | StyleX overrides                             |

#### Data attributes

| Attribute                 | Description                                |
| ------------------------- | ------------------------------------------ |
| `data-open`               | Present when the drawer is open            |
| `data-closed`             | Present when the drawer is closed          |
| `data-starting-style`     | Present during entrance animation          |
| `data-ending-style`       | Present during exit animation              |
| `data-nested`             | Present when nested inside another drawer  |
| `data-nested-drawer-open` | Present when a child drawer is open        |
| `data-swiping`            | Present while the user is actively swiping |
| `data-swipe-direction`    | The configured swipe direction             |
| `data-expanded`           | Present when the drawer is fully expanded  |

### Header

Container for Title and Description. Provides consistent padding above the scrollable Panel.

| Prop | Type           | Default | Description      |
| ---- | -------------- | ------- | ---------------- |
| `sx` | `StyleXStyles` | —       | StyleX overrides |

### Title

| Prop | Type           | Default | Description      |
| ---- | -------------- | ------- | ---------------- |
| `sx` | `StyleXStyles` | —       | StyleX overrides |

### Description

| Prop | Type           | Default | Description      |
| ---- | -------------- | ------- | ---------------- |
| `sx` | `StyleXStyles` | —       | StyleX overrides |

### Panel

Scrollable content area between Header and Footer. Automatically shows inset box-shadow scroll indicators when content overflows.

| Prop | Type           | Default | Description      |
| ---- | -------------- | ------- | ---------------- |
| `sx` | `StyleXStyles` | —       | StyleX overrides |

#### Data attributes

| Attribute            | Description                                               |
| -------------------- | --------------------------------------------------------- |
| `data-scroll-top`    | Present when content is scrolled away from the top        |
| `data-scroll-bottom` | Present when there is more content below the visible area |

### Footer

Flex row for action buttons. Right-aligned with gap between children.

| Prop      | Type                      | Default     | Description                            |
| --------- | ------------------------- | ----------- | -------------------------------------- |
| `variant` | `'default' \| 'bordered'` | `'default'` | 'bordered' adds a top border separator |
| `sx`      | `StyleXStyles`            | —           | StyleX overrides                       |

### Close

| Prop     | Type                                             | Default | Description                          |
| -------- | ------------------------------------------------ | ------- | ------------------------------------ |
| `render` | `ReactElement \| (props, state) => ReactElement` | —       | Replace element (e.g. styled Button) |
| `sx`     | `StyleXStyles`                                   | —       | StyleX overrides                     |

#### Data attributes

| Attribute       | Description           |
| --------------- | --------------------- |
| `data-disabled` | Present when disabled |

## When to Use

- Side-panel navigation menus, especially on mobile (hamburger menu)
- Mobile bottom sheets for actions, sharing, or option selection
- Supplementary forms and editors that overlay the main content without fully obscuring it
- Filter panels in e-commerce or data-heavy interfaces

## When NOT to Use

- Confirming destructive or irreversible actions — use AlertDialog instead
- Displaying a small contextual tooltip or popover — use Popover or Tooltip instead
- Content that requires centred modal focus with no directional anchoring — use Dialog instead
