import { Separator as BaseSeparator } from '@base-ui/react/separator';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { forwardRef } from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';

// --- Styles ---
const styles = stylex.create({
  horizontal: {
    width: '100%',
    height: '1px',
    backgroundColor: tokens.colorBorderMuted,
    flexShrink: 0,
    border: 0,
  },
  vertical: {
    width: '1px',
    height: '100%',
    alignSelf: 'stretch',
    backgroundColor: tokens.colorBorderMuted,
    flexShrink: 0,
    border: 0,
  },
});

// --- Types ---
export interface SeparatorRootProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseSeparator>,
  'className'
> {
  /**
   * When true, the separator is purely visual and exposes `role="none"` to
   * assistive technologies. Use this when the separator does not communicate
   * meaningful structure (e.g. a thin divider between two related toolbar groups).
   * @default false
   */
  decorative?: boolean;
  sx?: StyleXStyles;
}

// --- Component ---
const Root = forwardRef<HTMLDivElement, SeparatorRootProps>(
  ({ orientation = 'horizontal', decorative = false, sx, ...props }, ref) => (
    <BaseSeparator
      ref={ref}
      orientation={orientation}
      {...(decorative ? { role: 'none', 'aria-orientation': undefined } : {})}
      {...props}
      className={
        stylex.props(orientation === 'vertical' ? styles.vertical : styles.horizontal, sx)
          .className ?? ''
      }
    />
  ),
);
Root.displayName = 'Separator.Root';

// --- Public API ---
export const Separator = { Root };
