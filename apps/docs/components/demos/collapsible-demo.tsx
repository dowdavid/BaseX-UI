'use client';

import { Collapsible } from '@basex-ui/components';
import { Preview } from '@/components/preview';

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
