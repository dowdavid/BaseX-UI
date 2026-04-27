import * as stylex from '@stylexjs/stylex';
import { useState } from 'react';
import { tokens } from '@basex-ui/tokens';
import { ScrollArea, Dialog, Button } from '@basex-ui/components';
import { Preview } from '../components/Preview';

const pageStyles = stylex.create({
  verticalRoot: {
    width: '240px',
    height: '200px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tokens.colorBorderMuted,
  },
  bothRoot: {
    width: '320px',
    height: '200px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tokens.colorBorderMuted,
  },
  horizontalRoot: {
    width: '320px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tokens.colorBorderMuted,
  },
  innerVertical: {
    padding: tokens.space3,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space2,
  },
  innerHorizontal: {
    display: 'flex',
    gap: tokens.space2,
    padding: tokens.space3,
  },
  chip: {
    flex: '0 0 auto',
    paddingInline: tokens.space3,
    paddingBlock: tokens.space2,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tokens.colorBorderMuted,
    fontSize: tokens.fontSizeSm,
    color: tokens.colorText,
    whiteSpace: 'nowrap',
  },
  bothInner: {
    width: '1600px',
    height: '1400px',
    padding: tokens.space3,
    display: 'grid',
    gridTemplateColumns: 'repeat(24, 60px)',
    gap: tokens.space2,
  },
  cell: {
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: tokens.fontSizeSm,
    color: tokens.colorTextMuted,
    backgroundColor: tokens.colorMuted,
  },
  customThumb: {
    backgroundColor: tokens.colorPrimary,
  },
  line: {
    fontFamily: tokens.fontFamilyMono,
    fontSize: tokens.fontSizeSm,
    color: tokens.colorText,
  },
});

export function ScrollAreaPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Preview
        title="Vertical scroll"
        description="A bounded region with custom-styled scrollbars. The scrollbar fades in on hover or while scrolling."
        code={`<ScrollArea.Root style={{ width: 240, height: 200 }}>
  <ScrollArea.Viewport>
    {Array.from({ length: 100 }).map((_, i) => (
      <p key={i}>Line {i + 1}</p>
    ))}
  </ScrollArea.Viewport>
  <ScrollArea.Scrollbar orientation="vertical">
    <ScrollArea.Thumb />
  </ScrollArea.Scrollbar>
</ScrollArea.Root>`}
      >
        <ScrollArea.Root sx={pageStyles.verticalRoot}>
          <ScrollArea.Viewport>
            <div {...stylex.props(pageStyles.innerVertical)}>
              {Array.from({ length: 100 }).map((_, i) => (
                <p key={i} {...stylex.props(pageStyles.line)}>
                  Line {i + 1}
                </p>
              ))}
            </div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="vertical">
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </Preview>

      <Preview
        title="Horizontal + vertical"
        description="Both scrollbars and a corner where they intersect."
        code={`<ScrollArea.Root style={{ width: 320, height: 200 }}>
  <ScrollArea.Viewport>
    <div style={{ width: 1600, height: 1400 }}>{cells}</div>
  </ScrollArea.Viewport>
  <ScrollArea.Scrollbar orientation="vertical">
    <ScrollArea.Thumb />
  </ScrollArea.Scrollbar>
  <ScrollArea.Scrollbar orientation="horizontal">
    <ScrollArea.Thumb />
  </ScrollArea.Scrollbar>
  <ScrollArea.Corner />
</ScrollArea.Root>`}
      >
        <ScrollArea.Root sx={pageStyles.bothRoot}>
          <ScrollArea.Viewport>
            <div {...stylex.props(pageStyles.bothInner)}>
              {Array.from({ length: 24 * 28 }).map((_, i) => (
                <div key={i} {...stylex.props(pageStyles.cell)}>
                  {i + 1}
                </div>
              ))}
            </div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="vertical">
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
          <ScrollArea.Scrollbar orientation="horizontal">
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner />
        </ScrollArea.Root>
      </Preview>

      <Preview
        title="Custom thumb color"
        description="Override the thumb via the sx prop. Tokens only — primary brand color."
        code={`<ScrollArea.Root style={{ width: 320 }}>
  <ScrollArea.Viewport>
    <div style={{ display: 'flex', gap: 8, padding: 12 }}>{chips}</div>
  </ScrollArea.Viewport>
  <ScrollArea.Scrollbar orientation="horizontal">
    <ScrollArea.Thumb sx={customThumb} />
  </ScrollArea.Scrollbar>
</ScrollArea.Root>`}
      >
        <ScrollArea.Root sx={pageStyles.horizontalRoot}>
          <ScrollArea.Viewport>
            <div {...stylex.props(pageStyles.innerHorizontal)}>
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} {...stylex.props(pageStyles.chip)}>
                  Chip {i + 1}
                </div>
              ))}
            </div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="horizontal">
            <ScrollArea.Thumb sx={pageStyles.customThumb} />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </Preview>

      <Preview
        title="Inside a Dialog"
        description="A scroll region nested inside a Dialog panel for long content."
        code={`<Dialog.Root>
  <Dialog.Trigger render={<Button>Open dialog</Button>} />
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Header>
        <Dialog.Title>Long content</Dialog.Title>
      </Dialog.Header>
      <ScrollArea.Root style={{ maxHeight: 240 }}>
        <ScrollArea.Viewport>{lines}</ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="vertical">
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>`}
      >
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger render={<Button variant="outline">Open dialog</Button>} />
          <Dialog.Portal>
            <Dialog.Backdrop />
            <Dialog.Popup>
              <Dialog.Header>
                <Dialog.Title>Long content</Dialog.Title>
                <Dialog.Description>Scroll inside the dialog body.</Dialog.Description>
              </Dialog.Header>
              <ScrollArea.Root sx={pageStyles.verticalRoot}>
                <ScrollArea.Viewport>
                  <div {...stylex.props(pageStyles.innerVertical)}>
                    {Array.from({ length: 120 }).map((_, i) => (
                      <p key={i} {...stylex.props(pageStyles.line)}>
                        Line {i + 1}
                      </p>
                    ))}
                  </div>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar orientation="vertical">
                  <ScrollArea.Thumb />
                </ScrollArea.Scrollbar>
              </ScrollArea.Root>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      </Preview>
    </>
  );
}
