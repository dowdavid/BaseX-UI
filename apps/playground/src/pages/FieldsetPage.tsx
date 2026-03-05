import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { Fieldset } from '@basex-ui/components';
import { Preview } from '../components/Preview';

const formStyles = stylex.create({
  label: {
    display: 'block',
    fontSize: tokens.fontSizeSm,
    fontWeight: tokens.fontWeightMedium,
    fontFamily: tokens.fontFamilySans,
    color: tokens.colorText,
    marginBottom: tokens.space1,
  },
  input: {
    width: '100%',
    padding: `${tokens.space2} ${tokens.space3}`,
    borderRadius: tokens.radiusMd,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tokens.colorBorder,
    fontSize: tokens.fontSizeSm,
    fontFamily: tokens.fontFamilySans,
    color: tokens.colorText,
    backgroundColor: tokens.colorBackground,
    boxSizing: 'border-box',
    outline: 'none',
  },
  fields: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space4,
  },
});

export function FieldsetPage() {
  return (
    <>
      <Preview
        title="Basic fieldset"
        description="Groups related fields with an accessible legend."
        constrained
      >
        <Fieldset.Root>
          <Fieldset.Legend>Personal information</Fieldset.Legend>
          <div {...stylex.props(formStyles.fields)}>
            <div>
              <label {...stylex.props(formStyles.label)}>First name</label>
              <input
                type="text"
                placeholder="John"
                {...stylex.props(formStyles.input)}
              />
            </div>
            <div>
              <label {...stylex.props(formStyles.label)}>Last name</label>
              <input
                type="text"
                placeholder="Doe"
                {...stylex.props(formStyles.input)}
              />
            </div>
            <div>
              <label {...stylex.props(formStyles.label)}>Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                {...stylex.props(formStyles.input)}
              />
            </div>
          </div>
        </Fieldset.Root>
      </Preview>

      <Preview
        title="Disabled fieldset"
        description="All child controls are disabled via the fieldset's disabled prop."
        constrained
      >
        <Fieldset.Root disabled>
          <Fieldset.Legend>Locked section</Fieldset.Legend>
          <div {...stylex.props(formStyles.fields)}>
            <div>
              <label {...stylex.props(formStyles.label)}>Email</label>
              <input
                type="email"
                value="locked@example.com"
                readOnly
                {...stylex.props(formStyles.input)}
              />
            </div>
            <div>
              <label {...stylex.props(formStyles.label)}>Role</label>
              <input
                type="text"
                value="Admin"
                readOnly
                {...stylex.props(formStyles.input)}
              />
            </div>
          </div>
        </Fieldset.Root>
      </Preview>

      <Preview
        title="Multiple groups"
        description="Multiple fieldsets organizing sections of a form."
        constrained
      >
        <div {...stylex.props(formStyles.fields)}>
          <Fieldset.Root>
            <Fieldset.Legend>Contact</Fieldset.Legend>
            <div {...stylex.props(formStyles.fields)}>
              <div>
                <label {...stylex.props(formStyles.label)}>Phone</label>
                <input
                  type="tel"
                  placeholder="+44 7700 900000"
                  {...stylex.props(formStyles.input)}
                />
              </div>
              <div>
                <label {...stylex.props(formStyles.label)}>Email</label>
                <input
                  type="email"
                  placeholder="contact@example.com"
                  {...stylex.props(formStyles.input)}
                />
              </div>
            </div>
          </Fieldset.Root>

          <Fieldset.Root>
            <Fieldset.Legend>Address</Fieldset.Legend>
            <div {...stylex.props(formStyles.fields)}>
              <div>
                <label {...stylex.props(formStyles.label)}>Street</label>
                <input
                  type="text"
                  placeholder="123 Main St"
                  {...stylex.props(formStyles.input)}
                />
              </div>
              <div>
                <label {...stylex.props(formStyles.label)}>City</label>
                <input
                  type="text"
                  placeholder="Forres"
                  {...stylex.props(formStyles.input)}
                />
              </div>
            </div>
          </Fieldset.Root>
        </div>
      </Preview>
    </>
  );
}
