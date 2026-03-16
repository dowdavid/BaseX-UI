'use client';

import * as stylex from '@stylexjs/stylex';
import { Radio } from '@basex-ui/components';
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

export function RadioBasic() {
  return (
    <Preview>
      <Radio.Group defaultValue="apple">
        <label style={{ display: 'flex', alignItems: 'center',
        justifyContent: 'center', gap: '0.5rem' }}>
          <Radio.Root value="apple">
            <Radio.Indicator />
          </Radio.Root>
          Apple
        </label>
        <label style={{ display: 'flex', alignItems: 'center',
        justifyContent: 'center', gap: '0.5rem' }}>
          <Radio.Root value="banana">
            <Radio.Indicator />
          </Radio.Root>
          Banana
        </label>
        <label style={{ display: 'flex', alignItems: 'center',
        justifyContent: 'center', gap: '0.5rem' }}>
          <Radio.Root value="cherry">
            <Radio.Indicator />
          </Radio.Root>
          Cherry
        </label>
      </Radio.Group>
    </Preview>
  );
}

export function RadioHorizontal() {
  return (
    <Preview>
      <Radio.Group defaultValue="left" orientation="horizontal">
        <label style={{ display: 'flex', alignItems: 'center',
        justifyContent: 'center', gap: '0.5rem' }}>
          <Radio.Root value="left">
            <Radio.Indicator />
          </Radio.Root>
          Left
        </label>
        <label style={{ display: 'flex', alignItems: 'center',
        justifyContent: 'center', gap: '0.5rem' }}>
          <Radio.Root value="center">
            <Radio.Indicator />
          </Radio.Root>
          Center
        </label>
        <label style={{ display: 'flex', alignItems: 'center',
        justifyContent: 'center', gap: '0.5rem' }}>
          <Radio.Root value="right">
            <Radio.Indicator />
          </Radio.Root>
          Right
        </label>
      </Radio.Group>
    </Preview>
  );
}

export function RadioDisabled() {
  return (
    <Preview>
      <Radio.Group defaultValue="standard" disabled>
        <label style={{ display: 'flex', alignItems: 'center',
        justifyContent: 'center', gap: '0.5rem', opacity: 0.5 }}>
          <Radio.Root value="standard">
            <Radio.Indicator />
          </Radio.Root>
          Standard
        </label>
        <label style={{ display: 'flex', alignItems: 'center',
        justifyContent: 'center', gap: '0.5rem', opacity: 0.5 }}>
          <Radio.Root value="express">
            <Radio.Indicator />
          </Radio.Root>
          Express
        </label>
      </Radio.Group>
    </Preview>
  );
}
