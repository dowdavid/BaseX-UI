/**
 * ContextMenu — Right-click menu with items, groups, separators, and submenus.
 *
 * Styling rules:
 * - StyleX for static styles (font, color, padding, border, cursor, flex)
 * - Global CSS for animated properties (opacity, transform driven by Base UI data attributes)
 * - `keepMounted` on Portal for close animation
 * - Stable CSS class `basex-context-menu-{part}` for global CSS targeting
 * - `sx` prop on every part for consumer overrides
 */
import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { focusRing } from '@basex-ui/styles';
import { Check, ChevronRight, Circle } from 'lucide-react';
import { forwardRef } from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';

// --- Styles ---
const styles = stylex.create({
  trigger: {
    cursor: 'context-menu',
  },

  positioner: {
    zIndex: 50,
  },

  popup: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '12rem',
    backgroundColor: tokens.colorSurface,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tokens.colorBorderMuted,
    borderRadius: tokens.radiusMd,
    boxShadow: tokens.shadowMd,
    padding: tokens.space1,
    overflow: 'hidden',
  },

  item: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.space2,
    paddingBlock: tokens.space1h,
    paddingInline: tokens.space2,
    fontSize: tokens.fontSizeSm,
    fontFamily: tokens.fontFamilySans,
    lineHeight: tokens.lineHeightNormal,
    color: tokens.colorText,
    borderRadius: tokens.radiusSm,
    cursor: 'pointer',
    userSelect: 'none',
  },

  itemHighlighted: {
    backgroundColor: tokens.colorMuted,
  },

  itemDisabled: {
    opacity: 0.5,
    pointerEvents: 'none',
    cursor: 'default',
  },

  linkItem: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.space2,
    paddingBlock: tokens.space1h,
    paddingInline: tokens.space2,
    fontSize: tokens.fontSizeSm,
    fontFamily: tokens.fontFamilySans,
    lineHeight: tokens.lineHeightNormal,
    color: tokens.colorText,
    borderRadius: tokens.radiusSm,
    cursor: 'pointer',
    userSelect: 'none',
    textDecoration: 'none',
  },

  checkboxItem: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.space2,
    paddingBlock: tokens.space1h,
    paddingInlineStart: tokens.space2,
    paddingInlineEnd: tokens.space2,
    fontSize: tokens.fontSizeSm,
    fontFamily: tokens.fontFamilySans,
    lineHeight: tokens.lineHeightNormal,
    color: tokens.colorText,
    borderRadius: tokens.radiusSm,
    cursor: 'pointer',
    userSelect: 'none',
  },

  checkboxItemIndicator: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '16px',
    height: '16px',
    flexShrink: 0,
    color: tokens.colorPrimary,
  },

  checkboxItemIndicatorHidden: {
    visibility: 'hidden',
  },

  radioItem: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.space2,
    paddingBlock: tokens.space1h,
    paddingInlineStart: tokens.space2,
    paddingInlineEnd: tokens.space2,
    fontSize: tokens.fontSizeSm,
    fontFamily: tokens.fontFamilySans,
    lineHeight: tokens.lineHeightNormal,
    color: tokens.colorText,
    borderRadius: tokens.radiusSm,
    cursor: 'pointer',
    userSelect: 'none',
  },

  radioItemIndicator: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '16px',
    height: '16px',
    flexShrink: 0,
    color: tokens.colorPrimary,
  },

  radioItemIndicatorHidden: {
    visibility: 'hidden',
  },

  separator: {
    height: '1px',
    backgroundColor: tokens.colorBorderMuted,
    marginBlock: tokens.space1,
    marginInline: `-${tokens.space1}`,
  },

  group: {},

  groupLabel: {
    paddingBlock: tokens.space1,
    paddingInline: tokens.space2,
    fontSize: tokens.fontSizeXs,
    fontFamily: tokens.fontFamilySans,
    fontWeight: tokens.fontWeightMedium,
    color: tokens.colorTextMuted,
    textTransform: 'uppercase',
    letterSpacing: tokens.letterSpacingWide,
  },

  submenuTrigger: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: tokens.space2,
    paddingBlock: tokens.space1h,
    paddingInline: tokens.space2,
    fontSize: tokens.fontSizeSm,
    fontFamily: tokens.fontFamilySans,
    lineHeight: tokens.lineHeightNormal,
    color: tokens.colorText,
    borderRadius: tokens.radiusSm,
    cursor: 'pointer',
    userSelect: 'none',
  },

  submenuIcon: {
    marginLeft: 'auto',
    color: tokens.colorTextMuted,
  },
});

// --- Types ---
export interface ContextMenuRootProps
  extends React.ComponentPropsWithoutRef<typeof BaseContextMenu.Root> {}

export interface ContextMenuTriggerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseContextMenu.Trigger>, 'className'> {
  sx?: StyleXStyles;
}

export interface ContextMenuPortalProps
  extends React.ComponentPropsWithoutRef<typeof BaseContextMenu.Portal> {}

export interface ContextMenuPositionerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseContextMenu.Positioner>, 'className'> {
  sx?: StyleXStyles;
}

export interface ContextMenuPopupProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseContextMenu.Popup>, 'className'> {
  sx?: StyleXStyles;
}

export interface ContextMenuItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseContextMenu.Item>, 'className'> {
  sx?: StyleXStyles;
}

export interface ContextMenuLinkItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseContextMenu.LinkItem>, 'className'> {
  sx?: StyleXStyles;
}

export interface ContextMenuCheckboxItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseContextMenu.CheckboxItem>, 'className'> {
  sx?: StyleXStyles;
}

export interface ContextMenuCheckboxItemIndicatorProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseContextMenu.CheckboxItemIndicator>, 'className'> {
  sx?: StyleXStyles;
}

export interface ContextMenuRadioGroupProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseContextMenu.RadioGroup>, 'className'> {
  sx?: StyleXStyles;
}

export interface ContextMenuRadioItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseContextMenu.RadioItem>, 'className'> {
  sx?: StyleXStyles;
}

export interface ContextMenuRadioItemIndicatorProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseContextMenu.RadioItemIndicator>, 'className'> {
  sx?: StyleXStyles;
}

export interface ContextMenuSeparatorProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseContextMenu.Separator>, 'className'> {
  sx?: StyleXStyles;
}

export interface ContextMenuGroupProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseContextMenu.Group>, 'className'> {
  sx?: StyleXStyles;
}

export interface ContextMenuGroupLabelProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseContextMenu.GroupLabel>, 'className'> {
  sx?: StyleXStyles;
}

export interface ContextMenuSubmenuRootProps
  extends React.ComponentPropsWithoutRef<typeof BaseContextMenu.SubmenuRoot> {}

export interface ContextMenuSubmenuTriggerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseContextMenu.SubmenuTrigger>, 'className'> {
  sx?: StyleXStyles;
}

// --- Components ---

const Root = (props: ContextMenuRootProps) => <BaseContextMenu.Root {...props} />;
Root.displayName = 'ContextMenu.Root';

const Trigger = forwardRef<HTMLDivElement, ContextMenuTriggerProps>(
  ({ sx, ...props }, ref) => (
    <BaseContextMenu.Trigger
      ref={ref}
      {...props}
      className={stylex.props(styles.trigger, sx).className ?? ''}
    />
  ),
);
Trigger.displayName = 'ContextMenu.Trigger';

const Portal = (props: ContextMenuPortalProps) => (
  <BaseContextMenu.Portal keepMounted {...props} />
);
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

const Popup = forwardRef<HTMLDivElement, ContextMenuPopupProps>(
  ({ sx, ...props }, ref) => (
    <BaseContextMenu.Popup
      ref={ref}
      {...props}
      className={() =>
        `basex-context-menu-popup ${stylex.props(styles.popup, sx).className ?? ''}`
      }
    />
  ),
);
Popup.displayName = 'ContextMenu.Popup';

const Item = forwardRef<HTMLDivElement, ContextMenuItemProps>(
  ({ sx, ...props }, ref) => (
    <BaseContextMenu.Item
      ref={ref}
      {...props}
      className={(state) =>
        stylex.props(
          styles.item,
          state.highlighted && styles.itemHighlighted,
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
      className={(state) =>
        stylex.props(
          styles.linkItem,
          state.highlighted && styles.itemHighlighted,
          sx,
        ).className ?? ''
      }
    />
  ),
);
LinkItem.displayName = 'ContextMenu.LinkItem';

const CheckboxItem = forwardRef<HTMLDivElement, ContextMenuCheckboxItemProps>(
  ({ sx, ...props }, ref) => (
    <BaseContextMenu.CheckboxItem
      ref={ref}
      {...props}
      className={(state) =>
        stylex.props(
          styles.checkboxItem,
          state.highlighted && styles.itemHighlighted,
          state.disabled && styles.itemDisabled,
          sx,
        ).className ?? ''
      }
    />
  ),
);
CheckboxItem.displayName = 'ContextMenu.CheckboxItem';

const CheckboxItemIndicator = forwardRef<HTMLSpanElement, ContextMenuCheckboxItemIndicatorProps>(
  ({ children, sx, ...props }, ref) => (
    <BaseContextMenu.CheckboxItemIndicator
      ref={ref}
      keepMounted
      {...props}
      className={(state) =>
        stylex.props(
          styles.checkboxItemIndicator,
          !state.checked && styles.checkboxItemIndicatorHidden,
          sx,
        ).className ?? ''
      }
    >
      {children ?? <Check size={14} />}
    </BaseContextMenu.CheckboxItemIndicator>
  ),
);
CheckboxItemIndicator.displayName = 'ContextMenu.CheckboxItemIndicator';

const RadioGroup = forwardRef<HTMLDivElement, ContextMenuRadioGroupProps>(
  ({ sx, ...props }, ref) => (
    <BaseContextMenu.RadioGroup
      ref={ref}
      {...props}
      className={sx ? (stylex.props(sx).className ?? '') : undefined}
    />
  ),
);
RadioGroup.displayName = 'ContextMenu.RadioGroup';

const RadioItem = forwardRef<HTMLDivElement, ContextMenuRadioItemProps>(
  ({ sx, ...props }, ref) => (
    <BaseContextMenu.RadioItem
      ref={ref}
      {...props}
      className={(state) =>
        stylex.props(
          styles.radioItem,
          state.highlighted && styles.itemHighlighted,
          state.disabled && styles.itemDisabled,
          sx,
        ).className ?? ''
      }
    />
  ),
);
RadioItem.displayName = 'ContextMenu.RadioItem';

const RadioItemIndicator = forwardRef<HTMLSpanElement, ContextMenuRadioItemIndicatorProps>(
  ({ children, sx, ...props }, ref) => (
    <BaseContextMenu.RadioItemIndicator
      ref={ref}
      keepMounted
      {...props}
      className={(state) =>
        stylex.props(
          styles.radioItemIndicator,
          !state.checked && styles.radioItemIndicatorHidden,
          sx,
        ).className ?? ''
      }
    >
      {children ?? <Circle size={8} fill="currentColor" />}
    </BaseContextMenu.RadioItemIndicator>
  ),
);
RadioItemIndicator.displayName = 'ContextMenu.RadioItemIndicator';

const Separator = forwardRef<HTMLDivElement, ContextMenuSeparatorProps>(
  ({ sx, ...props }, ref) => (
    <BaseContextMenu.Separator
      ref={ref}
      {...props}
      className={stylex.props(styles.separator, sx).className ?? ''}
    />
  ),
);
Separator.displayName = 'ContextMenu.Separator';

const Group = forwardRef<HTMLDivElement, ContextMenuGroupProps>(
  ({ sx, ...props }, ref) => (
    <BaseContextMenu.Group
      ref={ref}
      {...props}
      className={sx ? (stylex.props(sx).className ?? '') : undefined}
    />
  ),
);
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

const SubmenuRoot = (props: ContextMenuSubmenuRootProps) => (
  <BaseContextMenu.SubmenuRoot {...props} />
);
SubmenuRoot.displayName = 'ContextMenu.SubmenuRoot';

const SubmenuTrigger = forwardRef<HTMLDivElement, ContextMenuSubmenuTriggerProps>(
  ({ children, sx, ...props }, ref) => (
    <BaseContextMenu.SubmenuTrigger
      ref={ref}
      {...props}
      className={(state) =>
        stylex.props(
          styles.submenuTrigger,
          state.highlighted && styles.itemHighlighted,
          sx,
        ).className ?? ''
      }
    >
      {children}
      <span {...stylex.props(styles.submenuIcon)}>
        <ChevronRight size={14} />
      </span>
    </BaseContextMenu.SubmenuTrigger>
  ),
);
SubmenuTrigger.displayName = 'ContextMenu.SubmenuTrigger';

// --- Public API ---
export const ContextMenu = {
  Root,
  Trigger,
  Portal,
  Positioner,
  Popup,
  Item,
  LinkItem,
  CheckboxItem,
  CheckboxItemIndicator,
  RadioGroup,
  RadioItem,
  RadioItemIndicator,
  Separator,
  Group,
  GroupLabel,
  SubmenuRoot,
  SubmenuTrigger,
};
