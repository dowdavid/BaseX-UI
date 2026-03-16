'use client';

import { useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { Dialog, Button, Field, Input } from '@basex-ui/components';
import { lightTheme, darkTheme } from '@basex-ui/styles';
import { useTheme } from 'next-themes';

function Preview({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === 'dark' ? darkTheme : lightTheme;
  return (
    <div
      {...stylex.props(theme)}
      style={{
        padding: '2rem',
        borderRadius: '0.5rem',
        border: '1px solid var(--fd-border)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.75rem',
        alignItems: 'center',
      }}
    >
      {children}
    </div>
  );
}

const styles = stylex.create({
  fields: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  formContents: {
    display: 'contents',
  },
});

export function DialogBasic() {
  const [open, setOpen] = useState(false);

  return (
    <Preview>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger render={<Button variant="outline">Edit profile</Button>} />
        <Dialog.Portal>
          <Dialog.Backdrop />
          <Dialog.Popup>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setOpen(false);
              }}
              {...stylex.props(styles.formContents)}
            >
              <Dialog.Header>
                <Dialog.Title>Edit profile</Dialog.Title>
                <Dialog.Description>
                  Update your display name and bio.
                </Dialog.Description>
              </Dialog.Header>
              <Dialog.Panel>
                <div {...stylex.props(styles.fields)}>
                  <Field.Root>
                    <Field.Label>Display name</Field.Label>
                    <Input type="text" defaultValue="Dave Dow" />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Email</Field.Label>
                    <Input type="email" defaultValue="dave@ghostdigital.co" />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Location</Field.Label>
                    <Input type="text" defaultValue="Forres, Scotland" />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Website</Field.Label>
                    <Input type="url" defaultValue="https://ghostdigital.co" />
                  </Field.Root>
                </div>
              </Dialog.Panel>
              <Dialog.Footer>
                <Dialog.Close render={<Button variant="ghost">Cancel</Button>} />
                <Button type="submit">Save</Button>
              </Dialog.Footer>
            </form>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </Preview>
  );
}

export function DialogForm() {
  const [open, setOpen] = useState(false);

  return (
    <Preview>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger render={<Button variant="outline">Create item</Button>} />
        <Dialog.Portal>
          <Dialog.Backdrop />
          <Dialog.Popup>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setOpen(false);
              }}
              {...stylex.props(styles.formContents)}
            >
              <Dialog.Header>
                <Dialog.Title>Create item</Dialog.Title>
                <Dialog.Description>
                  Add a new item to your collection.
                </Dialog.Description>
              </Dialog.Header>
              <Dialog.Panel>
                <div {...stylex.props(styles.fields)}>
                  <Field.Root>
                    <Field.Label>Name</Field.Label>
                    <Input type="text" placeholder="Item name" />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Description</Field.Label>
                    <Input type="text" placeholder="Brief description" />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Category</Field.Label>
                    <Input type="text" placeholder="e.g. Design, Engineering" />
                  </Field.Root>
                </div>
              </Dialog.Panel>
              <Dialog.Footer>
                <Dialog.Close render={<Button variant="ghost">Cancel</Button>} />
                <Button type="submit">Create</Button>
              </Dialog.Footer>
            </form>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </Preview>
  );
}
