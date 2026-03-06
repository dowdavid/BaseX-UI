# Alert Dialog — Component Design

## Overview

Alert Dialog is a modal overlay that requires explicit user acknowledgment. Built on `@base-ui/react/alert-dialog` with StyleX styling. Always modal, cannot be dismissed by clicking outside — only via Close buttons or Escape key.

## Parts & Anatomy

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

- **Root**: No DOM — state container
- **Trigger**: `<button>` — opens the dialog
- **Portal**: Renders outside DOM tree. `keepMounted` defaults to `true` for exit animations
- **Backdrop**: `<div>` — semi-transparent overlay with fade animation
- **Popup**: `<div>` — centered card. Viewport is wrapped internally (not exposed)
- **Title**: `<h2>` — heading, wired to `aria-labelledby`
- **Description**: `<p>` — body text, wired to `aria-describedby`
- **Actions**: `<div>` — custom part (not in Base UI), styled flex row for buttons
- **Close**: `<button>` — auto-closes dialog on click. Used for both Cancel and Confirm actions

## Design Decisions

1. **Viewport internal**: Wrapped inside Popup automatically. Consumer never sees it.
2. **Actions part**: Custom addition — Base UI omits it because it's a layout concern, not accessibility. We add it as an opinionated flex row.
3. **Confirm pattern**: Both Cancel and Confirm use `AlertDialog.Close`. Consumer adds `onClick` to the confirm button for side effects before close.
4. **Opinionated single style**: No variant/size props. One look. Customize via `sx`.
5. **Close is unstyled**: Consumer drops in BaseX `<Button>` components via `render` prop.

## Visual Design

- **Backdrop**: `colorOverlay` token, full-screen fixed overlay
- **Popup**: White surface (`colorSurface`), `radiusLg`, `shadowLg`, max-width ~28rem, centered
- **Title**: `fontSizeLg`, `fontWeightSemibold`, `colorText`
- **Description**: `fontSizeSm`, `colorTextMuted`, top margin
- **Actions**: Flex row, right-aligned (`justify-content: flex-end`), `space3` gap, top margin

## Animation (Global CSS)

Per project rules: animated properties in global CSS, not StyleX.

Stable classes: `.basex-alert-dialog-backdrop`, `.basex-alert-dialog-popup`

```css
@layer priority1 {
  .basex-alert-dialog-backdrop {
    opacity: 1;
    transition: opacity 200ms ease-out;
  }
  .basex-alert-dialog-backdrop[data-starting-style],
  .basex-alert-dialog-backdrop[data-ending-style] {
    opacity: 0;
  }

  .basex-alert-dialog-popup {
    opacity: 1;
    transform: scale(1);
    transition:
      opacity 200ms ease-out,
      transform 200ms ease-out;
  }
  .basex-alert-dialog-popup[data-starting-style],
  .basex-alert-dialog-popup[data-ending-style] {
    opacity: 0;
    transform: scale(0.95);
  }
}
```

Presets: Enter 200ms ease-out, Exit 100ms ease-out (matches existing animation presets).

## Props

| Part        | Props                                                         | Notes                                     |
| ----------- | ------------------------------------------------------------- | ----------------------------------------- |
| Root        | `open`, `defaultOpen`, `onOpenChange`, `onOpenChangeComplete` | Pass-through                              |
| Trigger     | `sx`                                                          | Unstyled, use `render` for custom element |
| Portal      | `keepMounted` (default `true`), `container`                   |                                           |
| Backdrop    | `sx`                                                          | Styled overlay                            |
| Popup       | `sx`, `initialFocus`, `finalFocus`                            | Centered card                             |
| Title       | `sx`                                                          | `<h2>`                                    |
| Description | `sx`                                                          | `<p>`                                     |
| Actions     | `sx`                                                          | Custom flex row                           |
| Close       | `sx`                                                          | Unstyled, use `render` for custom element |

## Usage Example

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
        <AlertDialog.Close
          render={<Button color="destructive">Delete</Button>}
          onClick={handleDelete}
        />
      </AlertDialog.Actions>
    </AlertDialog.Popup>
  </AlertDialog.Portal>
</AlertDialog.Root>
```

## Checklist Reference

Follow `docs/new-component-checklist.md` for all implementation steps.
