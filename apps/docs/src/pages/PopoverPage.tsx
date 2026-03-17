import { Button, Popover } from '@basex-ui/components';
import { Preview } from '../components/Preview';

export function PopoverPage() {
  return (
    <>
      <Preview
        title="Basic"
        description="A simple popover with text content."
        code={`<Popover.Root>
  <Popover.Trigger render={<Button variant="outline" size="sm" />}>
    Open popover
  </Popover.Trigger>
  <Popover.Portal>
    <Popover.Positioner>
      <Popover.Popup>Some helpful content.</Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
</Popover.Root>`}
      >
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

      <Preview
        title="With title & description"
        description="Popover with structured content."
        code={`<Popover.Root>
  <Popover.Trigger render={<Button variant="outline" size="sm" />}>
    Details
  </Popover.Trigger>
  <Popover.Portal>
    <Popover.Positioner>
      <Popover.Popup>
        <Popover.Title>Notifications</Popover.Title>
        <Popover.Description>You have 3 unread notifications.</Popover.Description>
      </Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
</Popover.Root>`}
      >
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

      <Preview
        title="With close button"
        description="Popover that can be explicitly dismissed."
        code={`<Popover.Root>
  <Popover.Trigger render={<Button variant="outline" size="sm" />}>
    Dismissible
  </Popover.Trigger>
  <Popover.Portal>
    <Popover.Positioner>
      <Popover.Popup>
        <Popover.Close />
        <Popover.Title>Settings</Popover.Title>
        <Popover.Description>Configure your preferences.</Popover.Description>
      </Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
</Popover.Root>`}
      >
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
    </>
  );
}
