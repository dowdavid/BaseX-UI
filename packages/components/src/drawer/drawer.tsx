/**
 * Drawer — Slide-out panel anchored to a screen edge.
 *
 * Styling rules:
 * - StyleX for static styles (font, color, padding, border, cursor, flex)
 * - Global CSS for animated properties (opacity, transform driven by Base UI data attributes)
 * - `keepMounted` on Portal for close animation
 * - Stable CSS class `basex-drawer-{part}` for global CSS targeting
 * - `sx` prop on every part for consumer overrides
 * - `forwardRef` on every part
 */
import { Drawer as BaseDrawer } from '@base-ui/react/drawer';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { X } from 'lucide-react';
import { createContext, forwardRef, useContext } from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';

// --- Swipe direction context ---
type SwipeDirection = 'down' | 'up' | 'left' | 'right';
const SwipeDirectionContext = createContext<SwipeDirection>('down');

// --- Styles ---
const styles = stylex.create({
  backdrop: {
    position: 'fixed',
    inset: 0,
    backgroundColor: tokens.colorOverlay,
  },

  viewport: {
    position: 'fixed',
    inset: 0,
    display: 'flex',
    overflow: 'auto',
  },

  // Viewport alignment per direction
  viewportBottom: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  viewportTop: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  viewportLeft: {
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  viewportRight: {
    alignItems: 'stretch',
    justifyContent: 'flex-end',
  },

  popup: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: tokens.colorSurface,
    boxShadow: tokens.shadowLg,
  },

  // Popup shape per direction
  popupBottom: {
    borderTopLeftRadius: tokens.radiusLg,
    borderTopRightRadius: tokens.radiusLg,
    maxHeight: '85vh',
    width: '100%',
    maxWidth: '40rem',
  },
  popupTop: {
    borderBottomLeftRadius: tokens.radiusLg,
    borderBottomRightRadius: tokens.radiusLg,
    maxHeight: '85vh',
    width: '100%',
    maxWidth: '40rem',
  },
  popupLeft: {
    borderTopRightRadius: tokens.radiusLg,
    borderBottomRightRadius: tokens.radiusLg,
    width: '20rem',
    maxWidth: '85vw',
    height: '100%',
  },
  popupRight: {
    borderTopLeftRadius: tokens.radiusLg,
    borderBottomLeftRadius: tokens.radiusLg,
    width: '20rem',
    maxWidth: '85vw',
    height: '100%',
  },

  closeButton: {
    position: 'absolute',
    top: tokens.space3,
    right: tokens.space3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1.75rem',
    height: '1.75rem',
    borderRadius: tokens.radiusSm,
    color: tokens.colorTextMuted,
    cursor: 'pointer',
    backgroundColor: {
      default: 'transparent',
      ':hover': tokens.colorMuted,
    },
    transitionProperty: 'background-color, color',
    transitionDuration: tokens.motionDurationFast,
    transitionTimingFunction: tokens.motionEaseOut,
  },

  header: {
    padding: tokens.space6,
    paddingBottom: tokens.space5,
  },

  title: {
    fontSize: tokens.fontSizeLg,
    fontWeight: tokens.fontWeightSemibold,
    fontFamily: tokens.fontFamilySans,
    lineHeight: tokens.lineHeightTight,
    color: tokens.colorText,
    paddingRight: tokens.space6,
  },

  description: {
    fontSize: tokens.fontSizeSm,
    fontFamily: tokens.fontFamilySans,
    lineHeight: tokens.lineHeightNormal,
    color: tokens.colorTextMuted,
    marginTop: tokens.space1,
  },

  panel: {
    flex: 1,
    minHeight: 0,
    overflow: 'auto',
    paddingInline: tokens.space6,
  },

  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: tokens.space3,
    paddingInline: tokens.space6,
    paddingBottom: tokens.space6,
    paddingTop: tokens.space4,
  },
});

// Direction-keyed style lookups
const viewportStyles: Record<SwipeDirection, keyof typeof styles> = {
  down: 'viewportBottom',
  up: 'viewportTop',
  left: 'viewportLeft',
  right: 'viewportRight',
};

const popupStyles: Record<SwipeDirection, keyof typeof styles> = {
  down: 'popupBottom',
  up: 'popupTop',
  left: 'popupLeft',
  right: 'popupRight',
};

// --- Types ---
export interface DrawerRootProps
  extends React.ComponentPropsWithoutRef<typeof BaseDrawer.Root> {}

export interface DrawerTriggerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseDrawer.Trigger>, 'className'> {
  sx?: StyleXStyles;
}

export interface DrawerPortalProps
  extends React.ComponentPropsWithoutRef<typeof BaseDrawer.Portal> {}

export interface DrawerBackdropProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseDrawer.Backdrop>, 'className'> {
  sx?: StyleXStyles;
}

export interface DrawerPopupProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseDrawer.Popup>, 'className'> {
  showCloseButton?: boolean;
  sx?: StyleXStyles;
}

export interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  sx?: StyleXStyles;
}

export interface DrawerTitleProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseDrawer.Title>, 'className'> {
  sx?: StyleXStyles;
}

export interface DrawerDescriptionProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseDrawer.Description>, 'className'> {
  sx?: StyleXStyles;
}

export interface DrawerPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  sx?: StyleXStyles;
}

export interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  sx?: StyleXStyles;
}

export interface DrawerCloseProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseDrawer.Close>, 'className'> {
  sx?: StyleXStyles;
}

// --- Components ---

const Root = ({ swipeDirection = 'down', children, ...props }: DrawerRootProps) => (
  <SwipeDirectionContext.Provider value={swipeDirection}>
    <BaseDrawer.Root swipeDirection={swipeDirection} {...props}>
      {children}
    </BaseDrawer.Root>
  </SwipeDirectionContext.Provider>
);
Root.displayName = 'Drawer.Root';

const Trigger = forwardRef<HTMLButtonElement, DrawerTriggerProps>(
  ({ sx, ...props }, ref) => (
    <BaseDrawer.Trigger
      ref={ref}
      {...props}
      className={sx ? (stylex.props(sx).className ?? '') : undefined}
    />
  ),
);
Trigger.displayName = 'Drawer.Trigger';

const Portal = (props: DrawerPortalProps) => (
  <BaseDrawer.Portal keepMounted {...props} />
);
Portal.displayName = 'Drawer.Portal';

const Backdrop = forwardRef<HTMLDivElement, DrawerBackdropProps>(
  ({ sx, ...props }, ref) => (
    <BaseDrawer.Backdrop
      ref={ref}
      {...props}
      className={() =>
        `basex-drawer-backdrop ${stylex.props(styles.backdrop, sx).className ?? ''}`
      }
    />
  ),
);
Backdrop.displayName = 'Drawer.Backdrop';

const Popup = forwardRef<HTMLDivElement, DrawerPopupProps>(
  ({ children, showCloseButton = true, sx, ...props }, ref) => {
    const direction = useContext(SwipeDirectionContext);
    const viewportKey = viewportStyles[direction];
    const popupKey = popupStyles[direction];

    return (
      <BaseDrawer.Viewport
        className={stylex.props(styles.viewport, styles[viewportKey]).className ?? ''}
      >
        <BaseDrawer.Popup
          ref={ref}
          {...props}
          className={() =>
            `basex-drawer-popup basex-drawer-popup--${direction} ${stylex.props(styles.popup, styles[popupKey], sx).className ?? ''}`
          }
        >
          {showCloseButton && (
            <BaseDrawer.Close
              {...stylex.props(styles.closeButton)}
              aria-label="Close"
            >
              <X size={16} />
            </BaseDrawer.Close>
          )}
          {children}
        </BaseDrawer.Popup>
      </BaseDrawer.Viewport>
    );
  },
);
Popup.displayName = 'Drawer.Popup';

const Header = forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ sx, ...props }, ref) => (
    <div ref={ref} {...props} {...stylex.props(styles.header, sx)} />
  ),
);
Header.displayName = 'Drawer.Header';

const Title = forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  ({ sx, ...props }, ref) => (
    <BaseDrawer.Title
      ref={ref}
      {...props}
      className={stylex.props(styles.title, sx).className ?? ''}
    />
  ),
);
Title.displayName = 'Drawer.Title';

const Description = forwardRef<HTMLParagraphElement, DrawerDescriptionProps>(
  ({ sx, ...props }, ref) => (
    <BaseDrawer.Description
      ref={ref}
      {...props}
      className={stylex.props(styles.description, sx).className ?? ''}
    />
  ),
);
Description.displayName = 'Drawer.Description';

const Panel = forwardRef<HTMLDivElement, DrawerPanelProps>(
  ({ sx, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      className={`basex-drawer-panel ${stylex.props(styles.panel, sx).className ?? ''}`}
    />
  ),
);
Panel.displayName = 'Drawer.Panel';

const Footer = forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ sx, ...props }, ref) => (
    <div ref={ref} {...props} {...stylex.props(styles.footer, sx)} />
  ),
);
Footer.displayName = 'Drawer.Footer';

const Close = forwardRef<HTMLButtonElement, DrawerCloseProps>(
  ({ sx, ...props }, ref) => (
    <BaseDrawer.Close
      ref={ref}
      {...props}
      className={sx ? (stylex.props(sx).className ?? '') : undefined}
    />
  ),
);
Close.displayName = 'Drawer.Close';

// --- Public API ---
export const Drawer = {
  Root,
  Trigger,
  Portal,
  Backdrop,
  Popup,
  Header,
  Title,
  Description,
  Panel,
  Footer,
  Close,
};
