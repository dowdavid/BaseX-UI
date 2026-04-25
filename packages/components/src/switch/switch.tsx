import { Switch as BaseSwitch } from '@base-ui/react/switch';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { focusRing } from '@basex-ui/styles';
import { forwardRef } from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';

// --- Styles ---
const styles = stylex.create({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    position: 'relative',
    width: '32px',
    height: '18px',
    padding: '2px',
    borderRadius: tokens.radiusFull,
    borderWidth: tokens.borderWidthThick,
    borderStyle: 'solid',
    borderColor: tokens.colorBorder,
    backgroundColor: tokens.colorMuted,
    cursor: 'pointer',
    flexShrink: 0,
    transitionProperty: 'background-color, border-color',
    transitionDuration: tokens.motionDurationFast,
    transitionTimingFunction: tokens.motionEaseOut,
  },

  checked: {
    backgroundColor: tokens.colorPrimary,
    borderColor: tokens.colorPrimary,
  },

  disabled: {
    opacity: 0.64,
    pointerEvents: 'none',
    cursor: 'default',
  },

  thumb: {
    display: 'block',
    width: '10px',
    height: '10px',
    borderRadius: tokens.radiusFull,
    backgroundColor: tokens.colorPrimaryContrast,
    transform: 'translateX(0)',
    transitionProperty: 'transform',
    transitionDuration: tokens.motionDurationFast,
    transitionTimingFunction: tokens.motionEaseOut,
  },

  thumbChecked: {
    transform: 'translateX(14px)',
  },
});

// --- Types ---
export interface SwitchRootProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseSwitch.Root>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface SwitchThumbProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseSwitch.Thumb>,
  'className'
> {
  sx?: StyleXStyles;
}

// --- Components ---

const Root = forwardRef<HTMLButtonElement, SwitchRootProps>(({ sx, ...props }, ref) => (
  <BaseSwitch.Root
    ref={ref}
    {...props}
    className={(state) =>
      `basex-switch-root ${
        stylex.props(
          styles.root,
          focusRing,
          state.checked && styles.checked,
          state.disabled && styles.disabled,
          sx,
        ).className ?? ''
      }`
    }
  />
));
Root.displayName = 'Switch.Root';

const Thumb = forwardRef<HTMLSpanElement, SwitchThumbProps>(({ sx, ...props }, ref) => (
  <BaseSwitch.Thumb
    ref={ref}
    {...props}
    className={(state) =>
      `basex-switch-thumb ${
        stylex.props(styles.thumb, state.checked && styles.thumbChecked, sx).className ?? ''
      }`
    }
  />
));
Thumb.displayName = 'Switch.Thumb';

// --- Public API ---
export const Switch = { Root, Thumb };
