# Dialog

A general-purpose modal overlay for displaying content, forms, or interactive flows. Dismissible via backdrop click or Escape. Supports Header/Panel/Footer layout, scroll indicators, nested stacking, and an optional close button.

## Anatomy

```
<Dialog.Root>
  <Dialog.Trigger />
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Header>
        <Dialog.Title />
        <Dialog.Description />
      </Dialog.Header>
      <Dialog.Panel>
        {/* scrollable content */}
      </Dialog.Panel>
      <Dialog.Footer>
        <Dialog.Close />
      </Dialog.Footer>
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>
```

## Examples

### Form dialog

```tsx
const [open, setOpen] = useState(false);

<Dialog.Root open={open} onOpenChange={setOpen}>
  <Dialog.Trigger render={<Button>Edit profile</Button>} />
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <form onSubmit={handleSubmit} style={{ display: 'contents' }}>
        <Dialog.Header>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description>Update your display name and bio.</Dialog.Description>
        </Dialog.Header>
        <Dialog.Panel>
          {/* form fields */}
        </Dialog.Panel>
        <Dialog.Footer>
          <Dialog.Close render={<Button variant="ghost">Cancel</Button>} />
          <Button type="submit">Save</Button>
        </Dialog.Footer>
      </form>
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>
```

**Note:** Wrap the form around Header, Panel, and Footer with `display: contents` so it participates in the Popup's flex layout while still allowing native form submission.

### Settings dialog

```tsx
const [open, setOpen] = useState(false);

<Dialog.Root open={open} onOpenChange={setOpen}>
  <Dialog.Trigger render={<Button variant="outline">Settings</Button>} />
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Header>
        <Dialog.Title>Notification settings</Dialog.Title>
        <Dialog.Description>Choose which notifications you receive.</Dialog.Description>
      </Dialog.Header>
      <Dialog.Panel>
        <CheckboxGroup.Root>
          {/* checkbox items */}
        </CheckboxGroup.Root>
      </Dialog.Panel>
      <Dialog.Footer>
        <Dialog.Close render={<Button>Done</Button>} />
      </Dialog.Footer>
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>
```

### Nested dialogs

```tsx
<Dialog.Root>
  <Dialog.Trigger render={<Button>Open</Button>} />
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Header>
        <Dialog.Title>Parent dialog</Dialog.Title>
        <Dialog.Description>This dialog can open another dialog on top.</Dialog.Description>
      </Dialog.Header>
      <Dialog.Footer>
        <Dialog.Close render={<Button variant="ghost">Close</Button>} />
        <Dialog.Root>
          <Dialog.Trigger render={<Button variant="outline">Open nested</Button>} />
          <Dialog.Portal>
            <Dialog.Backdrop />
            <Dialog.Popup>
              <Dialog.Header>
                <Dialog.Title>Nested dialog</Dialog.Title>
                <Dialog.Description>This is a nested dialog.</Dialog.Description>
              </Dialog.Header>
              <Dialog.Footer>
                <Dialog.Close render={<Button>Close</Button>} />
              </Dialog.Footer>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      </Dialog.Footer>
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>
```

The parent dialog recedes (scales down and fades) when the nested dialog opens, creating a stagger effect via the `data-nested-dialog-open` attribute.

## CSS Requirements

Backdrop fade, popup scale, nested stagger, and scroll indicator animations require global CSS inside `@layer priority1`:

```css
@layer priority1 {
  /* Dialog backdrop fade animation — Enter: 200ms ease-out */
  .basex-dialog-backdrop {
    opacity: 1;
    transition: opacity 200ms cubic-bezier(0, 0, 0.2, 1);
  }
  .basex-dialog-backdrop[data-starting-style],
  .basex-dialog-backdrop[data-ending-style] {
    opacity: 0;
  }

  /* Dialog popup scale/fade animation — Enter: 200ms ease-out */
  .basex-dialog-popup {
    opacity: 1;
    transform: scale(1) translateY(0);
    transition: opacity 200ms cubic-bezier(0, 0, 0.2, 1), transform 200ms cubic-bezier(0, 0, 0.2, 1);
  }
  .basex-dialog-popup[data-starting-style],
  .basex-dialog-popup[data-ending-style] {
    opacity: 0;
    transform: scale(0.95) translateY(0);
  }

  /* Nested dialog: parent recedes — Move: 200ms ease-in-out */
  .basex-dialog-popup[data-nested-dialog-open] {
    transform: scale(0.94) translateY(-8px);
    opacity: 0.4;
    pointer-events: none;
    transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Dialog panel scroll indicators — State: 100ms ease-out */
  .basex-dialog-panel {
    --_shadow-top: inset 0 8px 6px -6px transparent;
    --_shadow-bottom: inset 0 -8px 6px -6px transparent;
    box-shadow: var(--_shadow-top), var(--_shadow-bottom);
    transition: box-shadow 100ms cubic-bezier(0, 0, 0.2, 1);
  }
  .basex-dialog-panel[data-scroll-top] {
    --_shadow-top: inset 0 8px 6px -6px oklch(0 0 0 / 0.08);
  }
  .basex-dialog-panel[data-scroll-bottom] {
    --_shadow-bottom: inset 0 -8px 6px -6px oklch(0 0 0 / 0.08);
  }
}
```

## API Reference

### Root

| Prop                    | Type                                                       | Default | Description                                    |
| ----------------------- | ---------------------------------------------------------- | ------- | ---------------------------------------------- |
| `open`                  | `boolean`                                                  | —       | Controlled open state                          |
| `defaultOpen`           | `boolean`                                                  | `false` | Initial open state for uncontrolled mode       |
| `onOpenChange`          | `(open: boolean, eventDetails: ChangeEventDetails) => void`| —       | Callback fired when the dialog opens or closes |
| `onOpenChangeComplete`  | `(open: boolean) => void`                                  | —       | Callback fired after animations complete       |
| `dismissible`           | `boolean`                                                  | `true`  | Whether the dialog closes on backdrop click or Escape |

### Trigger

| Prop     | Type                                          | Default | Description                          |
| -------- | --------------------------------------------- | ------- | ------------------------------------ |
| `render` | `ReactElement \| (props, state) => ReactElement` | —       | Replace element (e.g. styled Button) |
| `sx`     | `StyleXStyles`                                | —       | StyleX overrides                     |

#### Data attributes

| Attribute         | Description                      |
| ----------------- | -------------------------------- |
| `data-popup-open` | Present when the dialog is open  |
| `data-disabled`   | Present when the trigger is disabled |

### Portal

| Prop          | Type                                      | Default | Description                            |
| ------------- | ----------------------------------------- | ------- | -------------------------------------- |
| `keepMounted` | `boolean`                                 | —       | Keep in DOM when closed. Pass true if you need exit animations and handle closed-state visibility in CSS |
| `container`   | `HTMLElement \| ShadowRoot \| RefObject`  | —       | Target parent element                  |

### Backdrop

| Prop | Type           | Default | Description      |
| ---- | -------------- | ------- | ---------------- |
| `sx` | `StyleXStyles` | —       | StyleX overrides |

#### Data attributes

| Attribute             | Description                         |
| --------------------- | ----------------------------------- |
| `data-open`           | Present when the dialog is open     |
| `data-closed`         | Present when the dialog is closed   |
| `data-starting-style` | Present during entrance animation   |
| `data-ending-style`   | Present during exit animation       |

### Popup

| Prop              | Type                                       | Default | Description                                    |
| ----------------- | ------------------------------------------ | ------- | ---------------------------------------------- |
| `showCloseButton` | `boolean`                                  | `true`  | Whether to show the X close button top-right   |
| `initialFocus`    | `boolean \| RefObject \| () => HTMLElement` | —       | Element to focus when dialog opens             |
| `finalFocus`      | `boolean \| RefObject \| () => HTMLElement` | —       | Element to focus when dialog closes            |
| `sx`              | `StyleXStyles`                             | —       | StyleX overrides                               |

#### Data attributes

| Attribute                  | Description                                |
| -------------------------- | ------------------------------------------ |
| `data-open`                | Present when the dialog is open            |
| `data-closed`              | Present when the dialog is closed          |
| `data-starting-style`      | Present during entrance animation          |
| `data-ending-style`        | Present during exit animation              |
| `data-nested`              | Present when nested inside another dialog  |
| `data-nested-dialog-open`  | Present when a child dialog is open        |

#### CSS variables

| Variable            | Description                              |
| ------------------- | ---------------------------------------- |
| `--nested-dialogs`  | Count of nested open dialogs (integer)   |

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

| Attribute            | Description                                                  |
| -------------------- | ------------------------------------------------------------ |
| `data-scroll-top`    | Present when content is scrolled away from the top           |
| `data-scroll-bottom` | Present when there is more content below the visible area    |

### Footer

Flex row for action buttons. Right-aligned with gap between children.

| Prop      | Type                       | Default     | Description                                          |
| --------- | -------------------------- | ----------- | ---------------------------------------------------- |
| `variant` | `'default' \| 'bordered'`  | `'default'` | 'bordered' adds a top border separator               |
| `sx`      | `StyleXStyles`             | —           | StyleX overrides                                     |

### Close

| Prop     | Type                                          | Default | Description                          |
| -------- | --------------------------------------------- | ------- | ------------------------------------ |
| `render` | `ReactElement \| (props, state) => ReactElement` | —       | Replace element (e.g. styled Button) |
| `sx`     | `StyleXStyles`                                | —       | StyleX overrides                     |

#### Data attributes

| Attribute       | Description           |
| --------------- | --------------------- |
| `data-disabled` | Present when disabled |

## When to Use

- Displaying detailed information that needs focused attention (order details, profile views)
- Forms that benefit from modal focus (edit profile, settings, compose message)
- Multi-step flows that shouldn't lose context (wizards, onboarding)
- Content previews (image lightbox, document preview)

## When NOT to Use

- Confirming destructive or irreversible actions — use AlertDialog instead
- Non-critical transient feedback — use Toast instead
- Selecting from a list of options — use Select or Combobox instead
- Content that should remain accessible alongside the page — use Collapsible or inline expansion
