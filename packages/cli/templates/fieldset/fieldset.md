# Fieldset

A semantic grouping container for related form fields with an accessible legend.

## Anatomy

```
<Fieldset.Root>
  <Fieldset.Legend>Group label</Fieldset.Legend>
  {/* Field components */}
</Fieldset.Root>
```

## Examples

### Basic fieldset

```tsx
<Fieldset.Root>
  <Fieldset.Legend>Personal information</Fieldset.Legend>
  <Field.Root>
    <Field.Label>First name</Field.Label>
    <Field.Control placeholder="John" />
  </Field.Root>
  <Field.Root>
    <Field.Label>Last name</Field.Label>
    <Field.Control placeholder="Doe" />
  </Field.Root>
</Fieldset.Root>
```

### Disabled fieldset

```tsx
<Fieldset.Root disabled>
  <Fieldset.Legend>Locked section</Fieldset.Legend>
  <Field.Root>
    <Field.Label>Email</Field.Label>
    <Field.Control value="locked@example.com" />
  </Field.Root>
</Fieldset.Root>
```

### Multiple groups in a form

```tsx
<form>
  <Fieldset.Root>
    <Fieldset.Legend>Contact</Fieldset.Legend>
    {/* contact fields */}
  </Fieldset.Root>
  <Fieldset.Root>
    <Fieldset.Legend>Address</Fieldset.Legend>
    {/* address fields */}
  </Fieldset.Root>
</form>
```

## API Reference

### Root

| Prop       | Type           | Default | Description                                     |
| ---------- | -------------- | ------- | ----------------------------------------------- |
| `disabled` | `boolean`      | —       | Disables all form controls within the fieldset. |
| `sx`       | `StyleXStyles` | —       | StyleX overrides.                               |

#### Data attributes

| Attribute       | Description                            |
| --------------- | -------------------------------------- |
| `data-disabled` | Present when the fieldset is disabled. |

### Legend

| Prop | Type           | Default | Description       |
| ---- | -------------- | ------- | ----------------- |
| `sx` | `StyleXStyles` | —       | StyleX overrides. |

## When to Use

- Grouping related form fields (e.g. personal info, address, payment)
- Disabling an entire section of a form with a single prop
- Providing an accessible group label for screen readers

## When NOT to Use

- A single standalone form field — use Field alone
- Visual-only section dividers — use a heading or Separator
- Collapsible form sections — use Accordion or Collapsible
