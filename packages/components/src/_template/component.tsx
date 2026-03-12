/**
 * ComponentName — TEMPLATE
 *
 * Copy this directory and rename to your component name (lowercase).
 * Replace all instances of "ComponentName" and "componentname".
 *
 * Styling rules:
 * - StyleX for static styles (font, color, padding, border, cursor, flex)
 * - Global CSS for animated properties (height, transform, opacity transitions
 *   driven by Base UI data attributes like [data-starting-style])
 * - `keepMounted` on any part that needs close animation
 * - Stable CSS class `basex-{component}-{part}` for global CSS targeting
 * - `sx` prop on every part for consumer overrides
 * - `focusRing` from `@basex-ui/styles` on every interactive element
 * - `aria-label` on icon-only buttons
 * - `aria-hidden="true"` on decorative SVGs/icons
 */
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { focusRing } from '@basex-ui/styles';
import { forwardRef } from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';

// --- Styles (static only — no animated properties here) ---
const styles = stylex.create({
  root: {
    fontFamily: tokens.fontFamilySans,
    fontSize: tokens.fontSizeSm,
    color: tokens.colorText,
  },

  disabled: {
    color: tokens.colorTextMuted,
    borderColor: tokens.colorBorderMuted,
    cursor: 'not-allowed',
  },
});

// --- Types ---
export interface ComponentNameProps {
  children?: React.ReactNode;
  disabled?: boolean;
  sx?: StyleXStyles;
}

// --- Component ---
const Root = forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ children, disabled, sx, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      {...stylex.props(styles.root, disabled && styles.disabled, focusRing, sx)}
    >
      {children}
    </div>
  ),
);
Root.displayName = 'ComponentName.Root';

// --- Compound export ---
export const ComponentName = { Root };
