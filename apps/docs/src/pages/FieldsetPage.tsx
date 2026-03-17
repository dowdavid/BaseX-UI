import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { Fieldset, Field, Form } from '@basex-ui/components';
import { Preview } from '../components/Preview';

const pageStyles = stylex.create({
  sectionForm: {
    gap: tokens.space8,
  },
});

export function FieldsetPage() {
  return (
    <>
      <Preview
        title="Basic fieldset"
        description="Groups related fields with an accessible legend."
        constrained
        code={`<Fieldset.Root>
  <Fieldset.Legend>Personal information</Fieldset.Legend>
  <Field.Root>
    <Field.Label>First name</Field.Label>
    <Field.Control placeholder="John" />
  </Field.Root>
  <Field.Root>
    <Field.Label>Last name</Field.Label>
    <Field.Control placeholder="Doe" />
  </Field.Root>
</Fieldset.Root>`}
      >
        <Fieldset.Root>
          <Fieldset.Legend>Personal information</Fieldset.Legend>
          <Field.Root>
            <Field.Label>First name</Field.Label>
            <Field.Control placeholder="John" />
          </Field.Root>
          <Field.Root>
            <Field.Label>Last name</Field.Label>
            <Field.Control placeholder="Doe" />
          </Field.Root>
          <Field.Root>
            <Field.Label>Email</Field.Label>
            <Field.Control type="email" placeholder="john@example.com" />
          </Field.Root>
        </Fieldset.Root>
      </Preview>

      <Preview
        title="Disabled fieldset"
        description="All child controls are disabled via the fieldset's disabled prop."
        constrained
        code={`<Fieldset.Root disabled>
  <Fieldset.Legend>Locked section</Fieldset.Legend>
  <Field.Root>
    <Field.Label>Email</Field.Label>
    <Field.Control value="locked@example.com" />
  </Field.Root>
</Fieldset.Root>`}
      >
        <Fieldset.Root disabled>
          <Fieldset.Legend>Locked section</Fieldset.Legend>
          <Field.Root>
            <Field.Label>Email</Field.Label>
            <Field.Control value="locked@example.com" />
            <Field.Description>This field is locked.</Field.Description>
          </Field.Root>
          <Field.Root>
            <Field.Label>Role</Field.Label>
            <Field.Control value="Admin" />
            <Field.Description>This field is locked.</Field.Description>
          </Field.Root>
        </Fieldset.Root>
      </Preview>

      <Preview
        title="Multiple groups"
        description="Multiple fieldsets organizing sections of a form."
        constrained
        code={`<Form>
  <Fieldset.Root>
    <Fieldset.Legend>Contact</Fieldset.Legend>
    <Field.Root>
      <Field.Label>Phone</Field.Label>
      <Field.Control type="tel" />
    </Field.Root>
  </Fieldset.Root>
  <Fieldset.Root>
    <Fieldset.Legend>Address</Fieldset.Legend>
    <Field.Root>
      <Field.Label>Street</Field.Label>
      <Field.Control />
    </Field.Root>
  </Fieldset.Root>
</Form>`}
      >
        <Form sx={pageStyles.sectionForm}>
          <Fieldset.Root>
            <Fieldset.Legend>Contact</Fieldset.Legend>
            <Field.Root>
              <Field.Label>Phone</Field.Label>
              <Field.Control type="tel" placeholder="+44 7700 900000" />
            </Field.Root>
            <Field.Root>
              <Field.Label>Email</Field.Label>
              <Field.Control type="email" placeholder="contact@example.com" />
            </Field.Root>
          </Fieldset.Root>

          <Fieldset.Root>
            <Fieldset.Legend>Address</Fieldset.Legend>
            <Field.Root>
              <Field.Label>Street</Field.Label>
              <Field.Control placeholder="123 Main St" />
            </Field.Root>
            <Field.Root>
              <Field.Label>City</Field.Label>
              <Field.Control placeholder="Forres" />
            </Field.Root>
          </Fieldset.Root>
        </Form>
      </Preview>
    </>
  );
}
