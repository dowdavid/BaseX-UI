'use client';

import { Fieldset, Field, Input } from '@basex-ui/components';
import { Preview } from '@/components/preview';

export function FieldsetBasic() {
  return (
    <Preview constrained>
      <Fieldset.Root>
        <Fieldset.Legend>Personal Information</Fieldset.Legend>
        <Field.Root>
          <Field.Label>First name</Field.Label>
          <Input placeholder="Jane" />
        </Field.Root>
        <Field.Root>
          <Field.Label>Last name</Field.Label>
          <Input placeholder="Doe" />
        </Field.Root>
      </Fieldset.Root>
    </Preview>
  );
}
