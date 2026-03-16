'use client';

import { Menu, Menubar } from '@basex-ui/components';
import { Preview } from '@/components/preview';

export function MenubarBasic() {
  return (
    <Preview>
      <Menubar>
        <Menu.Root>
          <Menu.Trigger>File</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item>New</Menu.Item>
                <Menu.Item>Open</Menu.Item>
                <Menu.Item>Save</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
        <Menu.Root>
          <Menu.Trigger>Edit</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item>Undo</Menu.Item>
                <Menu.Item>Redo</Menu.Item>
                <Menu.Separator />
                <Menu.Item>Cut</Menu.Item>
                <Menu.Item>Copy</Menu.Item>
                <Menu.Item>Paste</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
        <Menu.Root>
          <Menu.Trigger>View</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item>Zoom In</Menu.Item>
                <Menu.Item>Zoom Out</Menu.Item>
                <Menu.Item>Reset</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      </Menubar>
    </Preview>
  );
}
