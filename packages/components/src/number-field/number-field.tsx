import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
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
    gap: tokens.space1h,
  },

  group: {
    display: 'flex',
    alignItems: 'stretch',
    borderWidth: tokens.borderWidthDefault,
    borderStyle: 'solid',
    borderColor: tokens.colorBorder,
    borderRadius: tokens.radiusMd,
    overflow: 'hidden',
    backgroundColor: tokens.colorBackground,
    transitionProperty: 'border-color, box-shadow',
    transitionDuration: tokens.motionDurationFast,
    transitionTimingFunction: tokens.motionEaseOut,
  },

  groupSizeSm: {
    height: '32px',
  },
  groupSizeMd: {
    height: '40px',
  },
  groupSizeLg: {
    height: '48px',
  },

  groupDisabled: {
    borderColor: tokens.colorBorderMuted,
    cursor: 'not-allowed',
  },

  input: {
    flex: 1,
    appearance: 'none',
    borderWidth: 0,
    borderStyle: 'none',
    outline: 'none',
    boxShadow: 'none',
    backgroundColor: 'transparent',
    fontFamily: tokens.fontFamilySans,
    fontSize: tokens.fontSizeSm,
    color: tokens.colorText,
    paddingInline: tokens.space3,
    textAlign: 'center',
    minWidth: 0,
  },

  inputDisabled: {
    color: tokens.colorTextMuted,
    cursor: 'not-allowed',
  },

  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    backgroundColor: {
      default: tokens.colorMuted,
      ':hover': tokens.colorBorderMuted,
      ':active': tokens.colorBorder,
    },
    color: tokens.colorIcon,
    cursor: 'pointer',
    flexShrink: 0,
    width: '32px',
    transitionProperty: 'background-color, color',
    transitionDuration: tokens.motionDurationFast,
    transitionTimingFunction: tokens.motionEaseOut,
  },

  buttonSm: {
    width: '28px',
  },
  buttonLg: {
    width: '40px',
  },

  buttonDisabled: {
    color: tokens.colorTextMuted,
    cursor: 'not-allowed',
    backgroundColor: {
      default: 'transparent',
      ':hover': 'transparent',
    },
  },

  decrement: {},

  increment: {},
});

// --- Types ---
export type NumberFieldSize = 'sm' | 'md' | 'lg';

export interface NumberFieldRootProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseNumberField.Root>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface NumberFieldGroupProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseNumberField.Group>,
  'className'
> {
  size?: NumberFieldSize;
  disabled?: boolean;
  sx?: StyleXStyles;
}

export interface NumberFieldInputProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseNumberField.Input>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface NumberFieldIncrementProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseNumberField.Increment>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface NumberFieldDecrementProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseNumberField.Decrement>,
  'className'
> {
  sx?: StyleXStyles;
}

// --- Components ---

const Root = forwardRef<HTMLDivElement, NumberFieldRootProps>(({ sx, ...props }, ref) => (
  <BaseNumberField.Root
    ref={ref}
    {...props}
    className={stylex.props(styles.root, sx).className ?? ''}
  />
));
Root.displayName = 'NumberField.Root';

const Group = forwardRef<HTMLDivElement, NumberFieldGroupProps>(
  ({ size = 'md', disabled, sx, ...props }, ref) => {
    const sizeStyle =
      size === 'sm' ? styles.groupSizeSm : size === 'lg' ? styles.groupSizeLg : styles.groupSizeMd;
    return (
      <BaseNumberField.Group
        ref={ref}
        {...props}
        className={`basex-number-field-group ${stylex.props(styles.group, sizeStyle, disabled && styles.groupDisabled, sx).className ?? ''}`}
      />
    );
  },
);
Group.displayName = 'NumberField.Group';

const Input = forwardRef<HTMLInputElement, NumberFieldInputProps>(({ sx, ...props }, ref) => (
  <BaseNumberField.Input
    ref={ref}
    {...props}
    className={stylex.props(styles.input, sx).className ?? ''}
  />
));
Input.displayName = 'NumberField.Input';

const Decrement = forwardRef<HTMLButtonElement, NumberFieldDecrementProps>(
  ({ sx, children, ...props }, ref) => (
    <BaseNumberField.Decrement
      ref={ref}
      {...props}
      className={stylex.props(styles.button, styles.decrement, focusRing, sx).className ?? ''}
    >
      {children ?? (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M3 7h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
    </BaseNumberField.Decrement>
  ),
);
Decrement.displayName = 'NumberField.Decrement';

const Increment = forwardRef<HTMLButtonElement, NumberFieldIncrementProps>(
  ({ sx, children, ...props }, ref) => (
    <BaseNumberField.Increment
      ref={ref}
      {...props}
      className={stylex.props(styles.button, styles.increment, focusRing, sx).className ?? ''}
    >
      {children ?? (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M7 3v8M3 7h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
    </BaseNumberField.Increment>
  ),
);
Increment.displayName = 'NumberField.Increment';

// --- Public API ---
export const NumberField = { Root, Group, Input, Increment, Decrement };
