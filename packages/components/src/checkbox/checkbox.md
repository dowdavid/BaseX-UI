# Checkbox

A control that allows the user to toggle between checked, unchecked, and optionally indeterminate states. Built on [Base UI Checkbox](https://base-ui.com/react/components/checkbox).

## Anatomy

```tsx
<Checkbox.Root>
  <Checkbox.Indicator />
</Checkbox.Root>
```

- **Root** — The checkbox itself. Renders a `<span>` with a hidden `<input>` beside it.
- **Indicator** — Visual checkmark (or dash for indeterminate). Uses `keepMounted` for enter/exit animation.

## Examples

### Basic

```tsx
<label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <Checkbox.Root>
    <Checkbox.Indicator />
  </Checkbox.Root>
  Accept terms
</label>
```

### Controlled

```tsx
const [checked, setChecked] = useState(false);

<label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <Checkbox.Root checked={checked} onCheckedChange={setChecked}>
    <Checkbox.Indicator />
  </Checkbox.Root>
  Enable notifications
</label>
```

### Indeterminate

```tsx
<label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <Checkbox.Root indeterminate>
    <Checkbox.Indicator />
  </Checkbox.Root>
  Select all
</label>
```

### Disabled

```tsx
<label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <Checkbox.Root disabled defaultChecked>
    <Checkbox.Indicator />
  </Checkbox.Root>
  Locked option
</label>
```

### With label via `sx`

```tsx
import * as stylex from '@stylexjs/stylex';

const labelStyles = stylex.create({
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    fontSize: '14px',
  },
});

<label {...stylex.props(labelStyles.label)}>
  <Checkbox.Root defaultChecked>
    <Checkbox.Indicator />
  </Checkbox.Root>
  Remember me
</label>
```

## API Reference

### Checkbox.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | — | Whether the checkbox is ticked. Use for controlled mode. |
| `defaultChecked` | `boolean` | `false` | Whether the checkbox is initially ticked. Use for uncontrolled mode. |
| `onCheckedChange` | `(checked: boolean, eventDetails: object) => void` | — | Callback fired when the checkbox is ticked or unticked. |
| `indeterminate` | `boolean` | `false` | Whether the checkbox is in a mixed state. |
| `disabled` | `boolean` | `false` | Whether the component should ignore user interaction. |
| `required` | `boolean` | `false` | Whether the user must tick the checkbox before submitting a form. |
| `name` | `string` | — | Identifies the field when a form is submitted. |
| `sx` | `StyleXStyles` | — | StyleX styles for consumer overrides. |

#### Data attributes

| Attribute | Description |
|-----------|-------------|
| `data-checked` | Present when the checkbox is ticked. |
| `data-unchecked` | Present when the checkbox is not ticked. |
| `data-indeterminate` | Present when the checkbox is in a mixed state. |
| `data-disabled` | Present when the checkbox is disabled. |
| `data-required` | Present when the checkbox is required. |

### Checkbox.Indicator

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `keepMounted` | `boolean` | `true` | Whether to keep the element in the DOM when unchecked. Defaults to `true` for animation support. |
| `sx` | `StyleXStyles` | — | StyleX styles for consumer overrides. |

#### Data attributes

| Attribute | Description |
|-----------|-------------|
| `data-checked` | Present when the checkbox is ticked. |
| `data-unchecked` | Present when the checkbox is not ticked. |
| `data-indeterminate` | Present when the checkbox is in a mixed state. |
| `data-starting-style` | Present when the indicator is animating in. |
| `data-ending-style` | Present when the indicator is animating out. |

## CSS Requirements

The indicator enter/exit animation requires global CSS rules inside `@layer priority1`. StyleX cannot target `data-attribute` selectors, so these rules must live in the consumer's global stylesheet.

```css
@layer priority1 {
  .basex-checkbox-indicator {
    opacity: 1;
    transform: scale(1);
    transition: opacity 100ms ease-out, transform 100ms ease-out;
  }
  .basex-checkbox-indicator[data-starting-style],
  .basex-checkbox-indicator[data-ending-style] {
    opacity: 0;
    transform: scale(0.5);
  }
}
```

## When to Use

- Toggling a boolean option that is saved with a form
- Explicit consent before form submission (e.g., terms and conditions)
- Selecting multiple items from a list

## When NOT to Use

- **Binary on/off with immediate effect** (e.g., dark mode) — use Switch
- **Single selection from mutually exclusive options** — use Radio
- **Triggering an immediate action** — use Button
