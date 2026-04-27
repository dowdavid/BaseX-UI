import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { capitalize, focusRing } from '@basex-ui/styles';
import { forwardRef } from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';

// --- Styles ---
// Visual base mirrors Button (radius, focus ring, hover/active scale, transitions).
// Pressed state semantics borrowed from Checkbox: when toggled on, the root flips
// to a filled-primary appearance; when off, it reads as an outline/ghost button.
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
    transform: {
      default: 'none',
      ':active': 'scale(0.98)',
    },
  },

  // --- Variant axis (off-state appearance) ---
  // Outline: bordered, transparent fill (default for standalone Toggle).
  variantOutline: {
    backgroundColor: {
      default: 'transparent',
      // Guard hover behind hover-capable pointer to prevent sticky hover on
      // touch devices (a tap fires :hover and it persists until the next tap
      // elsewhere). Touch users skip the hover style entirely.
      ':hover': {
        default: null,
        '@media (hover: hover) and (pointer: fine)': tokens.colorMuted,
      },
    },
    color: tokens.colorText,
    borderColor: tokens.colorBorder,
  },
  // Ghost: no border, hover surfaces a muted background. Common inside toolbars
  // and Toggle Groups where each item shouldn't carry its own border weight.
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

  // --- Pressed (on) state ---
  // Filled primary, identical tokens to Button variant="solid".
  pressed: {
    backgroundColor: {
      default: tokens.colorPrimary,
      ':hover': {
        default: tokens.colorPrimary,
        '@media (hover: hover) and (pointer: fine)': tokens.colorPrimaryHover,
      },
      ':active': tokens.colorPrimaryActive,
    },
    color: tokens.colorPrimaryContrast,
    borderColor: 'transparent',
  },

  // --- Size axis (mirrors Button) ---
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

  // --- Disabled state ---
  disabled: {
    opacity: 0.64,
    pointerEvents: 'none',
    cursor: 'default',
  },
});

// --- Types ---
export type ToggleVariant = 'outline' | 'ghost';
export type ToggleSize = 'sm' | 'md' | 'lg';

export interface ToggleRootProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseToggle>,
  'className'
> {
  variant?: ToggleVariant;
  size?: ToggleSize;
  sx?: StyleXStyles;
  children?: React.ReactNode;
}

// --- Components ---
const Root = forwardRef<HTMLButtonElement, ToggleRootProps>(
  ({ variant = 'outline', size = 'md', sx, ...props }, ref) => {
    const variantKey = `variant${capitalize(variant)}` as const;
    const sizeKey = `size${capitalize(size)}` as const;

    return (
      <BaseToggle
        ref={ref}
        {...props}
        className={(state) =>
          stylex.props(
            styles.root,
            focusRing,
            styles[variantKey],
            styles[sizeKey],
            state.pressed && styles.pressed,
            state.disabled && styles.disabled,
            sx,
          ).className ?? ''
        }
      />
    );
  },
);
Root.displayName = 'Toggle.Root';

// --- Public API ---
// Compound component shape (Toggle.Root) so a parallel Toggle Group can wrap it
// as a controlled child via Base UI's `value` prop, mirroring how CheckboxGroup
// wraps Checkbox.
export const Toggle = { Root };
