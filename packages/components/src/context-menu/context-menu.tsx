import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { focusRing } from '@basex-ui/styles';
import { forwardRef } from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';

// --- Styles ---
const styles = stylex.create({
  trigger: {
    display: 'block',
    outline: 'none',
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
    borderColor: tokens.colorBorderMuted,
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
    color: tokens.colorDestructive,
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
    backgroundColor: tokens.colorBorderMuted,
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
export type ContextMenuRootProps = React.ComponentPropsWithoutRef<typeof BaseContextMenu.Root>;

export interface ContextMenuTriggerProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseContextMenu.Trigger>,
  'className'
> {
  sx?: StyleXStyles;
}

export type ContextMenuPortalProps = React.ComponentPropsWithoutRef<typeof BaseContextMenu.Portal>;

export interface ContextMenuPositionerProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseContextMenu.Positioner>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface ContextMenuPopupProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseContextMenu.Popup>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface ContextMenuItemProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseContextMenu.Item>,
  'className'
> {
  destructive?: boolean;
  sx?: StyleXStyles;
}

export interface ContextMenuLinkItemProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseContextMenu.LinkItem>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface ContextMenuGroupProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseContextMenu.Group>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface ContextMenuGroupLabelProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseContextMenu.GroupLabel>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface ContextMenuSeparatorProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseContextMenu.Separator>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface ContextMenuCheckboxItemProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseContextMenu.CheckboxItem>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface ContextMenuCheckboxItemIndicatorProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseContextMenu.CheckboxItemIndicator>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface ContextMenuRadioGroupProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseContextMenu.RadioGroup>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface ContextMenuRadioItemProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseContextMenu.RadioItem>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface ContextMenuRadioItemIndicatorProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseContextMenu.RadioItemIndicator>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface ContextMenuBackdropProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseContextMenu.Backdrop>,
  'className'
> {
  sx?: StyleXStyles;
}

export type ContextMenuSubmenuRootProps = React.ComponentPropsWithoutRef<
  typeof BaseContextMenu.SubmenuRoot
>;

export interface ContextMenuSubmenuTriggerProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseContextMenu.SubmenuTrigger>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface ContextMenuArrowProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseContextMenu.Arrow>,
  'className'
> {
  sx?: StyleXStyles;
}

// --- Components ---

const Root = (props: ContextMenuRootProps) => <BaseContextMenu.Root {...props} />;
Root.displayName = 'ContextMenu.Root';

const Trigger = forwardRef<HTMLDivElement, ContextMenuTriggerProps>(({ sx, ...props }, ref) => (
  <BaseContextMenu.Trigger
    ref={ref}
    {...props}
    className={stylex.props(styles.trigger, focusRing, sx).className ?? ''}
  />
));
Trigger.displayName = 'ContextMenu.Trigger';

const Portal = (props: ContextMenuPortalProps) => <BaseContextMenu.Portal {...props} />;
Portal.displayName = 'ContextMenu.Portal';

const Positioner = forwardRef<HTMLDivElement, ContextMenuPositionerProps>(
  ({ sx, ...props }, ref) => (
    <BaseContextMenu.Positioner
      ref={ref}
      {...props}
      className={stylex.props(styles.positioner, sx).className ?? ''}
    />
  ),
);
Positioner.displayName = 'ContextMenu.Positioner';

const Popup = forwardRef<HTMLDivElement, ContextMenuPopupProps>(({ sx, ...props }, ref) => (
  <BaseContextMenu.Popup
    ref={ref}
    {...props}
    className={() => `basex-context-menu-popup ${stylex.props(styles.popup, sx).className ?? ''}`}
  />
));
Popup.displayName = 'ContextMenu.Popup';

const Item = forwardRef<HTMLDivElement, ContextMenuItemProps>(
  ({ destructive = false, sx, ...props }, ref) => (
    <BaseContextMenu.Item
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
Item.displayName = 'ContextMenu.Item';

const LinkItem = forwardRef<HTMLAnchorElement, ContextMenuLinkItemProps>(
  ({ sx, ...props }, ref) => (
    <BaseContextMenu.LinkItem
      ref={ref}
      {...props}
      className={stylex.props(styles.linkItem, sx).className ?? ''}
    />
  ),
);
LinkItem.displayName = 'ContextMenu.LinkItem';

const Group = forwardRef<HTMLDivElement, ContextMenuGroupProps>(({ sx, ...props }, ref) => (
  <BaseContextMenu.Group ref={ref} {...props} className={stylex.props(sx).className ?? ''} />
));
Group.displayName = 'ContextMenu.Group';

const GroupLabel = forwardRef<HTMLDivElement, ContextMenuGroupLabelProps>(
  ({ sx, ...props }, ref) => (
    <BaseContextMenu.GroupLabel
      ref={ref}
      {...props}
      className={stylex.props(styles.groupLabel, sx).className ?? ''}
    />
  ),
);
GroupLabel.displayName = 'ContextMenu.GroupLabel';

const Separator = forwardRef<HTMLDivElement, ContextMenuSeparatorProps>(({ sx, ...props }, ref) => (
  <BaseContextMenu.Separator
    ref={ref}
    {...props}
    className={stylex.props(styles.separator, sx).className ?? ''}
  />
));
Separator.displayName = 'ContextMenu.Separator';

const CheckboxItem = forwardRef<HTMLDivElement, ContextMenuCheckboxItemProps>(
  ({ sx, ...props }, ref) => (
    <BaseContextMenu.CheckboxItem
      ref={ref}
      {...props}
      className={(state) =>
        stylex.props(styles.item, styles.checkboxItem, state.disabled && styles.itemDisabled, sx)
          .className ?? ''
      }
    />
  ),
);
CheckboxItem.displayName = 'ContextMenu.CheckboxItem';

const CheckboxItemIndicator = forwardRef<HTMLSpanElement, ContextMenuCheckboxItemIndicatorProps>(
  ({ sx, ...props }, ref) => (
    <BaseContextMenu.CheckboxItemIndicator
      ref={ref}
      {...props}
      className={stylex.props(styles.checkboxItemIndicator, sx).className ?? ''}
    />
  ),
);
CheckboxItemIndicator.displayName = 'ContextMenu.CheckboxItemIndicator';

const RadioGroup = forwardRef<HTMLDivElement, ContextMenuRadioGroupProps>(
  ({ sx, ...props }, ref) => (
    <BaseContextMenu.RadioGroup ref={ref} {...props} className={stylex.props(sx).className ?? ''} />
  ),
);
RadioGroup.displayName = 'ContextMenu.RadioGroup';

const RadioItem = forwardRef<HTMLDivElement, ContextMenuRadioItemProps>(({ sx, ...props }, ref) => (
  <BaseContextMenu.RadioItem
    ref={ref}
    {...props}
    className={(state) =>
      stylex.props(styles.item, styles.radioItem, state.disabled && styles.itemDisabled, sx)
        .className ?? ''
    }
  />
));
RadioItem.displayName = 'ContextMenu.RadioItem';

const RadioItemIndicator = forwardRef<HTMLSpanElement, ContextMenuRadioItemIndicatorProps>(
  ({ sx, ...props }, ref) => (
    <BaseContextMenu.RadioItemIndicator
      ref={ref}
      {...props}
      className={stylex.props(styles.radioItemIndicator, sx).className ?? ''}
    />
  ),
);
RadioItemIndicator.displayName = 'ContextMenu.RadioItemIndicator';

const Backdrop = forwardRef<HTMLDivElement, ContextMenuBackdropProps>(({ sx, ...props }, ref) => (
  <BaseContextMenu.Backdrop
    ref={ref}
    {...props}
    className={stylex.props(styles.backdrop, sx).className ?? ''}
  />
));
Backdrop.displayName = 'ContextMenu.Backdrop';

const SubmenuRoot = (props: ContextMenuSubmenuRootProps) => (
  <BaseContextMenu.SubmenuRoot {...props} />
);
SubmenuRoot.displayName = 'ContextMenu.SubmenuRoot';

const SubmenuTrigger = forwardRef<HTMLDivElement, ContextMenuSubmenuTriggerProps>(
  ({ sx, ...props }, ref) => (
    <BaseContextMenu.SubmenuTrigger
      ref={ref}
      {...props}
      className={(state) =>
        stylex.props(styles.submenuTrigger, focusRing, state.disabled && styles.itemDisabled, sx)
          .className ?? ''
      }
    />
  ),
);
SubmenuTrigger.displayName = 'ContextMenu.SubmenuTrigger';

const Arrow = forwardRef<HTMLDivElement, ContextMenuArrowProps>(({ sx, ...props }, ref) => (
  <BaseContextMenu.Arrow ref={ref} {...props} className={stylex.props(sx).className ?? ''} />
));
Arrow.displayName = 'ContextMenu.Arrow';

// --- Public API ---
export const ContextMenu = {
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
