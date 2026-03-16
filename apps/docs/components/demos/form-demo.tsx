'use client';

import * as stylex from '@stylexjs/stylex';
import { Form, Field, Fieldset, Input, Button } from '@basex-ui/components';
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

export function FormBasic() {
  return (
    <Preview>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Fieldset.Root>
          <Fieldset.Legend>Contact</Fieldset.Legend>
          <Field.Root>
            <Field.Label>Name</Field.Label>
            <Input placeholder="Jane Doe" />
          </Field.Root>
          <Field.Root>
            <Field.Label>Email</Field.Label>
            <Input type="email" placeholder="jane@example.com" />
          </Field.Root>
        </Fieldset.Root>
        <Button type="submit">Submit</Button>
      </Form>
    </Preview>
  );
}
