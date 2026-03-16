'use client';

import * as stylex from '@stylexjs/stylex';
import { Collapsible } from '@basex-ui/components';
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

export function CollapsibleBasic() {
  return (
    <Preview>
      <Collapsible.Root>
        <Collapsible.Trigger>Show details</Collapsible.Trigger>
        <Collapsible.Panel>
          Here are the additional details that were hidden.
        </Collapsible.Panel>
      </Collapsible.Root>
    </Preview>
  );
}
