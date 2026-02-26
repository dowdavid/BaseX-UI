import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { focusRing } from '@basex-ui/styles';
import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import type { StyleXStyles } from '@stylexjs/stylex';

// --- Styles ---
const styles = stylex.create({
  trigger: {
    display: 'inline-flex',
    width: 'auto',
    alignItems: 'center',
    gap: tokens.space1,
    paddingBlock: tokens.space2,
    fontFamily: tokens.fontFamilySans,
    fontWeight: tokens.fontWeightMedium,
    fontSize: tokens.fontSizeSm,
    lineHeight: tokens.lineHeightNormal,
    color: tokens.colorText,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderStyle: 'none',
    borderRadius: tokens.radiusMd,
    cursor: 'pointer',
    textAlign: 'start',
    transitionProperty: 'all',
    transitionDuration: tokens.motionDurationFast,
    transitionTimingFunction: tokens.motionEaseOut,
  },

  chevron: {
    flexShrink: 0,
    width: '16px',
    height: '16px',
    opacity: 0.8,
    transform: 'rotate(var(--collapsible-chevron-rotation, 0deg))',
    transitionProperty: 'transform',
    transitionDuration: tokens.motionDurationNormal,
    transitionTimingFunction: tokens.motionEaseInOut,
  },

  panel: {
    fontSize: tokens.fontSizeSm,
    color: tokens.colorTextMuted,
  },
  panelContent: {
    paddingTop: 0,
    paddingBottom: tokens.space2,
    paddingInline: 0,
  },

  disabled: {
    opacity: 0.64,
    pointerEvents: 'none',
    cursor: 'default',
  },
});

// --- Types ---
export interface CollapsibleRootProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseCollapsible.Root>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface CollapsibleTriggerProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseCollapsible.Trigger>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface CollapsiblePanelProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseCollapsible.Panel>,
  'className'
> {
  sx?: StyleXStyles;
}

// --- Components ---

const Root = forwardRef<HTMLDivElement, CollapsibleRootProps>(({ sx, ...props }, ref) => (
  <BaseCollapsible.Root
    ref={ref}
    {...props}
    className={(state) =>
      stylex.props(state.disabled && styles.disabled, sx).className ?? ''
    }
  />
));
Root.displayName = 'Collapsible.Root';

const Trigger = forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  ({ children, sx, ...props }, ref) => (
    <BaseCollapsible.Trigger
      ref={ref}
      {...props}
      className={(state) =>
        stylex.props(styles.trigger, focusRing, state.disabled && styles.disabled, sx).className ?? ''
      }
      style={(state) =>
        ({
          '--collapsible-chevron-rotation': state.open ? '180deg' : '0deg',
        }) as React.CSSProperties
      }
    >
      {children}
      <ChevronDown size={16} {...stylex.props(styles.chevron)} />
    </BaseCollapsible.Trigger>
  ),
);
Trigger.displayName = 'Collapsible.Trigger';

const Panel = forwardRef<HTMLDivElement, CollapsiblePanelProps>(({ children, sx, ...props }, ref) => (
  <BaseCollapsible.Panel
    keepMounted
    ref={ref}
    {...props}
    className={() => `basex-collapsible-panel ${stylex.props(styles.panel, sx).className ?? ''}`}
  >
    <div {...stylex.props(styles.panelContent)}>{children}</div>
  </BaseCollapsible.Panel>
));
Panel.displayName = 'Collapsible.Panel';

// --- Public API ---
export const Collapsible = { Root, Trigger, Panel };
