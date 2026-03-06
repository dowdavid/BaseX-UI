import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { forwardRef } from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';

// --- Styles ---
const styles = stylex.create({
  backdrop: {
    position: 'fixed',
    inset: 0,
    backgroundColor: tokens.colorOverlay,
  },

  viewport: {
    position: 'fixed',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto',
    padding: tokens.space4,
  },

  popup: {
    position: 'relative',
    backgroundColor: tokens.colorSurface,
    borderRadius: tokens.radiusLg,
    boxShadow: tokens.shadowLg,
    maxWidth: '28rem',
    width: '100%',
    padding: tokens.space6,
  },

  title: {
    fontSize: tokens.fontSizeLg,
    fontWeight: tokens.fontWeightSemibold,
    fontFamily: tokens.fontFamilySans,
    lineHeight: tokens.lineHeightTight,
    color: tokens.colorText,
  },

  description: {
    fontSize: tokens.fontSizeSm,
    fontFamily: tokens.fontFamilySans,
    lineHeight: tokens.lineHeightNormal,
    color: tokens.colorTextMuted,
    marginTop: tokens.space2,
  },

  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: tokens.space3,
    marginTop: tokens.space6,
  },
});

// --- Types ---
export type AlertDialogRootProps = React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Root>;

export interface AlertDialogTriggerProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Trigger>,
  'className'
> {
  sx?: StyleXStyles;
}

export type AlertDialogPortalProps = React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Portal>;

export interface AlertDialogBackdropProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Backdrop>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface AlertDialogPopupProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Popup>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface AlertDialogTitleProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Title>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface AlertDialogDescriptionProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Description>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface AlertDialogActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  sx?: StyleXStyles;
}

export interface AlertDialogCloseProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Close>,
  'className'
> {
  sx?: StyleXStyles;
}

// --- Components ---

const Root = (props: AlertDialogRootProps) => <BaseAlertDialog.Root {...props} />;
Root.displayName = 'AlertDialog.Root';

const Trigger = forwardRef<HTMLButtonElement, AlertDialogTriggerProps>(({ sx, ...props }, ref) => (
  <BaseAlertDialog.Trigger
    ref={ref}
    {...props}
    className={sx ? (stylex.props(sx).className ?? '') : undefined}
  />
));
Trigger.displayName = 'AlertDialog.Trigger';

const Portal = ({ keepMounted = true, ...props }: AlertDialogPortalProps) => (
  <BaseAlertDialog.Portal keepMounted={keepMounted} {...props} />
);
Portal.displayName = 'AlertDialog.Portal';

const Backdrop = forwardRef<HTMLDivElement, AlertDialogBackdropProps>(({ sx, ...props }, ref) => (
  <BaseAlertDialog.Backdrop
    ref={ref}
    {...props}
    className={() =>
      `basex-alert-dialog-backdrop ${stylex.props(styles.backdrop, sx).className ?? ''}`
    }
  />
));
Backdrop.displayName = 'AlertDialog.Backdrop';

const Popup = forwardRef<HTMLDivElement, AlertDialogPopupProps>(
  ({ children, sx, ...props }, ref) => (
    <BaseAlertDialog.Viewport className={stylex.props(styles.viewport).className ?? ''}>
      <BaseAlertDialog.Popup
        ref={ref}
        {...props}
        className={() =>
          `basex-alert-dialog-popup ${stylex.props(styles.popup, sx).className ?? ''}`
        }
      >
        {children}
      </BaseAlertDialog.Popup>
    </BaseAlertDialog.Viewport>
  ),
);
Popup.displayName = 'AlertDialog.Popup';

const Title = forwardRef<HTMLHeadingElement, AlertDialogTitleProps>(({ sx, ...props }, ref) => (
  <BaseAlertDialog.Title
    ref={ref}
    {...props}
    className={stylex.props(styles.title, sx).className ?? ''}
  />
));
Title.displayName = 'AlertDialog.Title';

const Description = forwardRef<HTMLParagraphElement, AlertDialogDescriptionProps>(
  ({ sx, ...props }, ref) => (
    <BaseAlertDialog.Description
      ref={ref}
      {...props}
      className={stylex.props(styles.description, sx).className ?? ''}
    />
  ),
);
Description.displayName = 'AlertDialog.Description';

const Actions = forwardRef<HTMLDivElement, AlertDialogActionsProps>(({ sx, ...props }, ref) => (
  <div ref={ref} {...props} className={stylex.props(styles.actions, sx).className ?? ''} />
));
Actions.displayName = 'AlertDialog.Actions';

const Close = forwardRef<HTMLButtonElement, AlertDialogCloseProps>(({ sx, ...props }, ref) => (
  <BaseAlertDialog.Close
    ref={ref}
    {...props}
    className={sx ? (stylex.props(sx).className ?? '') : undefined}
  />
));
Close.displayName = 'AlertDialog.Close';

// --- Public API ---
export const AlertDialog = {
  Root,
  Trigger,
  Portal,
  Backdrop,
  Popup,
  Title,
  Description,
  Actions,
  Close,
};
