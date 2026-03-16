'use client';

import * as stylex from '@stylexjs/stylex';
import { Input } from '@basex-ui/components';
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

export function InputBasic() {
  return (
    <Preview>
      <Input placeholder="Enter text..." />
    </Preview>
  );
}

export function InputSizes() {
  return (
    <Preview>
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </Preview>
  );
}

export function InputDisabled() {
  return (
    <Preview>
      <Input disabled value="Can't edit this" />
    </Preview>
  );
}
