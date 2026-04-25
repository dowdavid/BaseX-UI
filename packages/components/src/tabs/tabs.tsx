import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { focusRing } from '@basex-ui/styles';
import { forwardRef } from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';

// --- Styles ---
const styles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space3,
    fontFamily: tokens.fontFamilySans,
  },

  rootVertical: {
    flexDirection: 'row',
    gap: tokens.space4,
  },

  list: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.space1,
    padding: 0,
    margin: 0,
    borderBottomWidth: tokens.borderWidthDefault,
    borderBottomStyle: 'solid',
    borderBottomColor: tokens.colorBorderMuted,
  },

  listVertical: {
    flexDirection: 'column',
    alignItems: 'stretch',
    borderBottomWidth: 0,
    borderInlineEndWidth: tokens.borderWidthDefault,
    borderInlineEndStyle: 'solid',
    borderInlineEndColor: tokens.colorBorderMuted,
  },

  tab: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    whiteSpace: 'nowrap',
    transitionProperty: 'background-color, color',
    transitionDuration: tokens.motionDurationFast,
    transitionTimingFunction: tokens.motionEaseOut,
  },

  tabActive: {
    color: tokens.colorText,
    backgroundColor: 'transparent',
  },

  tabDisabled: {
    color: tokens.colorTextMuted,
    borderColor: tokens.colorBorderMuted,
    cursor: 'not-allowed',
    backgroundColor: 'transparent',
  },

  panel: {
    outline: 'none',
    color: tokens.colorText,
    fontFamily: tokens.fontFamilySans,
    fontSize: tokens.fontSizeSm,
    lineHeight: tokens.lineHeightNormal,
  },

  indicator: {
    position: 'absolute',
    // Default: horizontal underline aligned to active tab
    insetBlockEnd: 0,
    insetInlineStart: 0,
    height: '2px',
    width: 'var(--active-tab-width, 0px)',
    transform: 'translateX(var(--active-tab-left, 0px))',
    backgroundColor: tokens.colorText,
    borderRadius: tokens.radiusFull,
    transitionProperty: 'transform, width, height, top',
    transitionDuration: tokens.motionDurationNormal,
    transitionTimingFunction: tokens.motionEaseInOut,
    pointerEvents: 'none',
  },

  indicatorVertical: {
    insetBlockStart: 0,
    insetInlineEnd: 0,
    insetInlineStart: 'auto',
    insetBlockEnd: 'auto',
    width: '2px',
    height: 'var(--active-tab-height, 0px)',
    transform: 'translateY(var(--active-tab-top, 0px))',
  },

  reducedMotion: {
    transitionDuration: '0ms',
  },
});

// --- Types ---
export type TabsActivationMode = 'automatic' | 'manual';

export interface TabsRootProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseTabs.Root>, 'className'> {
  sx?: StyleXStyles;
}

export interface TabsListProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseTabs.List>, 'className'> {
  sx?: StyleXStyles;
  /**
   * Activation mode for the tabs.
   * - `'automatic'` (default): tab activates as it receives keyboard focus.
   * - `'manual'`: focus moves with arrow keys, but activation requires Enter/Space.
   */
  activationMode?: TabsActivationMode;
}

export interface TabsTabProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseTabs.Tab>, 'className'> {
  sx?: StyleXStyles;
}

export interface TabsPanelProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseTabs.Panel>, 'className'> {
  sx?: StyleXStyles;
}

export interface TabsIndicatorProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseTabs.Indicator>, 'className'> {
  sx?: StyleXStyles;
}

// --- Components ---

const Root = forwardRef<HTMLDivElement, TabsRootProps>(({ sx, orientation, ...props }, ref) => (
  <BaseTabs.Root
    ref={ref}
    orientation={orientation}
    {...props}
    className={
      stylex.props(styles.root, orientation === 'vertical' && styles.rootVertical, sx).className ??
      ''
    }
  />
));
Root.displayName = 'Tabs.Root';

const List = forwardRef<HTMLDivElement, TabsListProps>(
  ({ sx, activationMode = 'automatic', activateOnFocus, ...props }, ref) => {
    // Map our user-facing prop to Base UI's `activateOnFocus`.
    // If the consumer passes `activateOnFocus` directly, honor it; otherwise derive from activationMode.
    const resolvedActivateOnFocus =
      activateOnFocus !== undefined ? activateOnFocus : activationMode === 'automatic';
    return (
      <BaseTabs.List
        ref={ref}
        activateOnFocus={resolvedActivateOnFocus}
        {...props}
        className={(state) =>
          `basex-tabs-list ${
            stylex.props(styles.list, state.orientation === 'vertical' && styles.listVertical, sx)
              .className ?? ''
          }`
        }
      />
    );
  },
);
List.displayName = 'Tabs.List';

const Tab = forwardRef<HTMLButtonElement, TabsTabProps>(({ sx, ...props }, ref) => (
  <BaseTabs.Tab
    ref={ref}
    {...props}
    className={(state) =>
      stylex.props(
        styles.tab,
        focusRing,
        state.active && styles.tabActive,
        state.disabled && styles.tabDisabled,
        sx,
      ).className ?? ''
    }
  />
));
Tab.displayName = 'Tabs.Tab';

const Panel = forwardRef<HTMLDivElement, TabsPanelProps>(({ sx, ...props }, ref) => (
  <BaseTabs.Panel
    ref={ref}
    {...props}
    className={() => `basex-tabs-panel ${stylex.props(styles.panel, sx).className ?? ''}`}
  />
));
Panel.displayName = 'Tabs.Panel';

const Indicator = forwardRef<HTMLSpanElement, TabsIndicatorProps>(({ sx, ...props }, ref) => (
  <BaseTabs.Indicator
    ref={ref}
    {...props}
    className={(state) =>
      `basex-tabs-indicator ${
        stylex.props(
          styles.indicator,
          state.orientation === 'vertical' && styles.indicatorVertical,
          sx,
        ).className ?? ''
      }`
    }
  />
));
Indicator.displayName = 'Tabs.Indicator';

// --- Public API ---
export const Tabs = {
  Root,
  List,
  Tab,
  Panel,
  Indicator,
};
