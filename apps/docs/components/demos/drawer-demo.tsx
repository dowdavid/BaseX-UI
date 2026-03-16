'use client';

import { Drawer, Button } from '@basex-ui/components';
import { Preview } from '@/components/preview';

export function DrawerBasic() {
  return (
    <Preview>
      <Drawer.Root swipeDirection="right">
        <Drawer.Trigger render={<Button variant="outline">Side drawer</Button>} />
        <Drawer.Portal>
          <Drawer.Backdrop />
          <Drawer.Popup showCloseButton={false}>
            <Drawer.Header>
              <Drawer.Title>Side drawer</Drawer.Title>
            </Drawer.Header>
            <Drawer.Panel>
              <Drawer.Close render={<Button variant="outline">Close</Button>} />
            </Drawer.Panel>
          </Drawer.Popup>
        </Drawer.Portal>
      </Drawer.Root>
    </Preview>
  );
}

export function DrawerBottom() {
  return (
    <Preview>
      <Drawer.Root>
        <Drawer.Trigger render={<Button variant="outline">Bottom drawer</Button>} />
        <Drawer.Portal>
          <Drawer.Backdrop />
          <Drawer.Popup showCloseButton={false}>
            <Drawer.Header>
              <Drawer.Title>Bottom drawer</Drawer.Title>
            </Drawer.Header>
            <Drawer.Panel>
              <Drawer.Close render={<Button variant="outline">Close</Button>} />
            </Drawer.Panel>
          </Drawer.Popup>
        </Drawer.Portal>
      </Drawer.Root>
    </Preview>
  );
}
