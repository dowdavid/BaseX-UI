'use client';

import * as stylex from '@stylexjs/stylex';
import { Combobox } from '@basex-ui/components';
import { lightTheme, darkTheme } from '@basex-ui/styles';
import { useTheme } from 'next-themes';

function Preview({ children, constrained }: { children: React.ReactNode; constrained?: boolean }) {
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
      {constrained ? <div style={{ width: '100%', maxWidth: '15rem' }}>{children}</div> : children}
    </div>
  );
}

const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'];

export function ComboboxBasic() {
  return (
    <Preview constrained>
      <Combobox.Root items={fruits}>
        <Combobox.Input placeholder="Pick a fruit..." />
        <Combobox.Popup>
          <Combobox.Empty>No fruits found.</Combobox.Empty>
          {(item: string) => (
            <Combobox.Item key={item} value={item}>
              <Combobox.ItemIndicator />
              {item}
            </Combobox.Item>
          )}
        </Combobox.Popup>
      </Combobox.Root>
    </Preview>
  );
}

export function ComboboxMulti() {
  return (
    <Preview constrained>
      <Combobox.Root items={fruits} multiple>
        <Combobox.Input placeholder="Select fruits..." />
        <Combobox.Popup>
          <Combobox.Empty>No fruits found.</Combobox.Empty>
          {(item: string) => (
            <Combobox.Item key={item} value={item}>
              <Combobox.ItemIndicator />
              {item}
            </Combobox.Item>
          )}
        </Combobox.Popup>
      </Combobox.Root>
    </Preview>
  );
}
