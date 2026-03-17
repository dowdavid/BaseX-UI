import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { Field, Form, Button } from '@basex-ui/components';
import { Preview } from '../components/Preview';

const pageStyles = stylex.create({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space4,
    width: '100%',
  },
  actions: {
    display: 'flex',
    gap: tokens.space2,
    justifyContent: 'flex-end',
  },
});

export function FieldPage() {
  return (
    <>
      <Preview
        title="Basic field"
        description="A simple text field with a label and placeholder."
        constrained
        code={`<Field.Root>
  <Field.Label>Name</Field.Label>
  <Field.Control placeholder="Enter your name" />
</Field.Root>`}
      >
        <Field.Root>
          <Field.Label>Name</Field.Label>
          <Field.Control placeholder="Enter your name" />
        </Field.Root>
      </Preview>

      <Preview
        title="Field with error"
        description="A required email field that shows validation errors on submit. Clear the input and click submit to see the error."
        constrained
        code={`<Field.Root name="email">
  <Field.Label>Email</Field.Label>
  <Field.Control type="email" required placeholder="you@example.com" />
  <Field.Error match="valueMissing">Email is required.</Field.Error>
  <Field.Error match="typeMismatch">Please enter a valid email.</Field.Error>
</Field.Root>`}
      >
        <Form onSubmit={(e) => e.preventDefault()}>
          <Field.Root name="email">
            <Field.Label>Email</Field.Label>
            <Field.Control type="email" required placeholder="you@example.com" />
            <Field.Error match="valueMissing">Email is required.</Field.Error>
            <Field.Error match="typeMismatch">Please enter a valid email address.</Field.Error>
          </Field.Root>
          <div {...stylex.props(pageStyles.actions)}>
            <Button type="submit" size="sm">
              Submit
            </Button>
          </div>
        </Form>
      </Preview>

      <Preview
        title="Field with description and validation"
        description="A password field with a hint description and multiple validation constraints."
        constrained
        code={`<Field.Root name="password">
  <Field.Label>Password</Field.Label>
  <Field.Description>Must be at least 8 characters long.</Field.Description>
  <Field.Control type="password" required minLength={8} />
  <Field.Error match="valueMissing">Password is required.</Field.Error>
  <Field.Error match="tooShort">Must be at least 8 characters.</Field.Error>
</Field.Root>`}
      >
        <Form onSubmit={(e) => e.preventDefault()}>
          <Field.Root name="password">
            <Field.Label>Password</Field.Label>
            <Field.Description>Must be at least 8 characters long.</Field.Description>
            <Field.Control type="password" required minLength={8} />
            <Field.Error match="valueMissing">Password is required.</Field.Error>
            <Field.Error match="tooShort">Password must be at least 8 characters.</Field.Error>
          </Field.Root>
          <div {...stylex.props(pageStyles.actions)}>
            <Button type="submit" size="sm">
              Submit
            </Button>
          </div>
        </Form>
      </Preview>
    </>
  );
}
