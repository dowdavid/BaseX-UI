'use client';

import { Form, Field, Fieldset, Input, Button } from '@basex-ui/components';
import { Preview } from '@/components/preview';

export function FormBasic() {
  return (
    <Preview constrained>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Fieldset.Root>
          <Fieldset.Legend>Contact</Fieldset.Legend>
          <Field.Root>
            <Field.Label>Name</Field.Label>
            <Input placeholder="Jane Doe" />
          </Field.Root>
          <Field.Root>
            <Field.Label>Email</Field.Label>
            <Input type="email" placeholder="jane@example.com" />
          </Field.Root>
        </Fieldset.Root>
        <Button type="submit">Submit</Button>
      </Form>
    </Preview>
  );
}
