'use client';

import * as stylex from '@stylexjs/stylex';
import { Menu, Menubar } from '@basex-ui/components';
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
