import { Radio as BaseRadio } from '@base-ui/react/radio';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { focusRing } from '@basex-ui/styles';
import { forwardRef } from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';

// --- Styles ---
const styles = stylex.create({
  group: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space2,
  },

  groupHorizontal: {
    flexDirection: 'row',
    gap: tokens.space4,
  },

  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '16px',
    height: '16px',
    borderRadius: tokens.radiusFull,
    borderWidth: tokens.borderWidthThick,
    borderStyle: 'solid',
    borderColor: tokens.colorBorder,
    backgroundColor: tokens.colorBackground,
    cursor: 'pointer',
    flexShrink: 0,
    transitionProperty: 'border-color, background-color',
    transitionDuration: tokens.motionDurationFast,
    transitionTimingFunction: tokens.motionEaseOut,
  },

  rootChecked: {
    borderColor: tokens.colorPrimary,
    backgroundColor: tokens.colorPrimary,
  },

  rootDisabled: {
    borderColor: tokens.colorBorderMuted,
    backgroundColor: tokens.colorMuted,
    cursor: 'not-allowed',
  },

  indicator: {
    width: '6px',
    height: '6px',
    borderRadius: tokens.radiusFull,
    backgroundColor: tokens.colorTextInverse,
  },
});

// --- Types ---
export type RadioOrientation = 'vertical' | 'horizontal';

export interface RadioGroupProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseRadioGroup>,
  'className'
> {
  orientation?: RadioOrientation;
  sx?: StyleXStyles;
}

export interface RadioRootProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseRadio.Root>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface RadioIndicatorProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseRadio.Indicator>,
  'className'
> {
  sx?: StyleXStyles;
}

// --- Components ---

const Group = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ orientation = 'vertical', sx, ...props }, ref) => (
    <BaseRadioGroup
      ref={ref}
      {...props}
      className={
        stylex.props(styles.group, orientation === 'horizontal' && styles.groupHorizontal, sx)
          .className ?? ''
      }
    />
  ),
);
Group.displayName = 'Radio.Group';

const Root = forwardRef<HTMLButtonElement, RadioRootProps>(({ sx, ...props }, ref) => (
  <BaseRadio.Root
    ref={ref}
    {...props}
    className={(state) =>
      `basex-radio-root ${
        stylex.props(
          styles.root,
          state.checked && styles.rootChecked,
          state.disabled && styles.rootDisabled,
          focusRing,
          sx,
        ).className ?? ''
      }`
    }
  />
));
Root.displayName = 'Radio.Root';

const Indicator = forwardRef<HTMLDivElement, RadioIndicatorProps>(({ sx, ...props }, ref) => (
  <BaseRadio.Indicator
    ref={ref}
    keepMounted
    {...props}
    className={() => `basex-radio-indicator ${stylex.props(styles.indicator, sx).className ?? ''}`}
  />
));
Indicator.displayName = 'Radio.Indicator';

// --- Public API ---
export const Radio = { Group, Root, Indicator };
