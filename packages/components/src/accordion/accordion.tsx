import { Accordion as BaseAccordion } from '@base-ui/react/accordion';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { focusRing } from '@basex-ui/styles';
import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import type { StyleXStyles } from '@stylexjs/stylex';

// --- Styles ---
const styles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },

  item: {
    borderBottomWidth: tokens.borderWidthDefault,
    borderBottomStyle: 'solid',
    borderBottomColor: tokens.colorBorder,
  },

  header: {
    display: 'flex',
    margin: 0,
  },

  trigger: {
    display: 'flex',
    flex: 1,
    alignItems: 'start',
    justifyContent: 'space-between',
    gap: tokens.space4,
    paddingBlock: tokens.space4,
    fontFamily: tokens.fontFamilySans,
    fontWeight: tokens.fontWeightMedium,
    fontSize: tokens.fontSizeSm,
    lineHeight: tokens.lineHeightNormal,
    color: tokens.colorText,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderStyle: 'none',
    borderRadius: tokens.radiusMd,
    cursor: 'pointer',
    textAlign: 'start',
    transitionProperty: 'all',
    transitionDuration: tokens.motionDurationFast,
    transitionTimingFunction: tokens.motionEaseOut,
    // Focus ring applied via focusRing composition in stylex.props()
  },

  chevron: {
    flexShrink: 0,
    width: '16px',
    height: '16px',
    opacity: 0.8,
    transform: 'translateY(2px) rotate(var(--accordion-chevron-rotation, 0deg))',
    transitionProperty: 'transform',
    transitionDuration: tokens.motionDurationNormal,
    transitionTimingFunction: tokens.motionEaseInOut,
  },

  panel: {
    fontSize: tokens.fontSizeSm,
    color: tokens.colorTextMuted,
  },
  panelContent: {
    paddingTop: 0,
    paddingBottom: tokens.space4,
    paddingInline: 0,
  },

  disabled: {
    opacity: 0.64,
    pointerEvents: 'none',
    cursor: 'default',
  },
});

// --- Types ---
export interface AccordionRootProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseAccordion.Root>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface AccordionItemProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseAccordion.Item>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface AccordionHeaderProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseAccordion.Header>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface AccordionTriggerProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseAccordion.Trigger>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface AccordionPanelProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseAccordion.Panel>,
  'className'
> {
  sx?: StyleXStyles;
}

// --- Components ---

const Root = forwardRef<HTMLDivElement, AccordionRootProps>(({ sx, ...props }, ref) => (
  <BaseAccordion.Root
    ref={ref}
    {...props}
    className={(state) =>
      stylex.props(styles.root, state.disabled && styles.disabled, sx).className ?? ''
    }
  />
));
Root.displayName = 'Accordion.Root';

const Item = forwardRef<HTMLDivElement, AccordionItemProps>(({ sx, ...props }, ref) => (
  <BaseAccordion.Item
    ref={ref}
    {...props}
    className={(state) =>
      stylex.props(styles.item, state.disabled && styles.disabled, sx).className ?? ''
    }
  />
));
Item.displayName = 'Accordion.Item';

const Header = forwardRef<HTMLHeadingElement, AccordionHeaderProps>(({ sx, ...props }, ref) => (
  <BaseAccordion.Header
    ref={ref}
    {...props}
    className={stylex.props(styles.header, sx).className ?? ''}
  />
));
Header.displayName = 'Accordion.Header';

const Trigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ children, sx, ...props }, ref) => (
    <BaseAccordion.Trigger
      ref={ref}
      {...props}
      className={(state) =>
        stylex.props(styles.trigger, focusRing, state.disabled && styles.disabled, sx).className ??
        ''
      }
      style={(state) =>
        ({
          '--accordion-chevron-rotation': state.open ? '180deg' : '0deg',
        }) as React.CSSProperties
      }
    >
      {children}
      <ChevronDown size={16} {...stylex.props(styles.chevron)} />
    </BaseAccordion.Trigger>
  ),
);
Trigger.displayName = 'Accordion.Trigger';

const Panel = forwardRef<HTMLDivElement, AccordionPanelProps>(({ children, sx, ...props }, ref) => (
  <BaseAccordion.Panel
    keepMounted
    ref={ref}
    {...props}
    className={() => `basex-accordion-panel ${stylex.props(styles.panel, sx).className ?? ''}`}
  >
    <div {...stylex.props(styles.panelContent)}>{children}</div>
  </BaseAccordion.Panel>
));
Panel.displayName = 'Accordion.Panel';

// --- Public API ---
export const Accordion = { Root, Item, Header, Trigger, Panel };
