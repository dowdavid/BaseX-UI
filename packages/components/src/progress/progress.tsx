import { Progress as BaseProgress } from '@base-ui/react/progress';
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
    backgroundColor: tokens.colorMuted,
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
export type ProgressSize = 'sm' | 'md' | 'lg';
export type ProgressColor = 'default' | 'secondary' | 'destructive';

export interface ProgressRootProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseProgress.Root>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface ProgressTrackProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseProgress.Track>,
  'className'
> {
  size?: ProgressSize;
  sx?: StyleXStyles;
}

export interface ProgressIndicatorProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseProgress.Indicator>,
  'className'
> {
  color?: ProgressColor;
  sx?: StyleXStyles;
}

export interface ProgressValueProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseProgress.Value>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface ProgressLabelProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseProgress.Label>,
  'className'
> {
  sx?: StyleXStyles;
}

// --- Components ---

const Root = forwardRef<HTMLDivElement, ProgressRootProps>(({ sx, ...props }, ref) => (
  <BaseProgress.Root ref={ref} {...props} className={stylex.props(styles.root, sx).className ?? ''} />
));
Root.displayName = 'Progress.Root';

const Label = forwardRef<HTMLLabelElement, ProgressLabelProps>(({ sx, ...props }, ref) => (
  <BaseProgress.Label
    ref={ref}
    {...props}
    className={stylex.props(styles.label, sx).className ?? ''}
  />
));
Label.displayName = 'Progress.Label';

const Track = forwardRef<HTMLDivElement, ProgressTrackProps>(({ size = 'md', sx, ...props }, ref) => {
  const sizeStyle =
    size === 'sm' ? styles.trackSizeSm : size === 'lg' ? styles.trackSizeLg : styles.trackSizeMd;
  return (
    <BaseProgress.Track
      ref={ref}
      {...props}
      className={stylex.props(styles.track, sizeStyle, sx).className ?? ''}
    />
  );
});
Track.displayName = 'Progress.Track';

const Indicator = forwardRef<HTMLDivElement, ProgressIndicatorProps>(
  ({ color = 'default', sx, ...props }, ref) => (
    <BaseProgress.Indicator
      ref={ref}
      {...props}
      className={
        `basex-progress-indicator ${stylex.props(
          styles.indicator,
          color === 'secondary' && styles.indicatorSecondary,
          color === 'destructive' && styles.indicatorDestructive,
          sx,
        ).className ?? ''}`
      }
    />
  ),
);
Indicator.displayName = 'Progress.Indicator';

const Value = forwardRef<HTMLSpanElement, ProgressValueProps>(({ sx, ...props }, ref) => (
  <BaseProgress.Value
    ref={ref}
    {...props}
    className={stylex.props(styles.value, sx).className ?? ''}
  />
));
Value.displayName = 'Progress.Value';

// --- Public API ---
export const Progress = { Root, Label, Track, Indicator, Value };
