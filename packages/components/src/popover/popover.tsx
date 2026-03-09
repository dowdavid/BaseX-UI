import { Popover as BasePopover } from '@base-ui/react/popover';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { forwardRef } from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';

// --- Styles ---
const styles = stylex.create({
  popup: {
    backgroundColor: tokens.colorSurfaceRaised,
    borderWidth: tokens.borderWidthDefault,
    borderStyle: 'solid',
    borderColor: tokens.colorBorderMuted,
    borderRadius: tokens.radiusLg,
    padding: tokens.space4,
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

  title: {
    fontSize: tokens.fontSizeMd,
    fontWeight: tokens.fontWeightSemibold,
    fontFamily: tokens.fontFamilySans,
    color: tokens.colorText,
    lineHeight: tokens.lineHeightNormal,
    marginBottom: tokens.space1,
  },

  description: {
    fontSize: tokens.fontSizeSm,
    fontFamily: tokens.fontFamilySans,
    color: tokens.colorTextMuted,
    lineHeight: tokens.lineHeightNormal,
  },

  close: {
    position: 'absolute',
    top: tokens.space2,
    right: tokens.space2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    border: 'none',
    backgroundColor: {
      default: 'transparent',
      ':hover': tokens.colorMuted,
    },
    borderRadius: tokens.radiusSm,
    color: tokens.colorTextMuted,
    cursor: 'pointer',
    transitionProperty: 'background-color',
    transitionDuration: tokens.motionDurationFast,
    transitionTimingFunction: tokens.motionEaseOut,
  },
});

// --- Types ---
export interface PopoverRootProps extends React.ComponentPropsWithoutRef<typeof BasePopover.Root> {}

export interface PopoverTriggerProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BasePopover.Trigger>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface PopoverPortalProps extends React.ComponentPropsWithoutRef<typeof BasePopover.Portal> {}

export interface PopoverPositionerProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BasePopover.Positioner>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface PopoverPopupProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BasePopover.Popup>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface PopoverArrowProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BasePopover.Arrow>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface PopoverTitleProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BasePopover.Title>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface PopoverDescriptionProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BasePopover.Description>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface PopoverCloseProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BasePopover.Close>,
  'className'
> {
  sx?: StyleXStyles;
}

// --- Components ---

const Root: React.FC<PopoverRootProps> = (props) => <BasePopover.Root {...props} />;
Root.displayName = 'Popover.Root';

const Trigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>(({ sx, ...props }, ref) => (
  <BasePopover.Trigger ref={ref} {...props} className={sx ? (stylex.props(sx).className ?? '') : ''} />
));
Trigger.displayName = 'Popover.Trigger';

const Portal: React.FC<PopoverPortalProps> = (props) => <BasePopover.Portal {...props} />;
Portal.displayName = 'Popover.Portal';

const Positioner = forwardRef<HTMLDivElement, PopoverPositionerProps>(({ sideOffset = 2, sx, ...props }, ref) => (
  <BasePopover.Positioner ref={ref} sideOffset={sideOffset} {...props} className={sx ? (stylex.props(sx).className ?? '') : ''} />
));
Positioner.displayName = 'Popover.Positioner';

const Popup = forwardRef<HTMLDivElement, PopoverPopupProps>(({ sx, ...props }, ref) => (
  <BasePopover.Popup
    ref={ref}
    {...props}
    className={`basex-popover-popup ${stylex.props(styles.popup, sx).className ?? ''}`}
  />
));
Popup.displayName = 'Popover.Popup';

const Arrow = forwardRef<HTMLDivElement, PopoverArrowProps>(({ sx, ...props }, ref) => (
  <BasePopover.Arrow
    ref={ref}
    {...props}
    className={stylex.props(styles.arrow, sx).className ?? ''}
  />
));
Arrow.displayName = 'Popover.Arrow';

const Title = forwardRef<HTMLHeadingElement, PopoverTitleProps>(({ sx, ...props }, ref) => (
  <BasePopover.Title
    ref={ref}
    {...props}
    className={stylex.props(styles.title, sx).className ?? ''}
  />
));
Title.displayName = 'Popover.Title';

const Description = forwardRef<HTMLParagraphElement, PopoverDescriptionProps>(
  ({ sx, ...props }, ref) => (
    <BasePopover.Description
      ref={ref}
      {...props}
      className={stylex.props(styles.description, sx).className ?? ''}
    />
  ),
);
Description.displayName = 'Popover.Description';

const Close = forwardRef<HTMLButtonElement, PopoverCloseProps>(
  ({ sx, children, ...props }, ref) => (
    <BasePopover.Close
      ref={ref}
      {...props}
      className={stylex.props(styles.close, sx).className ?? ''}
    >
      {children ?? (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
    </BasePopover.Close>
  ),
);
Close.displayName = 'Popover.Close';

// --- Public API ---
export const Popover = { Root, Trigger, Portal, Positioner, Popup, Arrow, Title, Description, Close };
