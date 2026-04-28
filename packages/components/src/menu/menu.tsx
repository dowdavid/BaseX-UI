import { Menu as BaseMenu } from '@base-ui/react/menu';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { focusRing } from '@basex-ui/styles';
import { forwardRef } from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';

// --- Styles ---
const styles = stylex.create({
  trigger: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.space2,
    fontFamily: tokens.fontFamilySans,
    fontWeight: tokens.fontWeightMedium,
    fontSize: tokens.fontSizeSm,
    lineHeight: tokens.lineHeightTight,
    color: tokens.colorText,
    backgroundColor: {
      default: 'transparent',
      ':hover': {
        default: null,
        '@media (hover: hover) and (pointer: fine)': tokens.colorMuted,
      },
    },
    borderWidth: tokens.borderWidthDefault,
    borderStyle: 'solid',
    borderColor: tokens.colorBorder,
    borderRadius: tokens.radiusMd,
    height: '36px',
    paddingInline: tokens.space3,
    cursor: 'pointer',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    flexShrink: 0,
    textDecoration: 'none',
    transitionProperty: 'background-color, color, border-color, box-shadow, opacity, transform',
    transitionDuration: tokens.motionDurationFast,
    transitionTimingFunction: tokens.motionEaseOut,
    transform: {
      default: 'none',
      ':active': 'scale(0.98)',
    },
  },

  positioner: {
    zIndex: 50,
    paddingBlock: '2px',
  },

  popup: {
    minWidth: 'max-content',
    backgroundColor: tokens.colorSurface,
    borderWidth: tokens.borderWidthDefault,
    borderStyle: 'solid',
    borderColor: tokens.colorPopoverBorder,
    borderRadius: tokens.radiusLg,
    paddingBlock: tokens.space1,
    boxShadow: tokens.shadowLg,
    outline: 'none',
  },

  item: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.space2,
    width: '100%',
    paddingBlock: tokens.space2,
    paddingInline: tokens.space3,
    fontFamily: tokens.fontFamilySans,
    fontSize: tokens.fontSizeSm,
    lineHeight: tokens.lineHeightNormal,
    color: tokens.colorText,
    backgroundColor: {
      default: 'transparent',
      ':hover': {
        default: null,
        '@media (hover: hover) and (pointer: fine)': tokens.colorMuted,
      },
    },
    cursor: 'pointer',
    userSelect: 'none',
    borderRadius: 0,
    transitionProperty: 'background-color, color',
    transitionDuration: tokens.motionDurationFast,
    transitionTimingFunction: tokens.motionEaseOut,
    outline: 'none',
  },

  itemDestructive: {
    color: tokens.colorDestructiveText,
    backgroundColor: {
      default: 'transparent',
      ':hover': {
        default: null,
        '@media (hover: hover) and (pointer: fine)': tokens.colorDestructiveMuted,
      },
    },
  },

  itemDisabled: {
    opacity: 0.64,
    pointerEvents: 'none',
    cursor: 'default',
  },

  linkItem: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.space2,
    width: '100%',
    paddingBlock: tokens.space2,
    paddingInline: tokens.space3,
    fontFamily: tokens.fontFamilySans,
    fontSize: tokens.fontSizeSm,
    lineHeight: tokens.lineHeightNormal,
    color: tokens.colorText,
    textDecoration: 'none',
    backgroundColor: {
      default: 'transparent',
      ':hover': {
        default: null,
        '@media (hover: hover) and (pointer: fine)': tokens.colorMuted,
      },
    },
    cursor: 'pointer',
    transitionProperty: 'background-color, color',
    transitionDuration: tokens.motionDurationFast,
    transitionTimingFunction: tokens.motionEaseOut,
    outline: 'none',
  },

  separator: {
    height: '1px',
    backgroundColor: tokens.colorBorder,
    marginBlock: tokens.space1,
  },

  groupLabel: {
    paddingBlock: tokens.space1h,
    paddingInline: tokens.space3,
    fontFamily: tokens.fontFamilySans,
    fontSize: tokens.fontSizeXs,
    fontWeight: tokens.fontWeightMedium,
    color: tokens.colorTextMuted,
    letterSpacing: tokens.letterSpacingWide,
    textTransform: 'uppercase' as const,
  },

  checkboxItem: {
    paddingInlineStart: `calc(${tokens.space3} + 20px)`,
    position: 'relative',
  },

  checkboxItemIndicator: {
    position: 'absolute',
    left: tokens.space3,
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '16px',
    height: '16px',
    flexShrink: 0,
    color: tokens.colorPrimary,
  },

  radioItem: {
    paddingInlineStart: `calc(${tokens.space3} + 20px)`,
    position: 'relative',
  },

  radioItemIndicator: {
    position: 'absolute',
    left: tokens.space3,
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '16px',
    height: '16px',
    flexShrink: 0,
    color: tokens.colorPrimary,
  },

  backdrop: {
    position: 'fixed',
    inset: 0,
    zIndex: 49,
  },

  submenuTrigger: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: tokens.space2,
    width: '100%',
    paddingBlock: tokens.space2,
    paddingInline: tokens.space3,
    fontFamily: tokens.fontFamilySans,
    fontSize: tokens.fontSizeSm,
    lineHeight: tokens.lineHeightNormal,
    color: tokens.colorText,
    backgroundColor: {
      default: 'transparent',
      ':hover': {
        default: null,
        '@media (hover: hover) and (pointer: fine)': tokens.colorMuted,
      },
    },
    cursor: 'pointer',
    userSelect: 'none',
    transitionProperty: 'background-color, color',
    transitionDuration: tokens.motionDurationFast,
    transitionTimingFunction: tokens.motionEaseOut,
    outline: 'none',
  },
});

// --- Types ---
export type MenuRootProps = React.ComponentPropsWithoutRef<typeof BaseMenu.Root>;

export interface MenuTriggerProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseMenu.Trigger>,
  'className'
> {
  sx?: StyleXStyles;
}

export type MenuPortalProps = React.ComponentPropsWithoutRef<typeof BaseMenu.Portal>;

export interface MenuPositionerProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseMenu.Positioner>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface MenuPopupProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseMenu.Popup>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface MenuItemProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseMenu.Item>,
  'className'
> {
  destructive?: boolean;
  sx?: StyleXStyles;
}

export interface MenuLinkItemProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseMenu.LinkItem>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface MenuGroupProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseMenu.Group>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface MenuGroupLabelProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseMenu.GroupLabel>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface MenuSeparatorProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseMenu.Separator>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface MenuCheckboxItemProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseMenu.CheckboxItem>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface MenuCheckboxItemIndicatorProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseMenu.CheckboxItemIndicator>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface MenuRadioGroupProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseMenu.RadioGroup>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface MenuRadioItemProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseMenu.RadioItem>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface MenuRadioItemIndicatorProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseMenu.RadioItemIndicator>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface MenuBackdropProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseMenu.Backdrop>,
  'className'
> {
  sx?: StyleXStyles;
}

export type MenuSubmenuRootProps = React.ComponentPropsWithoutRef<typeof BaseMenu.SubmenuRoot>;

export interface MenuSubmenuTriggerProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseMenu.SubmenuTrigger>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface MenuArrowProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseMenu.Arrow>,
  'className'
> {
  sx?: StyleXStyles;
}

// --- Components ---

const Root = (props: MenuRootProps) => <BaseMenu.Root {...props} />;
Root.displayName = 'Menu.Root';

const Trigger = forwardRef<HTMLButtonElement, MenuTriggerProps>(({ sx, ...props }, ref) => (
  <BaseMenu.Trigger
    ref={ref}
    {...props}
    className={(state) =>
      stylex.props(styles.trigger, focusRing, state.disabled && styles.itemDisabled, sx)
        .className ?? ''
    }
  />
));
Trigger.displayName = 'Menu.Trigger';

const Portal = (props: MenuPortalProps) => <BaseMenu.Portal {...props} />;
Portal.displayName = 'Menu.Portal';

const Positioner = forwardRef<HTMLDivElement, MenuPositionerProps>(({ sx, ...props }, ref) => (
  <BaseMenu.Positioner
    ref={ref}
    {...props}
    className={stylex.props(styles.positioner, sx).className ?? ''}
  />
));
Positioner.displayName = 'Menu.Positioner';

const Popup = forwardRef<HTMLDivElement, MenuPopupProps>(({ sx, ...props }, ref) => (
  <BaseMenu.Popup
    ref={ref}
    {...props}
    className={() => `basex-menu-popup ${stylex.props(styles.popup, sx).className ?? ''}`}
  />
));
Popup.displayName = 'Menu.Popup';

const Item = forwardRef<HTMLDivElement, MenuItemProps>(
  ({ destructive = false, sx, ...props }, ref) => (
    <BaseMenu.Item
      ref={ref}
      {...props}
      className={(state) =>
        stylex.props(
          styles.item,
          destructive && styles.itemDestructive,
          state.disabled && styles.itemDisabled,
          sx,
        ).className ?? ''
      }
    />
  ),
);
Item.displayName = 'Menu.Item';

const LinkItem = forwardRef<HTMLAnchorElement, MenuLinkItemProps>(({ sx, ...props }, ref) => (
  <BaseMenu.LinkItem
    ref={ref}
    {...props}
    className={stylex.props(styles.linkItem, sx).className ?? ''}
  />
));
LinkItem.displayName = 'Menu.LinkItem';

const Group = forwardRef<HTMLDivElement, MenuGroupProps>(({ sx, ...props }, ref) => (
  <BaseMenu.Group ref={ref} {...props} className={stylex.props(sx).className ?? ''} />
));
Group.displayName = 'Menu.Group';

const GroupLabel = forwardRef<HTMLDivElement, MenuGroupLabelProps>(({ sx, ...props }, ref) => (
  <BaseMenu.GroupLabel
    ref={ref}
    {...props}
    className={stylex.props(styles.groupLabel, sx).className ?? ''}
  />
));
GroupLabel.displayName = 'Menu.GroupLabel';

const Separator = forwardRef<HTMLDivElement, MenuSeparatorProps>(({ sx, ...props }, ref) => (
  <BaseMenu.Separator
    ref={ref}
    {...props}
    className={stylex.props(styles.separator, sx).className ?? ''}
  />
));
Separator.displayName = 'Menu.Separator';

const CheckboxItem = forwardRef<HTMLDivElement, MenuCheckboxItemProps>(({ sx, ...props }, ref) => (
  <BaseMenu.CheckboxItem
    ref={ref}
    {...props}
    className={(state) =>
      stylex.props(styles.item, styles.checkboxItem, state.disabled && styles.itemDisabled, sx)
        .className ?? ''
    }
  />
));
CheckboxItem.displayName = 'Menu.CheckboxItem';

const CheckboxItemIndicator = forwardRef<HTMLSpanElement, MenuCheckboxItemIndicatorProps>(
  ({ sx, ...props }, ref) => (
    <BaseMenu.CheckboxItemIndicator
      ref={ref}
      {...props}
      className={stylex.props(styles.checkboxItemIndicator, sx).className ?? ''}
    />
  ),
);
CheckboxItemIndicator.displayName = 'Menu.CheckboxItemIndicator';

const RadioGroup = forwardRef<HTMLDivElement, MenuRadioGroupProps>(({ sx, ...props }, ref) => (
  <BaseMenu.RadioGroup ref={ref} {...props} className={stylex.props(sx).className ?? ''} />
));
RadioGroup.displayName = 'Menu.RadioGroup';

const RadioItem = forwardRef<HTMLDivElement, MenuRadioItemProps>(({ sx, ...props }, ref) => (
  <BaseMenu.RadioItem
    ref={ref}
    {...props}
    className={(state) =>
      stylex.props(styles.item, styles.radioItem, state.disabled && styles.itemDisabled, sx)
        .className ?? ''
    }
  />
));
RadioItem.displayName = 'Menu.RadioItem';

const RadioItemIndicator = forwardRef<HTMLSpanElement, MenuRadioItemIndicatorProps>(
  ({ sx, ...props }, ref) => (
    <BaseMenu.RadioItemIndicator
      ref={ref}
      {...props}
      className={stylex.props(styles.radioItemIndicator, sx).className ?? ''}
    />
  ),
);
RadioItemIndicator.displayName = 'Menu.RadioItemIndicator';

const Backdrop = forwardRef<HTMLDivElement, MenuBackdropProps>(({ sx, ...props }, ref) => (
  <BaseMenu.Backdrop
    ref={ref}
    {...props}
    className={stylex.props(styles.backdrop, sx).className ?? ''}
  />
));
Backdrop.displayName = 'Menu.Backdrop';

const SubmenuRoot = (props: MenuSubmenuRootProps) => <BaseMenu.SubmenuRoot {...props} />;
SubmenuRoot.displayName = 'Menu.SubmenuRoot';

const SubmenuTrigger = forwardRef<HTMLDivElement, MenuSubmenuTriggerProps>(
  ({ sx, ...props }, ref) => (
    <BaseMenu.SubmenuTrigger
      ref={ref}
      {...props}
      className={(state) =>
        stylex.props(styles.submenuTrigger, focusRing, state.disabled && styles.itemDisabled, sx)
          .className ?? ''
      }
    />
  ),
);
SubmenuTrigger.displayName = 'Menu.SubmenuTrigger';

const Arrow = forwardRef<HTMLDivElement, MenuArrowProps>(({ sx, ...props }, ref) => (
  <BaseMenu.Arrow ref={ref} {...props} className={stylex.props(sx).className ?? ''} />
));
Arrow.displayName = 'Menu.Arrow';

// --- Public API ---
export const Menu = {
  Root,
  Trigger,
  Portal,
  Positioner,
  Popup,
  Item,
  LinkItem,
  Group,
  GroupLabel,
  Separator,
  CheckboxItem,
  CheckboxItemIndicator,
  RadioGroup,
  RadioItem,
  RadioItemIndicator,
  Backdrop,
  SubmenuRoot,
  SubmenuTrigger,
  Arrow,
};
