import { NavigationMenu as BaseNavigationMenu } from '@base-ui/react/navigation-menu';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { focusRing } from '@basex-ui/styles';
import { forwardRef } from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';

// --- Styles ---
const styles = stylex.create({
  root: {
    position: 'relative',
    fontFamily: tokens.fontFamilySans,
  },

  list: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.space1,
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },

  item: {
    position: 'relative',
  },

  trigger: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: tokens.space1h,
    paddingBlock: tokens.space2,
    paddingInline: tokens.space3,
    fontFamily: tokens.fontFamilySans,
    fontWeight: tokens.fontWeightMedium,
    fontSize: tokens.fontSizeSm,
    lineHeight: tokens.lineHeightTight,
    color: tokens.colorTextMuted,
    backgroundColor: {
      default: 'transparent',
      ':hover': tokens.colorMuted,
    },
    borderWidth: 0,
    borderRadius: tokens.radiusMd,
    cursor: 'pointer',
    userSelect: 'none',
    transitionProperty: 'background-color, color',
    transitionDuration: tokens.motionDurationFast,
    transitionTimingFunction: tokens.motionEaseOut,
  },

  triggerActive: {
    color: tokens.colorText,
  },

  link: {
    display: 'inline-flex',
    alignItems: 'center',
    paddingBlock: tokens.space2,
    paddingInline: tokens.space3,
    fontFamily: tokens.fontFamilySans,
    fontWeight: tokens.fontWeightMedium,
    fontSize: tokens.fontSizeSm,
    lineHeight: tokens.lineHeightTight,
    color: tokens.colorTextMuted,
    textDecoration: 'none',
    backgroundColor: {
      default: 'transparent',
      ':hover': tokens.colorMuted,
    },
    borderRadius: tokens.radiusMd,
    cursor: 'pointer',
    transitionProperty: 'background-color, color',
    transitionDuration: tokens.motionDurationFast,
    transitionTimingFunction: tokens.motionEaseOut,
  },

  icon: {
    width: '12px',
    height: '12px',
    flexShrink: 0,
    transitionProperty: 'transform',
    transitionDuration: tokens.motionDurationNormal,
    transitionTimingFunction: tokens.motionEaseInOut,
  },

  positioner: {
    zIndex: 50,
  },

  popup: {
    backgroundColor: tokens.colorSurface,
    borderWidth: tokens.borderWidthDefault,
    borderStyle: 'solid',
    borderColor: tokens.colorBorderMuted,
    borderRadius: tokens.radiusLg,
    boxShadow: tokens.shadowLg,
    overflow: 'hidden',
  },

  viewport: {
    position: 'relative',
  },

  content: {
    padding: tokens.space4,
  },

  backdrop: {
    position: 'fixed',
    inset: 0,
    zIndex: 49,
  },

  disabled: {
    opacity: 0.64,
    pointerEvents: 'none',
    cursor: 'default',
  },
});

// --- Types ---
export interface NavigationMenuRootProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Root>, 'className'> {
  sx?: StyleXStyles;
}

export interface NavigationMenuListProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.List>, 'className'> {
  sx?: StyleXStyles;
}

export interface NavigationMenuItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Item>, 'className'> {
  sx?: StyleXStyles;
}

export interface NavigationMenuTriggerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Trigger>, 'className'> {
  sx?: StyleXStyles;
}

export interface NavigationMenuContentProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Content>, 'className'> {
  sx?: StyleXStyles;
}

export interface NavigationMenuPortalProps
  extends React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Portal> {}

export interface NavigationMenuPositionerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Positioner>, 'className'> {
  sx?: StyleXStyles;
}

export interface NavigationMenuPopupProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Popup>, 'className'> {
  sx?: StyleXStyles;
}

export interface NavigationMenuViewportProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Viewport>, 'className'> {
  sx?: StyleXStyles;
}

export interface NavigationMenuBackdropProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Backdrop>, 'className'> {
  sx?: StyleXStyles;
}

export interface NavigationMenuLinkProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Link>, 'className'> {
  sx?: StyleXStyles;
}

export interface NavigationMenuIconProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Icon>, 'className'> {
  sx?: StyleXStyles;
}

export interface NavigationMenuArrowProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Arrow>, 'className'> {
  sx?: StyleXStyles;
}

// --- Components ---

const Root = forwardRef<HTMLElement, NavigationMenuRootProps>(({ sx, ...props }, ref) => (
  <BaseNavigationMenu.Root
    ref={ref}
    {...props}
    className={stylex.props(styles.root, sx).className ?? ''}
  />
));
Root.displayName = 'NavigationMenu.Root';

const List = forwardRef<HTMLUListElement, NavigationMenuListProps>(({ sx, ...props }, ref) => (
  <BaseNavigationMenu.List
    ref={ref}
    {...props}
    className={stylex.props(styles.list, sx).className ?? ''}
  />
));
List.displayName = 'NavigationMenu.List';

const Item = forwardRef<HTMLLIElement, NavigationMenuItemProps>(({ sx, ...props }, ref) => (
  <BaseNavigationMenu.Item
    ref={ref}
    {...props}
    className={stylex.props(styles.item, sx).className ?? ''}
  />
));
Item.displayName = 'NavigationMenu.Item';

const Trigger = forwardRef<HTMLButtonElement, NavigationMenuTriggerProps>(
  ({ sx, ...props }, ref) => (
    <BaseNavigationMenu.Trigger
      ref={ref}
      {...props}
      className={(state) =>
        stylex.props(
          styles.trigger,
          focusRing,
          state.open && styles.triggerActive,
          sx,
        ).className ?? ''
      }
    />
  ),
);
Trigger.displayName = 'NavigationMenu.Trigger';

const Content = forwardRef<HTMLDivElement, NavigationMenuContentProps>(({ sx, ...props }, ref) => (
  <BaseNavigationMenu.Content
    ref={ref}
    {...props}
    className={() =>
      `basex-navigation-menu-content ${stylex.props(styles.content, sx).className ?? ''}`
    }
  />
));
Content.displayName = 'NavigationMenu.Content';

const Portal = (props: NavigationMenuPortalProps) => <BaseNavigationMenu.Portal {...props} />;
Portal.displayName = 'NavigationMenu.Portal';

const Positioner = forwardRef<HTMLDivElement, NavigationMenuPositionerProps>(
  ({ sx, ...props }, ref) => (
    <BaseNavigationMenu.Positioner
      ref={ref}
      {...props}
      className={stylex.props(styles.positioner, sx).className ?? ''}
    />
  ),
);
Positioner.displayName = 'NavigationMenu.Positioner';

const Popup = forwardRef<HTMLDivElement, NavigationMenuPopupProps>(({ sx, ...props }, ref) => (
  <BaseNavigationMenu.Popup
    ref={ref}
    {...props}
    className={() =>
      `basex-navigation-menu-popup ${stylex.props(styles.popup, sx).className ?? ''}`
    }
  />
));
Popup.displayName = 'NavigationMenu.Popup';

const Viewport = forwardRef<HTMLDivElement, NavigationMenuViewportProps>(
  ({ sx, ...props }, ref) => (
    <BaseNavigationMenu.Viewport
      ref={ref}
      {...props}
      className={stylex.props(styles.viewport, sx).className ?? ''}
    />
  ),
);
Viewport.displayName = 'NavigationMenu.Viewport';

const Backdrop = forwardRef<HTMLDivElement, NavigationMenuBackdropProps>(
  ({ sx, ...props }, ref) => (
    <BaseNavigationMenu.Backdrop
      ref={ref}
      {...props}
      className={() =>
        `basex-navigation-menu-backdrop ${stylex.props(styles.backdrop, sx).className ?? ''}`
      }
    />
  ),
);
Backdrop.displayName = 'NavigationMenu.Backdrop';

const Link = forwardRef<HTMLAnchorElement, NavigationMenuLinkProps>(({ sx, ...props }, ref) => (
  <BaseNavigationMenu.Link
    ref={ref}
    {...props}
    className={stylex.props(styles.link, focusRing, sx).className ?? ''}
  />
));
Link.displayName = 'NavigationMenu.Link';

const Icon = forwardRef<HTMLSpanElement, NavigationMenuIconProps>(({ sx, ...props }, ref) => (
  <BaseNavigationMenu.Icon
    ref={ref}
    {...props}
    className={stylex.props(styles.icon, sx).className ?? ''}
  />
));
Icon.displayName = 'NavigationMenu.Icon';

const Arrow = forwardRef<HTMLDivElement, NavigationMenuArrowProps>(({ sx, ...props }, ref) => (
  <BaseNavigationMenu.Arrow
    ref={ref}
    {...props}
    className={stylex.props(sx).className ?? ''}
  />
));
Arrow.displayName = 'NavigationMenu.Arrow';

// --- Public API ---
export const NavigationMenu = {
  Root,
  List,
  Item,
  Trigger,
  Content,
  Portal,
  Positioner,
  Popup,
  Viewport,
  Backdrop,
  Link,
  Icon,
  Arrow,
};
