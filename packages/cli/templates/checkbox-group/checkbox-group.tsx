import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { forwardRef } from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';

// --- Styles ---
const styles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space3,
  },
});

// --- Types ---
export interface CheckboxGroupRootProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseCheckboxGroup>,
  'className'
> {
  sx?: StyleXStyles;
}

// --- Components ---

const Root = forwardRef<HTMLDivElement, CheckboxGroupRootProps>(({ sx, ...props }, ref) => (
  <BaseCheckboxGroup
    ref={ref}
    {...props}
    className={stylex.props(styles.root, sx).className ?? ''}
  />
));
Root.displayName = 'CheckboxGroup.Root';

// --- Public API ---
export const CheckboxGroup = { Root };
