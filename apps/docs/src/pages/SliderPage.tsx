import { useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { Slider, Field } from '@basex-ui/components';
import { Preview } from '../components/Preview';

const pageStyles = stylex.create({
  stack: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space4,
    width: '100%',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: tokens.space3,
  },
  verticalRow: {
    display: 'flex',
    gap: tokens.space6,
    alignItems: 'flex-end',
    height: '180px',
  },
});

export function SliderPage() {
  const [value, setValue] = useState<number>(40);

  return (
    <>
      <Preview
        title="Basic"
        description="A single-value slider with a label."
        constrained
        code={`<Slider.Root defaultValue={40}>
  <Slider.Label>Volume</Slider.Label>
  <Slider.Control>
    <Slider.Track>
      <Slider.Indicator />
      <Slider.Thumb />
    </Slider.Track>
  </Slider.Control>
</Slider.Root>`}
      >
        <Slider.Root defaultValue={40}>
          <Slider.Label>Volume</Slider.Label>
          <Slider.Control>
            <Slider.Track>
              <Slider.Indicator />
              <Slider.Thumb />
            </Slider.Track>
          </Slider.Control>
        </Slider.Root>
      </Preview>

      <Preview
        title="Controlled with value"
        description="Render the live value alongside the slider."
        constrained
        code={`const [value, setValue] = useState(40);

<Slider.Root value={value} onValueChange={(v) => setValue(v as number)}>
  <Slider.Label>Brightness</Slider.Label>
  <Slider.Value />
  <Slider.Control>
    <Slider.Track>
      <Slider.Indicator />
      <Slider.Thumb />
    </Slider.Track>
  </Slider.Control>
</Slider.Root>`}
      >
        <Slider.Root value={value} onValueChange={(v) => setValue(v as number)}>
          <div {...stylex.props(pageStyles.row)}>
            <Slider.Label>Brightness</Slider.Label>
            <Slider.Value />
          </div>
          <Slider.Control>
            <Slider.Track>
              <Slider.Indicator />
              <Slider.Thumb />
            </Slider.Track>
          </Slider.Control>
        </Slider.Root>
      </Preview>

      <Preview
        title="Range (multi-value)"
        description="Two thumbs for picking a min/max bracket."
        constrained
        code={`<Slider.Root defaultValue={[25, 75]} minStepsBetweenValues={1}>
  <Slider.Label>Price range</Slider.Label>
  <Slider.Value />
  <Slider.Control>
    <Slider.Track>
      <Slider.Indicator />
      <Slider.Thumb index={0} />
      <Slider.Thumb index={1} />
    </Slider.Track>
  </Slider.Control>
</Slider.Root>`}
      >
        <Slider.Root defaultValue={[25, 75]} minStepsBetweenValues={1}>
          <div {...stylex.props(pageStyles.row)}>
            <Slider.Label>Price range</Slider.Label>
            <Slider.Value />
          </div>
          <Slider.Control>
            <Slider.Track>
              <Slider.Indicator />
              <Slider.Thumb index={0} />
              <Slider.Thumb index={1} />
            </Slider.Track>
          </Slider.Control>
        </Slider.Root>
      </Preview>

      <Preview
        title="Vertical"
        description="Fader-style vertical orientation."
        constrained
        code={`<Slider.Root orientation="vertical" defaultValue={60}>
  <Slider.Control>
    <Slider.Track>
      <Slider.Indicator />
      <Slider.Thumb />
    </Slider.Track>
  </Slider.Control>
</Slider.Root>`}
      >
        <div {...stylex.props(pageStyles.verticalRow)}>
          <Slider.Root orientation="vertical" defaultValue={30}>
            <Slider.Control>
              <Slider.Track>
                <Slider.Indicator />
                <Slider.Thumb />
              </Slider.Track>
            </Slider.Control>
          </Slider.Root>
          <Slider.Root orientation="vertical" defaultValue={60}>
            <Slider.Control>
              <Slider.Track>
                <Slider.Indicator />
                <Slider.Thumb />
              </Slider.Track>
            </Slider.Control>
          </Slider.Root>
          <Slider.Root orientation="vertical" defaultValue={85}>
            <Slider.Control>
              <Slider.Track>
                <Slider.Indicator />
                <Slider.Thumb />
              </Slider.Track>
            </Slider.Control>
          </Slider.Root>
        </div>
      </Preview>

      <Preview
        title="Inside a Field"
        description="Composes with Field for label, description, and validation messaging."
        constrained
        code={`<Field.Root>
  <Field.Label>Quality</Field.Label>
  <Slider.Root defaultValue={50}>
    <Slider.Control>
      <Slider.Track>
        <Slider.Indicator />
        <Slider.Thumb />
      </Slider.Track>
    </Slider.Control>
  </Slider.Root>
  <Field.Description>Lower values save bandwidth.</Field.Description>
</Field.Root>`}
      >
        <Field.Root>
          <Field.Label>Quality</Field.Label>
          <Slider.Root defaultValue={50}>
            <Slider.Control>
              <Slider.Track>
                <Slider.Indicator />
                <Slider.Thumb />
              </Slider.Track>
            </Slider.Control>
          </Slider.Root>
          <Field.Description>Lower values save bandwidth.</Field.Description>
        </Field.Root>
      </Preview>

      <Preview
        title="Disabled"
        description="Non-interactive state using muted tokens (no opacity)."
        constrained
        code={`<Slider.Root defaultValue={30} disabled>
  <Slider.Label>Locked</Slider.Label>
  <Slider.Control>
    <Slider.Track>
      <Slider.Indicator />
      <Slider.Thumb />
    </Slider.Track>
  </Slider.Control>
</Slider.Root>`}
      >
        <Slider.Root defaultValue={30} disabled>
          <Slider.Label>Locked</Slider.Label>
          <Slider.Control>
            <Slider.Track>
              <Slider.Indicator />
              <Slider.Thumb />
            </Slider.Track>
          </Slider.Control>
        </Slider.Root>
      </Preview>
    </>
  );
}
