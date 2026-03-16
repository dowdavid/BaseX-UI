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
