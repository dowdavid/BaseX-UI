'use client';

import * as stylex from '@stylexjs/stylex';
import { Checkbox } from '@basex-ui/components';
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

export function CheckboxBasic() {
  return (
    <Preview>
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Checkbox.Root defaultChecked>
          <Checkbox.Indicator />
        </Checkbox.Root>
        Enable notifications
      </label>
    </Preview>
  );
}

export function CheckboxDisabled() {
  return (
    <Preview>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.64 }}>
          <Checkbox.Root disabled>
            <Checkbox.Indicator />
          </Checkbox.Root>
          Unchecked disabled
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.64 }}>
          <Checkbox.Root disabled defaultChecked>
            <Checkbox.Indicator />
          </Checkbox.Root>
          Checked disabled
        </label>
      </div>
    </Preview>
  );
}
