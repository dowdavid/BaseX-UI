import { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { forwardRef } from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';

// --- Styles ---
const styles = stylex.create({
  trigger: {
    color: tokens.colorPrimary,
    textDecoration: {
      default: 'none',
      ':hover': {
        default: null,
        '@media (hover: hover) and (pointer: fine)': 'underline',
      },
    },
    cursor: 'pointer',
    fontFamily: tokens.fontFamilySans,
  },

  popup: {
    backgroundColor: tokens.colorSurfaceRaised,
    borderWidth: tokens.borderWidthDefault,
    borderStyle: 'solid',
    borderColor: tokens.colorBorderMuted,
    borderRadius: tokens.radiusLg,
    padding: tokens.space3,
    boxShadow: tokens.shadowLg,
    fontFamily: tokens.fontFamilySans,
    fontSize: tokens.fontSizeSm,
    color: tokens.colorText,
    lineHeight: tokens.lineHeightNormal,
    maxWidth: '320px',
    outline: 'none',
  },

  arrow: {
    width: '12px',
    height: '8px',
    backgroundColor: tokens.colorBorderMuted,
    clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
    position: 'relative',
    '::after': {
      content: '""',
      position: 'absolute',
      top: '1px',
      left: '1px',
      right: '1px',
      bottom: 0,
      backgroundColor: tokens.colorSurfaceRaised,
      clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
    },
  },
});

// --- Types ---
export type PreviewCardRootProps = React.ComponentPropsWithoutRef<typeof BasePreviewCard.Root>;

export interface PreviewCardTriggerProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BasePreviewCard.Trigger>,
  'className'
> {
  sx?: StyleXStyles;
}

export type PreviewCardPortalProps = React.ComponentPropsWithoutRef<typeof BasePreviewCard.Portal>;

export interface PreviewCardPositionerProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BasePreviewCard.Positioner>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface PreviewCardPopupProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BasePreviewCard.Popup>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface PreviewCardArrowProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BasePreviewCard.Arrow>,
  'className'
> {
  sx?: StyleXStyles;
}

// --- Components ---

const Root: React.FC<PreviewCardRootProps> = (props) => <BasePreviewCard.Root {...props} />;
Root.displayName = 'PreviewCard.Root';

const Trigger = forwardRef<HTMLAnchorElement, PreviewCardTriggerProps>(({ sx, ...props }, ref) => (
  <BasePreviewCard.Trigger
    ref={ref}
    {...props}
    className={stylex.props(styles.trigger, sx).className ?? ''}
  />
));
Trigger.displayName = 'PreviewCard.Trigger';

const Portal: React.FC<PreviewCardPortalProps> = (props) => <BasePreviewCard.Portal {...props} />;
Portal.displayName = 'PreviewCard.Portal';

const Positioner = forwardRef<HTMLDivElement, PreviewCardPositionerProps>(
  ({ sideOffset = 2, sx, ...props }, ref) => (
    <BasePreviewCard.Positioner
      ref={ref}
      sideOffset={sideOffset}
      {...props}
      className={sx ? (stylex.props(sx).className ?? '') : ''}
    />
  ),
);
Positioner.displayName = 'PreviewCard.Positioner';

const Popup = forwardRef<HTMLDivElement, PreviewCardPopupProps>(({ sx, ...props }, ref) => (
  <BasePreviewCard.Popup
    ref={ref}
    {...props}
    className={`basex-preview-card-popup ${stylex.props(styles.popup, sx).className ?? ''}`}
  />
));
Popup.displayName = 'PreviewCard.Popup';

const Arrow = forwardRef<HTMLDivElement, PreviewCardArrowProps>(({ sx, ...props }, ref) => (
  <BasePreviewCard.Arrow
    ref={ref}
    {...props}
    className={stylex.props(styles.arrow, sx).className ?? ''}
  />
));
Arrow.displayName = 'PreviewCard.Arrow';

// --- Public API ---
export const PreviewCard = { Root, Trigger, Portal, Positioner, Popup, Arrow };
