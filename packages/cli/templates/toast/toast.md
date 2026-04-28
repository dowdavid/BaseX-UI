# Toast

Ephemeral, accessible notification messages with auto-dismiss, pause-on-hover, swipe-to-dismiss, queue stacking, and screen-reader announcements.

## Anatomy

```
<Toast.Provider>
  {/* app content; call useToast().add(...) anywhere inside */}
  <Toast.Portal>
    <Toast.Viewport>
      {useToast().toasts.map((t) => (
        <Toast.Root key={t.id} toast={t}>
          <Toast.Content>
            <Toast.Title>{t.title}</Toast.Title>
            <Toast.Description>{t.description}</Toast.Description>
          </Toast.Content>
          {t.actionProps && <Toast.Action {...t.actionProps} />}
          <Toast.Close />
        </Toast.Root>
      ))}
    </Toast.Viewport>
  </Toast.Portal>
</Toast.Provider>
```

Mount `Toast.Provider` once near the app root. Anywhere inside the provider, call `useToast()` to get an imperative `add(...)` method.

## Examples

### Basic

```tsx
function SaveButton() {
  const { add } = useToast();
  return (
    <Button onClick={() => add({ title: 'Saved', description: 'Your changes were saved.' })}>
      Save
    </Button>
  );
}
```

### With action

`actionProps` are forwarded to `Toast.Action`. Action buttons are reachable from anywhere via the F6 hotkey without stealing focus.

```tsx
const { add } = useToast();

add({
  title: 'Item archived',
  actionProps: { children: 'Undo', onClick: () => restore() },
});
```

### Destructive

`type: 'error'` upgrades the announcement to `assertive` and applies destructive styling.

```tsx
const { add } = useToast();

add({
  title: 'Couldn’t save',
  description: 'Try again in a moment.',
  type: 'error',
  priority: 'high',
});
```

### Promise

```tsx
const toast = useToast();

toast.promise(saveDraft(), {
  loading: 'Saving…',
  success: 'Saved',
  error: 'Failed to save',
});
```

## CSS Requirements

Toast enter/exit and swipe-reactive transforms live in global CSS so Base UI's data attributes can drive the transitions. Add this to your global stylesheet:

```css
@layer priority1 {
  /* Toast enter — Enter: 200ms ease-out */
  .basex-toast-root {
    opacity: 1;
    transform: translate3d(var(--toast-swipe-movement-x, 0), var(--toast-swipe-movement-y, 0), 0);
    transition:
      opacity 200ms cubic-bezier(0, 0, 0.2, 1),
      transform 200ms cubic-bezier(0, 0, 0.2, 1);
  }
  .basex-toast-root[data-starting-style] {
    opacity: 0;
    transform: translate3d(0, 16px, 0);
  }
  /* Toast exit — Exit: 100ms ease-out */
  .basex-toast-root[data-ending-style] {
    opacity: 0;
    transform: translate3d(0, 16px, 0);
    transition:
      opacity 100ms cubic-bezier(0, 0, 0.2, 1),
      transform 100ms cubic-bezier(0, 0, 0.2, 1);
  }
  .basex-toast-root[data-swiping] {
    transition-duration: 0ms;
  }
  @media (prefers-reduced-motion: reduce) {
    .basex-toast-root {
      transition: opacity 100ms linear;
      transform: none !important;
    }
  }
}
```

## API Reference

### Toast.Provider

| Prop           | Type           | Default | Description                                                                       |
| -------------- | -------------- | ------- | --------------------------------------------------------------------------------- |
| `timeout`      | `number`       | `5000`  | Default auto-dismiss duration (ms). `0` disables auto-dismiss.                    |
| `limit`        | `number`       | `3`     | Maximum number of visible toasts. Older toasts are evicted when exceeded.         |
| `toastManager` | `ToastManager` |         | Optional global manager (created via `createToastManager`) for use outside React. |

### Toast.Portal

| Prop        | Type                               | Description            |
| ----------- | ---------------------------------- | ---------------------- |
| `container` | `HTMLElement \| ShadowRoot \| Ref` | Target parent element. |

### Toast.Viewport

| Prop | Type           | Description                  |
| ---- | -------------- | ---------------------------- |
| `sx` | `StyleXStyles` | StyleX styles for overrides. |

Data attributes:

| Attribute       | Description                                   |
| --------------- | --------------------------------------------- |
| `data-expanded` | Present when the user has expanded the stack. |

### Toast.Root

| Prop             | Type           | Default             | Description                                                                     |
| ---------------- | -------------- | ------------------- | ------------------------------------------------------------------------------- |
| `toast`          | `ToastObject`  | required            | The toast object yielded by `useToast().toasts.map(...)`.                       |
| `swipeDirection` | direction(s)   | `['down', 'right']` | Direction(s) the toast can be swiped to dismiss.                                |
| `sx`             | `StyleXStyles` |                     | Destructive styling auto-applies when `toast.type` is `error` or `destructive`. |

Data attributes: `data-starting-style`, `data-ending-style`, `data-expanded`, `data-limited`, `data-swiping`, `data-swipe-direction`, `data-type`.

CSS variables: `--toast-swipe-movement-x`, `--toast-swipe-movement-y`, `--toast-index`, `--toast-offset-y`.

### Toast.Content / Toast.Title / Toast.Description

| Prop | Type           | Description                  |
| ---- | -------------- | ---------------------------- |
| `sx` | `StyleXStyles` | StyleX styles for overrides. |

### Toast.Action

| Prop     | Type                                             | Description                                                    |
| -------- | ------------------------------------------------ | -------------------------------------------------------------- |
| `render` | `ReactElement \| (props, state) => ReactElement` | Replace the underlying element. Use to render a styled Button. |
| `sx`     | `StyleXStyles`                                   | StyleX styles for overrides.                                   |

### Toast.Close

| Prop         | Type                                             | Default                | Description                            |
| ------------ | ------------------------------------------------ | ---------------------- | -------------------------------------- |
| `aria-label` | `string`                                         | `'Close notification'` | Accessible label for the close button. |
| `render`     | `ReactElement \| (props, state) => ReactElement` |                        | Replace the underlying element.        |
| `sx`         | `StyleXStyles`                                   |                        | StyleX styles for overrides.           |

### useToast()

```ts
const { add, close, update, promise, toasts } = useToast();
```

| Method    | Signature                                                  | Description                               |
| --------- | ---------------------------------------------------------- | ----------------------------------------- |
| `add`     | `(options) => string`                                      | Queue a new toast. Returns its id.        |
| `close`   | `(id) => void`                                             | Close a specific toast.                   |
| `update`  | `(id, options) => void`                                    | Update an active toast.                   |
| `promise` | `(promise, { loading, success, error }) => Promise<value>` | Loading → success/error auto transitions. |
| `toasts`  | `ToastObject[]`                                            | The current queue (render via `.map`).    |

Common `add()` options: `title`, `description`, `type` (e.g. `'error'`), `priority` (`'low' | 'high'`), `timeout` (`0` = sticky), `actionProps`, `onClose`, `onRemove`.

## When to Use

- Confirming a non-critical action (saved, copied, archived)
- Offering a quick reversal (Undo)
- Surfacing transient errors that don’t block the workflow
- Reflecting the result of an async operation via `useToast().promise(...)`

## When NOT to Use

- Confirming destructive or irreversible actions — use **AlertDialog**
- Persistent errors blocking the workflow — use a **Dialog** or inline alert
- Long-form content, forms, or multi-step interactions — use **Dialog** or **Drawer**
- Information the user must read — use **Dialog** so it isn’t auto-dismissed
