import * as stylex from '@stylexjs/stylex';
import { Checkbox } from '@basex-ui/components';
import { tokens } from '@basex-ui/tokens';
import { Preview } from '../components/Preview';

const labelStyles = stylex.create({
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.space2,
    cursor: 'pointer',
    fontFamily: tokens.fontFamilySans,
    fontSize: tokens.fontSizeSm,
    color: tokens.colorText,
    userSelect: 'none',
  },
  disabled: {
    opacity: 0.64,
    cursor: 'default',
  },
  group: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space3,
  },
});

export function CheckboxPage() {
  return (
    <>
      <Preview
        title="Basic checkbox"
        description="A simple checkbox with a label. Click the label or the checkbox to toggle."
      >
        <label {...stylex.props(labelStyles.label)}>
          <Checkbox.Root defaultChecked>
            <Checkbox.Indicator />
          </Checkbox.Root>
          Enable notifications
        </label>
      </Preview>

      <Preview
        title="Disabled"
        description="Disabled checkboxes show reduced opacity and prevent interaction."
      >
        <div {...stylex.props(labelStyles.group)}>
          <label {...stylex.props(labelStyles.label, labelStyles.disabled)}>
            <Checkbox.Root disabled>
              <Checkbox.Indicator />
            </Checkbox.Root>
            Unchecked disabled
          </label>
          <label {...stylex.props(labelStyles.label, labelStyles.disabled)}>
            <Checkbox.Root disabled defaultChecked>
              <Checkbox.Indicator />
            </Checkbox.Root>
            Checked disabled
          </label>
        </div>
      </Preview>
    </>
  );
}
