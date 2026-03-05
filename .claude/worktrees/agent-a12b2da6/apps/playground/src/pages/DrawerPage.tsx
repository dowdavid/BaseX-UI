import { useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { Drawer, Button } from '@basex-ui/components';
import { Preview } from '../components/Preview';

const formStyles = stylex.create({
  fields: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space4,
  },
  label: {
    display: 'block',
    fontSize: tokens.fontSizeSm,
    fontWeight: tokens.fontWeightMedium,
    fontFamily: tokens.fontFamilySans,
    color: tokens.colorText,
    marginBottom: tokens.space1,
  },
  input: {
    width: '100%',
    padding: `${tokens.space2} ${tokens.space3}`,
    borderRadius: tokens.radiusMd,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tokens.colorBorder,
    fontSize: tokens.fontSizeSm,
    fontFamily: tokens.fontFamilySans,
    color: tokens.colorText,
    backgroundColor: tokens.colorBackground,
    boxSizing: 'border-box',
    outline: 'none',
  },
  textarea: {
    width: '100%',
    padding: `${tokens.space2} ${tokens.space3}`,
    borderRadius: tokens.radiusMd,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tokens.colorBorder,
    fontSize: tokens.fontSizeSm,
    fontFamily: tokens.fontFamilySans,
    color: tokens.colorText,
    backgroundColor: tokens.colorBackground,
    boxSizing: 'border-box',
    resize: 'none',
    outline: 'none',
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
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <Preview
        title="Basic bottom drawer"
        description="A simple drawer that slides up from the bottom edge."
      >
        <Drawer.Root>
          <Drawer.Trigger render={<Button>Open drawer</Button>} />
          <Drawer.Portal>
            <Drawer.Backdrop />
            <Drawer.Popup>
              <Drawer.Header>
                <Drawer.Title>Drawer title</Drawer.Title>
                <Drawer.Description>
                  This is a basic bottom drawer with some content. Swipe down or
                  click the backdrop to dismiss.
                </Drawer.Description>
              </Drawer.Header>
              <Drawer.Panel>
                <p
                  {...stylex.props(
                    stylex.create({
                      text: {
                        fontSize: tokens.fontSizeSm,
                        fontFamily: tokens.fontFamilySans,
                        color: tokens.colorText,
                        lineHeight: tokens.lineHeightNormal,
                      },
                    }).text,
                  )}
                >
                  Drawer content goes here. This panel is scrollable when the
                  content overflows the maximum height.
                </p>
              </Drawer.Panel>
              <Drawer.Footer>
                <Drawer.Close render={<Button>Close</Button>} />
              </Drawer.Footer>
            </Drawer.Popup>
          </Drawer.Portal>
        </Drawer.Root>
      </Preview>

      <Preview
        title="Form drawer"
        description="Capture input in a bottom drawer with submit and cancel."
      >
        <Drawer.Root open={formOpen} onOpenChange={setFormOpen}>
          <Drawer.Trigger render={<Button>Add item</Button>} />
          <Drawer.Portal>
            <Drawer.Backdrop />
            <Drawer.Popup>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setFormOpen(false);
                }}
                style={{ display: 'contents' }}
              >
                <Drawer.Header>
                  <Drawer.Title>Add item</Drawer.Title>
                  <Drawer.Description>
                    Fill in the details below to create a new item.
                  </Drawer.Description>
                </Drawer.Header>
                <Drawer.Panel>
                  <div {...stylex.props(formStyles.fields)}>
                    <div>
                      <label {...stylex.props(formStyles.label)}>Name</label>
                      <input
                        type="text"
                        placeholder="Item name"
                        {...stylex.props(formStyles.input)}
                      />
                    </div>
                    <div>
                      <label {...stylex.props(formStyles.label)}>
                        Description
                      </label>
                      <textarea
                        placeholder="Describe this item..."
                        rows={3}
                        {...stylex.props(formStyles.textarea)}
                      />
                    </div>
                    <div>
                      <label {...stylex.props(formStyles.label)}>
                        Category
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Electronics"
                        {...stylex.props(formStyles.input)}
                      />
                    </div>
                    <div>
                      <label {...stylex.props(formStyles.label)}>Price</label>
                      <input
                        type="number"
                        placeholder="0.00"
                        {...stylex.props(formStyles.input)}
                      />
                    </div>
                  </div>
                </Drawer.Panel>
                <Drawer.Footer>
                  <Drawer.Close
                    render={<Button variant="ghost">Cancel</Button>}
                  />
                  <Button type="submit">Save</Button>
                </Drawer.Footer>
              </form>
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
                  <ul {...stylex.props(formStyles.navList)}>
                    <li>
                      <a href="#home" {...stylex.props(formStyles.navLink)}>
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        href="#dashboard"
                        {...stylex.props(formStyles.navLink)}
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#projects"
                        {...stylex.props(formStyles.navLink)}
                      >
                        Projects
                      </a>
                    </li>
                    <li>
                      <a
                        href="#settings"
                        {...stylex.props(formStyles.navLink)}
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a href="#help" {...stylex.props(formStyles.navLink)}>
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
