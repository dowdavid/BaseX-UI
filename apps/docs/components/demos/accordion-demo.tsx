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
      <Accordion.Root style={{ width: '100%' }}>
        <Accordion.Item>
          <Accordion.Header>
            <Accordion.Trigger>Getting Started</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel>
            Base X UI provides a set of unstyled, accessible components built on Base UI and styled
            with StyleX. Install the package and import components to get started.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>
            <Accordion.Trigger>Installation</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel>
            Run npm install @basex-ui/components to add the component library to your project.
            StyleX and Base UI are included as peer dependencies.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>
            <Accordion.Trigger>Usage</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel>
            Import individual components from @basex-ui/components. Each component uses a compound
            pattern with dot notation like Accordion.Root, Accordion.Item, and Accordion.Trigger.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion.Root>
    </Preview>
  );
}

export function AccordionMultiple() {
  return (
    <Preview>
      <Accordion.Root openMultiple style={{ width: '100%' }}>
        <Accordion.Item>
          <Accordion.Header>
            <Accordion.Trigger>Getting Started</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel>
            Base X UI provides a set of unstyled, accessible components built on Base UI and styled
            with StyleX. Install the package and import components to get started.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>
            <Accordion.Trigger>Installation</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel>
            Run npm install @basex-ui/components to add the component library to your project.
            StyleX and Base UI are included as peer dependencies.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>
            <Accordion.Trigger>Usage</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel>
            Import individual components from @basex-ui/components. Each component uses a compound
            pattern with dot notation like Accordion.Root, Accordion.Item, and Accordion.Trigger.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion.Root>
    </Preview>
  );
}
