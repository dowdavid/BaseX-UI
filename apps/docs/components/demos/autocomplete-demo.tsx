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

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.417 11.083a4.667 4.667 0 1 0 0-9.333 4.667 4.667 0 0 0 0 9.333ZM12.25 12.25l-2.533-2.533"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface Fruit {
  id: number;
  value: string;
}

interface ProduceGroup {
  label: string;
  items: Fruit[];
}

const fruits: Fruit[] = [
  { id: 1, value: 'Apple' },
  { id: 2, value: 'Banana' },
  { id: 3, value: 'Cherry' },
  { id: 4, value: 'Grape' },
  { id: 5, value: 'Mango' },
  { id: 6, value: 'Orange' },
  { id: 7, value: 'Peach' },
  { id: 8, value: 'Strawberry' },
];

const produce: ProduceGroup[] = [
  {
    label: 'Fruits',
    items: [
      { id: 1, value: 'Apple' },
      { id: 2, value: 'Banana' },
      { id: 3, value: 'Cherry' },
    ],
  },
  {
    label: 'Vegetables',
    items: [
      { id: 4, value: 'Carrot' },
      { id: 5, value: 'Broccoli' },
      { id: 6, value: 'Spinach' },
    ],
  },
];

const styles = stylex.create({
  stack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    width: '100%',
  },
});

export function AutocompleteBasic() {
  return (
    <Preview>
      <Autocomplete.Root items={fruits}>
        <Autocomplete.Input placeholder="Search fruits..." />
        <Autocomplete.Popup>
          <Autocomplete.Empty>No fruits found.</Autocomplete.Empty>
          {(fruit: Fruit) => (
            <Autocomplete.Item key={fruit.id} value={fruit}>
              {fruit.value}
            </Autocomplete.Item>
          )}
        </Autocomplete.Popup>
      </Autocomplete.Root>
    </Preview>
  );
}

export function AutocompleteGrouped() {
  return (
    <Preview>
      <Autocomplete.Root items={produce}>
        <Autocomplete.Input placeholder="Search produce..." />
        <Autocomplete.Popup>
          <Autocomplete.Empty>No results.</Autocomplete.Empty>
          {(group: ProduceGroup) => (
            <Autocomplete.Group key={group.label}>
              <Autocomplete.GroupLabel>{group.label}</Autocomplete.GroupLabel>
              {group.items.map((item: Fruit) => (
                <Autocomplete.Item key={item.id} value={item}>
                  {item.value}
                </Autocomplete.Item>
              ))}
            </Autocomplete.Group>
          )}
        </Autocomplete.Popup>
      </Autocomplete.Root>
    </Preview>
  );
}

export function AutocompleteAutoHighlight() {
  return (
    <Preview>
      <Autocomplete.Root items={fruits} autoHighlight>
        <Autocomplete.Input placeholder="Start typing..." />
        <Autocomplete.Popup>
          <Autocomplete.Empty>No results.</Autocomplete.Empty>
          {(fruit: Fruit) => (
            <Autocomplete.Item key={fruit.id} value={fruit}>
              {fruit.value}
            </Autocomplete.Item>
          )}
        </Autocomplete.Popup>
      </Autocomplete.Root>
    </Preview>
  );
}

export function AutocompleteStartAddon() {
  return (
    <Preview>
      <Autocomplete.Root items={fruits}>
        <Autocomplete.Input startAddon={<SearchIcon />} placeholder="Search fruits..." />
        <Autocomplete.Popup>
          <Autocomplete.Empty>No results.</Autocomplete.Empty>
          {(fruit: Fruit) => (
            <Autocomplete.Item key={fruit.id} value={fruit}>
              {fruit.value}
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
      <div {...stylex.props(styles.stack)}>
        {(['sm', 'md', 'lg'] as const).map((s) => (
          <Autocomplete.Root key={s} items={fruits} size={s}>
            <Autocomplete.Input placeholder={`Size "${s}"`} />
            <Autocomplete.Popup>
              <Autocomplete.Empty>No results.</Autocomplete.Empty>
              {(fruit: Fruit) => (
                <Autocomplete.Item key={fruit.id} value={fruit}>
                  {fruit.value}
                </Autocomplete.Item>
              )}
            </Autocomplete.Popup>
          </Autocomplete.Root>
        ))}
      </div>
    </Preview>
  );
}
