import { Meter as BaseMeter } from '@base-ui/react/meter';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
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

  track: {
    position: 'relative',
    width: '100%',
    height: '8px',
    backgroundColor: tokens.colorTrack,
    borderRadius: tokens.radiusFull,
    overflow: 'hidden',
  },

  trackSizeSm: {
    height: '4px',
  },
  trackSizeMd: {
    height: '8px',
  },
  trackSizeLg: {
    height: '12px',
  },

  indicator: {
    height: '100%',
    backgroundColor: tokens.colorPrimary,
    borderRadius: tokens.radiusFull,
    transitionProperty: 'width',
    transitionDuration: tokens.motionDurationNormal,
    transitionTimingFunction: tokens.motionEaseInOut,
  },

  indicatorSecondary: {
    backgroundColor: tokens.colorSecondary,
  },

  indicatorDestructive: {
    backgroundColor: tokens.colorDestructive,
  },

  value: {
    fontSize: tokens.fontSizeSm,
    fontFamily: tokens.fontFamilySans,
    color: tokens.colorTextMuted,
    lineHeight: tokens.lineHeightNormal,
  },
});

// --- Types ---
export type MeterSize = 'sm' | 'md' | 'lg';
export type MeterColor = 'default' | 'secondary' | 'destructive';

export interface MeterRootProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseMeter.Root>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface MeterTrackProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseMeter.Track>,
  'className'
> {
  size?: MeterSize;
  sx?: StyleXStyles;
}

export interface MeterIndicatorProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseMeter.Indicator>,
  'className'
> {
  color?: MeterColor;
  sx?: StyleXStyles;
}

export interface MeterValueProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseMeter.Value>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface MeterLabelProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseMeter.Label>,
  'className'
> {
  sx?: StyleXStyles;
}

// --- Components ---

const Root = forwardRef<HTMLDivElement, MeterRootProps>(({ sx, ...props }, ref) => (
  <BaseMeter.Root ref={ref} {...props} className={stylex.props(styles.root, sx).className ?? ''} />
));
Root.displayName = 'Meter.Root';

const Label = forwardRef<HTMLLabelElement, MeterLabelProps>(({ sx, ...props }, ref) => (
  <BaseMeter.Label
    ref={ref}
    {...props}
    className={stylex.props(styles.label, sx).className ?? ''}
  />
));
Label.displayName = 'Meter.Label';

const Track = forwardRef<HTMLDivElement, MeterTrackProps>(({ size = 'md', sx, ...props }, ref) => {
  const sizeStyle =
    size === 'sm' ? styles.trackSizeSm : size === 'lg' ? styles.trackSizeLg : styles.trackSizeMd;
  return (
    <BaseMeter.Track
      ref={ref}
      {...props}
      className={stylex.props(styles.track, sizeStyle, sx).className ?? ''}
    />
  );
});
Track.displayName = 'Meter.Track';

const Indicator = forwardRef<HTMLDivElement, MeterIndicatorProps>(
  ({ color = 'default', sx, ...props }, ref) => (
    <BaseMeter.Indicator
      ref={ref}
      {...props}
      className={
        stylex.props(
          styles.indicator,
          color === 'secondary' && styles.indicatorSecondary,
          color === 'destructive' && styles.indicatorDestructive,
          sx,
        ).className ?? ''
      }
    />
  ),
);
Indicator.displayName = 'Meter.Indicator';

const Value = forwardRef<HTMLSpanElement, MeterValueProps>(({ sx, ...props }, ref) => (
  <BaseMeter.Value
    ref={ref}
    {...props}
    className={stylex.props(styles.value, sx).className ?? ''}
  />
));
Value.displayName = 'Meter.Value';

// --- Public API ---
export const Meter = { Root, Label, Track, Indicator, Value };
