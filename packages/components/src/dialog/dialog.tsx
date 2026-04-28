import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { X } from 'lucide-react';
import { focusRing } from '@basex-ui/styles';
import { forwardRef, useCallback } from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';

// --- Styles ---
const styles = stylex.create({
  backdrop: {
    position: 'fixed',
    inset: 0,
    backgroundColor: tokens.colorOverlay,
  },

  // Native overflow on the centered backdrop viewport — only triggers when the
  // dialog popup itself is taller than the viewport, where the scrollbar lives
  // on the page-level backdrop. ScrollArea here would wrap the entire fixed
  // overlay and break the centered layout. Per DESIGN.md exception clause.
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
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: tokens.colorSurface,
    borderRadius: tokens.radiusLg,
    boxShadow: tokens.shadowLg,
    maxWidth: '28rem',
    width: '100%',
    maxHeight: 'calc(100vh - 4rem)',
  },

  closeButton: {
    position: 'absolute',
    top: tokens.space2,
    right: tokens.space2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '2rem',
    height: '2rem',
    borderRadius: tokens.radiusSm,
    color: tokens.colorIcon,
    cursor: 'pointer',
    backgroundColor: {
      default: 'transparent',
      ':hover': {
        default: null,
        '@media (hover: hover) and (pointer: fine)': tokens.colorMuted,
      },
    },
    transitionProperty: 'background-color, color',
    transitionDuration: tokens.motionDurationFast,
    transitionTimingFunction: tokens.motionEaseOut,
  },

  header: {
    padding: tokens.space4,
    paddingBottom: tokens.space3,
  },

  title: {
    fontSize: tokens.fontSizeLg,
    fontWeight: tokens.fontWeightSemibold,
    fontFamily: tokens.fontFamilySans,
    lineHeight: tokens.lineHeightTight,
    color: tokens.colorText,
    paddingRight: tokens.space6,
  },

  description: {
    fontSize: tokens.fontSizeSm,
    fontFamily: tokens.fontFamilySans,
    lineHeight: tokens.lineHeightNormal,
    color: tokens.colorTextMuted,
    marginTop: tokens.space1,
  },

  // Native overflow on Dialog.Panel — the Panel relies on its own scroll
  // event + ResizeObserver to set data-scroll-top/-bottom attributes for
  // sticky shadow effects. Routing through ScrollArea would put the scroller
  // on the inner Viewport and break that wiring. Tracked for follow-up
  // (refactor onto ScrollArea + viewport ref). Per DESIGN.md exception clause.
  panel: {
    flex: 1,
    minHeight: 0,
    overflow: 'auto',
    paddingInline: tokens.space4,
    paddingBottom: tokens.space4,
  },

  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: tokens.space3,
    paddingInline: tokens.space4,
    paddingBottom: tokens.space4,
    paddingTop: tokens.space3,
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: `color-mix(in srgb, ${tokens.colorBorder} 50%, transparent)`,
  },

  footerBordered: {
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: tokens.colorBorderMuted,
    paddingTop: tokens.space6,
  },
});

// --- Types ---
export type DialogRootProps = React.ComponentPropsWithoutRef<typeof BaseDialog.Root>;

export interface DialogTriggerProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseDialog.Trigger>,
  'className'
> {
  sx?: StyleXStyles;
}

export type DialogPortalProps = React.ComponentPropsWithoutRef<typeof BaseDialog.Portal>;

export interface DialogBackdropProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseDialog.Backdrop>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface DialogPopupProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseDialog.Popup>,
  'className'
> {
  showCloseButton?: boolean;
  sx?: StyleXStyles;
}

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  sx?: StyleXStyles;
}

export interface DialogTitleProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseDialog.Title>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface DialogDescriptionProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseDialog.Description>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface DialogPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  sx?: StyleXStyles;
}

export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered';
  sx?: StyleXStyles;
}

export interface DialogCloseProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseDialog.Close>,
  'className'
> {
  sx?: StyleXStyles;
}

// --- Components ---

const Root = (props: DialogRootProps) => <BaseDialog.Root {...props} />;
Root.displayName = 'Dialog.Root';

const Trigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(({ sx, ...props }, ref) => (
  <BaseDialog.Trigger
    ref={ref}
    {...props}
    className={sx ? (stylex.props(sx).className ?? '') : undefined}
  />
));
Trigger.displayName = 'Dialog.Trigger';

const Portal = (props: DialogPortalProps) => <BaseDialog.Portal {...props} />;
Portal.displayName = 'Dialog.Portal';

const Backdrop = forwardRef<HTMLDivElement, DialogBackdropProps>(({ sx, ...props }, ref) => (
  <BaseDialog.Backdrop
    ref={ref}
    {...props}
    className={() => `basex-dialog-backdrop ${stylex.props(styles.backdrop, sx).className ?? ''}`}
  />
));
Backdrop.displayName = 'Dialog.Backdrop';

const Popup = forwardRef<HTMLDivElement, DialogPopupProps>(
  ({ children, showCloseButton = true, sx, ...props }, ref) => (
    <BaseDialog.Viewport className={stylex.props(styles.viewport).className ?? ''}>
      <BaseDialog.Popup
        ref={ref}
        {...props}
        className={() => `basex-dialog-popup ${stylex.props(styles.popup, sx).className ?? ''}`}
      >
        {showCloseButton && (
          <BaseDialog.Close {...stylex.props(styles.closeButton, focusRing)} aria-label="Close">
            <X size={16} aria-hidden="true" />
          </BaseDialog.Close>
        )}
        {children}
      </BaseDialog.Popup>
    </BaseDialog.Viewport>
  ),
);
Popup.displayName = 'Dialog.Popup';

const Header = forwardRef<HTMLDivElement, DialogHeaderProps>(({ sx, ...props }, ref) => (
  <div ref={ref} {...props} {...stylex.props(styles.header, sx)} />
));
Header.displayName = 'Dialog.Header';

const Title = forwardRef<HTMLHeadingElement, DialogTitleProps>(({ sx, ...props }, ref) => (
  <BaseDialog.Title
    ref={ref}
    {...props}
    className={stylex.props(styles.title, sx).className ?? ''}
  />
));
Title.displayName = 'Dialog.Title';

const Description = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ sx, ...props }, ref) => (
    <BaseDialog.Description
      ref={ref}
      {...props}
      className={stylex.props(styles.description, sx).className ?? ''}
    />
  ),
);
Description.displayName = 'Dialog.Description';

const Panel = forwardRef<HTMLDivElement, DialogPanelProps>(({ sx, children, ...props }, ref) => {
  const checkScroll = useCallback((el: HTMLElement) => {
    const canScrollUp = el.scrollTop > 1;
    const canScrollDown = el.scrollTop + el.clientHeight < el.scrollHeight - 1;
    if (canScrollUp) el.setAttribute('data-scroll-top', '');
    else el.removeAttribute('data-scroll-top');
    if (canScrollDown) el.setAttribute('data-scroll-bottom', '');
    else el.removeAttribute('data-scroll-bottom');
  }, []);

  const scrollRef = useCallback(
    (el: HTMLDivElement | null) => {
      if (!el) return;
      checkScroll(el);
      const ro = new ResizeObserver(() => checkScroll(el));
      ro.observe(el);
      if (typeof ref === 'function') ref(el);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
    },
    [ref, checkScroll],
  );

  return (
    <div
      ref={scrollRef}
      {...props}
      {...stylex.props(styles.panel, sx)}
      className={`basex-dialog-panel ${stylex.props(styles.panel, sx).className ?? ''}`}
      onScroll={(e) => {
        checkScroll(e.currentTarget);
        props.onScroll?.(e);
      }}
    >
      {children}
    </div>
  );
});
Panel.displayName = 'Dialog.Panel';

const Footer = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ variant = 'default', sx, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      {...stylex.props(styles.footer, variant === 'bordered' && styles.footerBordered, sx)}
    />
  ),
);
Footer.displayName = 'Dialog.Footer';

const Close = forwardRef<HTMLButtonElement, DialogCloseProps>(({ sx, ...props }, ref) => (
  <BaseDialog.Close
    ref={ref}
    {...props}
    className={sx ? (stylex.props(sx).className ?? '') : undefined}
  />
));
Close.displayName = 'Dialog.Close';

// --- Public API ---
export const Dialog = {
  Root,
  Trigger,
  Portal,
  Backdrop,
  Popup,
  Header,
  Title,
  Description,
  Panel,
  Footer,
  Close,
};
