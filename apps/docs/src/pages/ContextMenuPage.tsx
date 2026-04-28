import { ContextMenu } from '@basex-ui/components';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { Preview } from '../components/Preview';

const styles = stylex.create({
  trigger: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '120px',
    borderWidth: '1px',
    borderStyle: 'dashed',
    borderColor: tokens.colorBorder,
    borderRadius: tokens.radiusMd,
    color: tokens.colorTextMuted,
    fontFamily: tokens.fontFamilySans,
    fontSize: tokens.fontSizeSm,
    userSelect: 'none',
  },
});

export function ContextMenuPage() {
  return (
    <>
      <Preview
        title="Basic context menu"
        description="A right-click context menu with items and a destructive action."
        code={`<ContextMenu.Root>
  <ContextMenu.Trigger>Right-click here</ContextMenu.Trigger>
  <ContextMenu.Portal>
    <ContextMenu.Positioner>
      <ContextMenu.Popup>
        <ContextMenu.Item>Cut</ContextMenu.Item>
        <ContextMenu.Item>Copy</ContextMenu.Item>
        <ContextMenu.Item>Paste</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item destructive>Delete</ContextMenu.Item>
      </ContextMenu.Popup>
    </ContextMenu.Positioner>
  </ContextMenu.Portal>
</ContextMenu.Root>`}
      >
        <ContextMenu.Root>
          <ContextMenu.Trigger sx={styles.trigger}>Right-click here</ContextMenu.Trigger>
          <ContextMenu.Portal>
            <ContextMenu.Positioner>
              <ContextMenu.Popup>
                <ContextMenu.Item onClick={() => {}}>Cut</ContextMenu.Item>
                <ContextMenu.Item onClick={() => {}}>Copy</ContextMenu.Item>
                <ContextMenu.Item onClick={() => {}}>Paste</ContextMenu.Item>
                <ContextMenu.Separator />
                <ContextMenu.Item destructive onClick={() => {}}>
                  Delete
                </ContextMenu.Item>
              </ContextMenu.Popup>
            </ContextMenu.Positioner>
          </ContextMenu.Portal>
        </ContextMenu.Root>
      </Preview>

      <Preview
        title="Context menu with groups"
        description="Right-click items organized into labeled groups."
        code={`<ContextMenu.Root>
  <ContextMenu.Trigger>Right-click here</ContextMenu.Trigger>
  <ContextMenu.Portal>
    <ContextMenu.Positioner>
      <ContextMenu.Popup>
        <ContextMenu.Group>
          <ContextMenu.GroupLabel>Edit</ContextMenu.GroupLabel>
          <ContextMenu.Item>Cut</ContextMenu.Item>
          <ContextMenu.Item>Copy</ContextMenu.Item>
        </ContextMenu.Group>
        <ContextMenu.Separator />
        <ContextMenu.Group>
          <ContextMenu.GroupLabel>View</ContextMenu.GroupLabel>
          <ContextMenu.Item>Zoom In</ContextMenu.Item>
          <ContextMenu.Item>Zoom Out</ContextMenu.Item>
        </ContextMenu.Group>
      </ContextMenu.Popup>
    </ContextMenu.Positioner>
  </ContextMenu.Portal>
</ContextMenu.Root>`}
      >
        <ContextMenu.Root>
          <ContextMenu.Trigger sx={styles.trigger}>Right-click here</ContextMenu.Trigger>
          <ContextMenu.Portal>
            <ContextMenu.Positioner>
              <ContextMenu.Popup>
                <ContextMenu.Group>
                  <ContextMenu.GroupLabel>Edit</ContextMenu.GroupLabel>
                  <ContextMenu.Item>Cut</ContextMenu.Item>
                  <ContextMenu.Item>Copy</ContextMenu.Item>
                </ContextMenu.Group>
                <ContextMenu.Separator />
                <ContextMenu.Group>
                  <ContextMenu.GroupLabel>View</ContextMenu.GroupLabel>
                  <ContextMenu.Item>Zoom In</ContextMenu.Item>
                  <ContextMenu.Item>Zoom Out</ContextMenu.Item>
                </ContextMenu.Group>
              </ContextMenu.Popup>
            </ContextMenu.Positioner>
          </ContextMenu.Portal>
        </ContextMenu.Root>
      </Preview>

      <Preview
        title="With a submenu"
        description="Nested submenu for organizing related actions."
        code={`<ContextMenu.Root>
  <ContextMenu.Trigger>Right-click here</ContextMenu.Trigger>
  <ContextMenu.Portal>
    <ContextMenu.Positioner>
      <ContextMenu.Popup>
        <ContextMenu.Item>Open</ContextMenu.Item>
        <ContextMenu.SubmenuRoot>
          <ContextMenu.SubmenuTrigger>Share</ContextMenu.SubmenuTrigger>
          <ContextMenu.Portal>
            <ContextMenu.Positioner>
              <ContextMenu.Popup>
                <ContextMenu.Item>Email</ContextMenu.Item>
                <ContextMenu.Item>Copy Link</ContextMenu.Item>
              </ContextMenu.Popup>
            </ContextMenu.Positioner>
          </ContextMenu.Portal>
        </ContextMenu.SubmenuRoot>
      </ContextMenu.Popup>
    </ContextMenu.Positioner>
  </ContextMenu.Portal>
</ContextMenu.Root>`}
      >
        <ContextMenu.Root>
          <ContextMenu.Trigger sx={styles.trigger}>Right-click here</ContextMenu.Trigger>
          <ContextMenu.Portal>
            <ContextMenu.Positioner>
              <ContextMenu.Popup>
                <ContextMenu.Item>Open</ContextMenu.Item>
                <ContextMenu.SubmenuRoot>
                  <ContextMenu.SubmenuTrigger>Share</ContextMenu.SubmenuTrigger>
                  <ContextMenu.Portal>
                    <ContextMenu.Positioner>
                      <ContextMenu.Popup>
                        <ContextMenu.Item>Email</ContextMenu.Item>
                        <ContextMenu.Item>Copy Link</ContextMenu.Item>
                      </ContextMenu.Popup>
                    </ContextMenu.Positioner>
                  </ContextMenu.Portal>
                </ContextMenu.SubmenuRoot>
              </ContextMenu.Popup>
            </ContextMenu.Positioner>
          </ContextMenu.Portal>
        </ContextMenu.Root>
      </Preview>
    </>
  );
}
