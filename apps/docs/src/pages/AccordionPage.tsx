import { Accordion } from '@basex-ui/components';
import { Preview } from '../components/Preview';

export function AccordionPage() {
  return (
    <>
      <Preview
        title="Single open"
        description="Only one panel open at a time. Opening a new panel closes the previous."
        constrained
        code={`<Accordion.Root defaultValue={['item-1']}>
  <Accordion.Item value="item-1">
    <Accordion.Header>
      <Accordion.Trigger>Question</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>Answer</Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>`}
      >
        <Accordion.Root defaultValue={['item-1']}>
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

      <Preview
        title="Multiple open"
        description="Multiple panels can be expanded simultaneously."
        constrained
        code={`<Accordion.Root multiple defaultValue={['item-1', 'item-2']}>
  <Accordion.Item value="item-1">...</Accordion.Item>
  <Accordion.Item value="item-2">...</Accordion.Item>
</Accordion.Root>`}
      >
        <Accordion.Root multiple defaultValue={['item-1', 'item-2']}>
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

      <Preview
        title="Disabled item"
        description="Individual items can be disabled to prevent interaction."
        constrained
        code={`<Accordion.Root>
  <Accordion.Item value="item-1">...</Accordion.Item>
  <Accordion.Item value="item-2" disabled>...</Accordion.Item>
</Accordion.Root>`}
      >
        <Accordion.Root>
          <Accordion.Item value="item-1">
            <Accordion.Header>
              <Accordion.Trigger>Enabled section</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel>This section works normally.</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="item-2" disabled>
            <Accordion.Header>
              <Accordion.Trigger>Disabled section</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel>You cannot open this section.</Accordion.Panel>
          </Accordion.Item>
        </Accordion.Root>
      </Preview>
    </>
  );
}
