import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { Radio } from '@basex-ui/components';
import { Preview } from '../components/Preview';

const pageStyles = stylex.create({
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.space2,
    fontSize: tokens.fontSizeSm,
    fontFamily: tokens.fontFamilySans,
    color: tokens.colorText,
    cursor: 'pointer',
  },
  labelDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});

export function RadioPage() {
  return (
    <>
      <Preview title="Basic" description="A vertical radio group with three options." code={`<Radio.Group defaultValue="apple">
  <label>
    <Radio.Root value="apple"><Radio.Indicator /></Radio.Root>
    Apple
  </label>
  <label>
    <Radio.Root value="banana"><Radio.Indicator /></Radio.Root>
    Banana
  </label>
</Radio.Group>`}>
        <Radio.Group defaultValue="apple">
          <label {...stylex.props(pageStyles.label)}>
            <Radio.Root value="apple">
              <Radio.Indicator />
            </Radio.Root>
            Apple
          </label>
          <label {...stylex.props(pageStyles.label)}>
            <Radio.Root value="banana">
              <Radio.Indicator />
            </Radio.Root>
            Banana
          </label>
          <label {...stylex.props(pageStyles.label)}>
            <Radio.Root value="cherry">
              <Radio.Indicator />
            </Radio.Root>
            Cherry
          </label>
        </Radio.Group>
      </Preview>

      <Preview title="Horizontal" description="Radio group in a horizontal layout." code={`<Radio.Group defaultValue="left" orientation="horizontal">
  <label><Radio.Root value="left"><Radio.Indicator /></Radio.Root> Left</label>
  <label><Radio.Root value="center"><Radio.Indicator /></Radio.Root> Center</label>
</Radio.Group>`}>
        <Radio.Group defaultValue="left" orientation="horizontal">
          <label {...stylex.props(pageStyles.label)}>
            <Radio.Root value="left">
              <Radio.Indicator />
            </Radio.Root>
            Left
          </label>
          <label {...stylex.props(pageStyles.label)}>
            <Radio.Root value="center">
              <Radio.Indicator />
            </Radio.Root>
            Center
          </label>
          <label {...stylex.props(pageStyles.label)}>
            <Radio.Root value="right">
              <Radio.Indicator />
            </Radio.Root>
            Right
          </label>
        </Radio.Group>
      </Preview>

      <Preview title="Disabled" description="A disabled radio group." code={`<Radio.Group defaultValue="standard" disabled>
  <label><Radio.Root value="standard"><Radio.Indicator /></Radio.Root> Standard</label>
  <label><Radio.Root value="express"><Radio.Indicator /></Radio.Root> Express</label>
</Radio.Group>`}>
        <Radio.Group defaultValue="standard" disabled>
          <label {...stylex.props(pageStyles.label, pageStyles.labelDisabled)}>
            <Radio.Root value="standard">
              <Radio.Indicator />
            </Radio.Root>
            Standard
          </label>
          <label {...stylex.props(pageStyles.label, pageStyles.labelDisabled)}>
            <Radio.Root value="express">
              <Radio.Indicator />
            </Radio.Root>
            Express
          </label>
        </Radio.Group>
      </Preview>
    </>
  );
}
