import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { NumberField } from '@basex-ui/components';
import type { NumberFieldSize } from '@basex-ui/components';
import { Preview } from '../components/Preview';

const sizes: NumberFieldSize[] = ['sm', 'md', 'lg'];

const pageStyles = stylex.create({
  stack: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space4,
    width: '100%',
  },
});

export function NumberFieldPage() {
  return (
    <>
      <Preview
        title="Basic"
        description="A simple number field with a default value."
        constrained
        code={`<NumberField.Root defaultValue={5}>
  <NumberField.Group>
    <NumberField.Decrement />
    <NumberField.Input />
    <NumberField.Increment />
  </NumberField.Group>
</NumberField.Root>`}
      >
        <NumberField.Root defaultValue={5}>
          <NumberField.Group>
            <NumberField.Decrement />
            <NumberField.Input />
            <NumberField.Increment />
          </NumberField.Group>
        </NumberField.Root>
      </Preview>

      <Preview
        title="With constraints"
        description="Number field with min, max, and step."
        constrained
        code={`<NumberField.Root defaultValue={0} min={0} max={100} step={5}>
  <NumberField.Group>
    <NumberField.Decrement />
    <NumberField.Input />
    <NumberField.Increment />
  </NumberField.Group>
</NumberField.Root>`}
      >
        <NumberField.Root defaultValue={0} min={0} max={100} step={5}>
          <NumberField.Group>
            <NumberField.Decrement />
            <NumberField.Input />
            <NumberField.Increment />
          </NumberField.Group>
        </NumberField.Root>
      </Preview>

      <Preview
        title="Sizes"
        description="Small, medium, and large group heights."
        constrained
        code={`<NumberField.Root defaultValue={1}>
  <NumberField.Group size="sm">
    <NumberField.Decrement />
    <NumberField.Input />
    <NumberField.Increment />
  </NumberField.Group>
</NumberField.Root>`}
      >
        <div {...stylex.props(pageStyles.stack)}>
          {sizes.map((size) => (
            <NumberField.Root key={size} defaultValue={1}>
              <NumberField.Group size={size}>
                <NumberField.Decrement />
                <NumberField.Input />
                <NumberField.Increment />
              </NumberField.Group>
            </NumberField.Root>
          ))}
        </div>
      </Preview>

      <Preview
        title="Disabled"
        description="A disabled number field."
        constrained
        code={`<NumberField.Root defaultValue={3} disabled>
  <NumberField.Group disabled>
    <NumberField.Decrement />
    <NumberField.Input />
    <NumberField.Increment />
  </NumberField.Group>
</NumberField.Root>`}
      >
        <NumberField.Root defaultValue={3} disabled>
          <NumberField.Group disabled>
            <NumberField.Decrement />
            <NumberField.Input />
            <NumberField.Increment />
          </NumberField.Group>
        </NumberField.Root>
      </Preview>
    </>
  );
}
