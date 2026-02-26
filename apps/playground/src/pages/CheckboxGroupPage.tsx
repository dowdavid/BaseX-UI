import { useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { Checkbox, CheckboxGroup } from '@basex-ui/components';
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
});

const fruits = ['apples', 'bananas', 'cherries'];

export function CheckboxGroupPage() {
  const [value, setValue] = useState<string[]>(['apples']);
  const [parentValue, setParentValue] = useState<string[]>([]);

  return (
    <>
      <Preview
        title="Basic group"
        description="Three checkboxes sharing state via CheckboxGroup."
      >
        <CheckboxGroup.Root value={value} onValueChange={setValue}>
          <label {...stylex.props(labelStyles.label)}>
            <Checkbox.Root name="apples">
              <Checkbox.Indicator />
            </Checkbox.Root>
            Apples
          </label>
          <label {...stylex.props(labelStyles.label)}>
            <Checkbox.Root name="bananas">
              <Checkbox.Indicator />
            </Checkbox.Root>
            Bananas
          </label>
          <label {...stylex.props(labelStyles.label)}>
            <Checkbox.Root name="cherries">
              <Checkbox.Indicator />
            </Checkbox.Root>
            Cherries
          </label>
        </CheckboxGroup.Root>
      </Preview>

      <Preview
        title="Select all"
        description="A parent checkbox auto-derives checked/indeterminate state from children."
      >
        <div>
          <CheckboxGroup.Root allValues={fruits} value={parentValue} onValueChange={setParentValue}>
            <label {...stylex.props(labelStyles.label)}>
              <Checkbox.Root parent>
                <Checkbox.Indicator />
              </Checkbox.Root>
              Select all
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingLeft: 24 }}>
              {fruits.map((fruit) => (
                <label key={fruit} {...stylex.props(labelStyles.label)}>
                  <Checkbox.Root name={fruit}>
                    <Checkbox.Indicator />
                  </Checkbox.Root>
                  {fruit.charAt(0).toUpperCase() + fruit.slice(1)}
                </label>
              ))}
            </div>
          </CheckboxGroup.Root>
        </div>
      </Preview>

      <Preview
        title="Disabled group"
        description="Set disabled on the Root to prevent all interaction."
      >
        <CheckboxGroup.Root disabled defaultValue={['email']}>
          <label {...stylex.props(labelStyles.label, labelStyles.disabled)}>
            <Checkbox.Root name="email">
              <Checkbox.Indicator />
            </Checkbox.Root>
            Email notifications
          </label>
          <label {...stylex.props(labelStyles.label, labelStyles.disabled)}>
            <Checkbox.Root name="sms">
              <Checkbox.Indicator />
            </Checkbox.Root>
            SMS notifications
          </label>
          <label {...stylex.props(labelStyles.label, labelStyles.disabled)}>
            <Checkbox.Root name="push">
              <Checkbox.Indicator />
            </Checkbox.Root>
            Push notifications
          </label>
        </CheckboxGroup.Root>
      </Preview>
    </>
  );
}
