'use client';

import * as stylex from '@stylexjs/stylex';
import { Input, Field, Button } from '@basex-ui/components';
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

const styles = stylex.create({
  stack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    width: '100%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%',
  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
    justifyContent: 'flex-end',
  },
});

export function InputBasic() {
  return (
    <Preview>
      <Input placeholder="Enter your name" />
    </Preview>
  );
}

export function InputField() {
  return (
    <Preview>
      <form {...stylex.props(styles.form)} onSubmit={(e) => e.preventDefault()} noValidate>
        <Field.Root>
          <Field.Label>Email</Field.Label>
          <Field.Description>We&apos;ll never share your email.</Field.Description>
          <Input type="email" required placeholder="you@example.com" />
          <Field.Error match="valueMissing">Email is required.</Field.Error>
          <Field.Error match="typeMismatch">Please enter a valid email.</Field.Error>
        </Field.Root>
        <div {...stylex.props(styles.actions)}>
          <Button type="submit" size="sm">
            Submit
          </Button>
        </div>
      </form>
    </Preview>
  );
}

export function InputDisabled() {
  return (
    <Preview>
      <Field.Root disabled>
        <Field.Label>Username</Field.Label>
        <Input value="daviddow" />
      </Field.Root>
    </Preview>
  );
}

export function InputSizes() {
  return (
    <Preview>
      <div {...stylex.props(styles.stack)}>
        {(['sm', 'md', 'lg'] as const).map((size) => (
          <Input
            key={size}
            size={size}
            placeholder={`${size} (${size === 'sm' ? '32px' : size === 'md' ? '36px' : '40px'})`}
          />
        ))}
      </div>
    </Preview>
  );
}
