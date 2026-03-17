import { useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { Form, Field, Button } from '@basex-ui/components';
import { Preview } from '../components/Preview';

const pageStyles = stylex.create({
  actions: {
    marginTop: tokens.space3,
  },
  submitted: {
    fontSize: tokens.fontSizeSm,
    fontFamily: tokens.fontFamilySans,
    color: tokens.colorText,
    lineHeight: tokens.lineHeightNormal,
    padding: tokens.space3,
    borderRadius: tokens.radiusMd,
    backgroundColor: tokens.colorMuted,
  },
});

export function FormPage() {
  const [basicSubmitted, setBasicSubmitted] = useState(false);

  return (
    <>
      <Preview
        title="Basic form"
        description="A simple form with Field components and native validation."
        constrained
        code={`<Form onSubmit={handleSubmit}>
  <Field.Root name="name">
    <Field.Label>Name</Field.Label>
    <Field.Control placeholder="Enter your name" required />
    <Field.Error match="valueMissing">Name is required.</Field.Error>
  </Field.Root>
  <Field.Root name="email">
    <Field.Label>Email</Field.Label>
    <Field.Control type="email" required />
    <Field.Error match="typeMismatch">Invalid email.</Field.Error>
  </Field.Root>
  <Button type="submit">Submit</Button>
</Form>`}
      >
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            setBasicSubmitted(true);
          }}
        >
          <Field.Root name="name">
            <Field.Label>Name</Field.Label>
            <Field.Control placeholder="Enter your name" required />
            <Field.Error match="valueMissing">Name is required.</Field.Error>
          </Field.Root>
          <Field.Root name="email">
            <Field.Label>Email</Field.Label>
            <Field.Control type="email" placeholder="you@example.com" required />
            <Field.Error match="valueMissing">Email is required.</Field.Error>
            <Field.Error match="typeMismatch">Please enter a valid email address.</Field.Error>
          </Field.Root>
          <Button type="submit" sx={pageStyles.actions}>
            Submit
          </Button>
          {basicSubmitted && (
            <div {...stylex.props(pageStyles.submitted)}>Form submitted successfully.</div>
          )}
        </Form>
      </Preview>
    </>
  );
}
