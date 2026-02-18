import { Button as BaseButton } from '@base-ui/react/button';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { capitalize } from '@basex-ui/styles';
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
    textDecoration: 'none',
    transitionProperty: 'background-color, color, border-color, box-shadow, opacity, transform',
    transitionDuration: tokens.motionDurationFast,
    transitionTimingFunction: tokens.motionEaseOut,
    // Pressed state via :active pseudo-class
    transform: {
      default: 'none',
      ':active': 'scale(0.98)',
    },
    // Focus visible via :focus-visible pseudo-class
    outline: {
      default: 'none',
      ':focus-visible': `2px solid ${tokens.colorFocusRing}`,
    },
    outlineOffset: '2px',
  },

  // --- Variant axis (shape/fill) ---
  variantSolid: {
    backgroundColor: {
      default: tokens.colorPrimary,
      ':hover': tokens.colorPrimaryHover,
      ':active': tokens.colorPrimaryActive,
    },
    color: tokens.colorPrimaryContrast,
    borderColor: 'transparent',
  },
  variantOutline: {
    backgroundColor: {
      default: 'transparent',
      ':hover': tokens.colorMuted,
    },
    color: tokens.colorText,
    borderColor: tokens.colorBorder,
  },
  variantGhost: {
    backgroundColor: {
      default: 'transparent',
      ':hover': tokens.colorMuted,
    },
    color: tokens.colorText,
    borderColor: 'transparent',
  },

  // --- Compound: variant + color ---
  solidSecondary: {
    backgroundColor: {
      default: tokens.colorSecondary,
      ':hover': tokens.colorSecondaryHover,
      ':active': tokens.colorSecondaryActive,
    },
    color: tokens.colorSecondaryContrast,
  },
  solidDestructive: {
    backgroundColor: {
      default: tokens.colorDestructive,
      ':hover': tokens.colorDestructiveHover,
      ':active': tokens.colorDestructiveActive,
    },
    color: tokens.colorDestructiveContrast,
  },
  outlineDestructive: {
    color: tokens.colorDestructive,
    borderColor: tokens.colorDestructive,
  },
  ghostDestructive: {
    color: tokens.colorDestructive,
  },

  // --- Size axis ---
  sizeSm: {
    height: '32px',
    paddingInline: tokens.space3,
    fontSize: tokens.fontSizeSm,
  },
  sizeMd: {
    height: '40px',
    paddingInline: tokens.space4,
    fontSize: tokens.fontSizeSm,
  },
  sizeLg: {
    height: '48px',
    paddingInline: tokens.space6,
    fontSize: tokens.fontSizeMd,
  },

  // --- Disabled state (applied conditionally via Base UI state) ---
  disabled: {
    opacity: 0.5,
    pointerEvents: 'none',
    cursor: 'default',
  },
});

// --- Types ---
export type ButtonVariant = 'solid' | 'outline' | 'ghost';
export type ButtonColor = 'default' | 'secondary' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseButton>, 'className'> {
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
  (
    { variant = 'solid', color = 'default', size = 'md', sx, ...props },
    ref,
  ) => {
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
