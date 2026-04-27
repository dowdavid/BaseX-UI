import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { Toast, useToast, Button } from '@basex-ui/components';
import { Preview } from '../components/Preview';

const styles = stylex.create({
  row: {
    display: 'flex',
    gap: tokens.space3,
    flexWrap: 'wrap',
  },
});

function ToastViewport() {
  const { toasts } = useToast();
  return (
    <Toast.Portal>
      <Toast.Viewport>
        {toasts.map((t) => (
          <Toast.Root key={t.id} toast={t}>
            <Toast.Content>
              {t.title && <Toast.Title>{t.title}</Toast.Title>}
              {t.description && <Toast.Description>{t.description}</Toast.Description>}
            </Toast.Content>
            {t.actionProps && <Toast.Action />}
            <Toast.Close />
          </Toast.Root>
        ))}
      </Toast.Viewport>
    </Toast.Portal>
  );
}

function BasicDemo() {
  const { add } = useToast();
  return (
    <div {...stylex.props(styles.row)}>
      <Button onClick={() => add({ title: 'Saved', description: 'Your changes were saved.' })}>
        Show toast
      </Button>
    </div>
  );
}

function ActionDemo() {
  const toast = useToast();
  return (
    <div {...stylex.props(styles.row)}>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            title: 'Item archived',
            description: 'You can put it back if you change your mind.',
            actionProps: {
              children: 'Undo',
              onClick: () => toast.add({ title: 'Restored' }),
            },
          })
        }
      >
        Archive item
      </Button>
    </div>
  );
}

function DestructiveDemo() {
  const { add } = useToast();
  return (
    <div {...stylex.props(styles.row)}>
      <Button
        color="destructive"
        onClick={() =>
          add({
            title: 'Couldn’t save',
            description: 'Try again in a moment.',
            type: 'error',
            priority: 'high',
          })
        }
      >
        Trigger error
      </Button>
    </div>
  );
}

function PromiseDemo() {
  const toast = useToast();
  return (
    <div {...stylex.props(styles.row)}>
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(new Promise((res) => setTimeout(res, 1500)), {
            loading: 'Saving…',
            success: 'Saved',
            error: 'Failed to save',
          })
        }
      >
        Save (async)
      </Button>
    </div>
  );
}

export function ToastPage() {
  return (
    <Toast.Provider>
      <Preview
        title="Basic"
        description="A polite notification with title and description. Auto-dismisses after 5s; pauses on hover or focus."
        code={`function SaveButton() {
  const { add } = useToast();
  return (
    <Button onClick={() => add({ title: 'Saved', description: 'Your changes were saved.' })}>
      Show toast
    </Button>
  );
}`}
      >
        <BasicDemo />
      </Preview>

      <Preview
        title="With action"
        description="actionProps are forwarded to Toast.Action. Reachable via F6 from anywhere without stealing focus."
        code={`const toast = useToast();

toast.add({
  title: 'Item archived',
  description: 'You can put it back if you change your mind.',
  actionProps: {
    children: 'Undo',
    onClick: handleUndo,
  },
});`}
      >
        <ActionDemo />
      </Preview>

      <Preview
        title="Destructive"
        description="type='error' upgrades the announcement to assertive and applies destructive styling."
        code={`const { add } = useToast();

add({
  title: 'Couldn’t save',
  description: 'Try again in a moment.',
  type: 'error',
  priority: 'high',
});`}
      >
        <DestructiveDemo />
      </Preview>

      <Preview
        title="Promise"
        description="useToast().promise() shows a loading toast that resolves to success or error automatically."
        code={`const toast = useToast();

toast.promise(saveDraft(), {
  loading: 'Saving…',
  success: 'Saved',
  error: 'Failed to save',
});`}
      >
        <PromiseDemo />
      </Preview>

      <ToastViewport />
    </Toast.Provider>
  );
}
