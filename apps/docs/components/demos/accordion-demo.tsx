'use client';

import * as stylex from '@stylexjs/stylex';
import { Accordion } from '@basex-ui/components';
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

export function AccordionBasic() {
  return (
    <Preview>
      <Accordion.Root defaultValue={['item-1']} style={{ width: '100%' }}>
        <Accordion.Item value="item-1">
          <Accordion.Header>
            <Accordion.Trigger>What is BaseX UI?</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel>
            BaseX UI is an AI-first, copy-paste component library built on Base UI and styled with
            StyleX.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Header>
            <Accordion.Trigger>How does theming work?</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel>
            Themes are built with stylex.createTheme, overriding design tokens defined with
            stylex.defineVars.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="item-3">
          <Accordion.Header>
            <Accordion.Trigger>Can I customize components?</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel>
            Yes — every part accepts an sx prop for StyleX overrides, and you own the source code.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion.Root>
    </Preview>
  );
}

export function AccordionMultiple() {
  return (
    <Preview>
      <Accordion.Root multiple defaultValue={['item-1', 'item-2']} style={{ width: '100%' }}>
        <Accordion.Item value="item-1">
          <Accordion.Header>
            <Accordion.Trigger>Section 1 (open)</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel>Both panels can be open at the same time.</Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Header>
            <Accordion.Trigger>Section 2 (open)</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel>Try closing one — the other stays open.</Accordion.Panel>
        </Accordion.Item>
      </Accordion.Root>
    </Preview>
  );
}
