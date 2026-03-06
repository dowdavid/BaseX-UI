import { Autocomplete } from '@basex-ui/components';
import type { AutocompleteInputSize } from '@basex-ui/components';
import { Preview } from '../components/Preview';

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

const sizes: AutocompleteInputSize[] = ['sm', 'md', 'lg'];

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

export function AutocompletePage() {
  return (
    <>
      <Preview
        title="Basic search"
        description="Type to filter a flat list of suggestions."
        constrained
      >
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

      <Preview
        title="Grouped suggestions"
        description="Items organized under labeled groups."
        constrained
      >
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

      <Preview
        title="Auto-highlight"
        description="First matching item is highlighted automatically as you type."
        constrained
      >
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

      <Preview
        title="Start addon"
        description="An icon or element positioned at the start of the input."
        constrained
      >
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

      <Preview
        title="Sizes"
        description="Three sizes: sm (32px), md (36px, default), lg (40px)."
        constrained
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
          {sizes.map((s) => (
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
    </>
  );
}
