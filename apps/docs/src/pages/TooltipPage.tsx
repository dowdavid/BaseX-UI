import { Button, Tooltip } from '@basex-ui/components';
import { Preview } from '../components/Preview';

export function TooltipPage() {
  return (
    <>
      <Preview
        title="Basic"
        description="A short, non-interactive label that opens on hover or focus."
        code={`<Tooltip.Root>
  <Tooltip.Trigger render={<Button variant="outline" size="sm" />}>
    Save
  </Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Positioner>
      <Tooltip.Popup>Saves your changes</Tooltip.Popup>
    </Tooltip.Positioner>
  </Tooltip.Portal>
</Tooltip.Root>`}
      >
        <Tooltip.Root>
          <Tooltip.Trigger render={<Button variant="outline" size="sm" />}>Save</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner>
              <Tooltip.Popup>Saves your changes</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Preview>

      <Preview
        title="With delay"
        description="Per-trigger delay overrides the Provider default."
        code={`<Tooltip.Root>
  <Tooltip.Trigger delay={200} render={<Button variant="outline" size="sm" />}>
    Hover me
  </Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Positioner>
      <Tooltip.Popup>Opens after 200ms</Tooltip.Popup>
    </Tooltip.Positioner>
  </Tooltip.Portal>
</Tooltip.Root>`}
      >
        <Tooltip.Root>
          <Tooltip.Trigger delay={200} render={<Button variant="outline" size="sm" />}>
            Hover me
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner>
              <Tooltip.Popup>Opens after 200ms</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Preview>

      <Preview
        title="Shared delay group"
        description="Tooltips inside a Provider skip the open delay when moving between adjacent triggers."
        code={`<Tooltip.Provider delay={600}>
  <Tooltip.Root>
    <Tooltip.Trigger render={<Button variant="outline" size="sm" />}>Bold</Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.Positioner>
        <Tooltip.Popup>Bold (⌘B)</Tooltip.Popup>
      </Tooltip.Positioner>
    </Tooltip.Portal>
  </Tooltip.Root>
  <Tooltip.Root>
    <Tooltip.Trigger render={<Button variant="outline" size="sm" />}>Italic</Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.Positioner>
        <Tooltip.Popup>Italic (⌘I)</Tooltip.Popup>
      </Tooltip.Positioner>
    </Tooltip.Portal>
  </Tooltip.Root>
  <Tooltip.Root>
    <Tooltip.Trigger render={<Button variant="outline" size="sm" />}>Underline</Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.Positioner>
        <Tooltip.Popup>Underline (⌘U)</Tooltip.Popup>
      </Tooltip.Positioner>
    </Tooltip.Portal>
  </Tooltip.Root>
</Tooltip.Provider>`}
      >
        <Tooltip.Provider delay={600}>
          <div style={{ display: 'flex', gap: 8 }}>
            <Tooltip.Root>
              <Tooltip.Trigger render={<Button variant="outline" size="sm" />}>
                Bold
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Positioner>
                  <Tooltip.Popup>Bold (⌘B)</Tooltip.Popup>
                </Tooltip.Positioner>
              </Tooltip.Portal>
            </Tooltip.Root>
            <Tooltip.Root>
              <Tooltip.Trigger render={<Button variant="outline" size="sm" />}>
                Italic
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Positioner>
                  <Tooltip.Popup>Italic (⌘I)</Tooltip.Popup>
                </Tooltip.Positioner>
              </Tooltip.Portal>
            </Tooltip.Root>
            <Tooltip.Root>
              <Tooltip.Trigger render={<Button variant="outline" size="sm" />}>
                Underline
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Positioner>
                  <Tooltip.Popup>Underline (⌘U)</Tooltip.Popup>
                </Tooltip.Positioner>
              </Tooltip.Portal>
            </Tooltip.Root>
          </div>
        </Tooltip.Provider>
      </Preview>

      <Preview
        title="On a disabled trigger"
        description="Native disabled buttons don't fire pointer events. Wrap the control in a focusable span."
        code={`<Tooltip.Root>
  <Tooltip.Trigger render={<span tabIndex={0} aria-disabled="true" />}>
    <Button variant="outline" size="sm" disabled>
      Submit
    </Button>
  </Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Positioner>
      <Tooltip.Popup>Fill out all required fields first</Tooltip.Popup>
    </Tooltip.Positioner>
  </Tooltip.Portal>
</Tooltip.Root>`}
      >
        <Tooltip.Root>
          <Tooltip.Trigger
            render={
              <span
                tabIndex={0}
                aria-disabled="true"
                style={{ display: 'inline-block', borderRadius: 6 }}
              />
            }
          >
            <Button variant="outline" size="sm" disabled>
              Submit
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner>
              <Tooltip.Popup>Fill out all required fields first</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Preview>
    </>
  );
}
