import { Form as BaseForm } from '@base-ui/react/form';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { forwardRef } from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';

// --- Styles ---
const styles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space8,
    width: '100%',
    fontFamily: tokens.fontFamilySans,
  },
});

// --- Types ---
export interface FormProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseForm>, 'className'> {
  sx?: StyleXStyles;
}

// --- Component ---
export const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ sx, ...props }, ref) => (
    <BaseForm
      ref={ref}
      {...props}
      className={stylex.props(styles.root, sx).className ?? ''}
    />
  ),
);

Form.displayName = 'Form';
