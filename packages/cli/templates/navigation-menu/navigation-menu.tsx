import { NavigationMenu as BaseNavigationMenu } from '@base-ui/react/navigation-menu';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { focusRing } from '@basex-ui/styles';
import { ChevronDown } from 'lucide-react';
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
      ':hover': {
        default: null,
        '@media (hover: hover) and (pointer: fine)': tokens.colorMuted,
      },
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
      ':hover': {
        default: null,
        '@media (hover: hover) and (pointer: fine)': tokens.colorMuted,
      },
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

  iconOpen: {
    transform: 'rotate(180deg)',
  },

  iconSideways: {
    transform: 'rotate(-90deg)',
  },

  iconSidewaysOpen: {
    transform: 'rotate(90deg)',
  },

  arrow: {
    width: '12px',
    height: '8px',
    backgroundColor: tokens.colorPopoverBorder,
    clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
    position: 'relative',
    '::after': {
      content: '""',
      position: 'absolute',
      top: '1px',
      left: '1px',
      right: '1px',
      bottom: 0,
      backgroundColor: tokens.colorSurface,
      clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
    },
  },

  positioner: {
    zIndex: 50,
  },

  popup: {
    backgroundColor: tokens.colorSurface,
    borderWidth: tokens.borderWidthDefault,
    borderStyle: 'solid',
    borderColor: tokens.colorPopoverBorder,
    borderRadius: tokens.radiusLg,
    boxShadow: tokens.shadowLg,
    // visible (not hidden) so nested Positioner popups can render outside parent popup bounds
    overflow: 'visible',
  },

  viewport: {
    position: 'relative',
  },

  // Native overflow on NavigationMenu.Content — Base UI primitive manages
  // focus and keyboard nav. Per DESIGN.md scroll exception clause.
  content: {
    padding: tokens.space3,
    maxHeight: 'calc(var(--available-height, 100vh) - 20px)',
    overflowY: 'auto',
  },

  backdrop: {
    position: 'fixed',
    inset: 0,
    zIndex: 49,
  },
});

// --- Types ---
export interface NavigationMenuRootProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Root>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface NavigationMenuListProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.List>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface NavigationMenuItemProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Item>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface NavigationMenuTriggerProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Trigger>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface NavigationMenuContentProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Content>,
  'className'
> {
  sx?: StyleXStyles;
}

export type NavigationMenuPortalProps = React.ComponentPropsWithoutRef<
  typeof BaseNavigationMenu.Portal
>;

export interface NavigationMenuPositionerProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Positioner>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface NavigationMenuPopupProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Popup>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface NavigationMenuViewportProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Viewport>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface NavigationMenuBackdropProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Backdrop>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface NavigationMenuLinkProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Link>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface NavigationMenuIconProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Icon>,
  'className' | 'children'
> {
  sx?: StyleXStyles;
  /** Rotate the chevron to point right/left instead of down/up */
  sideways?: boolean;
  /** Custom icon element. Defaults to a chevron. */
  children?: React.ReactNode;
}

export interface NavigationMenuArrowProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Arrow>,
  'className'
> {
  sx?: StyleXStyles;
}

// --- Components ---

const Root = forwardRef<HTMLElement, NavigationMenuRootProps>(
  ({ sx, closeDelay = 150, ...props }, ref) => (
    <BaseNavigationMenu.Root
      ref={ref}
      closeDelay={closeDelay}
      {...props}
      className={stylex.props(styles.root, sx).className ?? ''}
    />
  ),
);
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
        stylex.props(styles.trigger, focusRing, state.open && styles.triggerActive, sx).className ??
        ''
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
  (
    {
      sx,
      collisionPadding = 10,
      sideOffset = 2,
      collisionAvoidance = { side: 'none', align: 'shift' },
      ...props
    },
    ref,
  ) => (
    <BaseNavigationMenu.Positioner
      ref={ref}
      collisionPadding={collisionPadding}
      sideOffset={sideOffset}
      collisionAvoidance={collisionAvoidance}
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

const Icon = forwardRef<HTMLSpanElement, NavigationMenuIconProps>(
  ({ sx, sideways, children, ...props }, ref) => (
    <BaseNavigationMenu.Icon
      ref={ref}
      {...props}
      className={(state) =>
        stylex.props(
          styles.icon,
          sideways
            ? state.open
              ? styles.iconSidewaysOpen
              : styles.iconSideways
            : state.open && styles.iconOpen,
          sx,
        ).className ?? ''
      }
    >
      {children ?? <ChevronDown size={12} aria-hidden="true" />}
    </BaseNavigationMenu.Icon>
  ),
);
Icon.displayName = 'NavigationMenu.Icon';

const Arrow = forwardRef<HTMLDivElement, NavigationMenuArrowProps>(({ sx, ...props }, ref) => (
  <BaseNavigationMenu.Arrow
    ref={ref}
    {...props}
    className={stylex.props(styles.arrow, sx).className ?? ''}
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
