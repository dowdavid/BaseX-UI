import { Select as BaseSelect } from '@base-ui/react/select';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { capitalize, focusRing } from '@basex-ui/styles';
import { createContext, forwardRef, useContext } from 'react';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import type { StyleXStyles } from '@stylexjs/stylex';

// --- Styles ---
const styles = stylex.create({
  // --- Trigger (button) — visually mirrors Combobox single-select input ---
  trigger: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: tokens.space2,
    width: '100%',
    maxWidth: '18rem',
    fontFamily: tokens.fontFamilySans,
    lineHeight: tokens.lineHeightNormal,
    color: tokens.colorText,
    backgroundColor: 'transparent',
    borderWidth: tokens.borderWidthDefault,
    borderStyle: 'solid',
    borderColor: tokens.colorBorder,
    cursor: 'pointer',
    userSelect: 'none',
    textAlign: 'start',
    transitionProperty: 'background-color, color, border-color, box-shadow',
    transitionDuration: tokens.motionDurationFast,
    transitionTimingFunction: tokens.motionEaseOut,
  },

  // Size axis (parity with Combobox: sm=32, md=36, lg=40)
  triggerSizeSm: {
    height: '32px',
    paddingInlineStart: tokens.space2h,
    paddingInlineEnd: tokens.space2,
    fontSize: tokens.fontSizeSm,
    borderRadius: tokens.radiusMd,
  },
  triggerSizeMd: {
    height: '36px',
    paddingInlineStart: tokens.space3,
    paddingInlineEnd: tokens.space2h,
    fontSize: tokens.fontSizeSm,
    borderRadius: tokens.radiusMd,
  },
  triggerSizeLg: {
    height: '40px',
    paddingInlineStart: tokens.space3h,
    paddingInlineEnd: tokens.space3,
    fontSize: tokens.fontSizeMd,
    borderRadius: tokens.radiusMd,
  },

  triggerDisabled: {
    color: tokens.colorTextMuted,
    borderColor: tokens.colorBorderMuted,
    cursor: 'not-allowed',
  },

  value: {
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    minWidth: 0,
  },

  valuePlaceholder: {
    color: tokens.colorTextPlaceholder,
  },

  icon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: tokens.colorIcon,
    flexShrink: 0,
  },

  positioner: {
    zIndex: 50,
    outline: 'none',
  },

  popup: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 'var(--anchor-width)',
    backgroundColor: tokens.colorSurface,
    borderWidth: tokens.borderWidthDefault,
    borderStyle: 'solid',
    borderColor: tokens.colorBorderMuted,
    borderRadius: tokens.radiusMd,
    boxShadow: tokens.shadowMd,
    overflow: 'hidden',
    padding: 0,
    outline: 'none',
  },

  // Native overflow on Select.List — Base UI's listbox manages its own focus
  // and keyboard scroll. Wrapping in ScrollArea would intercept those gestures
  // and break arrow-key navigation. Per DESIGN.md scroll exception clause.
  list: {
    maxHeight: 'min(var(--available-height), 18rem)',
    overflowY: 'auto',
    margin: 0,
    padding: tokens.space1,
  },

  item: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    fontFamily: tokens.fontFamilySans,
    lineHeight: tokens.lineHeightNormal,
    color: tokens.colorText,
    cursor: 'pointer',
    userSelect: 'none',
    outline: 'none',
  },

  itemSizeSm: {
    paddingBlock: tokens.space1,
    paddingInlineStart: tokens.space2,
    paddingInlineEnd: tokens.space6,
    fontSize: tokens.fontSizeXs,
    borderRadius: tokens.radiusSm,
  },
  itemSizeMd: {
    paddingBlock: tokens.space1h,
    paddingInlineStart: tokens.space2,
    paddingInlineEnd: tokens.space6,
    fontSize: tokens.fontSizeSm,
    borderRadius: tokens.radiusSm,
  },
  itemSizeLg: {
    paddingBlock: tokens.space2,
    paddingInlineStart: tokens.space2h,
    paddingInlineEnd: tokens.space8,
    fontSize: tokens.fontSizeMd,
    borderRadius: tokens.radiusSm,
  },

  itemHighlighted: {
    backgroundColor: tokens.colorMuted,
  },

  itemSelected: {
    fontWeight: tokens.fontWeightMedium,
  },

  itemDisabled: {
    color: tokens.colorTextMuted,
    pointerEvents: 'none',
    cursor: 'not-allowed',
  },

  itemText: {
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  itemIndicator: {
    position: 'absolute',
    insetInlineEnd: tokens.space2,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  itemIndicatorHidden: {
    visibility: 'hidden',
  },

  itemIndicatorSizeSm: {
    width: '14px',
    height: '14px',
  },
  itemIndicatorSizeMd: {
    width: '16px',
    height: '16px',
  },
  itemIndicatorSizeLg: {
    width: '18px',
    height: '18px',
  },

  group: {
    display: 'flex',
    flexDirection: 'column',
    // Indent grouped items so they sit visually inside the group label.
    paddingInlineStart: tokens.space2,
  },

  groupLabel: {
    fontFamily: tokens.fontFamilySans,
    fontWeight: tokens.fontWeightMedium,
    color: tokens.colorTextMuted,
    textTransform: 'uppercase',
    letterSpacing: tokens.letterSpacingWide,
    // Pull the label back so it aligns with the group's outer edge while items remain indented.
    marginInlineStart: `calc(-1 * ${tokens.space2})`,
  },

  groupLabelSizeSm: {
    paddingBlock: tokens.space1,
    paddingInlineStart: tokens.space1h,
    paddingInlineEnd: tokens.space1h,
    fontSize: tokens.fontSizeXs,
  },
  groupLabelSizeMd: {
    paddingBlock: tokens.space1h,
    paddingInlineStart: tokens.space2,
    paddingInlineEnd: tokens.space2,
    fontSize: tokens.fontSizeXs,
  },
  groupLabelSizeLg: {
    paddingBlock: tokens.space2,
    paddingInlineStart: tokens.space2h,
    paddingInlineEnd: tokens.space2h,
    fontSize: tokens.fontSizeXs,
  },

  separator: {
    height: '1px',
    backgroundColor: tokens.colorBorderMuted,
    marginBlock: tokens.space1,
    marginInline: tokens.space1,
  },

  scrollArrow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '20px',
    color: tokens.colorIcon,
    backgroundColor: tokens.colorSurface,
    cursor: 'default',
    flexShrink: 0,
  },
});

// --- Types ---
export type SelectSize = 'sm' | 'md' | 'lg';

const chevronIconSize: Record<SelectSize, number> = { sm: 14, md: 16, lg: 18 };
const checkIconSize: Record<SelectSize, number> = { sm: 12, md: 14, lg: 16 };
const scrollArrowIconSize: Record<SelectSize, number> = { sm: 12, md: 14, lg: 14 };

const SizeContext = createContext<SelectSize>('md');

// --- Prop types ---

// Root: keep Base UI's generic typing intact rather than ComponentPropsWithoutRef
// (which collapses generics). Mirror the SelectRootProps shape and add `size`.
export interface SelectRootProps<
  Value = unknown,
  Multiple extends boolean | undefined = false,
> extends Omit<BaseSelect.Root.Props<Value, Multiple>, 'children'> {
  size?: SelectSize;
  children?: React.ReactNode;
}

export interface SelectTriggerProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseSelect.Trigger>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface SelectValueProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseSelect.Value>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface SelectIconProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseSelect.Icon>,
  'className'
> {
  sx?: StyleXStyles;
}

export type SelectPortalProps = React.ComponentPropsWithoutRef<typeof BaseSelect.Portal>;

export interface SelectPositionerProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseSelect.Positioner>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface SelectPopupProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseSelect.Popup>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface SelectViewportProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseSelect.List>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface SelectItemProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseSelect.Item>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface SelectItemTextProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseSelect.ItemText>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface SelectItemIndicatorProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseSelect.ItemIndicator>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface SelectGroupProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseSelect.Group>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface SelectGroupLabelProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseSelect.GroupLabel>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface SelectSeparatorProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseSelect.Separator>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface SelectScrollUpButtonProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseSelect.ScrollUpArrow>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface SelectScrollDownButtonProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseSelect.ScrollDownArrow>,
  'className'
> {
  sx?: StyleXStyles;
}

// --- Components ---

function Root<Value = unknown, Multiple extends boolean | undefined = false>({
  size = 'md',
  children,
  ...rest
}: SelectRootProps<Value, Multiple>) {
  return (
    <SizeContext.Provider value={size}>
      <BaseSelect.Root {...(rest as BaseSelect.Root.Props<Value, Multiple>)}>
        {children}
      </BaseSelect.Root>
    </SizeContext.Provider>
  );
}
Root.displayName = 'Select.Root';

const Trigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(({ sx, ...props }, ref) => {
  const size = useContext(SizeContext);
  const sizeKey = `triggerSize${capitalize(size)}` as const;
  return (
    <BaseSelect.Trigger
      ref={ref}
      {...props}
      className={(state) =>
        stylex.props(
          styles.trigger,
          styles[sizeKey],
          focusRing,
          state.disabled && styles.triggerDisabled,
          sx,
        ).className ?? ''
      }
    />
  );
});
Trigger.displayName = 'Select.Trigger';

const Value = forwardRef<HTMLSpanElement, SelectValueProps>(({ sx, ...props }, ref) => (
  <BaseSelect.Value
    ref={ref}
    {...props}
    className={(state) =>
      stylex.props(styles.value, state.placeholder && styles.valuePlaceholder, sx).className ?? ''
    }
  />
));
Value.displayName = 'Select.Value';

const Icon = forwardRef<HTMLSpanElement, SelectIconProps>(({ children, sx, ...props }, ref) => {
  const size = useContext(SizeContext);
  return (
    <BaseSelect.Icon ref={ref} {...props} className={stylex.props(styles.icon, sx).className ?? ''}>
      {children ?? <ChevronDown size={chevronIconSize[size]} aria-hidden="true" />}
    </BaseSelect.Icon>
  );
});
Icon.displayName = 'Select.Icon';

const Portal = (props: SelectPortalProps) => <BaseSelect.Portal {...props} />;
Portal.displayName = 'Select.Portal';

const Positioner = forwardRef<HTMLDivElement, SelectPositionerProps>(({ sx, ...props }, ref) => (
  <BaseSelect.Positioner
    ref={ref}
    sideOffset={6}
    {...props}
    className={stylex.props(styles.positioner, sx).className ?? ''}
  />
));
Positioner.displayName = 'Select.Positioner';

const Popup = forwardRef<HTMLDivElement, SelectPopupProps>(({ sx, ...props }, ref) => (
  <BaseSelect.Popup
    ref={ref}
    {...props}
    className={() => `basex-select-popup ${stylex.props(styles.popup, sx).className ?? ''}`}
  />
));
Popup.displayName = 'Select.Popup';

const Viewport = forwardRef<HTMLDivElement, SelectViewportProps>(({ sx, ...props }, ref) => (
  <BaseSelect.List ref={ref} {...props} className={stylex.props(styles.list, sx).className ?? ''} />
));
Viewport.displayName = 'Select.Viewport';

const Item = forwardRef<HTMLDivElement, SelectItemProps>(({ sx, ...props }, ref) => {
  const size = useContext(SizeContext);
  const itemKey = `itemSize${capitalize(size)}` as const;
  return (
    <BaseSelect.Item
      ref={ref}
      {...props}
      className={(state) =>
        stylex.props(
          styles.item,
          styles[itemKey],
          state.highlighted && styles.itemHighlighted,
          state.selected && styles.itemSelected,
          state.disabled && styles.itemDisabled,
          sx,
        ).className ?? ''
      }
    />
  );
});
Item.displayName = 'Select.Item';

const ItemText = forwardRef<HTMLDivElement, SelectItemTextProps>(({ sx, ...props }, ref) => (
  <BaseSelect.ItemText
    ref={ref}
    {...props}
    className={stylex.props(styles.itemText, sx).className ?? ''}
  />
));
ItemText.displayName = 'Select.ItemText';

const ItemIndicator = forwardRef<HTMLSpanElement, SelectItemIndicatorProps>(
  ({ children, sx, ...props }, ref) => {
    const size = useContext(SizeContext);
    const indicatorKey = `itemIndicatorSize${capitalize(size)}` as const;
    const iconSz = checkIconSize[size];
    return (
      <BaseSelect.ItemIndicator
        ref={ref}
        keepMounted
        {...props}
        className={(state) =>
          stylex.props(
            styles.itemIndicator,
            styles[indicatorKey],
            !state.selected && styles.itemIndicatorHidden,
            sx,
          ).className ?? ''
        }
      >
        {children ?? <Check size={iconSz} aria-hidden="true" />}
      </BaseSelect.ItemIndicator>
    );
  },
);
ItemIndicator.displayName = 'Select.ItemIndicator';

const Group = forwardRef<HTMLDivElement, SelectGroupProps>(({ sx, ...props }, ref) => (
  <BaseSelect.Group
    ref={ref}
    {...props}
    className={`basex-select-group ${stylex.props(styles.group, sx).className ?? ''}`}
  />
));
Group.displayName = 'Select.Group';

const GroupLabel = forwardRef<HTMLDivElement, SelectGroupLabelProps>(({ sx, ...props }, ref) => {
  const size = useContext(SizeContext);
  const labelKey = `groupLabelSize${capitalize(size)}` as const;
  return (
    <BaseSelect.GroupLabel
      ref={ref}
      {...props}
      className={stylex.props(styles.groupLabel, styles[labelKey], sx).className ?? ''}
    />
  );
});
GroupLabel.displayName = 'Select.GroupLabel';

const Separator = forwardRef<HTMLDivElement, SelectSeparatorProps>(({ sx, ...props }, ref) => (
  <BaseSelect.Separator
    ref={ref}
    {...props}
    className={stylex.props(styles.separator, sx).className ?? ''}
  />
));
Separator.displayName = 'Select.Separator';

const ScrollUpButton = forwardRef<HTMLDivElement, SelectScrollUpButtonProps>(
  ({ children, sx, ...props }, ref) => {
    const size = useContext(SizeContext);
    return (
      <BaseSelect.ScrollUpArrow
        ref={ref}
        {...props}
        className={stylex.props(styles.scrollArrow, sx).className ?? ''}
      >
        {children ?? <ChevronUp size={scrollArrowIconSize[size]} aria-hidden="true" />}
      </BaseSelect.ScrollUpArrow>
    );
  },
);
ScrollUpButton.displayName = 'Select.ScrollUpButton';

const ScrollDownButton = forwardRef<HTMLDivElement, SelectScrollDownButtonProps>(
  ({ children, sx, ...props }, ref) => {
    const size = useContext(SizeContext);
    return (
      <BaseSelect.ScrollDownArrow
        ref={ref}
        {...props}
        className={stylex.props(styles.scrollArrow, sx).className ?? ''}
      >
        {children ?? <ChevronDown size={scrollArrowIconSize[size]} aria-hidden="true" />}
      </BaseSelect.ScrollDownArrow>
    );
  },
);
ScrollDownButton.displayName = 'Select.ScrollDownButton';

// --- Public API ---
export const Select = {
  Root,
  Trigger,
  Value,
  Icon,
  Portal,
  Positioner,
  Popup,
  Viewport,
  Item,
  ItemText,
  ItemIndicator,
  Group,
  GroupLabel,
  Separator,
  ScrollUpButton,
  ScrollDownButton,
};
