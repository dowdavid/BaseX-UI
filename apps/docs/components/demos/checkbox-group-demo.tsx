'use client';

import * as stylex from '@stylexjs/stylex';
import { Checkbox, CheckboxGroup } from '@basex-ui/components';
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

export function CheckboxGroupBasic() {
  return (
    <Preview>
      <CheckboxGroup.Root>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Checkbox.Root name="notifications" value="email">
            <Checkbox.Indicator />
          </Checkbox.Root>
          Email
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Checkbox.Root name="notifications" value="sms">
            <Checkbox.Indicator />
          </Checkbox.Root>
          SMS
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Checkbox.Root name="notifications" value="push">
            <Checkbox.Indicator />
          </Checkbox.Root>
          Push
        </label>
      </CheckboxGroup.Root>
    </Preview>
  );
}
