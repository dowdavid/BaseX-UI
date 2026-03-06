import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { Drawer, Button } from '@basex-ui/components';
import { Preview } from '../components/Preview';

const pageStyles = stylex.create({
  handle: {
    width: '3rem',
    height: '0.25rem',
    margin: '0 auto',
    marginTop: tokens.space2,
    marginBottom: tokens.space6,
    borderRadius: '9999px',
    backgroundColor: tokens.colorBorderMuted,
  },
  bottomHeader: {
    textAlign: 'center',
    paddingTop: 0,
    paddingBottom: tokens.space8,
  },
  bottomTitle: {
    paddingRight: 0,
  },
  bottomContent: {
    alignItems: 'center',
    paddingBottom: tokens.space8,
  },
});

export function DrawerPage() {
  return (
    <>
      <Preview
        title="Side drawer"
        description="A right-anchored drawer with a title and close button."
      >
        <Drawer.Root swipeDirection="right">
          <Drawer.Trigger render={<Button>Side drawer</Button>} />
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

      <Preview
        title="Bottom drawer"
        description="A full-width drawer that slides up from the bottom edge."
      >
        <Drawer.Root>
          <Drawer.Trigger render={<Button>Bottom drawer</Button>} />
          <Drawer.Portal>
            <Drawer.Backdrop />
            <Drawer.Popup showCloseButton={false}>
              <div {...stylex.props(pageStyles.handle)} />
              <Drawer.Header sx={pageStyles.bottomHeader}>
                <Drawer.Title sx={pageStyles.bottomTitle}>Bottom drawer</Drawer.Title>
              </Drawer.Header>
              <Drawer.Panel sx={pageStyles.bottomContent}>
                <Drawer.Close render={<Button variant="outline">Close</Button>} />
              </Drawer.Panel>
            </Drawer.Popup>
          </Drawer.Portal>
        </Drawer.Root>
      </Preview>
    </>
  );
}
