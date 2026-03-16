'use client';

import * as stylex from '@stylexjs/stylex';
import { Autocomplete } from '@basex-ui/components';
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

const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'];

export function AutocompleteBasic() {
  return (
    <Preview>
      <Autocomplete.Root items={fruits}>
        <Autocomplete.Input placeholder="Search fruits..." />
        <Autocomplete.Popup>
          <Autocomplete.Empty>No fruits found.</Autocomplete.Empty>
          {(item: string) => (
            <Autocomplete.Item key={item} value={item}>
              {item}
            </Autocomplete.Item>
          )}
        </Autocomplete.Popup>
      </Autocomplete.Root>
    </Preview>
  );
}

export function AutocompleteSizes() {
  return (
    <Preview>
      <Autocomplete.Root items={fruits} size="sm">
        <Autocomplete.Input placeholder="Small" />
        <Autocomplete.Popup>
          <Autocomplete.Empty>No fruits found.</Autocomplete.Empty>
          {(item: string) => (
            <Autocomplete.Item key={item} value={item}>
              {item}
            </Autocomplete.Item>
          )}
        </Autocomplete.Popup>
      </Autocomplete.Root>
      <Autocomplete.Root items={fruits} size="md">
        <Autocomplete.Input placeholder="Medium" />
        <Autocomplete.Popup>
          <Autocomplete.Empty>No fruits found.</Autocomplete.Empty>
          {(item: string) => (
            <Autocomplete.Item key={item} value={item}>
              {item}
            </Autocomplete.Item>
          )}
        </Autocomplete.Popup>
      </Autocomplete.Root>
      <Autocomplete.Root items={fruits} size="lg">
        <Autocomplete.Input placeholder="Large" />
        <Autocomplete.Popup>
          <Autocomplete.Empty>No fruits found.</Autocomplete.Empty>
          {(item: string) => (
            <Autocomplete.Item key={item} value={item}>
              {item}
            </Autocomplete.Item>
          )}
        </Autocomplete.Popup>
      </Autocomplete.Root>
    </Preview>
  );
}
