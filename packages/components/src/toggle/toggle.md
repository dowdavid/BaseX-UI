# Toggle

A two-state button that can be on or off. Built on [Base UI Toggle](https://base-ui.com/react/components/toggle) with StyleX styling that mirrors Button.

Toggle uses `aria-pressed` to communicate state, making it the right control for stateful icon buttons (bold, italic), filter chips, and view toggles. For settings that take effect immediately, prefer Switch. For boolean form fields, prefer Checkbox.

## Import

```tsx
import { Toggle } from '@basex-ui/components/toggle';
```

## Anatomy

```tsx
<Toggle.Root />
```

## Examples

### Basic

```tsx
<Toggle.Root>Bold</Toggle.Root>
```

### Controlled

```tsx
const [pressed, setPressed] = useState(false);

<Toggle.Root pressed={pressed} onPressedChange={setPressed}>
  Italic
</Toggle.Root>;
```

### With Icon

Icon-only toggles must provide an `aria-label`. Mark decorative icons `aria-hidden`.

```tsx
import { Bookmark } from 'lucide-react';

<Toggle.Root aria-label="Bookmark">
  <Bookmark aria-hidden="true" size={16} />
</Toggle.Root>;
```

### Ghost Variant

Drop the border for use inside toolbars and Toggle Groups.

```tsx
<Toggle.Root variant="ghost">Wrap lines</Toggle.Root>
```

### Disabled

```tsx
<Toggle.Root disabled defaultPressed>
  Locked
</Toggle.Root>
```

## Composition with Toggle Group

Toggle is designed to compose inside `ToggleGroup` (parallel component). Pass a `value` prop and the parent group will own the pressed state, mirroring how `CheckboxGroup` wraps `Checkbox`.

```tsx
<ToggleGroup.Root defaultValue={['left']}>
  <Toggle.Root value="left" aria-label="Align left">
    <AlignLeft aria-hidden="true" size={16} />
  </Toggle.Root>
  <Toggle.Root value="center" aria-label="Align center">
    <AlignCenter aria-hidden="true" size={16} />
  </Toggle.Root>
  <Toggle.Root value="right" aria-label="Align right">
    <AlignRight aria-hidden="true" size={16} />
  </Toggle.Root>
</ToggleGroup.Root>
```

## API Reference

### Root

The toggle button element. Renders a `<button>` with `aria-pressed` semantics and StyleX styling.

| Prop              | Type                                               | Default     | Description                                                  |
| ----------------- | -------------------------------------------------- | ----------- | ------------------------------------------------------------ |
| `variant`         | `'outline' \| 'ghost'`                             | `'outline'` | Off-state visual style. On state always uses filled primary. |
| `size`            | `'sm' \| 'md' \| 'lg'`                             | `'md'`      | Toggle size, mirrors Button.                                 |
| `pressed`         | `boolean`                                          | —           | Controlled pressed state.                                    |
| `defaultPressed`  | `boolean`                                          | `false`     | Uncontrolled initial pressed state.                          |
| `onPressedChange` | `(pressed: boolean, eventDetails: object) => void` | —           | Fired on click, space, or enter.                             |
| `value`           | `string`                                           | —           | Identifier when used inside ToggleGroup.                     |
| `disabled`        | `boolean`                                          | `false`     | Disables interaction.                                        |
| `sx`              | `StyleXStyles`                                     | —           | Consumer style overrides (applied last).                     |

| Attribute        | Description                          |
| ---------------- | ------------------------------------ |
| `data-pressed`   | Present when the toggle is on.       |
| `data-unpressed` | Present when the toggle is off.      |
| `data-disabled`  | Present when the toggle is disabled. |

## When to Use

- **Stateful icon buttons** — bold, italic, underline in a text editor
- **Filter chips** — pressed = filter active
- **View toggles** — show/hide a panel, grid vs list
- **Inside Toggle Group** — for related multi-select or single-select sets

## When NOT to Use

- **Immediate settings** (e.g., dark mode) — use Switch
- **Form boolean field** — use Checkbox
- **One-off action** — use Button
- **Mutually exclusive options** — use RadioGroup, ToggleGroup, or Tabs
