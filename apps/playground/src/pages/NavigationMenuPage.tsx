import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { NavigationMenu } from '@basex-ui/components';
import { Preview } from '../components/Preview';

const pageStyles = stylex.create({
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: tokens.space3,
    minWidth: '400px',
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
});

export function NavigationMenuPage() {
  return (
    <>
      <Preview
        title="Basic navigation menu"
        description="A navigation bar with dropdown content panels and direct links."
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
            <NavigationMenu.Item value="resources">
              <NavigationMenu.Trigger>
                Resources <NavigationMenu.Icon />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <div {...stylex.props(pageStyles.contentGrid)}>
                  <a href="#" {...stylex.props(pageStyles.contentLink)}>
                    <div {...stylex.props(pageStyles.contentTitle)}>Documentation</div>
                    <div {...stylex.props(pageStyles.contentDesc)}>Get started guides</div>
                  </a>
                  <a href="#" {...stylex.props(pageStyles.contentLink)}>
                    <div {...stylex.props(pageStyles.contentTitle)}>Blog</div>
                    <div {...stylex.props(pageStyles.contentDesc)}>Latest updates</div>
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
        title="Links only"
        description="A simple navigation bar with link items only."
      >
        <NavigationMenu.Root>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="#">Home</NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="#">About</NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="#">Contact</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </Preview>
    </>
  );
}
