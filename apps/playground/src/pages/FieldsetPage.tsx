import { Fieldset, Field } from '@basex-ui/components';
import { Preview } from '../components/Preview';

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
      >
        <Fieldset.Root disabled>
          <Fieldset.Legend>Locked section</Fieldset.Legend>
          <Field.Root>
            <Field.Label>Email</Field.Label>
            <Field.Control value="locked@example.com" />
          </Field.Root>
          <Field.Root>
            <Field.Label>Role</Field.Label>
            <Field.Control value="Admin" />
          </Field.Root>
        </Fieldset.Root>
      </Preview>

      <Preview
        title="Multiple groups"
        description="Multiple fieldsets organizing sections of a form."
        constrained
      >
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
      </Preview>
    </>
  );
}
