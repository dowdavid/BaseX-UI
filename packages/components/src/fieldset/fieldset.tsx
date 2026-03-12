/**
 * Fieldset — Semantic grouping container for related form fields.
 *
 * Styling rules:
 * - StyleX for static styles only
 * - No animations (no global CSS needed)
 * - `sx` prop on every part for consumer overrides
 * - `forwardRef` on every part
 */
import { Fieldset as BaseFieldset } from '@base-ui/react/fieldset';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { forwardRef } from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';

// --- Styles ---
const styles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space4,
    borderWidth: 0,
    borderStyle: 'none',
    padding: 0,
    margin: 0,
  },

  disabled: {
    opacity: 0.64,
    pointerEvents: 'none',
  },

  legend: {
    fontSize: tokens.fontSizeMd,
    fontWeight: tokens.fontWeightSemibold,
    fontFamily: tokens.fontFamilySans,
    color: tokens.colorText,
    lineHeight: tokens.lineHeightNormal,
    padding: 0,
    marginBottom: tokens.space1,
  },
});

// --- Types ---
export interface FieldsetRootProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseFieldset.Root>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface FieldsetLegendProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseFieldset.Legend>,
  'className'
> {
  sx?: StyleXStyles;
}

// --- Components ---
const Root = forwardRef<HTMLFieldSetElement, FieldsetRootProps>(({ sx, ...props }, ref) => (
  <BaseFieldset.Root
    ref={ref}
    {...props}
    className={(state) =>
      stylex.props(styles.root, state.disabled && styles.disabled, sx).className ?? ''
    }
  />
));
Root.displayName = 'Fieldset.Root';

const Legend = forwardRef<HTMLLegendElement, FieldsetLegendProps>(({ sx, ...props }, ref) => (
  <BaseFieldset.Legend
    ref={ref}
    {...props}
    className={stylex.props(styles.legend, sx).className ?? ''}
  />
));
Legend.displayName = 'Fieldset.Legend';

// --- Public API ---
export const Fieldset = { Root, Legend };
