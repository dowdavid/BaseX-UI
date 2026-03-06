import { Menu, Menubar } from '@basex-ui/components';
import { Preview } from '../components/Preview';

export function MenubarPage() {
  return (
    <>
      <Preview
        title="Basic menubar"
        description="An application-style menu bar with File and Edit menus."
      >
        <Menubar>
          <Menu.Root>
            <Menu.Trigger>File</Menu.Trigger>
            <Menu.Portal>
              <Menu.Positioner>
                <Menu.Popup>
                  <Menu.Item>New</Menu.Item>
                  <Menu.Item>Open</Menu.Item>
                  <Menu.Item>Save</Menu.Item>
                  <Menu.Separator />
                  <Menu.Item>Exit</Menu.Item>
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
            <Menu.Trigger>Help</Menu.Trigger>
            <Menu.Portal>
              <Menu.Positioner>
                <Menu.Popup>
                  <Menu.Item>Documentation</Menu.Item>
                  <Menu.Item>About</Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>
        </Menubar>
      </Preview>
    </>
  );
}
