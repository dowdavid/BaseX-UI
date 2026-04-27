# Switch

A control that toggles a setting on or off, taking effect immediately. Built on [Base UI Switch](https://base-ui.com/react/components/switch).

## Anatomy

```tsx
<Switch.Root>
  <Switch.Thumb />
</Switch.Root>
```

- **Root** — The switch track. Renders a `<button role="switch">` with a hidden `<input>` beside it for form integration.
- **Thumb** — The movable circle that slides between the off and on positions.

## Examples

### Basic

```tsx
<label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <Switch.Root>
    <Switch.Thumb />
  </Switch.Root>
  Enable notifications
</label>
```

### Controlled

```tsx
const [checked, setChecked] = useState(false);

<label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <Switch.Root checked={checked} onCheckedChange={setChecked}>
    <Switch.Thumb />
  </Switch.Root>
  Dark mode
</label>;
```

### Disabled

```tsx
<label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <Switch.Root disabled defaultChecked>
    <Switch.Thumb />
  </Switch.Root>
  Locked setting
</label>
```

### With Field

```tsx
<Field.Root>
  <Field.Label>Email notifications</Field.Label>
  <Switch.Root name="notifications">
    <Switch.Thumb />
  </Switch.Root>
  <Field.Description>Receive a weekly digest.</Field.Description>
</Field.Root>
```

### In a Form

```tsx
<Form onSubmit={(e) => e.preventDefault()}>
  <Field.Root name="marketing">
    <Field.Label>Marketing emails</Field.Label>
    <Switch.Root name="marketing" value="yes">
      <Switch.Thumb />
    </Switch.Root>
  </Field.Root>
  <button type="submit">Save</button>
</Form>
```

## API Reference

### Switch.Root

| Prop              | Type                                               | Default | Description                                                         |
| ----------------- | -------------------------------------------------- | ------- | ------------------------------------------------------------------- |
| `checked`         | `boolean`                                          | —       | Whether the switch is currently active. Use for controlled mode.    |
| `defaultChecked`  | `boolean`                                          | `false` | Whether the switch is initially active. Use for uncontrolled mode.  |
| `onCheckedChange` | `(checked: boolean, eventDetails: object) => void` | —       | Callback fired when the switch is activated or deactivated.         |
| `disabled`        | `boolean`                                          | `false` | Whether the component should ignore user interaction.               |
| `readOnly`        | `boolean`                                          | `false` | Whether the user should be unable to toggle the switch.             |
| `required`        | `boolean`                                          | `false` | Whether the user must activate the switch before submitting a form. |
| `name`            | `string`                                           | —       | Identifies the field when a form is submitted.                      |
| `value`           | `string`                                           | `'on'`  | The value submitted with the form when the switch is on.            |
| `uncheckedValue`  | `string`                                           | —       | The value submitted with the form when the switch is off.           |
| `inputRef`        | `Ref<HTMLInputElement>`                            | —       | A ref to access the hidden `<input>` element.                       |
| `sx`              | `StyleXStyles`                                     | —       | StyleX styles for consumer overrides.                               |

#### Data attributes

| Attribute        | Description                           |
| ---------------- | ------------------------------------- |
| `data-checked`   | Present when the switch is on.        |
| `data-unchecked` | Present when the switch is off.       |
| `data-disabled`  | Present when the switch is disabled.  |
| `data-readonly`  | Present when the switch is read-only. |
| `data-required`  | Present when the switch is required.  |

### Switch.Thumb

| Prop | Type           | Default | Description                           |
| ---- | -------------- | ------- | ------------------------------------- |
| `sx` | `StyleXStyles` | —       | StyleX styles for consumer overrides. |

#### Data attributes

| Attribute        | Description                     |
| ---------------- | ------------------------------- |
| `data-checked`   | Present when the switch is on.  |
| `data-unchecked` | Present when the switch is off. |

## Reduced Motion

The thumb slide transition uses `motionDurationFast`. To respect `prefers-reduced-motion`, add a global rule in your stylesheet:

```css
@media (prefers-reduced-motion: reduce) {
  .basex-switch-thumb,
  .basex-switch-root {
    transition: none !important;
  }
}
```

## When to Use

- Binary on/off settings that take effect immediately (dark mode, notifications, autoplay)
- Controls in a settings panel where each change is auto-saved

## When NOT to Use

- **Boolean option saved with a form** — use Checkbox
- **Single selection from mutually exclusive options** — use Radio
- **Triggering an immediate action** — use Button
