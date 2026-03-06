import { Combobox } from '@basex-ui/components';
import type { ComboboxSize } from '@basex-ui/components';
import { Preview } from '../components/Preview';

const sizes: ComboboxSize[] = ['sm', 'md', 'lg'];

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

export function ComboboxPage() {
  return (
    <>
      <Preview
        title="Basic"
        description="Select a single item from a searchable dropdown."
        constrained
      >
        <Combobox.Root items={fruits}>
          <Combobox.Input placeholder="Select a fruit..." />
          <Combobox.Popup>
            <Combobox.Empty>No fruits found.</Combobox.Empty>
            {(fruit: Fruit) => (
              <Combobox.Item key={fruit.id} value={fruit}>
                <Combobox.ItemIndicator />
                {fruit.value}
              </Combobox.Item>
            )}
          </Combobox.Popup>
        </Combobox.Root>
      </Preview>

      <Preview
        title="Multi-select"
        description="Select multiple items with checkmark indicators."
        constrained
      >
        <Combobox.Root items={fruits} multiple>
          <Combobox.Input placeholder="Select fruits..." />
          <Combobox.Popup>
            <Combobox.Empty>No results.</Combobox.Empty>
            {(fruit: Fruit) => (
              <Combobox.Item key={fruit.id} value={fruit}>
                <Combobox.ItemIndicator />
                {fruit.value}
              </Combobox.Item>
            )}
          </Combobox.Popup>
        </Combobox.Root>
      </Preview>

      <Preview title="Grouped" description="Items organized under labeled groups." constrained>
        <Combobox.Root items={produce}>
          <Combobox.Input placeholder="Select produce..." />
          <Combobox.Popup>
            <Combobox.Empty>No results.</Combobox.Empty>
            {(group: ProduceGroup) => (
              <Combobox.Group key={group.label}>
                <Combobox.GroupLabel>{group.label}</Combobox.GroupLabel>
                {group.items.map((item: Fruit) => (
                  <Combobox.Item key={item.id} value={item}>
                    <Combobox.ItemIndicator />
                    {item.value}
                  </Combobox.Item>
                ))}
              </Combobox.Group>
            )}
          </Combobox.Popup>
        </Combobox.Root>
      </Preview>

      <Preview
        title="Sizes"
        description="Three sizes: sm (32px), md (36px, default), lg (40px)."
        constrained
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
          {sizes.map((s) => (
            <Combobox.Root key={s} items={fruits} size={s}>
              <Combobox.Input placeholder={`Size "${s}"`} />
              <Combobox.Popup>
                <Combobox.Empty>No results.</Combobox.Empty>
                {(fruit: Fruit) => (
                  <Combobox.Item key={fruit.id} value={fruit}>
                    <Combobox.ItemIndicator />
                    {fruit.value}
                  </Combobox.Item>
                )}
              </Combobox.Popup>
            </Combobox.Root>
          ))}
        </div>
      </Preview>
    </>
  );
}
