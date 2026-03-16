'use client';

import * as stylex from '@stylexjs/stylex';
import { NavigationMenu } from '@basex-ui/components';
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
        justifyContent: 'center',
      }}
    >
      {children}
    </div>
  );
}

export function NavigationMenuBasic() {
  return (
    <Preview>
      <NavigationMenu.Root>
        <NavigationMenu.List>
          <NavigationMenu.Item value="products">
            <NavigationMenu.Trigger>
              Products <NavigationMenu.Icon />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content>
              <div style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
                <a href="#" style={{ padding: '0.5rem', textDecoration: 'none', color: 'inherit' }}>
                  Analytics
                </a>
                <a href="#" style={{ padding: '0.5rem', textDecoration: 'none', color: 'inherit' }}>
                  Automation
                </a>
              </div>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Item value="about">
            <NavigationMenu.Trigger>
              About <NavigationMenu.Icon />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content>
              <div style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
                <a href="#" style={{ padding: '0.5rem', textDecoration: 'none', color: 'inherit' }}>
                  Team
                </a>
                <a href="#" style={{ padding: '0.5rem', textDecoration: 'none', color: 'inherit' }}>
                  Mission
                </a>
              </div>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Link href="#">Contact</NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
        <NavigationMenu.Portal>
          <NavigationMenu.Positioner>
            <NavigationMenu.Popup>
              <NavigationMenu.Viewport />
            </NavigationMenu.Popup>
          </NavigationMenu.Positioner>
        </NavigationMenu.Portal>
      </NavigationMenu.Root>
    </Preview>
  );
}
