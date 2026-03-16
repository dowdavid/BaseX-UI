'use client';

import { AlertDialog, Button } from '@basex-ui/components';
import { Preview } from '@/components/preview';

export function AlertDialogBasic() {
  return (
    <Preview>
      <AlertDialog.Root>
        <AlertDialog.Trigger render={<Button variant="outline" color="destructive">Delete item</Button>} />
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
  );
}
