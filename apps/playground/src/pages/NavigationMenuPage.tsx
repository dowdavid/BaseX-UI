import { useState, useEffect } from 'react';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { NavigationMenu } from '@basex-ui/components';
import { ChevronDown } from 'lucide-react';
import { Preview } from '../components/Preview';

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= breakpoint : false,
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    setIsMobile(mq.matches);
    return () => mq.removeEventListener('change', handler);
  }, [breakpoint]);
  return isMobile;
}

const pageStyles = stylex.create({
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: tokens.space3,
    width: {
      default: '340px',
      '@media (max-width: 500px)': 'calc(100vw - 40px)',
    },
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
    width: {
      default: '280px',
      '@media (max-width: 500px)': 'calc(100vw - 40px)',
    },
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
  // Animated expand/collapse wrapper (grid-row trick)
  expandWrapper: {
    display: 'grid',
    gridTemplateRows: '0fr',
    transitionProperty: 'grid-template-rows',
    transitionDuration: tokens.motionDurationNormal,
    transitionTimingFunction: tokens.motionEaseOut,
  },
  expandWrapperOpen: {
    gridTemplateRows: '1fr',
  },
  expandInner: {
    overflow: 'hidden',
  },
  // Mobile: inline dropdown panel (no Portal/Positioner)
  mobileDropdown: {
    backgroundColor: tokens.colorSurface,
    borderWidth: tokens.borderWidthDefault,
    borderStyle: 'solid',
    borderColor: tokens.colorBorderMuted,
    borderRadius: tokens.radiusLg,
    boxShadow: tokens.shadowLg,
    padding: tokens.space2,
    marginTop: tokens.space1,
  },
  // Mobile accordion styles for nested items
  accordionTrigger: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: tokens.space3,
    borderRadius: tokens.radiusMd,
    border: 'none',
    fontFamily: tokens.fontFamilySans,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeSm,
    color: tokens.colorText,
    cursor: 'pointer',
    backgroundColor: {
      default: 'transparent',
      ':hover': tokens.colorMuted,
    },
  },
  accordionIcon: {
    width: '14px',
    height: '14px',
    color: tokens.colorTextMuted,
    transitionProperty: 'transform',
    transitionDuration: tokens.motionDurationNormal,
    transitionTimingFunction: tokens.motionEaseInOut,
  },
  accordionIconOpen: {
    transform: 'rotate(180deg)',
  },
  accordionPanel: {
    paddingLeft: tokens.space3,
    borderLeftWidth: '1px',
    borderLeftStyle: 'solid',
    borderLeftColor: tokens.colorBorderMuted,
    marginLeft: tokens.space3,
  },
});

// --- Desktop: full nested NavigationMenu with Portal/Positioner ---

function NestedSubmenusDesktop() {
  return (
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
                        <div {...stylex.props(pageStyles.contentListDesc)}>
                          Style with CSS, Tailwind, or CSS-in-JS
                        </div>
                      </a>
                      <a href="#" {...stylex.props(pageStyles.contentListLink)}>
                        <div {...stylex.props(pageStyles.contentListTitle)}>Theming</div>
                        <div {...stylex.props(pageStyles.contentListDesc)}>
                          Customize colors, fonts, and spacing
                        </div>
                      </a>
                      <a href="#" {...stylex.props(pageStyles.contentListLink)}>
                        <div {...stylex.props(pageStyles.contentListTitle)}>Testing</div>
                        <div {...stylex.props(pageStyles.contentListDesc)}>
                          Write tests for your components
                        </div>
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
                          <div {...stylex.props(pageStyles.contentListDesc)}>
                            Chat with the community
                          </div>
                        </a>
                        <a href="#" {...stylex.props(pageStyles.contentListLink)}>
                          <div {...stylex.props(pageStyles.contentListTitle)}>Help</div>
                          <div {...stylex.props(pageStyles.contentListDesc)}>
                            Get support from others
                          </div>
                        </a>
                        <a href="#" {...stylex.props(pageStyles.contentListLink)}>
                          <div {...stylex.props(pageStyles.contentListTitle)}>Showcase</div>
                          <div {...stylex.props(pageStyles.contentListDesc)}>
                            Share what you&apos;ve built
                          </div>
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
  );
}

// --- Mobile: nested items use plain accordion expand (no nested NavigationMenu) ---

function AnimatedExpand({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) {
  return (
    <div {...stylex.props(pageStyles.expandWrapper, open && pageStyles.expandWrapperOpen)}>
      <div {...stylex.props(pageStyles.expandInner)}>{children}</div>
    </div>
  );
}

function AccordionItem({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        {...stylex.props(pageStyles.accordionTrigger)}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {label}
        <ChevronDown
          size={14}
          {...stylex.props(
            pageStyles.accordionIcon,
            open && pageStyles.accordionIconOpen,
          )}
        />
      </button>
      <AnimatedExpand open={open}>
        <div {...stylex.props(pageStyles.accordionPanel)}>{children}</div>
      </AnimatedExpand>
    </>
  );
}

function NestedSubmenusMobile() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggle = (key: string) => setOpenMenu(openMenu === key ? null : key);

  return (
    <nav {...stylex.props(pageStyles.contentList)}>
      <div>
        <button {...stylex.props(pageStyles.accordionTrigger)} onClick={() => toggle('docs')}>
          Docs
          <ChevronDown
            size={14}
            {...stylex.props(
              pageStyles.accordionIcon,
              openMenu === 'docs' && pageStyles.accordionIconOpen,
            )}
          />
        </button>
        <AnimatedExpand open={openMenu === 'docs'}>
          <div {...stylex.props(pageStyles.mobileDropdown)}>
            <a href="#" {...stylex.props(pageStyles.contentListLink)}>Start</a>
            <AccordionItem label="Guides">
              <a href="#" {...stylex.props(pageStyles.contentListLink)}>
                <div {...stylex.props(pageStyles.contentListTitle)}>Styling</div>
                <div {...stylex.props(pageStyles.contentListDesc)}>
                  Style with CSS, Tailwind, or CSS-in-JS
                </div>
              </a>
              <a href="#" {...stylex.props(pageStyles.contentListLink)}>
                <div {...stylex.props(pageStyles.contentListTitle)}>Theming</div>
                <div {...stylex.props(pageStyles.contentListDesc)}>
                  Customize colors, fonts, and spacing
                </div>
              </a>
              <a href="#" {...stylex.props(pageStyles.contentListLink)}>
                <div {...stylex.props(pageStyles.contentListTitle)}>Testing</div>
                <div {...stylex.props(pageStyles.contentListDesc)}>
                  Write tests for your components
                </div>
              </a>
            </AccordionItem>
            <a href="#" {...stylex.props(pageStyles.contentListLink)}>API</a>
          </div>
        </AnimatedExpand>
      </div>

      <div>
        <button {...stylex.props(pageStyles.accordionTrigger)} onClick={() => toggle('community')}>
          Community
          <ChevronDown
            size={14}
            {...stylex.props(
              pageStyles.accordionIcon,
              openMenu === 'community' && pageStyles.accordionIconOpen,
            )}
          />
        </button>
        <AnimatedExpand open={openMenu === 'community'}>
          <div {...stylex.props(pageStyles.mobileDropdown)}>
            <AccordionItem label="Discord">
              <a href="#" {...stylex.props(pageStyles.contentListLink)}>
                <div {...stylex.props(pageStyles.contentListTitle)}>General</div>
                <div {...stylex.props(pageStyles.contentListDesc)}>
                  Chat with the community
                </div>
              </a>
              <a href="#" {...stylex.props(pageStyles.contentListLink)}>
                <div {...stylex.props(pageStyles.contentListTitle)}>Help</div>
                <div {...stylex.props(pageStyles.contentListDesc)}>
                  Get support from others
                </div>
              </a>
              <a href="#" {...stylex.props(pageStyles.contentListLink)}>
                <div {...stylex.props(pageStyles.contentListTitle)}>Showcase</div>
                <div {...stylex.props(pageStyles.contentListDesc)}>
                  Share what you&apos;ve built
                </div>
              </a>
            </AccordionItem>
            <a href="#" {...stylex.props(pageStyles.contentListLink)}>GitHub</a>
            <a href="#" {...stylex.props(pageStyles.contentListLink)}>Twitter</a>
          </div>
        </AnimatedExpand>
      </div>

      <a href="#" {...stylex.props(pageStyles.contentListLink)}>Blog</a>
    </nav>
  );
}

export function NavigationMenuPage() {
  const isMobile = useIsMobile();

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
                      Base UI components can be styled with plain CSS, Tailwind CSS, CSS-in-JS, or
                      CSS Modules.
                    </div>
                  </a>
                  <a href="#" {...stylex.props(pageStyles.contentListLink)}>
                    <div {...stylex.props(pageStyles.contentListTitle)}>Animation</div>
                    <div {...stylex.props(pageStyles.contentListDesc)}>
                      Base UI components can be animated with CSS transitions, CSS animations, or
                      JavaScript libraries.
                    </div>
                  </a>
                  <a href="#" {...stylex.props(pageStyles.contentListLink)}>
                    <div {...stylex.props(pageStyles.contentListTitle)}>Composition</div>
                    <div {...stylex.props(pageStyles.contentListDesc)}>
                      Base UI components can be replaced and composed with your own existing
                      components.
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
            <NavigationMenu.Positioner collisionAvoidance={{ side: 'flip', align: 'shift' }}>
              <NavigationMenu.Popup>
                <NavigationMenu.Viewport />
              </NavigationMenu.Popup>
            </NavigationMenu.Positioner>
          </NavigationMenu.Portal>
        </NavigationMenu.Root>
      </Preview>

      <Preview
        title="Nested submenus"
        description={
          isMobile
            ? 'On mobile, nested items expand inline within the dropdown.'
            : 'A navigation menu with nested content below and to the side.'
        }
      >
        {isMobile ? <NestedSubmenusMobile /> : <NestedSubmenusDesktop />}
      </Preview>
    </>
  );
}
