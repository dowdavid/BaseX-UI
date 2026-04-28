# CheckboxGroup

A container that provides shared state to a series of checkboxes, managing a `value` array of checked item names. Supports a parent checkbox for select-all behavior.

Built on [`@base-ui/react/checkbox-group`](https://base-ui.com/react/components/checkbox-group).

## Anatomy

```tsx
<CheckboxGroup.Root>
  <Checkbox.Root name="a">
    <Checkbox.Indicator />
  </Checkbox.Root>
  <Checkbox.Root name="b">
    <Checkbox.Indicator />
  </Checkbox.Root>
</CheckboxGroup.Root>
```

Child `Checkbox.Root` components with a `name` prop auto-register with the group. The group tracks which names are currently checked.

## Examples

### Basic group

```tsx
import { CheckboxGroup, Checkbox } from '@basex-ui/components';

function NotificationSettings() {
  const [value, setValue] = useState<string[]>(['email']);

  return (
    <CheckboxGroup.Root value={value} onValueChange={setValue}>
      <label>
        <Checkbox.Root name="email">
          <Checkbox.Indicator />
        </Checkbox.Root>
        Email notifications
      </label>
      <label>
        <Checkbox.Root name="sms">
          <Checkbox.Indicator />
        </Checkbox.Root>
        SMS notifications
      </label>
      <label>
        <Checkbox.Root name="push">
          <Checkbox.Indicator />
        </Checkbox.Root>
        Push notifications
      </label>
    </CheckboxGroup.Root>
  );
}
```

### Select all with parent checkbox

Use `<Checkbox.Root parent>` inside a **controlled** `CheckboxGroup.Root` with `allValues` to create a select-all pattern. The parent checkbox auto-derives its `checked` and `indeterminate` state from children.

> **Important**: The group must be controlled (`value` + `onValueChange`) for the parent checkbox to work. Uncontrolled mode (`defaultValue`) does not support the parent checkbox pattern.

```tsx
import { useState } from 'react';
import { CheckboxGroup, Checkbox } from '@basex-ui/components';

const fruits = ['apples', 'bananas', 'cherries'];

function FruitPicker() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <CheckboxGroup.Root allValues={fruits} value={value} onValueChange={setValue}>
      <label>
        <Checkbox.Root parent>
          <Checkbox.Indicator />
        </Checkbox.Root>
        Select all
      </label>
      {fruits.map((fruit) => (
        <label key={fruit}>
          <Checkbox.Root name={fruit}>
            <Checkbox.Indicator />
          </Checkbox.Root>
          {fruit}
        </label>
      ))}
    </CheckboxGroup.Root>
  );
}
```

### Disabled group

Set `disabled` on the Root to prevent all interaction across the group.

```tsx
<CheckboxGroup.Root disabled defaultValue={['a']}>
  <label>
    <Checkbox.Root name="a">
      <Checkbox.Indicator />
    </Checkbox.Root>
    Option A (checked)
  </label>
  <label>
    <Checkbox.Root name="b">
      <Checkbox.Indicator />
    </Checkbox.Root>
    Option B
  </label>
</CheckboxGroup.Root>
```

## API Reference

### CheckboxGroup.Root

| Prop            | Type                                              | Default | Description                                                            |
| --------------- | ------------------------------------------------- | ------- | ---------------------------------------------------------------------- |
| `value`         | `string[]`                                        | —       | Names of the checked checkboxes. Use for controlled mode.              |
| `defaultValue`  | `string[]`                                        | —       | Names of the initially checked checkboxes. Use for uncontrolled mode.  |
| `onValueChange` | `(value: string[], eventDetails: object) => void` | —       | Callback fired when a checkbox is ticked or unticked.                  |
| `allValues`     | `string[]`                                        | —       | All possible checkbox names. Required for the parent checkbox pattern. |
| `disabled`      | `boolean`                                         | `false` | Whether all checkboxes should ignore user interaction.                 |
| `sx`            | `StyleXStyles`                                    | —       | StyleX overrides.                                                      |

### Data Attributes (Root)

| Attribute       | Description                         |
| --------------- | ----------------------------------- |
| `data-disabled` | Present when the group is disabled. |

## When to Use

- Multiple checkboxes that share state (e.g., notification preferences)
- Select-all / deselect-all patterns with a parent checkbox
- Form groups where the value is an array of selected names

## When NOT to Use

- **Single checkbox** — use `Checkbox` directly
- **Mutually exclusive options** — use `Radio` or `RadioGroup`
- **Immediate on/off toggle** — use `Switch`
