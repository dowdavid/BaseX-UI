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

const styles = stylex.create({
  stack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%',
  },
});

export function NumberFieldBasic() {
  return (
    <Preview>
      <NumberField.Root defaultValue={5}>
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
      <NumberField.Root defaultValue={0} min={0} max={100} step={5}>
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
      <div {...stylex.props(styles.stack)}>
        {(['sm', 'md', 'lg'] as const).map((size) => (
          <NumberField.Root key={size} defaultValue={1}>
            <NumberField.Group size={size}>
              <NumberField.Decrement />
              <NumberField.Input />
              <NumberField.Increment />
            </NumberField.Group>
          </NumberField.Root>
        ))}
      </div>
    </Preview>
  );
}

export function NumberFieldDisabled() {
  return (
    <Preview>
      <NumberField.Root defaultValue={3} disabled>
        <NumberField.Group disabled>
          <NumberField.Decrement />
          <NumberField.Input />
          <NumberField.Increment />
        </NumberField.Group>
      </NumberField.Root>
    </Preview>
  );
}
