import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { capitalize, focusRing } from '@basex-ui/styles';
import { createContext, forwardRef, useContext } from 'react';
import { X } from 'lucide-react';
import type { StyleXStyles } from '@stylexjs/stylex';

// --- Styles ---
const styles = stylex.create({
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

  // --- Input padding override when startAddon is present ---
  inputWithAddonSm: {
    paddingInlineStart: tokens.space8,
  },
  inputWithAddonMd: {
    paddingInlineStart: tokens.space8,
  },
  inputWithAddonLg: {
    paddingInlineStart: tokens.space10,
  },

  // --- Clear button base ---
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

  // --- Clear button size axis ---
  clearSizeSm: {
    width: '24px',
    height: '24px',
  },
  clearSizeMd: {
    width: '28px',
    height: '28px',
  },
  clearSizeLg: {
    width: '32px',
    height: '32px',
  },

  // --- Start addon ---
  startAddon: {
    position: 'absolute',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingInlineEnd: tokens.space1h,
    pointerEvents: 'none',
    color: tokens.colorIcon,
  },
  startAddonSizeSm: {
    width: tokens.space8,
  },
  startAddonSizeMd: {
    width: tokens.space8,
  },
  startAddonSizeLg: {
    width: tokens.space10,
  },

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

  // Native overflow on Autocomplete.List — Base UI's listbox manages its own
  // focus + arrow-key scroll. Per DESIGN.md scroll exception clause.
  list: {
    maxHeight: '10rem',
    overflowY: 'auto',
    margin: 0,
    padding: tokens.space1,
  },

  item: {
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
    paddingInline: tokens.space2,
    fontSize: tokens.fontSizeXs,
    borderRadius: tokens.radiusSm,
  },
  itemSizeMd: {
    paddingBlock: tokens.space1h,
    paddingInline: tokens.space2,
    fontSize: tokens.fontSizeSm,
    borderRadius: tokens.radiusSm,
  },
  itemSizeLg: {
    paddingBlock: tokens.space2,
    paddingInline: tokens.space2h,
    fontSize: tokens.fontSizeMd,
    borderRadius: tokens.radiusSm,
  },

  itemHighlighted: {
    backgroundColor: tokens.colorMuted,
  },

  itemDisabled: {
    color: tokens.colorTextMuted,
    pointerEvents: 'none',
    cursor: 'default',
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
export type AutocompleteInputSize = 'sm' | 'md' | 'lg';

// --- Clear icon size lookup ---
const clearIconSize: Record<AutocompleteInputSize, number> = {
  sm: 12,
  md: 14,
  lg: 16,
};

// --- Size context ---
const SizeContext = createContext<AutocompleteInputSize>('md');

export interface AutocompleteRootProps extends React.ComponentPropsWithoutRef<
  typeof BaseAutocomplete.Root
> {
  size?: AutocompleteInputSize;
}

export interface AutocompleteInputProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseAutocomplete.Input>,
  'className' | 'size'
> {
  startAddon?: React.ReactNode;
  sx?: StyleXStyles;
}

export interface AutocompletePopupProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseAutocomplete.Popup>,
  'className' | 'children'
> {
  sx?: StyleXStyles;
  /** Accepts ReactNode, a render function `(item) => ReactNode`, or a mix of both. */
  children?:
    | React.ReactNode
    | ((item: never) => React.ReactNode)
    | Array<React.ReactNode | ((item: never) => React.ReactNode)>;
}

export interface AutocompleteItemProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseAutocomplete.Item>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface AutocompleteEmptyProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseAutocomplete.Empty>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface AutocompleteGroupProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseAutocomplete.Group>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface AutocompleteGroupLabelProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseAutocomplete.GroupLabel>,
  'className'
> {
  sx?: StyleXStyles;
}

// --- Components ---

const Root = ({ size = 'md', children, ...props }: AutocompleteRootProps) => (
  <SizeContext.Provider value={size}>
    <BaseAutocomplete.Root {...props}>
      {children}
      <BaseAutocomplete.Status />
    </BaseAutocomplete.Root>
  </SizeContext.Provider>
);
Root.displayName = 'Autocomplete.Root';

const Input = forwardRef<HTMLInputElement, AutocompleteInputProps>(
  ({ startAddon, sx, ...props }, ref) => {
    const size = useContext(SizeContext);
    const cap = capitalize(size);
    const sizeKey = `inputSize${cap}` as const;
    const clearKey = `clearSize${cap}` as const;
    const addonKey = `startAddonSize${cap}` as const;
    const addonPadKey = `inputWithAddon${cap}` as const;
    const iconSize = clearIconSize[size];

    return (
      <div {...stylex.props(styles.inputWrapper)}>
        {startAddon != null && (
          <span {...stylex.props(styles.startAddon, styles[addonKey])}>{startAddon}</span>
        )}
        <BaseAutocomplete.Input
          ref={ref}
          {...props}
          className={(state) =>
            stylex.props(
              styles.input,
              styles[sizeKey],
              startAddon != null && styles[addonPadKey],
              focusRing,
              state.disabled && styles.disabled,
              sx,
            ).className ?? ''
          }
        />
        <BaseAutocomplete.Clear {...stylex.props(styles.clearButton, styles[clearKey], focusRing)}>
          <X size={iconSize} aria-hidden="true" />
        </BaseAutocomplete.Clear>
      </div>
    );
  },
);
Input.displayName = 'Autocomplete.Input';

const Popup = forwardRef<HTMLDivElement, AutocompletePopupProps>(
  ({ children, sx, ...props }, ref) => {
    // Split children: render functions go to List, ReactNode stays in Popup.
    // React children can be a single child or an array.
    const raw = Array.isArray(children) ? children : [children];
    const renderFn = raw.find((c) => typeof c === 'function');
    const nonFnChildren = raw.filter((c) => typeof c !== 'function');

    return (
      <BaseAutocomplete.Portal keepMounted>
        <BaseAutocomplete.Positioner
          sideOffset={6}
          className={stylex.props(styles.positioner).className ?? ''}
        >
          <BaseAutocomplete.Popup
            ref={ref}
            {...props}
            className={() =>
              `basex-autocomplete-popup ${stylex.props(styles.popup, sx).className ?? ''}`
            }
          >
            <BaseAutocomplete.List className={stylex.props(styles.list).className ?? ''}>
              {renderFn as React.ReactNode}
            </BaseAutocomplete.List>
            {nonFnChildren}
          </BaseAutocomplete.Popup>
        </BaseAutocomplete.Positioner>
      </BaseAutocomplete.Portal>
    );
  },
);
Popup.displayName = 'Autocomplete.Popup';

const Item = forwardRef<HTMLDivElement, AutocompleteItemProps>(({ sx, ...props }, ref) => {
  const size = useContext(SizeContext);
  const itemKey = `itemSize${capitalize(size)}` as const;
  return (
    <BaseAutocomplete.Item
      ref={ref}
      {...props}
      className={(state) =>
        stylex.props(
          styles.item,
          styles[itemKey],
          state.highlighted && styles.itemHighlighted,
          state.disabled && styles.itemDisabled,
          sx,
        ).className ?? ''
      }
    />
  );
});
Item.displayName = 'Autocomplete.Item';

const Empty = forwardRef<HTMLDivElement, AutocompleteEmptyProps>(
  ({ children, sx, ...props }, ref) => {
    const size = useContext(SizeContext);
    const emptyKey = `emptySize${capitalize(size)}` as const;
    return (
      <BaseAutocomplete.Empty ref={ref} {...props}>
        <div {...stylex.props(styles.emptyInner, styles[emptyKey], sx)}>{children}</div>
      </BaseAutocomplete.Empty>
    );
  },
);
Empty.displayName = 'Autocomplete.Empty';

const Group = forwardRef<HTMLDivElement, AutocompleteGroupProps>(({ sx, ...props }, ref) => (
  <BaseAutocomplete.Group
    ref={ref}
    {...props}
    className={stylex.props(styles.group, sx).className ?? ''}
  />
));
Group.displayName = 'Autocomplete.Group';

const GroupLabel = forwardRef<HTMLDivElement, AutocompleteGroupLabelProps>(
  ({ sx, ...props }, ref) => {
    const size = useContext(SizeContext);
    const labelKey = `groupLabelSize${capitalize(size)}` as const;
    return (
      <BaseAutocomplete.GroupLabel
        ref={ref}
        {...props}
        className={stylex.props(styles.groupLabel, styles[labelKey], sx).className ?? ''}
      />
    );
  },
);
GroupLabel.displayName = 'Autocomplete.GroupLabel';

// --- Public API ---
export const Autocomplete = {
  Root,
  Input,
  Popup,
  Item,
  Empty,
  Group,
  GroupLabel,
};
