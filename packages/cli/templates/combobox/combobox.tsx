import { Combobox as BaseCombobox } from '@base-ui/react/combobox';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { capitalize, focusRing } from '@basex-ui/styles';
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ChevronDown, X, Check } from 'lucide-react';
import type { StyleXStyles } from '@stylexjs/stylex';

// --- Utilities ---

function defaultGetItemLabel(item: unknown): string {
  if (item == null) return '';
  if (typeof item === 'string') return item;
  if (typeof item === 'object') {
    const obj = item as Record<string, unknown>;
    if (typeof obj.label === 'string') return obj.label;
    if (typeof obj.value === 'string') return obj.value;
  }
  return String(item);
}

// --- Styles ---
const styles = stylex.create({
  // --- Single-select input wrapper ---
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: '18rem',
  },

  input: {
    width: '100%',
    fontFamily: tokens.fontFamilySans,
    lineHeight: tokens.lineHeightNormal,
    color: tokens.colorText,
    backgroundColor: 'transparent',
    borderWidth: tokens.borderWidthDefault,
    borderStyle: 'solid',
    borderColor: tokens.colorBorderStrong,
    '::placeholder': {
      color: tokens.colorTextPlaceholder,
    },
  },

  // --- Input size axis (aligned with Button: sm=32, md=36, lg=40) ---
  inputSizeSm: {
    height: '32px',
    paddingInlineStart: tokens.space2h,
    paddingInlineEnd: tokens.space8,
    fontSize: tokens.fontSizeSm,
    borderRadius: tokens.radiusMd,
  },
  inputSizeMd: {
    height: '36px',
    paddingInlineStart: tokens.space3,
    paddingInlineEnd: tokens.space8,
    fontSize: tokens.fontSizeSm,
    borderRadius: tokens.radiusMd,
  },
  inputSizeLg: {
    height: '40px',
    paddingInlineStart: tokens.space3h,
    paddingInlineEnd: tokens.space10,
    fontSize: tokens.fontSizeMd,
    borderRadius: tokens.radiusMd,
  },

  // --- End icon (chevron) ---
  endIcon: {
    position: 'absolute',
    right: '0',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: tokens.colorIcon,
    pointerEvents: 'none',
  },

  // --- Clear button ---
  clearButton: {
    position: 'absolute',
    right: '0',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: tokens.space1,
    color: tokens.colorIcon,
    backgroundColor: {
      default: 'transparent',
      ':hover': {
        default: null,
        '@media (hover: hover) and (pointer: fine)': tokens.colorMuted,
      },
    },
    borderWidth: 0,
    borderRadius: tokens.radiusSm,
    cursor: 'pointer',
    transitionProperty: 'color, background-color',
    transitionDuration: tokens.motionDurationFast,
    transitionTimingFunction: tokens.motionEaseOut,
  },

  // --- End icon / clear size axis ---
  endSizeSm: { marginRight: tokens.space1, width: '24px', height: '24px' },
  endSizeMd: { marginRight: tokens.space1, width: '28px', height: '28px' },
  endSizeLg: { marginRight: tokens.space1, width: '32px', height: '32px' },

  // --- Multi-select wrapper (bordered container with flex-wrap pills) ---
  multiWrapper: {
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: '100%',
    maxWidth: '18rem',
    borderWidth: tokens.borderWidthDefault,
    borderStyle: 'solid',
    borderColor: tokens.colorBorderStrong,
    outlineWidth: {
      default: 0,
      ':focus-within': '2px',
    },
    outlineStyle: {
      default: 'none',
      ':focus-within': 'solid',
    },
    outlineColor: {
      default: 'transparent',
      ':focus-within': tokens.colorFocusRing,
    },
    outlineOffset: '2px',
  },

  multiWrapperSizeSm: {
    minHeight: '32px',
    padding: '2px',
    paddingInlineEnd: '26px',
    gap: '3px',
    borderRadius: tokens.radiusMd,
  },
  multiWrapperSizeMd: {
    minHeight: '36px',
    padding: '3px',
    paddingInlineEnd: '30px',
    gap: '4px',
    borderRadius: tokens.radiusMd,
  },
  multiWrapperSizeLg: {
    minHeight: '40px',
    padding: '4px',
    paddingInlineEnd: '34px',
    gap: '4px',
    borderRadius: tokens.radiusMd,
  },

  // --- Inline input inside multi wrapper ---
  inputInline: {
    flex: 1,
    minWidth: '60px',
    borderWidth: 0,
    outline: 'none',
    fontFamily: tokens.fontFamilySans,
    lineHeight: tokens.lineHeightNormal,
    color: tokens.colorText,
    backgroundColor: 'transparent',
    '::placeholder': {
      color: tokens.colorTextPlaceholder,
    },
  },

  inputInlineSizeSm: {
    height: '26px',
    paddingInline: tokens.space1h,
    fontSize: tokens.fontSizeSm,
  },
  inputInlineSizeMd: {
    height: '28px',
    paddingInline: tokens.space2,
    fontSize: tokens.fontSizeSm,
  },
  inputInlineSizeLg: {
    height: '30px',
    paddingInline: tokens.space2h,
    fontSize: tokens.fontSizeMd,
  },

  // --- Pill (selected item tag) ---
  pill: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: tokens.colorMuted,
    borderRadius: tokens.radiusSm,
    fontFamily: tokens.fontFamilySans,
    color: tokens.colorText,
    maxWidth: '100%',
  },

  pillSizeSm: {
    height: '24px',
    paddingInlineStart: tokens.space1h,
    paddingInlineEnd: tokens.space1,
    fontSize: tokens.fontSizeXs,
    gap: tokens.space1,
  },
  pillSizeMd: {
    height: '26px',
    paddingInlineStart: tokens.space2,
    paddingInlineEnd: tokens.space1,
    fontSize: tokens.fontSizeSm,
    gap: tokens.space1,
  },
  pillSizeLg: {
    height: '30px',
    paddingInlineStart: tokens.space2h,
    paddingInlineEnd: tokens.space1h,
    fontSize: tokens.fontSizeSm,
    gap: tokens.space1h,
  },

  pillText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  pillRemove: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    cursor: 'pointer',
    color: tokens.colorIcon,
    borderRadius: tokens.radiusSm,
    borderWidth: 0,
    padding: 0,
    backgroundColor: {
      default: 'transparent',
      ':hover': {
        default: null,
        '@media (hover: hover) and (pointer: fine)': tokens.colorBorderMuted,
      },
    },
    transitionProperty: 'color, background-color',
    transitionDuration: tokens.motionDurationFast,
    transitionTimingFunction: tokens.motionEaseOut,
  },

  pillRemoveSizeSm: { width: '16px', height: '16px' },
  pillRemoveSizeMd: { width: '18px', height: '18px' },
  pillRemoveSizeLg: { width: '20px', height: '20px' },

  positioner: {
    zIndex: 50,
  },

  popup: {
    display: 'flex',
    flexDirection: 'column',
    width: 'var(--anchor-width)',
    backgroundColor: tokens.colorSurface,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tokens.colorPopoverBorder,
    borderRadius: tokens.radiusMd,
    boxShadow: tokens.shadowMd,
    overflow: 'hidden',
    padding: 0,
  },

  // Native overflow on Combobox.List — Base UI's listbox manages its own
  // focus + arrow-key scroll. Wrapping in ScrollArea would break that.
  // Per DESIGN.md scroll exception clause.
  list: {
    maxHeight: '10rem',
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
  },

  // --- Item size axis ---
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
    cursor: 'default',
  },

  // --- ItemIndicator (absolute right so text aligns with left edge) ---
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

  emptyInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: tokens.fontFamilySans,
    color: tokens.colorTextMuted,
  },

  // --- Empty size axis (use consistent padding so text is visually centered) ---
  emptySizeSm: {
    padding: tokens.space2,
    fontSize: tokens.fontSizeXs,
  },
  emptySizeMd: {
    padding: tokens.space2h,
    fontSize: tokens.fontSizeSm,
  },
  emptySizeLg: {
    padding: tokens.space3,
    fontSize: tokens.fontSizeMd,
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

  // --- GroupLabel size axis ---
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

  disabled: {
    color: tokens.colorTextMuted,
    pointerEvents: 'none',
    cursor: 'default',
  },
});

// --- Types ---
export type ComboboxSize = 'sm' | 'md' | 'lg';

// --- Icon size lookups ---
const chevronIconSize: Record<ComboboxSize, number> = { sm: 14, md: 16, lg: 18 };
const clearIconSizeMap: Record<ComboboxSize, number> = { sm: 12, md: 14, lg: 16 };
const checkIconSize: Record<ComboboxSize, number> = { sm: 12, md: 14, lg: 16 };
const pillRemoveIconSize: Record<ComboboxSize, number> = { sm: 10, md: 12, lg: 12 };

// --- Contexts ---
const SizeContext = createContext<ComboboxSize>('md');

interface ComboboxInternalContextValue {
  multiple: boolean;
  hasValue: boolean;
  selectedValues: unknown[];
  removeValue: (item: unknown) => void;
  getItemLabel: (item: unknown) => string;
  anchorRef: React.RefObject<HTMLDivElement | null>;
}

const ComboboxInternalContext = createContext<ComboboxInternalContextValue>({
  multiple: false,
  hasValue: false,
  selectedValues: [],
  removeValue: () => {},
  getItemLabel: defaultGetItemLabel,
  anchorRef: { current: null },
});

export interface ComboboxRootProps extends React.ComponentPropsWithoutRef<
  typeof BaseCombobox.Root
> {
  size?: ComboboxSize;
  /** Convert an item to its display label for pills. Defaults to item.label ?? item.value ?? String(item). */
  getItemLabel?: (item: unknown) => string;
}

export interface ComboboxInputProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Input>,
  'className' | 'size'
> {
  sx?: StyleXStyles;
}

export interface ComboboxPopupProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Popup>,
  'className' | 'children'
> {
  sx?: StyleXStyles;
  children?:
    | React.ReactNode
    | ((item: never) => React.ReactNode)
    | Array<React.ReactNode | ((item: never) => React.ReactNode)>;
}

export interface ComboboxItemProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Item>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface ComboboxItemIndicatorProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseCombobox.ItemIndicator>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface ComboboxClearProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Clear>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface ComboboxEmptyProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Empty>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface ComboboxGroupProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Group>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface ComboboxGroupLabelProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseCombobox.GroupLabel>,
  'className'
> {
  sx?: StyleXStyles;
}

// --- Components ---

const Root = ({
  size = 'md',
  children,
  onValueChange,
  onOpenChange: userOnOpenChange,
  open: openProp,
  defaultOpen = false,
  getItemLabel = defaultGetItemLabel,
  value: valueProp,
  defaultValue,
  multiple = false,
  ...rest
}: ComboboxRootProps) => {
  const isControlled = valueProp !== undefined;

  const [internalValue, setInternalValue] = useState<unknown>(() => {
    if (isControlled) return valueProp;
    return defaultValue ?? (multiple ? [] : null);
  });

  const currentValue = isControlled ? valueProp : internalValue;
  const hasValue =
    currentValue != null && !(Array.isArray(currentValue) && currentValue.length === 0);
  const selectedValues = multiple && Array.isArray(currentValue) ? currentValue : [];

  const anchorRef = useRef<HTMLDivElement | null>(null);

  // Control open state so we can suppress close for clicks inside the wrapper
  const isOpenControlled = openProp !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const currentOpen = isOpenControlled ? !!openProp : internalOpen;

  // Track last pointerdown target via capture phase (fires before base-ui's dismiss)
  const lastPointerTargetRef = useRef<EventTarget | null>(null);
  useEffect(() => {
    if (!multiple) return;
    const handler = (e: PointerEvent) => {
      lastPointerTargetRef.current = e.target;
    };
    document.addEventListener('pointerdown', handler, true);
    return () => document.removeEventListener('pointerdown', handler, true);
  }, [multiple]);

  const removeValue = useCallback(
    (itemToRemove: unknown) => {
      if (!multiple) return;
      const newValues = (currentValue as unknown[]).filter((v) => v !== itemToRemove);
      if (!isControlled) setInternalValue(newValues);
      (onValueChange as ((...a: unknown[]) => void) | undefined)?.(newValues, undefined);
    },
    [multiple, currentValue, isControlled, onValueChange],
  );

  const handleValueChange = useCallback(
    (value: unknown, context: unknown) => {
      if (!isControlled) setInternalValue(value);
      (onValueChange as ((...a: unknown[]) => void) | undefined)?.(value, context);
    },
    [isControlled, onValueChange],
  );

  const handleOpenChange = useCallback(
    (open: boolean, context: unknown) => {
      // In multi mode, suppress close if the interaction was inside our wrapper
      if (
        !open &&
        multiple &&
        anchorRef.current &&
        lastPointerTargetRef.current instanceof Node &&
        anchorRef.current.contains(lastPointerTargetRef.current)
      ) {
        return;
      }
      if (!isOpenControlled) setInternalOpen(open);
      (userOnOpenChange as ((...a: unknown[]) => void) | undefined)?.(open, context);
    },
    [isOpenControlled, multiple, userOnOpenChange],
  );

  return (
    <SizeContext.Provider value={size}>
      <ComboboxInternalContext.Provider
        value={{ multiple, hasValue, selectedValues, removeValue, getItemLabel, anchorRef }}
      >
        <BaseCombobox.Root
          {...rest}
          multiple={multiple}
          value={currentValue}
          onValueChange={handleValueChange as typeof onValueChange}
          open={currentOpen}
          onOpenChange={handleOpenChange as (open: boolean, details: unknown) => void}
        >
          {children}
          <BaseCombobox.Status />
        </BaseCombobox.Root>
      </ComboboxInternalContext.Provider>
    </SizeContext.Provider>
  );
};
Root.displayName = 'Combobox.Root';

const Input = forwardRef<HTMLInputElement, ComboboxInputProps>(({ sx, ...props }, ref) => {
  const size = useContext(SizeContext);
  const { multiple, hasValue, selectedValues, removeValue, getItemLabel, anchorRef } =
    useContext(ComboboxInternalContext);
  const cap = capitalize(size);

  // --- Multi-select mode: bordered wrapper with pills + inline input ---
  if (multiple) {
    const wrapperKey = `multiWrapperSize${cap}` as const;
    const inlineKey = `inputInlineSize${cap}` as const;
    const pillKey = `pillSize${cap}` as const;
    const pillRemKey = `pillRemoveSize${cap}` as const;
    const pillIconSz = pillRemoveIconSize[size];
    const multiEndKey = `endSize${cap}` as const;

    return (
      <div ref={anchorRef} {...stylex.props(styles.multiWrapper, styles[wrapperKey], sx)}>
        {selectedValues.map((item) => (
          <span key={getItemLabel(item)} {...stylex.props(styles.pill, styles[pillKey])}>
            <span {...stylex.props(styles.pillText)}>{getItemLabel(item)}</span>
            <button
              type="button"
              aria-label={`Remove ${getItemLabel(item)}`}
              onPointerDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              onClick={(e) => {
                e.stopPropagation();
                removeValue(item);
              }}
              {...stylex.props(styles.pillRemove, styles[pillRemKey], focusRing)}
            >
              <X size={pillIconSz} aria-hidden="true" />
            </button>
          </span>
        ))}
        <BaseCombobox.Input
          ref={ref}
          {...props}
          placeholder={selectedValues.length > 0 ? undefined : props.placeholder}
          className={(state) =>
            stylex.props(styles.inputInline, styles[inlineKey], state.disabled && styles.disabled)
              .className ?? ''
          }
        />
        {selectedValues.length === 0 && (
          <span {...stylex.props(styles.endIcon, styles[multiEndKey])}>
            <ChevronDown size={chevronIconSize[size]} aria-hidden="true" />
          </span>
        )}
      </div>
    );
  }

  // --- Single-select mode: bordered input + chevron / clear ---
  const sizeKey = `inputSize${cap}` as const;
  const endKey = `endSize${cap}` as const;
  const chevronSz = chevronIconSize[size];
  const clearSz = clearIconSizeMap[size];

  return (
    <div {...stylex.props(styles.inputWrapper)}>
      <BaseCombobox.Input
        ref={ref}
        {...props}
        className={(state) =>
          stylex.props(
            styles.input,
            styles[sizeKey],
            focusRing,
            state.disabled && styles.disabled,
            sx,
          ).className ?? ''
        }
      />
      {hasValue ? (
        <BaseCombobox.Clear {...stylex.props(styles.clearButton, styles[endKey], focusRing)}>
          <X size={clearSz} aria-hidden="true" />
        </BaseCombobox.Clear>
      ) : (
        <span {...stylex.props(styles.endIcon, styles[endKey])}>
          <ChevronDown size={chevronSz} aria-hidden="true" />
        </span>
      )}
    </div>
  );
});
Input.displayName = 'Combobox.Input';

const Popup = forwardRef<HTMLDivElement, ComboboxPopupProps>(({ children, sx, ...props }, ref) => {
  const { multiple, anchorRef } = useContext(ComboboxInternalContext);
  const raw = Array.isArray(children) ? children : [children];
  const renderFn = raw.find((c) => typeof c === 'function');
  const nonFnChildren = raw.filter((c) => typeof c !== 'function') as React.ReactNode[];

  return (
    <BaseCombobox.Portal keepMounted>
      <BaseCombobox.Positioner
        sideOffset={6}
        anchor={multiple ? anchorRef : undefined}
        className={stylex.props(styles.positioner).className ?? ''}
      >
        <BaseCombobox.Popup
          ref={ref}
          {...props}
          className={() => `basex-combobox-popup ${stylex.props(styles.popup, sx).className ?? ''}`}
        >
          <BaseCombobox.List className={stylex.props(styles.list).className ?? ''}>
            {renderFn as React.ReactNode}
          </BaseCombobox.List>
          {nonFnChildren}
        </BaseCombobox.Popup>
      </BaseCombobox.Positioner>
    </BaseCombobox.Portal>
  );
});
Popup.displayName = 'Combobox.Popup';

const Item = forwardRef<HTMLDivElement, ComboboxItemProps>(({ sx, ...props }, ref) => {
  const size = useContext(SizeContext);
  const itemKey = `itemSize${capitalize(size)}` as const;
  return (
    <BaseCombobox.Item
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
Item.displayName = 'Combobox.Item';

const ItemIndicator = forwardRef<HTMLSpanElement, ComboboxItemIndicatorProps>(
  ({ children, sx, ...props }, ref) => {
    const size = useContext(SizeContext);
    const indicatorKey = `itemIndicatorSize${capitalize(size)}` as const;
    const iconSz = checkIconSize[size];
    return (
      <BaseCombobox.ItemIndicator
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
      </BaseCombobox.ItemIndicator>
    );
  },
);
ItemIndicator.displayName = 'Combobox.ItemIndicator';

const Clear = forwardRef<HTMLButtonElement, ComboboxClearProps>(
  ({ children, sx, ...props }, ref) => {
    const size = useContext(SizeContext);
    const clearKey = `endSize${capitalize(size)}` as const;
    const iconSz = clearIconSizeMap[size];
    return (
      <BaseCombobox.Clear
        ref={ref}
        {...props}
        {...stylex.props(styles.clearButton, styles[clearKey], sx)}
      >
        {children ?? <X size={iconSz} aria-hidden="true" />}
      </BaseCombobox.Clear>
    );
  },
);
Clear.displayName = 'Combobox.Clear';

const Empty = forwardRef<HTMLDivElement, ComboboxEmptyProps>(({ children, sx, ...props }, ref) => {
  const size = useContext(SizeContext);
  const emptyKey = `emptySize${capitalize(size)}` as const;
  return (
    <BaseCombobox.Empty ref={ref} {...props}>
      <div {...stylex.props(styles.emptyInner, styles[emptyKey], sx)}>{children}</div>
    </BaseCombobox.Empty>
  );
});
Empty.displayName = 'Combobox.Empty';

const Group = forwardRef<HTMLDivElement, ComboboxGroupProps>(({ sx, ...props }, ref) => (
  <BaseCombobox.Group
    ref={ref}
    {...props}
    className={`basex-combobox-group ${stylex.props(styles.group, sx).className ?? ''}`}
  />
));
Group.displayName = 'Combobox.Group';

const GroupLabel = forwardRef<HTMLDivElement, ComboboxGroupLabelProps>(({ sx, ...props }, ref) => {
  const size = useContext(SizeContext);
  const labelKey = `groupLabelSize${capitalize(size)}` as const;
  return (
    <BaseCombobox.GroupLabel
      ref={ref}
      {...props}
      className={stylex.props(styles.groupLabel, styles[labelKey], sx).className ?? ''}
    />
  );
});
GroupLabel.displayName = 'Combobox.GroupLabel';

// --- Public API ---
export const Combobox = {
  Root,
  Input,
  Popup,
  Item,
  ItemIndicator,
  Clear,
  Empty,
  Group,
  GroupLabel,
};
