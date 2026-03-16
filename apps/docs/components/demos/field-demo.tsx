'use client';

import * as stylex from '@stylexjs/stylex';
import { Field, Input } from '@basex-ui/components';
import { lightTheme, darkTheme } from '@basex-ui/styles';
import { useTheme } from 'next-themes';

function Preview({ children }: { children: React.ReactNode }) {
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
      }}
    >
      {children}
    </div>
  );
}

export function FieldBasic() {
  return (
    <Preview>
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Input placeholder="you@example.com" />
      </Field.Root>
    </Preview>
  );
}

export function FieldWithValidation() {
  return (
    <Preview>
      <Field.Root invalid>
        <Field.Label>Email</Field.Label>
        <Input placeholder="you@example.com" />
        <Field.Error>Please enter a valid email address.</Field.Error>
      </Field.Root>
    </Preview>
  );
}

export function FieldWithDescription() {
  return (
    <Preview>
      <Field.Root>
        <Field.Label>Username</Field.Label>
        <Field.Description>Your public display name</Field.Description>
        <Input placeholder="johndoe" />
      </Field.Root>
    </Preview>
  );
}
