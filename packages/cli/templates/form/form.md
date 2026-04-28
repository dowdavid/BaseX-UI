# Form

An enhanced form element that manages server-side validation errors for child Field components.

## Anatomy

```tsx
<Form>{/* Field, Fieldset, and submit button */}</Form>
```

## Examples

### Basic form

```tsx
<Form
  onSubmit={(e) => {
    e.preventDefault(); /* handle submit */
  }}
>
  <Field.Root name="email">
    <Field.Label>Email</Field.Label>
    <Field.Control type="email" required />
    <Field.Error />
  </Field.Root>
  <Button type="submit">Submit</Button>
</Form>
```

### Server-side validation

```tsx
const [errors, setErrors] = useState<Record<string, string[]>>({});

<Form
  errors={errors}
  onSubmit={async (e) => {
    e.preventDefault();
    const res = await api.submit(formData);
    if (res.errors) setErrors(res.errors);
  }}
>
  <Field.Root name="email">
    <Field.Label>Email</Field.Label>
    <Field.Control type="email" />
    <Field.Error />
  </Field.Root>
  <Button type="submit">Submit</Button>
</Form>;
```

## API Reference

### Form (single component, not compound)

| Prop           | Type                                 | Default    | Description                            |
| -------------- | ------------------------------------ | ---------- | -------------------------------------- |
| errors         | Record<string, string[] \| null>     | —          | Server-side errors keyed by field name |
| validationMode | 'onBlur' \| 'onChange' \| 'onSubmit' | 'onSubmit' | When validation occurs                 |
| onFormSubmit   | (event, formData) => void            | —          | Enhanced submit handler with FormData  |
| onSubmit       | FormEventHandler                     | —          | Standard form submit handler           |
| sx             | StyleXStyles                         | —          | StyleX overrides                       |

## When to Use

- Forms that need to display server-side validation errors
- When you want automatic error distribution to child Field components

## When NOT to Use

- Simple forms with only client-side validation — use plain `<form>`
- Non-form layout containers — use a `<div>`
