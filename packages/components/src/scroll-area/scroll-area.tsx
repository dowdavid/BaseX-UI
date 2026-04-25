/**
 * ScrollArea — Custom-styled scrollbar overlay on top of native scroll.
 *
 * Wraps Base UI ScrollArea. Native scroll preserved (keyboard, touch, RTL,
 * mouse wheel). Scrollbars overlay the content and fade in on hover/scroll
 * via global CSS driven by Base UI's `data-hovering` / `data-scrolling`
 * attributes. Respects `prefers-reduced-motion` (CSS media query in the
 * global animation block).
 *
 * Styling rules:
 * - StyleX for static styles (positioning, color, sizing)
 * - Global CSS for opacity transitions (data-hovering / data-scrolling)
 * - Stable CSS class `basex-scroll-area-{part}` for global CSS targeting
 * - `sx` prop on every part for consumer overrides
 * - `forwardRef` on every part
 */
import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { forwardRef } from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';

// --- Styles (static only) ---
const styles = stylex.create({
  root: {
    position: 'relative',
    overflow: 'hidden',
  },

  viewport: {
    width: '100%',
    height: '100%',
    overflow: 'auto',
    // Hide native scrollbars — Base UI overlays its own.
    scrollbarWidth: 'none',
  },

  scrollbar: {
    display: 'flex',
    touchAction: 'none',
    userSelect: 'none',
    padding: '2px',
    backgroundColor: 'transparent',
    // Fade & sizing are animated in global CSS.
  },

  scrollbarVertical: {
    width: '10px',
    height: '100%',
    flexDirection: 'column',
  },

  scrollbarHorizontal: {
    height: '10px',
    width: '100%',
    flexDirection: 'row',
  },

  thumb: {
    flex: 1,
    backgroundColor: tokens.colorBorder,
    borderRadius: tokens.radiusSm,
    position: 'relative',
    // Min hit-target via ::before on long content (matches Radix pattern)
    ':hover': {
      backgroundColor: tokens.colorIcon,
    },
  },

  corner: {
    backgroundColor: 'transparent',
  },
});

// --- Types ---
export interface ScrollAreaRootProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseScrollArea.Root>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface ScrollAreaViewportProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseScrollArea.Viewport>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface ScrollAreaScrollbarProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseScrollArea.Scrollbar>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface ScrollAreaThumbProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseScrollArea.Thumb>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface ScrollAreaCornerProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseScrollArea.Corner>,
  'className'
> {
  sx?: StyleXStyles;
}

// --- Components ---

const Root = forwardRef<HTMLDivElement, ScrollAreaRootProps>(({ sx, ...props }, ref) => (
  <BaseScrollArea.Root
    ref={ref}
    {...props}
    className={`basex-scroll-area-root ${stylex.props(styles.root, sx).className ?? ''}`}
  />
));
Root.displayName = 'ScrollArea.Root';

const Viewport = forwardRef<HTMLDivElement, ScrollAreaViewportProps>(({ sx, ...props }, ref) => (
  <BaseScrollArea.Viewport
    ref={ref}
    {...props}
    className={`basex-scroll-area-viewport ${stylex.props(styles.viewport, sx).className ?? ''}`}
  />
));
Viewport.displayName = 'ScrollArea.Viewport';

const Scrollbar = forwardRef<HTMLDivElement, ScrollAreaScrollbarProps>(
  ({ sx, orientation = 'vertical', ...props }, ref) => (
    <BaseScrollArea.Scrollbar
      ref={ref}
      orientation={orientation}
      {...props}
      className={`basex-scroll-area-scrollbar ${
        stylex.props(
          styles.scrollbar,
          orientation === 'vertical' ? styles.scrollbarVertical : styles.scrollbarHorizontal,
          sx,
        ).className ?? ''
      }`}
    />
  ),
);
Scrollbar.displayName = 'ScrollArea.Scrollbar';

const Thumb = forwardRef<HTMLDivElement, ScrollAreaThumbProps>(({ sx, ...props }, ref) => (
  <BaseScrollArea.Thumb
    ref={ref}
    {...props}
    className={`basex-scroll-area-thumb ${stylex.props(styles.thumb, sx).className ?? ''}`}
  />
));
Thumb.displayName = 'ScrollArea.Thumb';

const Corner = forwardRef<HTMLDivElement, ScrollAreaCornerProps>(({ sx, ...props }, ref) => (
  <BaseScrollArea.Corner
    ref={ref}
    {...props}
    className={`basex-scroll-area-corner ${stylex.props(styles.corner, sx).className ?? ''}`}
  />
));
Corner.displayName = 'ScrollArea.Corner';

// --- Public API ---
export const ScrollArea = {
  Root,
  Viewport,
  Scrollbar,
  Thumb,
  Corner,
};
