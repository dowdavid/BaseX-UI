'use client';

import * as stylex from '@stylexjs/stylex';
import { Drawer, Button } from '@basex-ui/components';
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

export function DrawerBasic() {
  return (
    <Preview>
      <Drawer.Root>
        <Drawer.Trigger render={<Button>Open drawer</Button>} />
        <Drawer.Portal>
          <Drawer.Backdrop />
          <Drawer.Popup>
            <Drawer.Header>
              <Drawer.Title>Navigation</Drawer.Title>
            </Drawer.Header>
            <Drawer.Panel>
              <p>Dashboard</p>
              <p>Settings</p>
              <p>Account</p>
              <p>Support</p>
            </Drawer.Panel>
            <Drawer.Footer>
              <Drawer.Close render={<Button variant="outline">Close</Button>} />
            </Drawer.Footer>
          </Drawer.Popup>
        </Drawer.Portal>
      </Drawer.Root>
    </Preview>
  );
}

export function DrawerDirections() {
  return (
    <Preview>
      <Drawer.Root swipeDirection="left">
        <Drawer.Trigger render={<Button variant="outline">Left drawer</Button>} />
        <Drawer.Portal>
          <Drawer.Backdrop />
          <Drawer.Popup>
            <Drawer.Header>
              <Drawer.Title>Left panel</Drawer.Title>
              <Drawer.Description>Slides in from the left edge.</Drawer.Description>
            </Drawer.Header>
            <Drawer.Panel>
              <p>Sidebar content goes here.</p>
            </Drawer.Panel>
          </Drawer.Popup>
        </Drawer.Portal>
      </Drawer.Root>

      <Drawer.Root swipeDirection="right">
        <Drawer.Trigger render={<Button variant="outline">Right drawer</Button>} />
        <Drawer.Portal>
          <Drawer.Backdrop />
          <Drawer.Popup>
            <Drawer.Header>
              <Drawer.Title>Right panel</Drawer.Title>
              <Drawer.Description>Slides in from the right edge.</Drawer.Description>
            </Drawer.Header>
            <Drawer.Panel>
              <p>Detail content goes here.</p>
            </Drawer.Panel>
          </Drawer.Popup>
        </Drawer.Portal>
      </Drawer.Root>
    </Preview>
  );
}
