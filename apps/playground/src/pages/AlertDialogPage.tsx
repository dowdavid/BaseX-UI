import { AlertDialog, Button } from '@basex-ui/components';
import { Preview } from '../components/Preview';

export function AlertDialogPage() {
  return (
    <>
      <Preview
        title="Delete confirmation"
        description="Confirm a destructive action before proceeding."
      >
        <AlertDialog.Root>
          <AlertDialog.Trigger
            render={
              <Button variant="outline" color="destructive">
                Delete item
              </Button>
            }
          />
          <AlertDialog.Portal>
            <AlertDialog.Backdrop />
            <AlertDialog.Popup>
              <AlertDialog.Title>Delete this item?</AlertDialog.Title>
              <AlertDialog.Description>
                This action cannot be undone. The item and all associated data will be permanently
                removed.
              </AlertDialog.Description>
              <AlertDialog.Actions>
                <AlertDialog.Close render={<Button variant="ghost">Cancel</Button>} />
                <AlertDialog.Close render={<Button color="destructive">Delete</Button>} />
              </AlertDialog.Actions>
            </AlertDialog.Popup>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      </Preview>

      <Preview
        title="Discard changes"
        description="Warn before losing unsaved work."
      >
        <AlertDialog.Root>
          <AlertDialog.Trigger render={<Button variant="ghost">Leave page</Button>} />
          <AlertDialog.Portal>
            <AlertDialog.Backdrop />
            <AlertDialog.Popup>
              <AlertDialog.Title>Discard changes?</AlertDialog.Title>
              <AlertDialog.Description>
                You have unsaved changes that will be lost if you leave this page.
              </AlertDialog.Description>
              <AlertDialog.Actions>
                <AlertDialog.Close render={<Button variant="ghost">Keep editing</Button>} />
                <AlertDialog.Close render={<Button color="destructive">Discard</Button>} />
              </AlertDialog.Actions>
            </AlertDialog.Popup>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      </Preview>

      <Preview
        title="Accept terms"
        description="Block interaction until the user explicitly agrees."
      >
        <AlertDialog.Root>
          <AlertDialog.Trigger render={<Button>Continue to checkout</Button>} />
          <AlertDialog.Portal>
            <AlertDialog.Backdrop />
            <AlertDialog.Popup>
              <AlertDialog.Title>Accept terms of service?</AlertDialog.Title>
              <AlertDialog.Description>
                By continuing, you agree to our terms of service and privacy policy.
              </AlertDialog.Description>
              <AlertDialog.Actions>
                <AlertDialog.Close render={<Button variant="ghost">Cancel</Button>} />
                <AlertDialog.Close render={<Button>Accept</Button>} />
              </AlertDialog.Actions>
            </AlertDialog.Popup>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      </Preview>
    </>
  );
}
