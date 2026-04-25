import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group';
import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { focusRing } from '@basex-ui/styles';
import { forwardRef } from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';

// --- Styles ---
// Group container styling matches Checkbox Group's flex layout pattern.
// Item button styling mirrors Button's outline/ghost variant (so when
// `Toggle` lands as a separate package, swapping `Item` to import the
// shared primitive produces visually identical output).
const styles = stylex.create({
  // Group
  group: {
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: tokens.space1,
    padding: tokens.space1,
    backgroundColor: tokens.colorMuted,
    borderRadius: tokens.radiusMd,
  },
  groupVertical: {
    flexDirection: 'column',
  },

  // Item — mirrors Button's outline/ghost contract (height, padding, font, focus, transitions)
  item: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.space2,
    height: '32px',
    paddingInline: tokens.space3,
    fontFamily: tokens.fontFamilySans,
    fontSize: tokens.fontSizeSm,
    fontWeight: tokens.fontWeightMedium,
    lineHeight: tokens.lineHeightTight,
    color: tokens.colorText,
    backgroundColor: {
      default: 'transparent',
      ':hover': tokens.colorBackground,
    },
    borderStyle: 'solid',
    borderWidth: tokens.borderWidthDefault,
    borderColor: 'transparent',
    borderRadius: tokens.radiusSm,
    cursor: 'pointer',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    flexShrink: 0,
    transitionProperty: 'background-color, color, border-color, box-shadow',
    transitionDuration: tokens.motionDurationFast,
    transitionTimingFunction: tokens.motionEaseOut,
  },
  itemPressed: {
    backgroundColor: tokens.colorBackground,
    color: tokens.colorText,
    borderColor: tokens.colorBorder,
  },
  itemDisabled: {
    color: tokens.colorTextMuted,
    borderColor: tokens.colorBorderMuted,
    cursor: 'not-allowed',
    backgroundColor: 'transparent',
  },
});

// --- Types ---
export type ToggleGroupOrientation = 'horizontal' | 'vertical';

// `type` mirrors Radix's API: 'single' (one or zero pressed) or 'multiple' (any combination).
// Internally maps to Base UI's `multiple` boolean.
export type ToggleGroupType = 'single' | 'multiple';

export interface ToggleGroupRootBaseProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseToggleGroup>,
  'className' | 'value' | 'defaultValue' | 'onValueChange' | 'multiple'
> {
  orientation?: ToggleGroupOrientation;
  sx?: StyleXStyles;
}

export interface ToggleGroupSingleProps extends ToggleGroupRootBaseProps {
  type?: 'single';
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
}

export interface ToggleGroupMultipleProps extends ToggleGroupRootBaseProps {
  type: 'multiple';
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

export type ToggleGroupRootProps = ToggleGroupSingleProps | ToggleGroupMultipleProps;

export interface ToggleGroupItemProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseToggle>,
  'className'
> {
  /** Unique value for this item within the group. Required. */
  value: string;
  sx?: StyleXStyles;
}

// --- Components ---

const Root = forwardRef<HTMLDivElement, ToggleGroupRootProps>((props, ref) => {
  // Erase the discriminated-union narrowing so we can normalise both shapes
  // to Base UI's array contract in a single code path.
  const {
    type = 'single',
    orientation = 'horizontal',
    value,
    defaultValue,
    onValueChange,
    sx,
    ...rest
  } = props as Omit<ToggleGroupRootBaseProps, 'orientation'> & {
    type?: ToggleGroupType;
    orientation?: ToggleGroupOrientation;
    value?: string | string[] | null;
    defaultValue?: string | string[] | null;
    onValueChange?: ((value: string | null) => void) | ((value: string[]) => void);
  };

  const multiple = type === 'multiple';

  const toArray = (v: string | string[] | null | undefined): string[] | undefined => {
    if (v === undefined) return undefined;
    if (Array.isArray(v)) return v;
    if (v === null || v === '') return [];
    return [v];
  };

  const normalisedValue = toArray(value);
  const normalisedDefault = toArray(defaultValue);

  const handleChange = onValueChange
    ? (next: string[]) => {
        if (multiple) {
          (onValueChange as (v: string[]) => void)(next);
        } else {
          (onValueChange as (v: string | null) => void)(next[0] ?? null);
        }
      }
    : undefined;

  return (
    <BaseToggleGroup
      ref={ref}
      // Base UI sets role="group" by default; for single-select we expose
      // radiogroup semantics so AT users hear "1 of N" announcements.
      role={multiple ? 'group' : 'radiogroup'}
      multiple={multiple}
      orientation={orientation}
      value={normalisedValue}
      defaultValue={normalisedDefault}
      onValueChange={handleChange}
      {...rest}
      className={
        stylex.props(styles.group, orientation === 'vertical' && styles.groupVertical, sx)
          .className ?? ''
      }
    />
  );
});
Root.displayName = 'ToggleGroup.Root';

const Item = forwardRef<HTMLButtonElement, ToggleGroupItemProps>(({ sx, ...props }, ref) => (
  <BaseToggle
    ref={ref}
    {...props}
    className={(state) =>
      `basex-toggle-group-item ${
        stylex.props(
          styles.item,
          state.pressed && styles.itemPressed,
          state.disabled && styles.itemDisabled,
          focusRing,
          sx,
        ).className ?? ''
      }`
    }
  />
));
Item.displayName = 'ToggleGroup.Item';

// --- Public API ---
export const ToggleGroup = { Root, Item };
