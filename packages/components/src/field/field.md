# Field

A form field wrapper that connects a label, description, input control, and validation error message with proper accessibility attributes. Built on [Base UI Field](https://base-ui.com/react/components/field).

## Anatomy

```tsx
<Field.Root>
  <Field.Label />
  <Field.Description />
  <Field.Control />
  <Field.Error />
</Field.Root>
```

- **Root** -- Groups label, description, control, and error. Renders a `<div>` with flex-column layout.
- **Label** -- The label for the field. Renders a `<label>` automatically linked to Control via `htmlFor`.
- **Description** -- Hint text below the label. Renders a `<p>` linked to Control via `aria-describedby`.
- **Control** -- The input element. Renders an `<input>` by default. Supports `render` prop to swap the element.
- **Error** -- Validation error message, shown when the field is invalid. Renders a `<div>`.
- **Validity** -- A render prop component providing `FieldValidityData`. Does not render any DOM.

## Examples

### Basic text field

```tsx
<Field.Root>
  <Field.Label>Name</Field.Label>
  <Field.Control placeholder="Enter your name" />
</Field.Root>
```

### Field with description

```tsx
<Field.Root>
  <Field.Label>Password</Field.Label>
  <Field.Description>Must be at least 8 characters long.</Field.Description>
  <Field.Control type="password" required minLength={8} />
</Field.Root>
```

### Field with validation errors

```tsx
<Field.Root>
  <Field.Label>Email</Field.Label>
  <Field.Control type="email" required placeholder="you@example.com" />
  <Field.Error match="valueMissing">Email is required.</Field.Error>
  <Field.Error match="typeMismatch">Please enter a valid email address.</Field.Error>
</Field.Root>
```

### Field with custom validity rendering

```tsx
<Field.Root>
  <Field.Label>Username</Field.Label>
  <Field.Control required minLength={3} />
  <Field.Validity>
    {(state) => {
      if (state.validity.valueMissing) {
        return <p>Username is required.</p>;
      }
      if (state.validity.tooShort) {
        return <p>Too short -- need at least 3 characters.</p>;
      }
      return null;
    }}
  </Field.Validity>
</Field.Root>
```

### Control sizes

```tsx
<Field.Root>
  <Field.Label>Small</Field.Label>
  <Field.Control size="sm" placeholder="32px height" />
</Field.Root>

<Field.Root>
  <Field.Label>Medium (default)</Field.Label>
  <Field.Control size="md" placeholder="36px height" />
</Field.Root>

<Field.Root>
  <Field.Label>Large</Field.Label>
  <Field.Control size="lg" placeholder="40px height" />
</Field.Root>
```

### Disabled field

```tsx
<Field.Root disabled>
  <Field.Label>Read only</Field.Label>
  <Field.Control value="Cannot edit this" />
</Field.Root>
```

## API Reference

### Field.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `invalid` | `boolean` | `false` | Whether the field is in an invalid state. |
| `disabled` | `boolean` | `false` | Whether the entire field is disabled. |
| `name` | `string` | -- | The name of the field, used when submitting a form. |
| `sx` | `StyleXStyles` | -- | StyleX styles for consumer overrides. |

#### Data attributes

| Attribute | Description |
|-----------|-------------|
| `data-valid` | Present when the field is valid. |
| `data-invalid` | Present when the field is invalid. |
| `data-dirty` | Present when the field value has been modified. |
| `data-touched` | Present when the field has been focused and blurred. |

### Field.Label

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sx` | `StyleXStyles` | -- | StyleX styles for consumer overrides. |

#### Data attributes

| Attribute | Description |
|-----------|-------------|
| `data-valid` | Present when the field is valid. |
| `data-invalid` | Present when the field is invalid. |
| `data-dirty` | Present when the field value has been modified. |
| `data-touched` | Present when the field has been focused and blurred. |

### Field.Description

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sx` | `StyleXStyles` | -- | StyleX styles for consumer overrides. |

#### Data attributes

| Attribute | Description |
|-----------|-------------|
| `data-valid` | Present when the field is valid. |
| `data-invalid` | Present when the field is invalid. |
| `data-dirty` | Present when the field value has been modified. |
| `data-touched` | Present when the field has been focused and blurred. |

### Field.Error

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `match` | `keyof ValidityState \| ((validity: ValidityState) => boolean)` | -- | Match a specific ValidityState key or provide a custom function. Only shows the error when the matched condition is true. |
| `forceShow` | `boolean` | `false` | Whether to show the error message regardless of validity state. |
| `sx` | `StyleXStyles` | -- | StyleX styles for consumer overrides. |

#### Data attributes

| Attribute | Description |
|-----------|-------------|
| `data-valid` | Present when the field is valid. |
| `data-invalid` | Present when the field is invalid. |
| `data-dirty` | Present when the field value has been modified. |
| `data-touched` | Present when the field has been focused and blurred. |

### Field.Control

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the control affecting height, padding, and font size. |
| `render` | `React.ReactElement \| ((props: object) => React.ReactElement)` | -- | Swap the rendered element (e.g., to use a `<textarea>`). |
| `sx` | `StyleXStyles` | -- | StyleX styles for consumer overrides. |

#### Data attributes

| Attribute | Description |
|-----------|-------------|
| `data-valid` | Present when the field is valid. |
| `data-invalid` | Present when the field is invalid. |
| `data-dirty` | Present when the field value has been modified. |
| `data-touched` | Present when the field has been focused and blurred. |
| `data-disabled` | Present when the control is disabled. |

### Field.Validity

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `(state: FieldValidityData) => React.ReactNode` | -- | Render function receiving validity state, errors, and value. |

## When to Use

- Wrapping any single form input that needs a label, description, or validation
- Building accessible forms where labels must be linked to controls
- Displaying inline validation errors tied to native constraint validation
- Providing hint text or descriptions for form fields

## When NOT to Use

- **Standalone label without an input** -- use a plain `<label>` or heading element
- **Complex multi-input groups** (e.g., date with day/month/year) -- use Fieldset for group-level labeling
- **Non-form display of label-value pairs** -- use a description list (`<dl>`) or custom layout
