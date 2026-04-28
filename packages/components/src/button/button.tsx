import { Button as BaseButton } from '@base-ui/react/button';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { capitalize, focusRing } from '@basex-ui/styles';
import { forwardRef } from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';

// --- Styles ---
const styles = stylex.create({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.space2,
    fontFamily: tokens.fontFamilySans,
    fontWeight: tokens.fontWeightMedium,
    lineHeight: tokens.lineHeightTight,
    borderStyle: 'solid',
    borderWidth: tokens.borderWidthDefault,
    borderColor: 'transparent',
    borderRadius: tokens.radiusMd,
    cursor: 'pointer',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    flexShrink: 0,
    textDecoration: 'none',
    transitionProperty: 'background-color, color, border-color, box-shadow, opacity, transform',
    transitionDuration: tokens.motionDurationFast,
    transitionTimingFunction: tokens.motionEaseOut,
    // Pressed state via :active pseudo-class
    transform: {
      default: 'none',
      ':active': 'scale(0.98)',
    },
    // Focus ring applied via focusRing composition in stylex.props()
  },

  // --- Variant axis (shape/fill) ---
  variantSolid: {
    backgroundColor: {
      default: tokens.colorPrimary,
      ':hover': {
        default: null,
        '@media (hover: hover) and (pointer: fine)': tokens.colorPrimaryHover,
      },
      ':active': tokens.colorPrimaryActive,
    },
    color: tokens.colorPrimaryContrast,
    borderColor: 'transparent',
  },
  variantOutline: {
    backgroundColor: {
      default: 'transparent',
      ':hover': {
        default: null,
        '@media (hover: hover) and (pointer: fine)': tokens.colorMuted,
      },
    },
    color: tokens.colorText,
    borderColor: tokens.colorBorder,
  },
  variantGhost: {
    backgroundColor: {
      default: 'transparent',
      ':hover': {
        default: null,
        '@media (hover: hover) and (pointer: fine)': tokens.colorMuted,
      },
    },
    color: tokens.colorText,
    borderColor: 'transparent',
  },

  // --- Compound: variant + color ---
  solidSecondary: {
    backgroundColor: {
      default: tokens.colorSecondary,
      ':hover': {
        default: null,
        '@media (hover: hover) and (pointer: fine)': tokens.colorSecondaryHover,
      },
      ':active': tokens.colorSecondaryActive,
    },
    color: tokens.colorSecondaryContrast,
  },
  solidDestructive: {
    backgroundColor: {
      default: tokens.colorDestructive,
      ':hover': {
        default: null,
        '@media (hover: hover) and (pointer: fine)': tokens.colorDestructiveHover,
      },
      ':active': tokens.colorDestructiveActive,
    },
    color: tokens.colorDestructiveContrast,
  },
  outlineDestructive: {
    backgroundColor: {
      default: 'transparent',
      ':hover': {
        default: null,
        '@media (hover: hover) and (pointer: fine)': tokens.colorDestructiveMuted,
      },
    },
    color: tokens.colorDestructiveText,
    borderColor: {
      default: tokens.colorBorder,
      ':hover': {
        default: null,
        '@media (hover: hover) and (pointer: fine)': tokens.colorDestructive,
      },
    },
  },
  ghostDestructive: {
    backgroundColor: {
      default: 'transparent',
      ':hover': {
        default: null,
        '@media (hover: hover) and (pointer: fine)': tokens.colorDestructiveMuted,
      },
    },
    color: tokens.colorDestructiveText,
  },

  // --- Size axis ---
  sizeSm: {
    height: '32px',
    paddingInline: tokens.space2h,
    fontSize: tokens.fontSizeSm,
    gap: tokens.space1h,
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

  // --- Disabled state (applied conditionally via Base UI state) ---
  disabled: {
    color: tokens.colorTextMuted,
    borderColor: tokens.colorBorderMuted,
    backgroundColor: tokens.colorMuted,
    pointerEvents: 'none',
    cursor: 'default',
  },
});

// --- Types ---
export type ButtonVariant = 'solid' | 'outline' | 'ghost';
export type ButtonColor = 'default' | 'secondary' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseButton>,
  'className'
> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  sx?: StyleXStyles;
  children?: React.ReactNode;
}

// --- Compound style lookup ---
type CompoundKey = `${ButtonVariant}_${ButtonColor}`;
const compoundStyles: Partial<Record<CompoundKey, keyof typeof styles>> = {
  solid_secondary: 'solidSecondary',
  solid_destructive: 'solidDestructive',
  outline_destructive: 'outlineDestructive',
  ghost_destructive: 'ghostDestructive',
};

// --- Component ---
export const Button = forwardRef<HTMLElement, ButtonProps>(
  ({ variant = 'solid', color = 'default', size = 'md', sx, ...props }, ref) => {
    const variantKey = `variant${capitalize(variant)}` as const;
    const sizeKey = `size${capitalize(size)}` as const;
    const compoundKey: CompoundKey = `${variant}_${color}`;
    const compoundStyleKey = compoundStyles[compoundKey];

    return (
      <BaseButton
        ref={ref}
        {...props}
        className={(state) =>
          stylex.props(
            styles.root,
            focusRing,
            styles[variantKey],
            compoundStyleKey != null && styles[compoundStyleKey],
            styles[sizeKey],
            state.disabled && styles.disabled,
            sx,
          ).className ?? ''
        }
      />
    );
  },
);

Button.displayName = 'Button';
