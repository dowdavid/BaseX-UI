import { useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { Form, Button } from '@basex-ui/components';
import { Preview } from '../components/Preview';

const formStyles = stylex.create({
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space1,
  },
  label: {
    display: 'block',
    fontSize: tokens.fontSizeSm,
    fontWeight: tokens.fontWeightMedium,
    fontFamily: tokens.fontFamilySans,
    color: tokens.colorText,
    marginBottom: tokens.space1,
  },
  input: {
    width: '100%',
    padding: `${tokens.space2} ${tokens.space3}`,
    borderRadius: tokens.radiusMd,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tokens.colorBorder,
    fontSize: tokens.fontSizeSm,
    fontFamily: tokens.fontFamilySans,
    color: tokens.colorText,
    backgroundColor: tokens.colorBackground,
    boxSizing: 'border-box' as const,
    outline: 'none',
  },
  error: {
    fontSize: tokens.fontSizeSm,
    fontFamily: tokens.fontFamilySans,
    color: tokens.colorDestructive,
    lineHeight: tokens.lineHeightNormal,
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
  const [serverErrors, setServerErrors] = useState<Record<string, string[]>>({});
  const [serverSubmitting, setServerSubmitting] = useState(false);

  return (
    <>
      <Preview
        title="Basic form"
        description="A simple form with submit handling."
        constrained
      >
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            setBasicSubmitted(true);
          }}
        >
          <div {...stylex.props(formStyles.field)}>
            <label {...stylex.props(formStyles.label)}>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              required
              {...stylex.props(formStyles.input)}
            />
          </div>
          <div {...stylex.props(formStyles.field)}>
            <label {...stylex.props(formStyles.label)}>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              required
              {...stylex.props(formStyles.input)}
            />
          </div>
          <Button type="submit">Submit</Button>
          {basicSubmitted && (
            <div {...stylex.props(formStyles.submitted)}>
              Form submitted successfully.
            </div>
          )}
        </Form>
      </Preview>

      <Preview
        title="Server-side validation errors"
        description="Simulates a server response that returns field-level errors."
        constrained
      >
        <Form
          errors={serverErrors}
          onClearErrors={(names) => {
            setServerErrors((prev) => {
              const next = { ...prev };
              names.forEach((n) => delete next[n]);
              return next;
            });
          }}
          onSubmit={(e) => {
            e.preventDefault();
            setServerSubmitting(true);
            // Simulate server response delay
            setTimeout(() => {
              setServerErrors({
                email: ['This email is already registered.'],
                username: ['Username must be at least 3 characters.', 'Username cannot contain spaces.'],
              });
              setServerSubmitting(false);
            }, 800);
          }}
        >
          <div {...stylex.props(formStyles.field)}>
            <label {...stylex.props(formStyles.label)}>Username</label>
            <input
              type="text"
              defaultValue="a b"
              {...stylex.props(formStyles.input)}
            />
            {serverErrors.username?.map((msg) => (
              <span key={msg} {...stylex.props(formStyles.error)}>{msg}</span>
            ))}
          </div>
          <div {...stylex.props(formStyles.field)}>
            <label {...stylex.props(formStyles.label)}>Email</label>
            <input
              type="email"
              defaultValue="taken@example.com"
              {...stylex.props(formStyles.input)}
            />
            {serverErrors.email?.map((msg) => (
              <span key={msg} {...stylex.props(formStyles.error)}>{msg}</span>
            ))}
          </div>
          <Button type="submit" disabled={serverSubmitting}>
            {serverSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </Form>
      </Preview>
    </>
  );
}
