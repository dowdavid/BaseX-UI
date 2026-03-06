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
  navList: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space1,
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  navLink: {
    display: 'block',
    padding: `${tokens.space2h} ${tokens.space3}`,
    borderRadius: tokens.radiusMd,
    fontSize: tokens.fontSizeSm,
    fontFamily: tokens.fontFamilySans,
    color: tokens.colorText,
    textDecoration: 'none',
    cursor: 'pointer',
    backgroundColor: {
      default: 'transparent',
      ':hover': tokens.colorMuted,
    },
    transitionProperty: 'background-color',
    transitionDuration: tokens.motionDurationFast,
    transitionTimingFunction: tokens.motionEaseOut,
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

      <Preview
        title="Navigation drawer"
        description="A left-anchored drawer for navigation menus."
      >
        <Drawer.Root swipeDirection="left">
          <Drawer.Trigger render={<Button variant="outline">Menu</Button>} />
          <Drawer.Portal>
            <Drawer.Backdrop />
            <Drawer.Popup showCloseButton={false}>
              <Drawer.Header>
                <Drawer.Title>Navigation</Drawer.Title>
              </Drawer.Header>
              <Drawer.Panel>
                <nav>
                  <ul {...stylex.props(pageStyles.navList)}>
                    <li>
                      <a href="#home" {...stylex.props(pageStyles.navLink)}>
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        href="#dashboard"
                        {...stylex.props(pageStyles.navLink)}
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#projects"
                        {...stylex.props(pageStyles.navLink)}
                      >
                        Projects
                      </a>
                    </li>
                    <li>
                      <a
                        href="#settings"
                        {...stylex.props(pageStyles.navLink)}
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a href="#help" {...stylex.props(pageStyles.navLink)}>
                        Help & Support
                      </a>
                    </li>
                  </ul>
                </nav>
              </Drawer.Panel>
            </Drawer.Popup>
          </Drawer.Portal>
        </Drawer.Root>
      </Preview>
    </>
  );
}
