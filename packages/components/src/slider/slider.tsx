import { Slider as BaseSlider } from '@base-ui/react/slider';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { focusRing } from '@basex-ui/styles';
import { forwardRef } from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';

// --- Styles ---
// Track height (8px) and indicator color come from Progress/Meter conventions
// so the visual language stays unified across feedback + input range components.
// Thumb size (20px) overhangs the 8px track on each side so the handle reads
// as a clearly grabbable button. Filled with colorPrimary and defined by a
// 1px inset edge in colorBorder (neutral grey) — this gives the thumb a crisp
// outline against both the orange indicator AND the white page surface, where
// shadowMd alone was too faint to register. shadowMd is layered underneath for
// subtle elevation; the focus ring utility from @basex-ui/styles is reused for
// keyboard focus parity.
const styles = stylex.create({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space1h,
    width: '100%',
    touchAction: 'none',
    // Vertical orientation
    ':is([data-orientation="vertical"])': {
      height: '160px',
      width: 'auto',
    },
  },

  rootDisabled: {
    cursor: 'not-allowed',
  },

  label: {
    fontSize: tokens.fontSizeSm,
    fontWeight: tokens.fontWeightMedium,
    fontFamily: tokens.fontFamilySans,
    color: tokens.colorText,
    lineHeight: tokens.lineHeightNormal,
  },

  value: {
    fontSize: tokens.fontSizeSm,
    fontFamily: tokens.fontFamilySans,
    color: tokens.colorTextMuted,
    lineHeight: tokens.lineHeightNormal,
  },

  control: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '20px',
    cursor: 'pointer',
    userSelect: 'none',
    touchAction: 'none',
    // Vertical orientation
    ':is([data-orientation="vertical"])': {
      height: '100%',
      width: '20px',
      flexDirection: 'column',
    },
  },

  controlDisabled: {
    cursor: 'not-allowed',
  },

  track: {
    position: 'relative',
    width: '100%',
    height: '8px',
    backgroundColor: tokens.colorTrack,
    borderRadius: tokens.radiusFull,
    overflow: 'visible',
    ':is([data-orientation="vertical"])': {
      width: '8px',
      height: '100%',
    },
  },

  trackSizeSm: {
    height: '4px',
    ':is([data-orientation="vertical"])': {
      width: '4px',
      height: '100%',
    },
  },
  trackSizeMd: {
    height: '8px',
    ':is([data-orientation="vertical"])': {
      width: '8px',
      height: '100%',
    },
  },
  trackSizeLg: {
    height: '12px',
    ':is([data-orientation="vertical"])': {
      width: '12px',
      height: '100%',
    },
  },

  indicator: {
    position: 'absolute',
    backgroundColor: tokens.colorPrimary,
    borderRadius: tokens.radiusFull,
    transitionProperty: 'background-color',
    transitionDuration: tokens.motionDurationFast,
    transitionTimingFunction: tokens.motionEaseOut,
  },

  indicatorSecondary: {
    backgroundColor: tokens.colorSecondary,
  },

  indicatorDestructive: {
    backgroundColor: tokens.colorDestructive,
  },

  indicatorDisabled: {
    backgroundColor: tokens.colorBorderMuted,
  },

  thumb: {
    display: 'block',
    boxSizing: 'border-box',
    width: '20px',
    height: '20px',
    backgroundColor: tokens.colorPrimary,
    borderRadius: tokens.radiusSm,
    boxShadow: `inset 0 0 0 1px ${tokens.colorBorder}, ${tokens.shadowMd}`,
    cursor: 'grab',
    transitionProperty: 'box-shadow, transform',
    transitionDuration: tokens.motionDurationFast,
    transitionTimingFunction: tokens.motionEaseOut,
    ':hover': {
      '@media (hover: hover) and (pointer: fine)': {
        boxShadow: `inset 0 0 0 1px ${tokens.colorBorder}, ${tokens.shadowMd}, 0 0 0 4px ${tokens.colorMuted}`,
      },
    },
    ':active': {
      cursor: 'grabbing',
    },
  },

  thumbSecondary: {},

  thumbDestructive: {},

  thumbDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});

// --- Types ---
export type SliderSize = 'sm' | 'md' | 'lg';
export type SliderColor = 'default' | 'secondary' | 'destructive';

export interface SliderRootProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseSlider.Root>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface SliderValueProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseSlider.Value>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface SliderControlProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseSlider.Control>,
  'className'
> {
  sx?: StyleXStyles;
}

export interface SliderTrackProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseSlider.Track>,
  'className'
> {
  size?: SliderSize;
  sx?: StyleXStyles;
}

export interface SliderIndicatorProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseSlider.Indicator>,
  'className'
> {
  color?: SliderColor;
  sx?: StyleXStyles;
}

export interface SliderThumbProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseSlider.Thumb>,
  'className'
> {
  color?: SliderColor;
  sx?: StyleXStyles;
}

export interface SliderLabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  sx?: StyleXStyles;
}

// --- Components ---

const Root = forwardRef<HTMLDivElement, SliderRootProps>(({ sx, ...props }, ref) => (
  <BaseSlider.Root
    ref={ref}
    {...props}
    className={`basex-slider-root ${
      stylex.props(styles.root, props.disabled && styles.rootDisabled, sx).className ?? ''
    }`}
  />
));
Root.displayName = 'Slider.Root';

const Label = forwardRef<HTMLLabelElement, SliderLabelProps>(({ sx, ...props }, ref) => (
  <label ref={ref} {...props} className={stylex.props(styles.label, sx).className ?? ''} />
));
Label.displayName = 'Slider.Label';

const Value = forwardRef<HTMLOutputElement, SliderValueProps>(({ sx, ...props }, ref) => (
  <BaseSlider.Value
    ref={ref}
    {...props}
    className={stylex.props(styles.value, sx).className ?? ''}
  />
));
Value.displayName = 'Slider.Value';

const Control = forwardRef<HTMLDivElement, SliderControlProps>(({ sx, ...props }, ref) => (
  <BaseSlider.Control
    ref={ref}
    {...props}
    className={`basex-slider-control ${stylex.props(styles.control, sx).className ?? ''}`}
  />
));
Control.displayName = 'Slider.Control';

const Track = forwardRef<HTMLDivElement, SliderTrackProps>(({ size = 'md', sx, ...props }, ref) => {
  const sizeStyle =
    size === 'sm' ? styles.trackSizeSm : size === 'lg' ? styles.trackSizeLg : styles.trackSizeMd;
  return (
    <BaseSlider.Track
      ref={ref}
      {...props}
      className={`basex-slider-track ${stylex.props(styles.track, sizeStyle, sx).className ?? ''}`}
    />
  );
});
Track.displayName = 'Slider.Track';

const Indicator = forwardRef<HTMLDivElement, SliderIndicatorProps>(
  ({ color = 'default', sx, ...props }, ref) => (
    <BaseSlider.Indicator
      ref={ref}
      {...props}
      className={`basex-slider-indicator ${
        stylex.props(
          styles.indicator,
          color === 'secondary' && styles.indicatorSecondary,
          color === 'destructive' && styles.indicatorDestructive,
          sx,
        ).className ?? ''
      }`}
    />
  ),
);
Indicator.displayName = 'Slider.Indicator';

const Thumb = forwardRef<HTMLDivElement, SliderThumbProps>(
  ({ color = 'default', sx, ...props }, ref) => (
    <BaseSlider.Thumb
      ref={ref}
      {...props}
      className={`basex-slider-thumb ${
        stylex.props(
          styles.thumb,
          color === 'secondary' && styles.thumbSecondary,
          color === 'destructive' && styles.thumbDestructive,
          focusRing,
          sx,
        ).className ?? ''
      }`}
    />
  ),
);
Thumb.displayName = 'Slider.Thumb';

// --- Public API ---
export const Slider = { Root, Label, Value, Control, Track, Indicator, Thumb };
