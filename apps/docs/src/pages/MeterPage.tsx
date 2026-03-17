import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { Meter } from '@basex-ui/components';
import type { MeterColor, MeterSize } from '@basex-ui/components';
import { Preview } from '../components/Preview';

const colors: MeterColor[] = ['default', 'secondary', 'destructive'];
const sizes: MeterSize[] = ['sm', 'md', 'lg'];

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

export function MeterPage() {
  return (
    <>
      <Preview
        title="Basic meter"
        description="A simple meter with a label."
        constrained
        code={`<Meter.Root value={65}>
  <Meter.Label>Storage used</Meter.Label>
  <Meter.Track>
    <Meter.Indicator />
  </Meter.Track>
</Meter.Root>`}
      >
        <Meter.Root value={65}>
          <Meter.Label>Storage used</Meter.Label>
          <Meter.Track>
            <Meter.Indicator />
          </Meter.Track>
        </Meter.Root>
      </Preview>

      <Preview
        title="With value display"
        description="Meter showing the formatted value alongside the bar."
        constrained
        code={`<Meter.Root value={42}>
  <Meter.Label>Upload progress</Meter.Label>
  <Meter.Value />
  <Meter.Track>
    <Meter.Indicator />
  </Meter.Track>
</Meter.Root>`}
      >
        <Meter.Root value={42}>
          <div {...stylex.props(pageStyles.labelRow)}>
            <Meter.Label>Upload progress</Meter.Label>
            <Meter.Value />
          </div>
          <Meter.Track>
            <Meter.Indicator />
          </Meter.Track>
        </Meter.Root>
      </Preview>

      <Preview
        title="Colors"
        description="Default, secondary, and destructive indicator colors."
        constrained
        code={`<Meter.Root value={60}>
  <Meter.Track>
    <Meter.Indicator color="default" />
  </Meter.Track>
</Meter.Root>
<Meter.Root value={60}>
  <Meter.Track>
    <Meter.Indicator color="destructive" />
  </Meter.Track>
</Meter.Root>`}
      >
        <div {...stylex.props(pageStyles.stack)}>
          {colors.map((color, i) => (
            <Meter.Root key={color} value={30 + i * 30}>
              <Meter.Label>{color}</Meter.Label>
              <Meter.Track>
                <Meter.Indicator color={color} />
              </Meter.Track>
            </Meter.Root>
          ))}
        </div>
      </Preview>

      <Preview
        title="Sizes"
        description="Small, medium, and large track heights."
        constrained
        code={`<Meter.Root value={50}>
  <Meter.Track size="sm">
    <Meter.Indicator />
  </Meter.Track>
</Meter.Root>
<Meter.Root value={50}>
  <Meter.Track size="lg">
    <Meter.Indicator />
  </Meter.Track>
</Meter.Root>`}
      >
        <div {...stylex.props(pageStyles.stack)}>
          {sizes.map((size) => (
            <Meter.Root key={size} value={50}>
              <Meter.Label>{size}</Meter.Label>
              <Meter.Track size={size}>
                <Meter.Indicator />
              </Meter.Track>
            </Meter.Root>
          ))}
        </div>
      </Preview>
    </>
  );
}
