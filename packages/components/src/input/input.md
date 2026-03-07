# Input

A standalone styled text input that automatically integrates with [Field](https://base-ui.com/react/components/field) for validation. Built on [Base UI Input](https://base-ui.com/react/components/input).

## Anatomy

```tsx
<Input />
```

- **Input** -- A native `<input>` element with StyleX styling. Automatically picks up validation state from a parent Field.Root.

## Examples

### Basic text input

```tsx
<Input placeholder="Enter your name" />
```

### Sizes

```tsx
<Input size="sm" placeholder="Small (32px)" />
<Input size="md" placeholder="Medium (36px)" />
<Input size="lg" placeholder="Large (40px)" />
```

### Inside a Field

```tsx
<Field.Root>
  <Field.Label>Email</Field.Label>
  <Input type="email" required placeholder="you@example.com" />
  <Field.Error match="typeMismatch">Please enter a valid email.</Field.Error>
</Field.Root>
```

### Disabled

Disabled inputs show a muted background, lighter border, dimmed text at 50% opacity, and a `not-allowed` cursor. Use `Field.Root disabled` to propagate the disabled state to labels too.

```tsx
<Field.Root disabled>
  <Field.Label>Username</Field.Label>
  <Input value="daviddow" />
</Field.Root>
```

## API Reference

### Input

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the input affecting height, padding, and font size. |
| `onValueChange` | `(value: string, event: React.ChangeEvent) => void` | -- | Callback fired when the value changes. |
| `sx` | `StyleXStyles` | -- | StyleX styles for consumer overrides. |

#### Data attributes

| Attribute | Description |
|-----------|-------------|
| `data-valid` | Present when the field is valid. |
| `data-invalid` | Present when the field is invalid. |
| `data-dirty` | Present when the field value has been modified. |
| `data-touched` | Present when the field has been focused and blurred. |
| `data-filled` | Present when the input has a non-empty value. |
| `data-focused` | Present when the input is focused. |
| `data-disabled` | Present when the input is disabled. |

## When to Use

- Standalone text entry without the full Field wrapper
- Inside a Field for labeled, validated text input
- Simple search boxes or filter inputs
- Any single-line text entry

## When NOT to Use

- **Search with suggestions** -- use Autocomplete
- **Selecting from options** -- use Select or Combobox
- **Multi-line text** -- use a `<textarea>` via Field.Control render prop
