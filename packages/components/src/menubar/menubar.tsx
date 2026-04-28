import { Menubar as BaseMenubar } from '@base-ui/react/menubar';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { forwardRef } from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';

// --- Styles ---
const styles = stylex.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.space1,
    fontFamily: tokens.fontFamilySans,
    borderWidth: tokens.borderWidthDefault,
    borderStyle: 'solid',
    borderColor: tokens.colorBorder,
    borderRadius: tokens.radiusLg,
    paddingBlock: tokens.space1,
    paddingInline: tokens.space1,
    backgroundColor: tokens.colorSurface,
  },

  disabled: {
    color: tokens.colorTextMuted,
    pointerEvents: 'none',
    cursor: 'default',
  },
});

// --- Types ---
export interface MenubarProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseMenubar>,
  'className'
> {
  sx?: StyleXStyles;
}

// --- Component ---
export const Menubar = forwardRef<HTMLDivElement, MenubarProps>(
  ({ disabled, sx, ...props }, ref) => (
    <BaseMenubar
      ref={ref}
      disabled={disabled}
      {...props}
      className={stylex.props(styles.root, disabled && styles.disabled, sx).className ?? ''}
    />
  ),
);

Menubar.displayName = 'Menubar';
