import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { focusRing } from '@basex-ui/styles';
import { forwardRef } from 'react';
import { Check, Minus } from 'lucide-react';
import type { StyleXStyles } from '@stylexjs/stylex';

// --- Styles ---
const styles = stylex.create({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '16px',
    height: '16px',
    borderRadius: tokens.radiusSm,
    borderWidth: tokens.borderWidthThick,
    borderStyle: 'solid',
    borderColor: tokens.colorBorderStrong,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    flexShrink: 0,
    transitionProperty: 'border-color, background-color',
    transitionDuration: tokens.motionDurationFast,
    transitionTimingFunction: tokens.motionEaseOut,
  },

  checked: {
    backgroundColor: tokens.colorText,
    borderColor: tokens.colorText,
  },

  disabled: {
    opacity: 0.64,
    pointerEvents: 'none',
    cursor: 'default',
  },

  indicator: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: tokens.colorTextInverse,
  },
});

// --- Types ---
export interface CheckboxRootProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseCheckbox.Root>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface CheckboxIndicatorProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseCheckbox.Indicator>,
  'className'
> {
  sx?: StyleXStyles;
}

// --- Components ---

const Root = forwardRef<HTMLElement, CheckboxRootProps>(({ sx, ...props }, ref) => (
  <BaseCheckbox.Root
    ref={ref}
    {...props}
    className={(state) =>
      stylex.props(
        styles.root,
        focusRing,
        (state.checked || state.indeterminate) && styles.checked,
        state.disabled && styles.disabled,
        sx,
      ).className ?? ''
    }
  />
));
Root.displayName = 'Checkbox.Root';

const Indicator = forwardRef<HTMLSpanElement, CheckboxIndicatorProps>(({ sx, ...props }, ref) => (
  <BaseCheckbox.Indicator
    ref={ref}
    {...props}
    className={() =>
      `basex-checkbox-indicator ${stylex.props(styles.indicator, sx).className ?? ''}`
    }
    render={(renderProps, state) => (
      <span {...renderProps}>
        {state.indeterminate ? (
          <Minus size={12} strokeWidth={3.5} />
        ) : state.checked ? (
          <Check size={12} strokeWidth={3.5} />
        ) : null}
      </span>
    )}
  />
));
Indicator.displayName = 'Checkbox.Indicator';

// --- Public API ---
export const Checkbox = { Root, Indicator };
