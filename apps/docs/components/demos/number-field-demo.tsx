'use client';

import * as stylex from '@stylexjs/stylex';
import { NumberField } from '@basex-ui/components';
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

export function NumberFieldBasic() {
  return (
    <Preview>
      <NumberField.Root defaultValue={0}>
        <NumberField.Group>
          <NumberField.Decrement />
          <NumberField.Input />
          <NumberField.Increment />
        </NumberField.Group>
      </NumberField.Root>
    </Preview>
  );
}

export function NumberFieldConstrained() {
  return (
    <Preview>
      <NumberField.Root defaultValue={50} min={0} max={100} step={5}>
        <NumberField.Group>
          <NumberField.Decrement />
          <NumberField.Input />
          <NumberField.Increment />
        </NumberField.Group>
      </NumberField.Root>
    </Preview>
  );
}

export function NumberFieldSizes() {
  return (
    <Preview>
      <NumberField.Root defaultValue={0}>
        <NumberField.Group size="sm">
          <NumberField.Decrement />
          <NumberField.Input />
          <NumberField.Increment />
        </NumberField.Group>
      </NumberField.Root>
      <NumberField.Root defaultValue={0}>
        <NumberField.Group size="md">
          <NumberField.Decrement />
          <NumberField.Input />
          <NumberField.Increment />
        </NumberField.Group>
      </NumberField.Root>
      <NumberField.Root defaultValue={0}>
        <NumberField.Group size="lg">
          <NumberField.Decrement />
          <NumberField.Input />
          <NumberField.Increment />
        </NumberField.Group>
      </NumberField.Root>
    </Preview>
  );
}
