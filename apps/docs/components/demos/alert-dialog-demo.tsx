'use client';

import * as stylex from '@stylexjs/stylex';
import { AlertDialog, Button } from '@basex-ui/components';
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
        justifyContent: 'center',
      }}
    >
      {children}
    </div>
  );
}

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
