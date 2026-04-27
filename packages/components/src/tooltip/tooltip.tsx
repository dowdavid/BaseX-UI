import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { forwardRef } from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';

// --- Styles ---
// Matches Popover content treatment so they read as a family. Same surface,
// border, radius, shadow, and motion tokens — only padding and maxWidth are
// tighter because tooltips host short, non-interactive text.
const styles = stylex.create({
  popup: {
    backgroundColor: tokens.colorSurfaceRaised,
    borderWidth: tokens.borderWidthDefault,
    borderStyle: 'solid',
    borderColor: tokens.colorBorderMuted,
    borderRadius: tokens.radiusLg,
    paddingBlock: tokens.space1,
    paddingInline: tokens.space2,
    boxShadow: tokens.shadowLg,
    fontFamily: tokens.fontFamilySans,
    fontSize: tokens.fontSizeSm,
    color: tokens.colorText,
    lineHeight: tokens.lineHeightNormal,
    maxWidth: '240px',
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
export type TooltipProviderProps = React.ComponentPropsWithoutRef<typeof BaseTooltip.Provider>;

export type TooltipRootProps = React.ComponentPropsWithoutRef<typeof BaseTooltip.Root>;

export interface TooltipTriggerProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseTooltip.Trigger>,
  'className'
> {
  sx?: StyleXStyles;
}

export type TooltipPortalProps = React.ComponentPropsWithoutRef<typeof BaseTooltip.Portal>;

export interface TooltipPositionerProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseTooltip.Positioner>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface TooltipPopupProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseTooltip.Popup>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface TooltipArrowProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseTooltip.Arrow>,
  'className'
> {
  sx?: StyleXStyles;
}

// --- Components ---

const Provider: React.FC<TooltipProviderProps> = (props) => <BaseTooltip.Provider {...props} />;
Provider.displayName = 'Tooltip.Provider';

const Root: React.FC<TooltipRootProps> = (props) => <BaseTooltip.Root {...props} />;
Root.displayName = 'Tooltip.Root';

const Trigger = forwardRef<HTMLButtonElement, TooltipTriggerProps>(({ sx, ...props }, ref) => (
  <BaseTooltip.Trigger
    ref={ref}
    {...props}
    className={sx ? (stylex.props(sx).className ?? '') : ''}
  />
));
Trigger.displayName = 'Tooltip.Trigger';

const Portal: React.FC<TooltipPortalProps> = (props) => <BaseTooltip.Portal {...props} />;
Portal.displayName = 'Tooltip.Portal';

const Positioner = forwardRef<HTMLDivElement, TooltipPositionerProps>(
  ({ sideOffset = 6, sx, ...props }, ref) => (
    <BaseTooltip.Positioner
      ref={ref}
      sideOffset={sideOffset}
      {...props}
      className={sx ? (stylex.props(sx).className ?? '') : ''}
    />
  ),
);
Positioner.displayName = 'Tooltip.Positioner';

const Popup = forwardRef<HTMLDivElement, TooltipPopupProps>(({ sx, ...props }, ref) => (
  <BaseTooltip.Popup
    ref={ref}
    {...props}
    className={`basex-tooltip-popup ${stylex.props(styles.popup, sx).className ?? ''}`}
  />
));
Popup.displayName = 'Tooltip.Popup';

const Arrow = forwardRef<HTMLDivElement, TooltipArrowProps>(({ sx, ...props }, ref) => (
  <BaseTooltip.Arrow
    ref={ref}
    {...props}
    className={stylex.props(styles.arrow, sx).className ?? ''}
  />
));
Arrow.displayName = 'Tooltip.Arrow';

// --- Public API ---
export const Tooltip = {
  Provider,
  Root,
  Trigger,
  Portal,
  Positioner,
  Popup,
  Arrow,
};
