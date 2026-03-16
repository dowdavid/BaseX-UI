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
        justifyContent: 'center',
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
        <Collapsible.Trigger>What is BaseX UI?</Collapsible.Trigger>
        <Collapsible.Panel>
          BaseX UI is an AI-first component library built on Base UI and styled with StyleX. Every
          component ships with an opinionated default style and is customizable via the sx prop.
        </Collapsible.Panel>
      </Collapsible.Root>
    </Preview>
  );
}

export function CollapsibleDefaultOpen() {
  return (
    <Preview>
      <Collapsible.Root defaultOpen>
        <Collapsible.Trigger>Project details</Collapsible.Trigger>
        <Collapsible.Panel>
          This panel starts open. Click the trigger to collapse it. The height transition animates
          smoothly in both directions using the keepMounted pattern.
        </Collapsible.Panel>
      </Collapsible.Root>
    </Preview>
  );
}

export function CollapsibleDisabled() {
  return (
    <Preview>
      <Collapsible.Root disabled>
        <Collapsible.Trigger>Locked section</Collapsible.Trigger>
        <Collapsible.Panel>This content is hidden and cannot be revealed.</Collapsible.Panel>
      </Collapsible.Root>
    </Preview>
  );
}
