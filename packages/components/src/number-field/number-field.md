# Number Field

A numeric input with increment and decrement buttons. Built on [Base UI NumberField](https://base-ui.com/react/components/number-field).

## Anatomy

```tsx
<NumberField.Root>
  <NumberField.Group>
    <NumberField.Decrement />
    <NumberField.Input />
    <NumberField.Increment />
  </NumberField.Group>
</NumberField.Root>
```

- **Root** -- Container providing number field state (value, min, max, step) to child parts.
- **Group** -- Groups the input and buttons into a single bordered container.
- **Decrement** -- Button to decrement the value by one step.
- **Input** -- The text input for entering numeric values.
- **Increment** -- Button to increment the value by one step.

## Examples

### Basic number field

```tsx
<NumberField.Root defaultValue={5}>
  <NumberField.Group>
    <NumberField.Decrement />
    <NumberField.Input />
    <NumberField.Increment />
  </NumberField.Group>
</NumberField.Root>
```

### With min, max, and step

```tsx
<NumberField.Root defaultValue={0} min={0} max={100} step={5}>
  <NumberField.Group>
    <NumberField.Decrement />
    <NumberField.Input />
    <NumberField.Increment />
  </NumberField.Group>
</NumberField.Root>
```

### Size variations

```tsx
<NumberField.Root defaultValue={1}>
  <NumberField.Group size="sm">
    <NumberField.Decrement />
    <NumberField.Input />
    <NumberField.Increment />
  </NumberField.Group>
</NumberField.Root>

<NumberField.Root defaultValue={1}>
  <NumberField.Group size="lg">
    <NumberField.Decrement />
    <NumberField.Input />
    <NumberField.Increment />
  </NumberField.Group>
</NumberField.Root>
```

## API Reference

### NumberField.Root

| Prop            | Type                                          | Default | Description                               |
| --------------- | --------------------------------------------- | ------- | ----------------------------------------- |
| `defaultValue`  | `number`                                      | --      | The initial uncontrolled value.           |
| `value`         | `number`                                      | --      | The controlled value.                     |
| `onValueChange` | `(value: number \| null, event?) => void`     | --      | Callback fired when the value changes.    |
| `min`           | `number`                                      | --      | The minimum allowed value.                |
| `max`           | `number`                                      | --      | The maximum allowed value.                |
| `step`          | `number`                                      | `1`     | The step increment.                       |
| `disabled`      | `boolean`                                     | `false` | Whether the number field is disabled.     |
| `sx`            | `StyleXStyles`                                | --      | StyleX styles for consumer overrides.     |

#### Data attributes

| Attribute       | Description                    |
| --------------- | ------------------------------ |
| `data-disabled` | Present when disabled.         |

### NumberField.Group

| Prop   | Type                    | Default | Description                                      |
| ------ | ----------------------- | ------- | ------------------------------------------------ |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'`  | Height of the group (sm=32px, md=40px, lg=48px). |
| `sx`   | `StyleXStyles`          | --      | StyleX styles for consumer overrides.            |

### NumberField.Input

| Prop | Type           | Default | Description                           |
| ---- | -------------- | ------- | ------------------------------------- |
| `sx` | `StyleXStyles` | --      | StyleX styles for consumer overrides. |

### NumberField.Increment

| Prop | Type           | Default | Description                           |
| ---- | -------------- | ------- | ------------------------------------- |
| `sx` | `StyleXStyles` | --      | StyleX styles for consumer overrides. |

#### Data attributes

| Attribute       | Description                    |
| --------------- | ------------------------------ |
| `data-disabled` | Present when value is at max.  |

### NumberField.Decrement

| Prop | Type           | Default | Description                           |
| ---- | -------------- | ------- | ------------------------------------- |
| `sx` | `StyleXStyles` | --      | StyleX styles for consumer overrides. |

#### Data attributes

| Attribute       | Description                    |
| --------------- | ------------------------------ |
| `data-disabled` | Present when value is at min.  |

## When to Use

- Precise numeric entry with increment/decrement controls
- Quantity pickers in e-commerce or form contexts
- Any constrained numeric value with min/max/step

## When NOT to Use

- **Free-form text** -- use Input
- **Range selection** -- use Slider for visual continuous ranges
- **Formatted numbers** (phone, credit card) -- use Input with pattern/mask
