import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';

/**
 * Shared focus ring style — use across all interactive components.
 *
 * Applies a 2px neutral outline on :focus-visible with a 2px offset.
 * Compose via stylex.props() alongside component styles:
 *
 *   import { focusRing } from '@basex-ui/styles';
 *   stylex.props(styles.trigger, focusRing)
 */
const styles = stylex.create({
  focusRing: {
    outline: {
      default: 'none',
      ':focus-visible': `2px solid ${tokens.colorFocusRing}`,
    },
    outlineOffset: '2px',
  },
});

export const focusRing = styles.focusRing;
