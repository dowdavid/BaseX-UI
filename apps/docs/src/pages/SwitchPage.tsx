import * as stylex from '@stylexjs/stylex';
import { Switch, Field, Form } from '@basex-ui/components';
import { tokens } from '@basex-ui/tokens';
import { Preview } from '../components/Preview';

const pageStyles = stylex.create({
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.space2,
    fontFamily: tokens.fontFamilySans,
    fontSize: tokens.fontSizeSm,
    color: tokens.colorText,
    cursor: 'pointer',
    userSelect: 'none',
  },
  group: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space3,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space3,
  },
});

export function SwitchPage() {
  return (
    <>
      <Preview
        title="Basic"
        description="A simple switch with a label. Click the switch or label to toggle. Press Space or Enter when focused."
        code={`<label>
  <Switch.Root defaultChecked>
    <Switch.Thumb />
  </Switch.Root>
  Enable notifications
</label>`}
      >
        <label {...stylex.props(pageStyles.label)}>
          <Switch.Root defaultChecked>
            <Switch.Thumb />
          </Switch.Root>
          Enable notifications
        </label>
      </Preview>

      <Preview
        title="Disabled"
        description="Disabled switches show reduced opacity and ignore interaction."
        code={`<Switch.Root disabled defaultChecked>
  <Switch.Thumb />
</Switch.Root>`}
      >
        <div {...stylex.props(pageStyles.group)}>
          <label {...stylex.props(pageStyles.label)}>
            <Switch.Root disabled>
              <Switch.Thumb />
            </Switch.Root>
            Off, disabled
          </label>
          <label {...stylex.props(pageStyles.label)}>
            <Switch.Root disabled defaultChecked>
              <Switch.Thumb />
            </Switch.Root>
            On, disabled
          </label>
        </div>
      </Preview>

      <Preview
        title="With Field"
        description="Wrap in a Field to attach a label and description with proper accessibility wiring."
        code={`<Field.Root>
  <Field.Label>Email notifications</Field.Label>
  <Switch.Root name="notifications">
    <Switch.Thumb />
  </Switch.Root>
  <Field.Description>Receive a weekly digest.</Field.Description>
</Field.Root>`}
      >
        <Field.Root>
          <Field.Label>Email notifications</Field.Label>
          <Switch.Root name="notifications">
            <Switch.Thumb />
          </Switch.Root>
          <Field.Description>Receive a weekly digest.</Field.Description>
        </Field.Root>
      </Preview>

      <Preview
        title="In a Form"
        description="Switch integrates with form submission via a hidden input. Provide a name and value."
        code={`<Form onSubmit={(e) => e.preventDefault()}>
  <Field.Root name="marketing">
    <Field.Label>Marketing emails</Field.Label>
    <Switch.Root name="marketing" value="yes">
      <Switch.Thumb />
    </Switch.Root>
  </Field.Root>
  <button type="submit">Save</button>
</Form>`}
      >
        <Form
          {...stylex.props(pageStyles.form)}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Field.Root name="marketing">
            <Field.Label>Marketing emails</Field.Label>
            <Switch.Root name="marketing" value="yes">
              <Switch.Thumb />
            </Switch.Root>
          </Field.Root>
        </Form>
      </Preview>
    </>
  );
}
