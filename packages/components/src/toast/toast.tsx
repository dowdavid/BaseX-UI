/**
 * Toast — Ephemeral, accessible notification messages.
 *
 * Headless wrapper around Base UI's Toast. The Provider owns the queue,
 * pause-on-hover, swipe-to-dismiss, screen-reader announcements, and reduced-motion
 * handling. We supply styling, a `useToast()` re-export, and a polite default
 * Render that maps a single `Toast.Root` per item from the manager.
 *
 * Styling rules:
 * - StyleX for static styles (font, color, padding, border, radius, shadow)
 * - Global CSS for animated properties (opacity, transform driven by Base UI
 *   data attributes [data-starting-style] / [data-ending-style] / [data-swiping])
 * - Stable CSS class `basex-toast-{part}` for global CSS targeting
 * - `sx` prop on every part for consumer overrides
 * - `forwardRef` on every part
 * - `focusRing` on Action and Close (interactive)
 */
import { Toast as BaseToast } from '@base-ui/react/toast';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { X } from 'lucide-react';
import { focusRing } from '@basex-ui/styles';
import { forwardRef } from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';

// `useToastManager` is exported as a value from the Toast namespace; pull it off
// to expose as a stable `useToast()` hook re-export.
const { useToastManager } = BaseToast;

// --- Styles (static only) ---
const styles = stylex.create({
  viewport: {
    position: 'fixed',
    top: 'auto',
    right: tokens.space4,
    bottom: tokens.space4,
    left: 'auto',
    width: '100%',
    maxWidth: '24rem',
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space2,
    zIndex: 50,
    pointerEvents: 'none',
    outline: 'none',
  },

  root: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: tokens.space3,
    alignItems: 'start',
    padding: tokens.space4,
    paddingRight: tokens.space6,
    borderRadius: tokens.radiusLg,
    backgroundColor: tokens.colorSurface,
    boxShadow: tokens.shadowLg,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tokens.colorBorderMuted,
    pointerEvents: 'auto',
    fontFamily: tokens.fontFamilySans,
    touchAction: 'none',
    userSelect: 'none',
  },

  rootDestructive: {
    backgroundColor: tokens.colorDestructive,
    borderColor: tokens.colorDestructive,
    color: tokens.colorDestructiveContrast,
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space1,
    minWidth: 0,
  },

  title: {
    fontSize: tokens.fontSizeSm,
    fontWeight: tokens.fontWeightSemibold,
    fontFamily: tokens.fontFamilySans,
    lineHeight: tokens.lineHeightTight,
    color: tokens.colorText,
    margin: 0,
  },

  titleDestructive: {
    color: tokens.colorDestructiveContrast,
  },

  description: {
    fontSize: tokens.fontSizeSm,
    fontFamily: tokens.fontFamilySans,
    lineHeight: tokens.lineHeightNormal,
    color: tokens.colorTextMuted,
    margin: 0,
  },

  descriptionDestructive: {
    color: tokens.colorDestructiveContrast,
  },

  action: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingInline: tokens.space3,
    paddingBlock: tokens.space2,
    borderRadius: tokens.radiusSm,
    fontSize: tokens.fontSizeSm,
    fontWeight: tokens.fontWeightMedium,
    fontFamily: tokens.fontFamilySans,
    color: tokens.colorText,
    backgroundColor: {
      default: 'transparent',
      ':hover': tokens.colorMuted,
    },
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tokens.colorBorder,
    cursor: 'pointer',
    transitionProperty: 'background-color, color',
    transitionDuration: tokens.motionDurationFast,
    transitionTimingFunction: tokens.motionEaseOut,
  },

  close: {
    position: 'absolute',
    top: tokens.space2,
    right: tokens.space2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1.5rem',
    height: '1.5rem',
    borderRadius: tokens.radiusSm,
    color: tokens.colorIcon,
    cursor: 'pointer',
    backgroundColor: {
      default: 'transparent',
      ':hover': tokens.colorMuted,
    },
    transitionProperty: 'background-color, color',
    transitionDuration: tokens.motionDurationFast,
    transitionTimingFunction: tokens.motionEaseOut,
  },

  closeDestructive: {
    color: tokens.colorDestructiveContrast,
  },
});

// --- Types ---
export type ToastProviderProps = React.ComponentPropsWithoutRef<typeof BaseToast.Provider>;

export type ToastPortalProps = React.ComponentPropsWithoutRef<typeof BaseToast.Portal>;

export interface ToastViewportProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseToast.Viewport>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface ToastRootProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseToast.Root>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface ToastContentProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseToast.Content>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface ToastTitleProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseToast.Title>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface ToastDescriptionProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseToast.Description>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface ToastActionProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseToast.Action>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface ToastCloseProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseToast.Close>,
  'className'
> {
  sx?: StyleXStyles;
}

// --- Components ---

const Provider = (props: ToastProviderProps) => <BaseToast.Provider {...props} />;
Provider.displayName = 'Toast.Provider';

const Portal = (props: ToastPortalProps) => <BaseToast.Portal {...props} />;
Portal.displayName = 'Toast.Portal';

const Viewport = forwardRef<HTMLDivElement, ToastViewportProps>(({ sx, ...props }, ref) => (
  <BaseToast.Viewport
    ref={ref}
    {...props}
    className={`basex-toast-viewport ${stylex.props(styles.viewport, sx).className ?? ''}`}
  />
));
Viewport.displayName = 'Toast.Viewport';

const Root = forwardRef<HTMLDivElement, ToastRootProps>(({ sx, toast, ...props }, ref) => {
  const isDestructive = toast?.type === 'error' || toast?.type === 'destructive';
  return (
    <BaseToast.Root
      ref={ref}
      toast={toast}
      {...props}
      className={`basex-toast-root ${stylex.props(styles.root, isDestructive && styles.rootDestructive, sx).className ?? ''}`}
    />
  );
});
Root.displayName = 'Toast.Root';

const Content = forwardRef<HTMLDivElement, ToastContentProps>(({ sx, ...props }, ref) => (
  <BaseToast.Content
    ref={ref}
    {...props}
    className={stylex.props(styles.content, sx).className ?? ''}
  />
));
Content.displayName = 'Toast.Content';

const Title = forwardRef<HTMLHeadingElement, ToastTitleProps>(({ sx, ...props }, ref) => (
  <BaseToast.Title
    ref={ref}
    {...props}
    className={(state) =>
      stylex.props(
        styles.title,
        (state?.type === 'error' || state?.type === 'destructive') && styles.titleDestructive,
        sx,
      ).className ?? ''
    }
  />
));
Title.displayName = 'Toast.Title';

const Description = forwardRef<HTMLParagraphElement, ToastDescriptionProps>(
  ({ sx, ...props }, ref) => (
    <BaseToast.Description
      ref={ref}
      {...props}
      className={stylex.props(styles.description, sx).className ?? ''}
    />
  ),
);
Description.displayName = 'Toast.Description';

const Action = forwardRef<HTMLButtonElement, ToastActionProps>(({ sx, ...props }, ref) => (
  <BaseToast.Action
    ref={ref}
    {...props}
    className={stylex.props(styles.action, focusRing, sx).className ?? ''}
  />
));
Action.displayName = 'Toast.Action';

const Close = forwardRef<HTMLButtonElement, ToastCloseProps>(
  ({ sx, 'aria-label': ariaLabel = 'Close notification', children, ...props }, ref) => (
    <BaseToast.Close
      ref={ref}
      aria-label={ariaLabel}
      {...props}
      className={(state) =>
        stylex.props(
          styles.close,
          (state?.type === 'error' || state?.type === 'destructive') && styles.closeDestructive,
          focusRing,
          sx,
        ).className ?? ''
      }
    >
      {children ?? <X size={14} aria-hidden="true" />}
    </BaseToast.Close>
  ),
);
Close.displayName = 'Toast.Close';

// --- Imperative API ---
/**
 * Returns the toast manager. Calling `add(...)` inside React renders queues a
 * toast managed by the surrounding `<Toast.Provider>`. Re-export of Base UI's
 * `useToastManager`.
 */
export const useToast = useToastManager;

// --- Public API ---
export const Toast = {
  Provider,
  Portal,
  Viewport,
  Root,
  Content,
  Title,
  Description,
  Action,
  Close,
};
