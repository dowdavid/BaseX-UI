import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { focusRing } from '@basex-ui/styles';
import { forwardRef } from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';

// --- Styles ---
//
// Filled-block active state, squared corners (radiusSm = 0).
// Active tab: solid fill in the foreground neutral (theme-aware) with the
// inverse text color. Inactive tabs: bare muted text on the surrounding
// surface, with a subtle hover tint. The result reads like Spotify's nav:
// the active selection is unmistakable, and inactive tabs stay quiet.
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
  },

  listVertical: {
    flexDirection: 'column',
    alignItems: 'stretch',
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
    color: {
      default: tokens.colorTextMuted,
      ':hover': {
        default: null,
        '@media (hover: hover) and (pointer: fine)': tokens.colorText,
      },
    },
    // Inactive tabs carry a faint fill so each trigger reads as a
    // clickable chip (Spotify-style nav). Hover bumps one notch.
    backgroundColor: {
      default: tokens.colorMuted,
      ':hover': {
        default: null,
        '@media (hover: hover) and (pointer: fine)': tokens.colorBorderMuted,
      },
    },
    borderWidth: 0,
    borderRadius: tokens.radiusSm,
    cursor: 'pointer',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    transitionProperty: 'background-color, color',
    transitionDuration: tokens.motionDurationFast,
    transitionTimingFunction: tokens.motionEaseOut,
  },

  // Active: filled block. Override hover so the active tab keeps its strong
  // fill regardless of pointer state — the active state should never weaken.
  tabActive: {
    color: {
      default: tokens.colorTextInverse,
      ':hover': {
        default: null,
        '@media (hover: hover) and (pointer: fine)': tokens.colorTextInverse,
      },
    },
    backgroundColor: {
      default: tokens.colorText,
      ':hover': {
        default: null,
        '@media (hover: hover) and (pointer: fine)': tokens.colorText,
      },
    },
  },

  tabDisabled: {
    color: tokens.colorTextMuted,
    backgroundColor: 'transparent',
    cursor: 'not-allowed',
  },

  panel: {
    outline: 'none',
    color: tokens.colorText,
    fontFamily: tokens.fontFamilySans,
    fontSize: tokens.fontSizeSm,
    lineHeight: tokens.lineHeightNormal,
  },

  // Indicator: kept as a part of the public API for consumers, but visually
  // a no-op — the active state is expressed through tabActive's filled block.
  // Rendering it as `display: none` keeps `<Tabs.Indicator />` valid in JSX
  // without painting a competing underline.
  indicator: {
    display: 'none',
  },
});

// --- Types ---
export type TabsActivationMode = 'automatic' | 'manual';

export interface TabsRootProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseTabs.Root>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface TabsListProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseTabs.List>,
  'className'
> {
  sx?: StyleXStyles;
  /**
   * Activation mode for the tabs.
   * - `'automatic'` (default): tab activates as it receives keyboard focus.
   * - `'manual'`: focus moves with arrow keys, but activation requires Enter/Space.
   */
  activationMode?: TabsActivationMode;
}

export interface TabsTabProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseTabs.Tab>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface TabsPanelProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseTabs.Panel>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface TabsIndicatorProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseTabs.Indicator>,
  'className'
> {
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
    className={() => `basex-tabs-indicator ${stylex.props(styles.indicator, sx).className ?? ''}`}
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
