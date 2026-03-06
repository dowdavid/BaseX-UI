import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { Input, Field, Button } from '@basex-ui/components';
import type { InputSize } from '@basex-ui/components';
import { Preview } from '../components/Preview';

const sizes: InputSize[] = ['sm', 'md', 'lg'];

const pageStyles = stylex.create({
  stack: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space3,
    width: '100%',
  },
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: tokens.space3,
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space4,
    width: '100%',
  },
  actions: {
    display: 'flex',
    gap: tokens.space2,
    justifyContent: 'flex-end',
  },
});

export function InputPage() {
  return (
    <>
      <Preview
        title="Basic input"
        description="A simple standalone text input."
        constrained
      >
        <Input placeholder="Enter your name" />
      </Preview>

      <Preview
        title="Sizes"
        description="Small, medium, and large input sizes."
        constrained
      >
        <div {...stylex.props(pageStyles.stack)}>
          {sizes.map((size) => (
            <Input key={size} size={size} placeholder={`${size} (${size === 'sm' ? '32px' : size === 'md' ? '36px' : '40px'})`} />
          ))}
        </div>
      </Preview>

      <Preview
        title="Inside a Field"
        description="Input automatically integrates with Field for label, description, and validation."
        constrained
      >
        <form
          {...stylex.props(pageStyles.form)}
          onSubmit={(e) => e.preventDefault()}
          noValidate
        >
          <Field.Root>
            <Field.Label>Email</Field.Label>
            <Field.Description>We&apos;ll never share your email.</Field.Description>
            <Input type="email" required placeholder="you@example.com" />
            <Field.Error match="valueMissing">Email is required.</Field.Error>
            <Field.Error match="typeMismatch">Please enter a valid email.</Field.Error>
          </Field.Root>
          <div {...stylex.props(pageStyles.actions)}>
            <Button type="submit" size="sm">Submit</Button>
          </div>
        </form>
      </Preview>

      <Preview
        title="Disabled"
        description="A disabled input."
        constrained
      >
        <Input disabled value="Cannot edit this" />
      </Preview>
    </>
  );
}
