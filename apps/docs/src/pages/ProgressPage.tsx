import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { Progress } from '@basex-ui/components';
import type { ProgressColor, ProgressSize } from '@basex-ui/components';
import { Preview } from '../components/Preview';

const colors: ProgressColor[] = ['default', 'secondary', 'destructive'];
const sizes: ProgressSize[] = ['sm', 'md', 'lg'];

const pageStyles = stylex.create({
  stack: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space4,
    width: '100%',
  },
  labelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export function ProgressPage() {
  return (
    <>
      <Preview title="Basic progress" description="A simple progress bar with a label." constrained>
        <Progress.Root value={65}>
          <Progress.Label>Uploading...</Progress.Label>
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      </Preview>

      <Preview
        title="With value display"
        description="Progress bar showing the formatted value."
        constrained
      >
        <Progress.Root value={42}>
          <div {...stylex.props(pageStyles.labelRow)}>
            <Progress.Label>Processing</Progress.Label>
            <Progress.Value />
          </div>
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      </Preview>

      <Preview
        title="Colors"
        description="Default, secondary, and destructive indicator colors."
        constrained
      >
        <div {...stylex.props(pageStyles.stack)}>
          {colors.map((color, i) => (
            <Progress.Root key={color} value={30 + i * 30}>
              <Progress.Label>{color}</Progress.Label>
              <Progress.Track>
                <Progress.Indicator color={color} />
              </Progress.Track>
            </Progress.Root>
          ))}
        </div>
      </Preview>

      <Preview title="Sizes" description="Small, medium, and large track heights." constrained>
        <div {...stylex.props(pageStyles.stack)}>
          {sizes.map((size) => (
            <Progress.Root key={size} value={50}>
              <Progress.Label>{size}</Progress.Label>
              <Progress.Track size={size}>
                <Progress.Indicator />
              </Progress.Track>
            </Progress.Root>
          ))}
        </div>
      </Preview>

      <Preview
        title="Indeterminate"
        description="Animated progress bar for unknown duration tasks."
        constrained
      >
        <Progress.Root value={null}>
          <Progress.Label>Loading...</Progress.Label>
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      </Preview>
    </>
  );
}
