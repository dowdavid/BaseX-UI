import { useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { Dialog, Button, Checkbox, CheckboxGroup } from '@basex-ui/components';
import { Preview } from '../components/Preview';

const formStyles = stylex.create({
  fields: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space4,
  },
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
  popupConstrained: {
    maxHeight: '420px',
  },
  textarea: {
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
    resize: 'none',
    outline: 'none',
  },
});

export function DialogPage() {
  const [formOpen, setFormOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [pushEnabled, setPushEnabled] = useState(false);

  return (
    <>
      <Preview
        title="Form dialog"
        description="Capture input in a modal context with submit and cancel."
      >
        <Dialog.Root open={formOpen} onOpenChange={setFormOpen}>
          <Dialog.Trigger render={<Button>Edit profile</Button>} />
          <Dialog.Portal>
            <Dialog.Backdrop />
            <Dialog.Popup sx={formStyles.popupConstrained}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setFormOpen(false);
                }}
                style={{ display: 'contents' }}
              >
                <Dialog.Header>
                  <Dialog.Title>Edit profile</Dialog.Title>
                  <Dialog.Description>Update your display name and bio.</Dialog.Description>
                </Dialog.Header>
                <Dialog.Panel>
                  <div {...stylex.props(formStyles.fields)}>
                    <div>
                      <label {...stylex.props(formStyles.label)}>Display name</label>
                      <input
                        type="text"
                        defaultValue="Dave Dow"
                        {...stylex.props(formStyles.input)}
                      />
                    </div>
                    <div>
                      <label {...stylex.props(formStyles.label)}>Email</label>
                      <input
                        type="email"
                        defaultValue="dave@ghostdigital.co"
                        {...stylex.props(formStyles.input)}
                      />
                    </div>
                    <div>
                      <label {...stylex.props(formStyles.label)}>Location</label>
                      <input
                        type="text"
                        defaultValue="Forres, Scotland"
                        {...stylex.props(formStyles.input)}
                      />
                    </div>
                    <div>
                      <label {...stylex.props(formStyles.label)}>Website</label>
                      <input
                        type="url"
                        defaultValue="https://ghostdigital.co"
                        {...stylex.props(formStyles.input)}
                      />
                    </div>
                    <div>
                      <label {...stylex.props(formStyles.label)}>Role</label>
                      <input
                        type="text"
                        defaultValue="Design Engineer"
                        {...stylex.props(formStyles.input)}
                      />
                    </div>
                    <div>
                      <label {...stylex.props(formStyles.label)}>Company</label>
                      <input
                        type="text"
                        defaultValue="Ghost Digital"
                        {...stylex.props(formStyles.input)}
                      />
                    </div>
                    <div>
                      <label {...stylex.props(formStyles.label)}>Bio</label>
                      <textarea
                        defaultValue="Product designer and design engineer building MVPs for founders."
                        rows={4}
                        {...stylex.props(formStyles.textarea)}
                      />
                    </div>
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

      <Preview
        title="Settings dialog"
        description="Controlled dialog with interactive content."
      >
        <Dialog.Root open={settingsOpen} onOpenChange={setSettingsOpen}>
          <Dialog.Trigger render={<Button variant="outline">Settings</Button>} />
          <Dialog.Portal>
            <Dialog.Backdrop />
            <Dialog.Popup>
              <Dialog.Header>
                <Dialog.Title>Notification settings</Dialog.Title>
                <Dialog.Description>Choose which notifications you receive.</Dialog.Description>
              </Dialog.Header>
              <Dialog.Panel>
                <CheckboxGroup.Root>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <Checkbox.Root checked={emailEnabled} onCheckedChange={setEmailEnabled}>
                      <Checkbox.Indicator />
                    </Checkbox.Root>
                    <span {...stylex.props(formStyles.label)} style={{ marginBottom: 0 }}>
                      Email notifications
                    </span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <Checkbox.Root checked={pushEnabled} onCheckedChange={setPushEnabled}>
                      <Checkbox.Indicator />
                    </Checkbox.Root>
                    <span {...stylex.props(formStyles.label)} style={{ marginBottom: 0 }}>
                      Push notifications
                    </span>
                  </label>
                </CheckboxGroup.Root>
              </Dialog.Panel>
              <Dialog.Footer>
                <Dialog.Close render={<Button>Done</Button>} />
              </Dialog.Footer>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      </Preview>

      <Preview
        title="Nested dialogs"
        description="A dialog that opens another dialog on top."
      >
        <Dialog.Root>
          <Dialog.Trigger render={<Button>Open</Button>} />
          <Dialog.Portal>
            <Dialog.Backdrop />
            <Dialog.Popup>
              <Dialog.Header>
                <Dialog.Title>Parent dialog</Dialog.Title>
                <Dialog.Description>
                  This dialog can open another dialog on top of it.
                </Dialog.Description>
              </Dialog.Header>
              <Dialog.Footer>
                <Dialog.Close render={<Button variant="ghost">Close</Button>} />
                <Dialog.Root>
                  <Dialog.Trigger render={<Button variant="outline">Open nested</Button>} />
                  <Dialog.Portal>
                    <Dialog.Backdrop />
                    <Dialog.Popup>
                      <Dialog.Header>
                        <Dialog.Title>Nested dialog</Dialog.Title>
                        <Dialog.Description>
                          This is a nested dialog. Close it to return to the parent.
                        </Dialog.Description>
                      </Dialog.Header>
                      <Dialog.Footer>
                        <Dialog.Close render={<Button>Close</Button>} />
                      </Dialog.Footer>
                    </Dialog.Popup>
                  </Dialog.Portal>
                </Dialog.Root>
              </Dialog.Footer>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      </Preview>
    </>
  );
}
