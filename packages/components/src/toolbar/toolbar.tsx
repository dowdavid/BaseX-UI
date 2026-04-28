import { Toolbar as BaseToolbar } from '@base-ui/react/toolbar';
import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { focusRing } from '@basex-ui/styles';
import { forwardRef } from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';

// --- Styles ---
// Container styling mirrors Menubar (radius/border/padding/surface). Pressed
// item state mirrors Tabs' active treatment (theme-inverting `colorText` fill
// + `colorTextInverse` foreground) so the on-state reads as an unmistakable
// filled block without leaning on `colorPrimary`.
const styles = stylex.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.space1,
    fontFamily: tokens.fontFamilySans,
    borderWidth: tokens.borderWidthDefault,
    borderStyle: 'solid',
    borderColor: tokens.colorBorderMuted,
    borderRadius: tokens.radiusLg,
    paddingBlock: tokens.space1,
    paddingInline: tokens.space1,
    backgroundColor: tokens.colorSurface,
  },

  rootVertical: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },

  disabled: {
    opacity: 0.64,
    pointerEvents: 'none',
    cursor: 'default',
  },

  // Item visuals: ghost-by-default with a clear hover/active/focus contract.
  // Hover guarded behind hover-capable pointer to prevent sticky hover on
  // touch devices (matches the system-wide cleanup).
  item: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.space1h,
    minHeight: '32px',
    paddingBlock: tokens.space1h,
    paddingInline: tokens.space2,
    fontFamily: tokens.fontFamilySans,
    fontWeight: tokens.fontWeightMedium,
    fontSize: tokens.fontSizeSm,
    lineHeight: tokens.lineHeightTight,
    color: tokens.colorText,
    textDecoration: 'none',
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
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },

  // Pressed (toggle on) — filled block, identical contract to Tabs' active
  // tab: `colorText` background flips with theme, `colorTextInverse` keeps
  // foreground legible. Hover is overridden so the pressed state never
  // weakens on pointer hover.
  itemPressed: {
    color: {
      default: tokens.colorTextInverse,
      ':hover': {
        default: tokens.colorTextInverse,
        '@media (hover: hover) and (pointer: fine)': tokens.colorTextInverse,
      },
    },
    backgroundColor: {
      default: tokens.colorText,
      ':hover': {
        default: tokens.colorText,
        '@media (hover: hover) and (pointer: fine)': tokens.colorText,
      },
    },
  },

  // Disabled item — opacity matches Button/Toggle (0.64).
  itemDisabled: {
    opacity: 0.64,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },

  // Group: thin transparent flex container, no extra chrome
  group: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: tokens.space1,
  },

  groupVertical: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },

  // Toggle group: same as group (composition wraps Base ToggleGroup)
  toggleGroup: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: tokens.space1,
  },

  toggleGroupVertical: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },

  separator: {
    backgroundColor: tokens.colorBorderMuted,
    flexShrink: 0,
  },

  // Inside a horizontal toolbar Base UI renders the separator with
  // data-orientation="vertical" (it draws perpendicular to the toolbar axis).
  // So when state.orientation === 'vertical' we want a 1px-wide vertical bar.
  separatorVerticalLine: {
    width: tokens.borderWidthDefault,
    alignSelf: 'stretch',
    marginInline: tokens.space1,
  },

  // Inside a vertical toolbar, separator is horizontal — a 1px-tall bar.
  separatorHorizontalLine: {
    height: tokens.borderWidthDefault,
    alignSelf: 'stretch',
    marginBlock: tokens.space1,
  },
});

// --- Types ---
export interface ToolbarRootProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseToolbar.Root>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface ToolbarButtonProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseToolbar.Button>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface ToolbarLinkProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseToolbar.Link>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface ToolbarGroupProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseToolbar.Group>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface ToolbarSeparatorProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseToolbar.Separator>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface ToolbarToggleGroupProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseToggleGroup<string>>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface ToolbarToggleItemProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseToggle<string>>,
  'className'
> {
  sx?: StyleXStyles;
}

// --- Components ---

const Root = forwardRef<HTMLDivElement, ToolbarRootProps>(
  ({ sx, disabled, orientation = 'horizontal', ...props }, ref) => (
    <BaseToolbar.Root
      ref={ref}
      disabled={disabled}
      orientation={orientation}
      {...props}
      className={
        stylex.props(
          styles.root,
          orientation === 'vertical' && styles.rootVertical,
          disabled && styles.disabled,
          sx,
        ).className ?? ''
      }
    />
  ),
);
Root.displayName = 'Toolbar.Root';

const Button = forwardRef<HTMLButtonElement, ToolbarButtonProps>(({ sx, ...props }, ref) => (
  <BaseToolbar.Button
    ref={ref}
    {...props}
    className={(state) =>
      stylex.props(styles.item, focusRing, state.disabled && styles.itemDisabled, sx).className ??
      ''
    }
  />
));
Button.displayName = 'Toolbar.Button';

const Link = forwardRef<HTMLAnchorElement, ToolbarLinkProps>(({ sx, ...props }, ref) => (
  <BaseToolbar.Link
    ref={ref}
    {...props}
    className={stylex.props(styles.item, focusRing, sx).className ?? ''}
  />
));
Link.displayName = 'Toolbar.Link';

const Group = forwardRef<HTMLDivElement, ToolbarGroupProps>(({ sx, ...props }, ref) => (
  <BaseToolbar.Group
    ref={ref}
    {...props}
    className={(state) =>
      stylex.props(styles.group, state.orientation === 'vertical' && styles.groupVertical, sx)
        .className ?? ''
    }
  />
));
Group.displayName = 'Toolbar.Group';

const Separator = forwardRef<HTMLDivElement, ToolbarSeparatorProps>(({ sx, ...props }, ref) => (
  <BaseToolbar.Separator
    ref={ref}
    {...props}
    className={(state) =>
      stylex.props(
        styles.separator,
        // Base UI's ToolbarSeparator inverts orientation relative to the
        // toolbar: a horizontal toolbar yields state.orientation === 'vertical'
        // (the visible bar is a vertical line). Map to width/height accordingly.
        state.orientation === 'vertical'
          ? styles.separatorVerticalLine
          : styles.separatorHorizontalLine,
        sx,
      ).className ?? ''
    }
  />
));
Separator.displayName = 'Toolbar.Separator';

// ToggleGroup / ToggleItem
//
// Inlined here so this PR is self-contained and does not need to wait for a
// dedicated Toggle Group package. Uses Base UI's ToggleGroup + Toggle directly
// so participation in Toolbar's roving tabindex (via ToolbarButton's data
// attributes) and a11y stays correct. Visual contract mirrors Toolbar.Button.
const ToggleGroup = forwardRef<HTMLDivElement, ToolbarToggleGroupProps>(
  ({ sx, orientation, ...props }, ref) => (
    <BaseToggleGroup
      ref={ref}
      orientation={orientation}
      {...props}
      className={
        stylex.props(
          styles.toggleGroup,
          orientation === 'vertical' && styles.toggleGroupVertical,
          sx,
        ).className ?? ''
      }
    />
  ),
);
ToggleGroup.displayName = 'Toolbar.ToggleGroup';

const ToggleItem = forwardRef<HTMLButtonElement, ToolbarToggleItemProps>(
  ({ sx, ...props }, ref) => (
    // Render Base UI Toggle through Toolbar.Button so the Toolbar's roving
    // tabindex composer registers it as a focusable item. The className
    // callback is on BaseToggle so we receive `pressed` in state.
    <BaseToolbar.Button
      render={
        <BaseToggle
          ref={ref}
          {...props}
          className={(state) =>
            stylex.props(
              styles.item,
              focusRing,
              state.pressed && styles.itemPressed,
              state.disabled && styles.itemDisabled,
              sx,
            ).className ?? ''
          }
        />
      }
    />
  ),
);
ToggleItem.displayName = 'Toolbar.ToggleItem';

// --- Public API ---
export const Toolbar = {
  Root,
  Button,
  Link,
  Group,
  Separator,
  ToggleGroup,
  ToggleItem,
};
