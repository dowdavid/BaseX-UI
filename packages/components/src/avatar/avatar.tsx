import { Avatar as BaseAvatar } from '@base-ui/react/avatar';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { forwardRef } from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';

// --- Styles ---
const styles = stylex.create({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: tokens.space10,
    height: tokens.space10,
    borderRadius: tokens.radiusFull,
    overflow: 'hidden',
    flexShrink: 0,
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  fallback: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: tokens.colorMuted,
    color: tokens.colorText,
    fontFamily: tokens.fontFamilySans,
    fontSize: tokens.fontSizeSm,
    fontWeight: tokens.fontWeightMedium,
    lineHeight: tokens.lineHeightTight,
  },
});

// --- Types ---
export interface AvatarRootProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseAvatar.Root>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface AvatarImageProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseAvatar.Image>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface AvatarFallbackProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseAvatar.Fallback>,
  'className'
> {
  sx?: StyleXStyles;
}

// --- Components ---

const Root = forwardRef<HTMLSpanElement, AvatarRootProps>(({ sx, ...props }, ref) => (
  <BaseAvatar.Root ref={ref} {...props} className={stylex.props(styles.root, sx).className ?? ''} />
));
Root.displayName = 'Avatar.Root';

const Image = forwardRef<HTMLImageElement, AvatarImageProps>(({ sx, ...props }, ref) => (
  <BaseAvatar.Image
    ref={ref}
    {...props}
    className={stylex.props(styles.image, sx).className ?? ''}
  />
));
Image.displayName = 'Avatar.Image';

const Fallback = forwardRef<HTMLSpanElement, AvatarFallbackProps>(({ sx, ...props }, ref) => (
  <BaseAvatar.Fallback
    ref={ref}
    {...props}
    className={stylex.props(styles.fallback, sx).className ?? ''}
  />
));
Fallback.displayName = 'Avatar.Fallback';

// --- Public API ---
export const Avatar = { Root, Image, Fallback };
