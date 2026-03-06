# AlertDialog

A modal dialog that requires explicit user acknowledgment. Used for destructive or irreversible actions where the user must confirm before proceeding.

## Anatomy

```
<AlertDialog.Root>
  <AlertDialog.Trigger />
  <AlertDialog.Portal>
    <AlertDialog.Backdrop />
    <AlertDialog.Popup>
      <AlertDialog.Title />
      <AlertDialog.Description />
      <AlertDialog.Actions>
        <AlertDialog.Close />
      </AlertDialog.Actions>
    </AlertDialog.Popup>
  </AlertDialog.Portal>
</AlertDialog.Root>
```

## Examples

### Basic delete confirmation

```tsx
<AlertDialog.Root>
  <AlertDialog.Trigger
    render={
      <Button variant="outline" color="destructive">
        Delete
      </Button>
    }
  />
  <AlertDialog.Portal>
    <AlertDialog.Backdrop />
    <AlertDialog.Popup>
      <AlertDialog.Title>Delete this item?</AlertDialog.Title>
      <AlertDialog.Description>This action cannot be undone.</AlertDialog.Description>
      <AlertDialog.Actions>
        <AlertDialog.Close render={<Button variant="ghost">Cancel</Button>} />
        <AlertDialog.Close render={<Button color="destructive">Delete</Button>} />
      </AlertDialog.Actions>
    </AlertDialog.Popup>
  </AlertDialog.Portal>
</AlertDialog.Root>
```

### Controlled with callback

```tsx
const [open, setOpen] = useState(false);

<AlertDialog.Root open={open} onOpenChange={setOpen}>
  <AlertDialog.Trigger render={<Button color="destructive">Remove account</Button>} />
  <AlertDialog.Portal>
    <AlertDialog.Backdrop />
    <AlertDialog.Popup>
      <AlertDialog.Title>Remove your account?</AlertDialog.Title>
      <AlertDialog.Description>All data will be permanently deleted.</AlertDialog.Description>
      <AlertDialog.Actions>
        <AlertDialog.Close render={<Button variant="ghost">Cancel</Button>} />
        <AlertDialog.Close
          render={<Button color="destructive">Remove</Button>}
          onClick={handleRemove}
        />
      </AlertDialog.Actions>
    </AlertDialog.Popup>
  </AlertDialog.Portal>
</AlertDialog.Root>;
```

### Discard unsaved changes

```tsx
<AlertDialog.Root>
  <AlertDialog.Trigger render={<Button variant="ghost">Leave page</Button>} />
  <AlertDialog.Portal>
    <AlertDialog.Backdrop />
    <AlertDialog.Popup>
      <AlertDialog.Title>Discard changes?</AlertDialog.Title>
      <AlertDialog.Description>You have unsaved changes that will be lost.</AlertDialog.Description>
      <AlertDialog.Actions>
        <AlertDialog.Close render={<Button variant="ghost">Keep editing</Button>} />
        <AlertDialog.Close render={<Button color="destructive">Discard</Button>} />
      </AlertDialog.Actions>
    </AlertDialog.Popup>
  </AlertDialog.Portal>
</AlertDialog.Root>
```

## CSS Requirements

Backdrop fade and popup scale animations require global CSS inside `@layer priority1`:

```css
@layer priority1 {
  .basex-alert-dialog-backdrop {
    opacity: 1;
    transition: opacity 150ms ease-out;
  }
  .basex-alert-dialog-backdrop[data-starting-style],
  .basex-alert-dialog-backdrop[data-ending-style] {
    opacity: 0;
  }

  .basex-alert-dialog-popup {
    opacity: 1;
    transform: scale(1);
    transition:
      opacity 150ms ease-out,
      transform 150ms ease-out;
  }
  .basex-alert-dialog-popup[data-starting-style],
  .basex-alert-dialog-popup[data-ending-style] {
    opacity: 0;
    transform: scale(0.95);
  }
}
```

## API Reference

### Root

| Prop                   | Type                                                        | Default | Description                                    |
| ---------------------- | ----------------------------------------------------------- | ------- | ---------------------------------------------- |
| `open`                 | `boolean`                                                   | —       | Controlled open state                          |
| `defaultOpen`          | `boolean`                                                   | `false` | Initial open state for uncontrolled mode       |
| `onOpenChange`         | `(open: boolean, eventDetails: ChangeEventDetails) => void` | —       | Callback fired when the dialog opens or closes |
| `onOpenChangeComplete` | `(open: boolean) => void`                                   | —       | Callback fired after animations complete       |

### Trigger

| Prop     | Type                                             | Default | Description                          |
| -------- | ------------------------------------------------ | ------- | ------------------------------------ |
| `render` | `ReactElement \| (props, state) => ReactElement` | —       | Replace element (e.g. styled Button) |
| `sx`     | `StyleXStyles`                                   | —       | StyleX overrides                     |

#### Data attributes

| Attribute         | Description                          |
| ----------------- | ------------------------------------ |
| `data-popup-open` | Present when the dialog is open      |
| `data-disabled`   | Present when the trigger is disabled |

### Portal

| Prop          | Type                                     | Default | Description                            |
| ------------- | ---------------------------------------- | ------- | -------------------------------------- |
| `keepMounted` | `boolean`                                | `true`  | Keep in DOM when closed for animations |
| `container`   | `HTMLElement \| ShadowRoot \| RefObject` | —       | Target parent element                  |

### Backdrop

| Prop | Type           | Default | Description      |
| ---- | -------------- | ------- | ---------------- |
| `sx` | `StyleXStyles` | —       | StyleX overrides |

#### Data attributes

| Attribute             | Description                       |
| --------------------- | --------------------------------- |
| `data-open`           | Present when the dialog is open   |
| `data-closed`         | Present when the dialog is closed |
| `data-starting-style` | Present during entrance animation |
| `data-ending-style`   | Present during exit animation     |

### Popup

| Prop           | Type                                        | Default | Description                         |
| -------------- | ------------------------------------------- | ------- | ----------------------------------- |
| `initialFocus` | `boolean \| RefObject \| () => HTMLElement` | —       | Element to focus when dialog opens  |
| `finalFocus`   | `boolean \| RefObject \| () => HTMLElement` | —       | Element to focus when dialog closes |
| `sx`           | `StyleXStyles`                              | —       | StyleX overrides                    |

#### Data attributes

| Attribute                 | Description                               |
| ------------------------- | ----------------------------------------- |
| `data-open`               | Present when the dialog is open           |
| `data-closed`             | Present when the dialog is closed         |
| `data-starting-style`     | Present during entrance animation         |
| `data-ending-style`       | Present during exit animation             |
| `data-nested`             | Present when nested inside another dialog |
| `data-nested-dialog-open` | Present when a child dialog is open       |

#### CSS variables

| Variable           | Description                            |
| ------------------ | -------------------------------------- |
| `--nested-dialogs` | Count of nested open dialogs (integer) |

### Title

| Prop | Type           | Default | Description      |
| ---- | -------------- | ------- | ---------------- |
| `sx` | `StyleXStyles` | —       | StyleX overrides |

### Description

| Prop | Type           | Default | Description      |
| ---- | -------------- | ------- | ---------------- |
| `sx` | `StyleXStyles` | —       | StyleX overrides |

### Actions

| Prop | Type           | Default | Description      |
| ---- | -------------- | ------- | ---------------- |
| `sx` | `StyleXStyles` | —       | StyleX overrides |

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

- Confirming destructive actions (delete, remove, discard)
- Blocking actions that require explicit acknowledgment (accept terms, consent)
- Preventing accidental data loss (unsaved changes warning)

## When NOT to Use

- Displaying informational content or forms — use Dialog instead
- Non-critical notifications — use Toast instead
- Easily reversible actions — prefer inline undo patterns
- Overlays that should dismiss on backdrop click — use Dialog instead
