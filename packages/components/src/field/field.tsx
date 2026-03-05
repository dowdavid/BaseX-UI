import { Field as BaseField } from '@base-ui/react/field';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { capitalize, focusRing } from '@basex-ui/styles';
import { forwardRef } from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';

// --- Styles ---
const styles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space1h,
    width: '100%',
  },

  label: {
    fontSize: tokens.fontSizeSm,
    fontWeight: tokens.fontWeightMedium,
    fontFamily: tokens.fontFamilySans,
    color: tokens.colorText,
    lineHeight: tokens.lineHeightNormal,
  },

  description: {
    fontSize: tokens.fontSizeSm,
    fontFamily: tokens.fontFamilySans,
    color: tokens.colorTextMuted,
    lineHeight: tokens.lineHeightNormal,
  },

  error: {
    fontSize: tokens.fontSizeSm,
    fontFamily: tokens.fontFamilySans,
    color: tokens.colorDestructive,
    lineHeight: tokens.lineHeightNormal,
  },

  control: {
    width: '100%',
    fontFamily: tokens.fontFamilySans,
    color: tokens.colorText,
    backgroundColor: 'transparent',
    borderWidth: tokens.borderWidthDefault,
    borderStyle: 'solid',
    borderColor: tokens.colorBorder,
    borderRadius: tokens.radiusMd,
    lineHeight: tokens.lineHeightNormal,
    '::placeholder': {
      color: tokens.colorTextPlaceholder,
    },
  },

  controlInvalid: {
    borderColor: tokens.colorDestructive,
  },

  controlDisabled: {
    opacity: 0.64,
    pointerEvents: 'none',
    cursor: 'default',
  },

  // --- Size axis ---
  controlSizeSm: {
    height: '32px',
    paddingInline: tokens.space2h,
    fontSize: tokens.fontSizeSm,
  },
  controlSizeMd: {
    height: '36px',
    paddingInline: tokens.space3,
    fontSize: tokens.fontSizeSm,
  },
  controlSizeLg: {
    height: '40px',
    paddingInline: tokens.space3h,
    fontSize: tokens.fontSizeMd,
  },
});

// --- Types ---
export type FieldControlSize = 'sm' | 'md' | 'lg';

export interface FieldRootProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseField.Root>, 'className'> {
  sx?: StyleXStyles;
}

export interface FieldLabelProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseField.Label>, 'className'> {
  sx?: StyleXStyles;
}

export interface FieldDescriptionProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseField.Description>, 'className'> {
  sx?: StyleXStyles;
}

export interface FieldErrorProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseField.Error>, 'className'> {
  sx?: StyleXStyles;
}

export interface FieldControlProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseField.Control>, 'className'> {
  size?: FieldControlSize;
  sx?: StyleXStyles;
}

export interface FieldValidityProps
  extends React.ComponentPropsWithoutRef<typeof BaseField.Validity> {}

// --- Components ---

const Root = forwardRef<HTMLDivElement, FieldRootProps>(({ sx, ...props }, ref) => (
  <BaseField.Root
    ref={ref}
    {...props}
    className={stylex.props(styles.root, sx).className ?? ''}
  />
));
Root.displayName = 'Field.Root';

const Label = forwardRef<HTMLLabelElement, FieldLabelProps>(({ sx, ...props }, ref) => (
  <BaseField.Label
    ref={ref}
    {...props}
    className={stylex.props(styles.label, sx).className ?? ''}
  />
));
Label.displayName = 'Field.Label';

const Description = forwardRef<HTMLParagraphElement, FieldDescriptionProps>(
  ({ sx, ...props }, ref) => (
    <BaseField.Description
      ref={ref}
      {...props}
      className={stylex.props(styles.description, sx).className ?? ''}
    />
  ),
);
Description.displayName = 'Field.Description';

const Error = forwardRef<HTMLDivElement, FieldErrorProps>(({ sx, ...props }, ref) => (
  <BaseField.Error
    ref={ref}
    {...props}
    className={stylex.props(styles.error, sx).className ?? ''}
  />
));
Error.displayName = 'Field.Error';

const Control = forwardRef<HTMLInputElement, FieldControlProps>(
  ({ size = 'md', sx, ...props }, ref) => {
    const sizeKey = `controlSize${capitalize(size)}` as const;

    return (
      <BaseField.Control
        ref={ref}
        {...props}
        className={(state) =>
          stylex.props(
            styles.control,
            focusRing,
            styles[sizeKey as keyof typeof styles],
            state.valid === false && styles.controlInvalid,
            state.disabled && styles.controlDisabled,
            sx,
          ).className ?? ''
        }
      />
    );
  },
);
Control.displayName = 'Field.Control';

const Validity = (props: FieldValidityProps) => <BaseField.Validity {...props} />;
Validity.displayName = 'Field.Validity';

// --- Public API ---
export const Field = { Root, Label, Description, Error, Control, Validity };
