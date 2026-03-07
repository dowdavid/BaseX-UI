import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { NavigationMenu } from '@basex-ui/components';
import { Preview } from '../components/Preview';

const pageStyles = stylex.create({
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: tokens.space3,
    width: '340px',
  },
  contentLink: {
    display: 'block',
    padding: tokens.space2,
    borderRadius: tokens.radiusMd,
    textDecoration: 'none',
    color: tokens.colorText,
    fontSize: tokens.fontSizeSm,
    fontFamily: tokens.fontFamilySans,
    backgroundColor: {
      default: 'transparent',
      ':hover': tokens.colorMuted,
    },
  },
  contentTitle: {
    fontWeight: tokens.fontWeightMedium,
    marginBottom: tokens.space1,
  },
  contentDesc: {
    color: tokens.colorTextMuted,
    fontSize: tokens.fontSizeXs,
  },
  contentList: {
    display: 'flex',
    flexDirection: 'column',
    width: '280px',
  },
  contentListLink: {
    display: 'block',
    padding: tokens.space3,
    borderRadius: tokens.radiusMd,
    textDecoration: 'none',
    color: tokens.colorText,
    fontSize: tokens.fontSizeSm,
    fontFamily: tokens.fontFamilySans,
    backgroundColor: {
      default: 'transparent',
      ':hover': tokens.colorMuted,
    },
  },
  contentListTitle: {
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: tokens.space1,
  },
  contentListDesc: {
    color: tokens.colorTextMuted,
    fontSize: tokens.fontSizeXs,
    lineHeight: tokens.lineHeightNormal,
  },
  nestedGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: tokens.space2,
    width: '340px',
  },
  nestedLink: {
    display: 'block',
    padding: tokens.space2,
    borderRadius: tokens.radiusMd,
    textDecoration: 'none',
    color: tokens.colorText,
    fontSize: tokens.fontSizeSm,
    fontFamily: tokens.fontFamilySans,
    backgroundColor: {
      default: 'transparent',
      ':hover': tokens.colorMuted,
    },
  },
  nestedTitle: {
    fontWeight: tokens.fontWeightMedium,
    marginBottom: '2px',
    fontSize: tokens.fontSizeXs,
  },
  nestedDesc: {
    color: tokens.colorTextMuted,
    fontSize: tokens.fontSizeXs,
  },
});

export function NavigationMenuPage() {
  return (
    <>
      <Preview
        title="Grid and vertical dropdowns"
        description="A navigation bar with a grid layout dropdown, a vertical list dropdown, and direct links."
      >
        <NavigationMenu.Root>
          <NavigationMenu.List>
            <NavigationMenu.Item value="products">
              <NavigationMenu.Trigger>
                Products <NavigationMenu.Icon />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <div {...stylex.props(pageStyles.contentGrid)}>
                  <a href="#" {...stylex.props(pageStyles.contentLink)}>
                    <div {...stylex.props(pageStyles.contentTitle)}>Analytics</div>
                    <div {...stylex.props(pageStyles.contentDesc)}>Track your metrics</div>
                  </a>
                  <a href="#" {...stylex.props(pageStyles.contentLink)}>
                    <div {...stylex.props(pageStyles.contentTitle)}>Automation</div>
                    <div {...stylex.props(pageStyles.contentDesc)}>Streamline workflows</div>
                  </a>
                  <a href="#" {...stylex.props(pageStyles.contentLink)}>
                    <div {...stylex.props(pageStyles.contentTitle)}>Security</div>
                    <div {...stylex.props(pageStyles.contentDesc)}>Protect your data</div>
                  </a>
                  <a href="#" {...stylex.props(pageStyles.contentLink)}>
                    <div {...stylex.props(pageStyles.contentTitle)}>Integrations</div>
                    <div {...stylex.props(pageStyles.contentDesc)}>Connect your tools</div>
                  </a>
                </div>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="handbook">
              <NavigationMenu.Trigger>
                Handbook <NavigationMenu.Icon />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <div {...stylex.props(pageStyles.contentList)}>
                  <a href="#" {...stylex.props(pageStyles.contentListLink)}>
                    <div {...stylex.props(pageStyles.contentListTitle)}>Styling</div>
                    <div {...stylex.props(pageStyles.contentListDesc)}>
                      Base UI components can be styled with plain CSS, Tailwind CSS, CSS-in-JS, or CSS Modules.
                    </div>
                  </a>
                  <a href="#" {...stylex.props(pageStyles.contentListLink)}>
                    <div {...stylex.props(pageStyles.contentListTitle)}>Animation</div>
                    <div {...stylex.props(pageStyles.contentListDesc)}>
                      Base UI components can be animated with CSS transitions, CSS animations, or JavaScript libraries.
                    </div>
                  </a>
                  <a href="#" {...stylex.props(pageStyles.contentListLink)}>
                    <div {...stylex.props(pageStyles.contentListTitle)}>Composition</div>
                    <div {...stylex.props(pageStyles.contentListDesc)}>
                      Base UI components can be replaced and composed with your own existing components.
                    </div>
                  </a>
                </div>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="#">Pricing</NavigationMenu.Link>
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

      <Preview
        title="Nested submenus"
        description="A navigation menu with nested content below and to the side."
      >
        <NavigationMenu.Root>
          <NavigationMenu.List>
            <NavigationMenu.Item value="docs">
              <NavigationMenu.Trigger>
                Docs <NavigationMenu.Icon />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <NavigationMenu.Root orientation="vertical">
                  <NavigationMenu.List>
                    <NavigationMenu.Item>
                      <NavigationMenu.Link href="#">Start</NavigationMenu.Link>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item value="guides">
                      <NavigationMenu.Trigger>
                        Guides <NavigationMenu.Icon />
                      </NavigationMenu.Trigger>
                      <NavigationMenu.Content>
                        <div {...stylex.props(pageStyles.contentList)}>
                          <a href="#" {...stylex.props(pageStyles.contentListLink)}>
                            <div {...stylex.props(pageStyles.contentListTitle)}>Styling</div>
                            <div {...stylex.props(pageStyles.contentListDesc)}>Style with CSS, Tailwind, or CSS-in-JS</div>
                          </a>
                          <a href="#" {...stylex.props(pageStyles.contentListLink)}>
                            <div {...stylex.props(pageStyles.contentListTitle)}>Theming</div>
                            <div {...stylex.props(pageStyles.contentListDesc)}>Customize colors, fonts, and spacing</div>
                          </a>
                          <a href="#" {...stylex.props(pageStyles.contentListLink)}>
                            <div {...stylex.props(pageStyles.contentListTitle)}>Testing</div>
                            <div {...stylex.props(pageStyles.contentListDesc)}>Write tests for your components</div>
                          </a>
                        </div>
                      </NavigationMenu.Content>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item>
                      <NavigationMenu.Link href="#">API</NavigationMenu.Link>
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
              </NavigationMenu.Content>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="community">
              <NavigationMenu.Trigger>
                Community <NavigationMenu.Icon />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <div {...stylex.props(pageStyles.contentList)}>
                  <NavigationMenu.Root orientation="vertical">
                    <NavigationMenu.List>
                      <NavigationMenu.Item value="discord">
                        <NavigationMenu.Trigger>
                          Discord <NavigationMenu.Icon sideways />
                        </NavigationMenu.Trigger>
                        <NavigationMenu.Content>
                          <div {...stylex.props(pageStyles.contentList)}>
                            <a href="#" {...stylex.props(pageStyles.contentListLink)}>
                              <div {...stylex.props(pageStyles.contentListTitle)}>General</div>
                              <div {...stylex.props(pageStyles.contentListDesc)}>Chat with the community</div>
                            </a>
                            <a href="#" {...stylex.props(pageStyles.contentListLink)}>
                              <div {...stylex.props(pageStyles.contentListTitle)}>Help</div>
                              <div {...stylex.props(pageStyles.contentListDesc)}>Get support from others</div>
                            </a>
                            <a href="#" {...stylex.props(pageStyles.contentListLink)}>
                              <div {...stylex.props(pageStyles.contentListTitle)}>Showcase</div>
                              <div {...stylex.props(pageStyles.contentListDesc)}>Share what you&apos;ve built</div>
                            </a>
                          </div>
                        </NavigationMenu.Content>
                      </NavigationMenu.Item>
                      <NavigationMenu.Item>
                        <NavigationMenu.Link href="#">GitHub</NavigationMenu.Link>
                      </NavigationMenu.Item>
                      <NavigationMenu.Item>
                        <NavigationMenu.Link href="#">Twitter</NavigationMenu.Link>
                      </NavigationMenu.Item>
                    </NavigationMenu.List>
                    <NavigationMenu.Portal>
                      <NavigationMenu.Positioner side="right">
                        <NavigationMenu.Popup>
                          <NavigationMenu.Viewport />
                        </NavigationMenu.Popup>
                      </NavigationMenu.Positioner>
                    </NavigationMenu.Portal>
                  </NavigationMenu.Root>
                </div>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="#">Blog</NavigationMenu.Link>
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
    </>
  );
}
