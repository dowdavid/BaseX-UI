import { useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { Form, Field, Button } from '@basex-ui/components';
import { Preview } from '../components/Preview';

const pageStyles = stylex.create({
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
  const [serverErrors, setServerErrors] = useState<Record<string, string[]>>({});
  const [serverSubmitting, setServerSubmitting] = useState(false);

  return (
    <>
      <Preview
        title="Basic form"
        description="A simple form with Field components and native validation."
        constrained
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
            <Field.Error match="typeMismatch">
              Please enter a valid email address.
            </Field.Error>
          </Field.Root>
          <Button type="submit">Submit</Button>
          {basicSubmitted && (
            <div {...stylex.props(pageStyles.submitted)}>
              Form submitted successfully.
            </div>
          )}
        </Form>
      </Preview>

      <Preview
        title="Server-side validation errors"
        description="Simulates a server response that returns field-level errors via the errors prop."
        constrained
      >
        <Form
          errors={serverErrors}
          onSubmit={(e) => {
            e.preventDefault();
            setServerErrors({});
            setServerSubmitting(true);
            setTimeout(() => {
              setServerErrors({
                email: ['This email is already registered.'],
                username: [
                  'Username must be at least 3 characters.',
                  'Username cannot contain spaces.',
                ],
              });
              setServerSubmitting(false);
            }, 800);
          }}
        >
          <Field.Root name="username">
            <Field.Label>Username</Field.Label>
            <Field.Control defaultValue="a b" />
            <Field.Error />
          </Field.Root>
          <Field.Root name="email">
            <Field.Label>Email</Field.Label>
            <Field.Control type="email" defaultValue="taken@example.com" />
            <Field.Error />
          </Field.Root>
          <Button type="submit" disabled={serverSubmitting}>
            {serverSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </Form>
      </Preview>
    </>
  );
}
