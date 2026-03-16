'use client';

import * as stylex from '@stylexjs/stylex';
import { Fieldset, Field, Input } from '@basex-ui/components';
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

export function FieldsetBasic() {
  return (
    <Preview>
      <Fieldset.Root>
        <Fieldset.Legend>Personal Information</Fieldset.Legend>
        <Field.Root>
          <Field.Label>First name</Field.Label>
          <Input placeholder="Jane" />
        </Field.Root>
        <Field.Root>
          <Field.Label>Last name</Field.Label>
          <Input placeholder="Doe" />
        </Field.Root>
      </Fieldset.Root>
    </Preview>
  );
}
