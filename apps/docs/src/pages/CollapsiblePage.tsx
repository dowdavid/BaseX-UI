import { Collapsible } from '@basex-ui/components';
import { Preview } from '../components/Preview';

export function CollapsiblePage() {
  return (
    <>
      <Preview
        title="Basic"
        description="Click the trigger to expand and collapse the content panel."
        constrained
        code={`<Collapsible.Root>
  <Collapsible.Trigger>What is BaseX UI?</Collapsible.Trigger>
  <Collapsible.Panel>
    Content goes here.
  </Collapsible.Panel>
</Collapsible.Root>`}
      >
        <Collapsible.Root>
          <Collapsible.Trigger>What is BaseX UI?</Collapsible.Trigger>
          <Collapsible.Panel>
            BaseX UI is an AI-first component library built on Base UI and styled with StyleX. Every
            component ships with an opinionated default style and is customizable via the sx prop.
          </Collapsible.Panel>
        </Collapsible.Root>
      </Preview>

      <Preview
        title="Default open"
        description="The panel starts expanded via the defaultOpen prop."
        constrained
        code={`<Collapsible.Root defaultOpen>
  <Collapsible.Trigger>Project details</Collapsible.Trigger>
  <Collapsible.Panel>
    This panel starts open.
  </Collapsible.Panel>
</Collapsible.Root>`}
      >
        <Collapsible.Root defaultOpen>
          <Collapsible.Trigger>Project details</Collapsible.Trigger>
          <Collapsible.Panel>
            This panel starts open. Click the trigger to collapse it. The height transition animates
            smoothly in both directions using the keepMounted pattern.
          </Collapsible.Panel>
        </Collapsible.Root>
      </Preview>

      <Preview
        title="Disabled"
        description="The trigger cannot be clicked and the panel cannot be toggled."
        constrained
        code={`<Collapsible.Root disabled>
  <Collapsible.Trigger>Locked section</Collapsible.Trigger>
  <Collapsible.Panel>Hidden content.</Collapsible.Panel>
</Collapsible.Root>`}
      >
        <Collapsible.Root disabled>
          <Collapsible.Trigger>Locked section</Collapsible.Trigger>
          <Collapsible.Panel>This content is hidden and cannot be revealed.</Collapsible.Panel>
        </Collapsible.Root>
      </Preview>
    </>
  );
}
