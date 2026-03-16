'use client';

import * as stylex from '@stylexjs/stylex';
import { Button } from '@basex-ui/components';
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
        justifyContent: 'center',
      }}
    >
      {children}
    </div>
  );
}

export function ButtonVariants() {
  return (
    <Preview>
      <Button>Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </Preview>
  );
}

export function ButtonColors() {
  return (
    <Preview>
      <Button color="default">Default</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="destructive">Destructive</Button>
    </Preview>
  );
}

export function ButtonSizes() {
  return (
    <Preview>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </Preview>
  );
}

export function ButtonDisabled() {
  return (
    <Preview>
      <Button disabled>Disabled solid</Button>
      <Button variant="outline" disabled>Disabled outline</Button>
      <Button variant="ghost" disabled>Disabled ghost</Button>
    </Preview>
  );
}
