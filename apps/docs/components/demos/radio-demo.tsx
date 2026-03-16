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
      }}
    >
      {children}
    </div>
  );
}

export function RadioBasic() {
  return (
    <Preview>
      <Radio.Group defaultValue="medium">
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Radio.Root value="small">
            <Radio.Indicator />
          </Radio.Root>
          Small
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Radio.Root value="medium">
            <Radio.Indicator />
          </Radio.Root>
          Medium
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Radio.Root value="large">
            <Radio.Indicator />
          </Radio.Root>
          Large
        </label>
      </Radio.Group>
    </Preview>
  );
}

export function RadioHorizontal() {
  return (
    <Preview>
      <Radio.Group defaultValue="medium" orientation="horizontal">
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Radio.Root value="small">
            <Radio.Indicator />
          </Radio.Root>
          Small
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Radio.Root value="medium">
            <Radio.Indicator />
          </Radio.Root>
          Medium
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Radio.Root value="large">
            <Radio.Indicator />
          </Radio.Root>
          Large
        </label>
      </Radio.Group>
    </Preview>
  );
}
