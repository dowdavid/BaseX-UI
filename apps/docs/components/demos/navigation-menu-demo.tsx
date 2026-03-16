'use client';

import { NavigationMenu } from '@basex-ui/components';
import { Preview } from '@/components/preview';

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
