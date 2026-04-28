import { Input as BaseInput } from '@base-ui/react/input';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { capitalize, focusRing } from '@basex-ui/styles';
import { forwardRef } from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';

// --- Styles ---
const styles = stylex.create({
  root: {
    width: '100%',
    fontFamily: tokens.fontFamilySans,
    color: tokens.colorText,
    backgroundColor: 'transparent',
    borderWidth: tokens.borderWidthDefault,
    borderStyle: 'solid',
    borderColor: tokens.colorBorderStrong,
    borderRadius: tokens.radiusMd,
    lineHeight: tokens.lineHeightNormal,
    '::placeholder': {
      color: tokens.colorTextPlaceholder,
    },
  },

  invalid: {
    borderColor: tokens.colorDestructive,
  },

  disabled: {
    color: tokens.colorTextMuted,
    borderColor: tokens.colorBorderMuted,
    cursor: 'not-allowed',
  },

  // --- Size axis ---
  sizeSm: {
    height: '32px',
    paddingInline: tokens.space2h,
    fontSize: tokens.fontSizeSm,
  },
  sizeMd: {
    height: '36px',
    paddingInline: tokens.space3,
    fontSize: tokens.fontSizeSm,
  },
  sizeLg: {
    height: '40px',
    paddingInline: tokens.space3h,
    fontSize: tokens.fontSizeMd,
  },
});

// --- Types ---
export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseInput>,
  'className' | 'size'
> {
  size?: InputSize;
  sx?: StyleXStyles;
}

// --- Component ---
export const Input = forwardRef<HTMLElement, InputProps>(({ size = 'md', sx, ...props }, ref) => {
  const sizeKey = `size${capitalize(size)}` as const;

  return (
    <BaseInput
      ref={ref}
      {...props}
      className={(state) =>
        stylex.props(
          styles.root,
          focusRing,
          styles[sizeKey as keyof typeof styles],
          state.valid === false && styles.invalid,
          state.disabled && styles.disabled,
          sx,
        ).className ?? ''
      }
    />
  );
});

Input.displayName = 'Input';
