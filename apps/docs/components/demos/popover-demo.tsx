'use client';

import { Popover, Button } from '@basex-ui/components';
import { Preview } from '@/components/preview';

export function PopoverBasic() {
  return (
    <Preview>
      <Popover.Root>
        <Popover.Trigger render={<Button variant="outline" size="sm" />}>
          Open popover
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Positioner>
            <Popover.Popup>This is a simple popover with some helpful content.</Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    </Preview>
  );
}

export function PopoverWithTitle() {
  return (
    <Preview>
      <Popover.Root>
        <Popover.Trigger render={<Button variant="outline" size="sm" />}>Details</Popover.Trigger>
        <Popover.Portal>
          <Popover.Positioner>
            <Popover.Popup>
              <Popover.Title>Notifications</Popover.Title>
              <Popover.Description>
                You have 3 unread notifications. Click to view them in your inbox.
              </Popover.Description>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    </Preview>
  );
}

export function PopoverDismissible() {
  return (
    <Preview>
      <Popover.Root>
        <Popover.Trigger render={<Button variant="outline" size="sm" />}>
          Dismissible
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Positioner>
            <Popover.Popup>
              <Popover.Close />
              <Popover.Title>Settings</Popover.Title>
              <Popover.Description>
                Configure your notification preferences here.
              </Popover.Description>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    </Preview>
  );
}
