'use client';

import * as stylex from '@stylexjs/stylex';
import { Field, Form, Button } from '@basex-ui/components';
import { lightTheme, darkTheme } from '@basex-ui/styles';
import { useTheme } from 'next-themes';

function Preview({ children, constrained }: { children: React.ReactNode; constrained?: boolean }) {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === 'dark' ? darkTheme : lightTheme;
  return (
    <div
      {...stylex.props(theme)}
      style={{
        padding: '2rem',
        borderRadius: '0.5rem',
        border: '1px solid var(--fd-border)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.75rem',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {constrained ? <div style={{ width: '100%', maxWidth: '15rem' }}>{children}</div> : children}
    </div>
  );
}

export function FieldBasic() {
  return (
    <Preview constrained>
      <Field.Root>
        <Field.Label>Name</Field.Label>
        <Field.Control placeholder="Enter your name" />
      </Field.Root>
    </Preview>
  );
}

export function FieldWithError() {
  return (
    <Preview constrained>
      <Form onSubmit={(e: React.FormEvent) => e.preventDefault()}>
        <Field.Root name="email">
          <Field.Label>Email</Field.Label>
          <Field.Control type="email" required placeholder="you@example.com" />
          <Field.Error match="valueMissing">Email is required.</Field.Error>
          <Field.Error match="typeMismatch">Please enter a valid email address.</Field.Error>
        </Field.Root>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
          <Button type="submit" size="sm">Submit</Button>
        </div>
      </Form>
    </Preview>
  );
}

export function FieldWithDescription() {
  return (
    <Preview constrained>
      <Form onSubmit={(e: React.FormEvent) => e.preventDefault()}>
        <Field.Root name="password">
          <Field.Label>Password</Field.Label>
          <Field.Description>Must be at least 8 characters long.</Field.Description>
          <Field.Control type="password" required minLength={8} />
          <Field.Error match="valueMissing">Password is required.</Field.Error>
          <Field.Error match="tooShort">Password must be at least 8 characters.</Field.Error>
        </Field.Root>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
          <Button type="submit" size="sm">Submit</Button>
        </div>
      </Form>
    </Preview>
  );
}
