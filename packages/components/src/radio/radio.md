# Radio

A radio button group for single-select choices. Built on [Base UI Radio](https://base-ui.com/react/components/radio) and [RadioGroup](https://base-ui.com/react/components/radio-group).

## Anatomy

```tsx
<Radio.Group defaultValue="a">
  <label>
    <Radio.Root value="a">
      <Radio.Indicator />
    </Radio.Root>
    Option A
  </label>
  <label>
    <Radio.Root value="b">
      <Radio.Indicator />
    </Radio.Root>
    Option B
  </label>
</Radio.Group>
```

- **Group** -- Container that manages which radio is selected.
- **Root** -- An individual radio button.
- **Indicator** -- The visual dot that appears when the radio is selected.

## Examples

### Basic radio group

```tsx
<Radio.Group defaultValue="a">
  <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <Radio.Root value="a">
      <Radio.Indicator />
    </Radio.Root>
    Option A
  </label>
  <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <Radio.Root value="b">
      <Radio.Indicator />
    </Radio.Root>
    Option B
  </label>
</Radio.Group>
```

### Horizontal layout

```tsx
<Radio.Group defaultValue="left" orientation="horizontal">
  <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <Radio.Root value="left">
      <Radio.Indicator />
    </Radio.Root>
    Left
  </label>
  <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <Radio.Root value="center">
      <Radio.Indicator />
    </Radio.Root>
    Center
  </label>
</Radio.Group>
```

### Disabled

```tsx
<Radio.Group defaultValue="a" disabled>
  <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <Radio.Root value="a">
      <Radio.Indicator />
    </Radio.Root>
    Option A
  </label>
</Radio.Group>
```

## CSS Requirements

```css
@layer priority1 {
  .basex-radio-root[data-checked] {
    border-color: var(--colorPrimary);
    background-color: var(--colorPrimary);
  }
  .basex-radio-indicator {
    opacity: 1;
    transform: scale(1);
    transition:
      opacity 100ms ease-out,
      transform 100ms ease-out;
  }
  .basex-radio-indicator[data-unchecked] {
    opacity: 0;
    transform: scale(0.5);
  }
}
```

## API Reference

### Radio.Group

| Prop            | Type                                          | Default      | Description                           |
| --------------- | --------------------------------------------- | ------------ | ------------------------------------- |
| `defaultValue`  | `string`                                      | --           | Initial uncontrolled selected value.  |
| `value`         | `string`                                      | --           | Controlled selected value.            |
| `onValueChange` | `(value: string, event: ChangeEvent) => void` | --           | Callback when selection changes.      |
| `disabled`      | `boolean`                                     | `false`      | Whether the group is disabled.        |
| `orientation`   | `'vertical' \| 'horizontal'`                  | `'vertical'` | Layout direction of the radio items.  |
| `sx`            | `StyleXStyles`                                | --           | StyleX styles for consumer overrides. |

### Radio.Root

| Prop       | Type           | Default | Description                            |
| ---------- | -------------- | ------- | -------------------------------------- |
| `value`    | `string`       | --      | **Required.** The value of this radio. |
| `disabled` | `boolean`      | `false` | Whether this radio is disabled.        |
| `sx`       | `StyleXStyles` | --      | StyleX styles for consumer overrides.  |

#### Data attributes

| Attribute        | Description                         |
| ---------------- | ----------------------------------- |
| `data-checked`   | Present when the radio is selected. |
| `data-unchecked` | Present when not selected.          |
| `data-disabled`  | Present when disabled.              |

### Radio.Indicator

| Prop | Type           | Default | Description                           |
| ---- | -------------- | ------- | ------------------------------------- |
| `sx` | `StyleXStyles` | --      | StyleX styles for consumer overrides. |

#### Data attributes

| Attribute        | Description                          |
| ---------------- | ------------------------------------ |
| `data-checked`   | Present when the parent is selected. |
| `data-unchecked` | Present when not selected.           |

## When to Use

- Mutually exclusive choices where all options should be visible
- Settings or preferences with 2-7 options
- Form inputs requiring exactly one selection

## When NOT to Use

- **Multiple selections** -- use CheckboxGroup
- **Long option lists** (>7 items) -- use Select or Combobox
- **Binary on/off** -- use Switch
