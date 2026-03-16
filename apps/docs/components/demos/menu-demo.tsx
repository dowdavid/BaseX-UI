'use client';

import { useState } from 'react';
import { Menu } from '@basex-ui/components';
import { Preview } from '@/components/preview';

export function MenuBasic() {
  return (
    <Preview>
      <Menu.Root>
        <Menu.Trigger>Open Menu</Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner>
            <Menu.Popup>
              <Menu.Item onClick={() => {}}>Edit</Menu.Item>
              <Menu.Item onClick={() => {}}>Duplicate</Menu.Item>
              <Menu.Separator />
              <Menu.Item destructive onClick={() => {}}>
                Delete
              </Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    </Preview>
  );
}

export function MenuGroups() {
  return (
    <Preview>
      <Menu.Root>
        <Menu.Trigger>Open Menu</Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner>
            <Menu.Popup>
              <Menu.Group>
                <Menu.GroupLabel>Layout</Menu.GroupLabel>
                <Menu.Item>Grid</Menu.Item>
                <Menu.Item>List</Menu.Item>
              </Menu.Group>
              <Menu.Separator />
              <Menu.Group>
                <Menu.GroupLabel>Sort by</Menu.GroupLabel>
                <Menu.Item>Name</Menu.Item>
                <Menu.Item>Date</Menu.Item>
                <Menu.Item>Size</Menu.Item>
              </Menu.Group>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    </Preview>
  );
}

export function MenuCheckbox() {
  const [showGrid, setShowGrid] = useState(false);
  const [showRulers, setShowRulers] = useState(true);

  return (
    <Preview>
      <Menu.Root>
        <Menu.Trigger>Open Menu</Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner>
            <Menu.Popup>
              <Menu.CheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>
                <Menu.CheckboxItemIndicator>✓</Menu.CheckboxItemIndicator>
                Show Grid
              </Menu.CheckboxItem>
              <Menu.CheckboxItem checked={showRulers} onCheckedChange={setShowRulers}>
                <Menu.CheckboxItemIndicator>✓</Menu.CheckboxItemIndicator>
                Show Rulers
              </Menu.CheckboxItem>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    </Preview>
  );
}
