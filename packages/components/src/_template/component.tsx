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
 */
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { forwardRef } from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';

// --- Styles (static only — no animated properties here) ---
const styles = stylex.create({
  root: {
    fontFamily: tokens.fontFamilySans,
    fontSize: tokens.fontSizeSm,
    color: tokens.colorText,
  },
});

// --- Types ---
export interface ComponentNameProps {
  children?: React.ReactNode;
  sx?: StyleXStyles;
}

// --- Component ---
const Root = forwardRef<HTMLDivElement, ComponentNameProps>(({ children, sx, ...props }, ref) => (
  <div ref={ref} {...props} {...stylex.props(styles.root, sx)}>
    {children}
  </div>
));
Root.displayName = 'ComponentName.Root';

// --- Compound export ---
export const ComponentName = { Root };
