import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { Select, Field, Form, Button } from '@basex-ui/components';
import type { SelectSize } from '@basex-ui/components';
import { Preview } from '../components/Preview';

const sizes: SelectSize[] = ['sm', 'md', 'lg'];

const fruits = ['Apple', 'Banana', 'Cherry', 'Grape', 'Mango', 'Orange', 'Peach', 'Strawberry'];

const countries = [
  'Argentina',
  'Australia',
  'Austria',
  'Belgium',
  'Brazil',
  'Canada',
  'Chile',
  'China',
  'Colombia',
  'Czechia',
  'Denmark',
  'Egypt',
  'Finland',
  'France',
  'Germany',
  'Greece',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Ireland',
  'Israel',
  'Italy',
  'Japan',
  'Kenya',
  'Korea',
  'Malaysia',
  'Mexico',
  'Netherlands',
  'New Zealand',
  'Norway',
  'Peru',
  'Poland',
  'Portugal',
  'Romania',
  'Singapore',
  'South Africa',
  'Spain',
  'Sweden',
  'Switzerland',
  'Thailand',
  'Turkey',
  'Ukraine',
  'United Kingdom',
  'United States',
  'Uruguay',
  'Vietnam',
];

const pageStyles = stylex.create({
  sizesColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space3,
    width: '100%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space4,
    width: '100%',
  },
  actions: {
    display: 'flex',
    gap: tokens.space2,
    justifyContent: 'flex-end',
  },
});

export function SelectPage() {
  return (
    <>
      <Preview
        title="Basic"
        description="A single-value dropdown. Click or focus the trigger and use arrow keys, Home/End, or typeahead."
        constrained
        code={`<Select.Root>
  <Select.Trigger>
    <Select.Value placeholder="Pick a fruit" />
    <Select.Icon />
  </Select.Trigger>
  <Select.Portal>
    <Select.Positioner>
      <Select.Popup>
        <Select.Viewport>
          {fruits.map((f) => (
            <Select.Item key={f} value={f}>
              <Select.ItemIndicator />
              <Select.ItemText>{f}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.Viewport>
      </Select.Popup>
    </Select.Positioner>
  </Select.Portal>
</Select.Root>`}
      >
        <Select.Root>
          <Select.Trigger>
            <Select.Value placeholder="Pick a fruit" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Portal>
            <Select.Positioner>
              <Select.Popup>
                <Select.Viewport>
                  {fruits.map((f) => (
                    <Select.Item key={f} value={f}>
                      <Select.ItemIndicator />
                      <Select.ItemText>{f}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        </Select.Root>
      </Preview>

      <Preview
        title="With Field"
        description="Compose Select inside a Field for label, description, and form integration. The hidden input submits with the form."
        constrained
        code={`<Form>
  <Field.Root name="role">
    <Field.Label>Role</Field.Label>
    <Select.Root name="role" defaultValue="member">
      <Select.Trigger>
        <Select.Value placeholder="Pick a role" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup>
            <Select.Viewport>
              <Select.Item value="admin"><Select.ItemIndicator /><Select.ItemText>Admin</Select.ItemText></Select.Item>
              <Select.Item value="member"><Select.ItemIndicator /><Select.ItemText>Member</Select.ItemText></Select.Item>
              <Select.Item value="viewer"><Select.ItemIndicator /><Select.ItemText>Viewer</Select.ItemText></Select.Item>
            </Select.Viewport>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
    <Field.Description>Determines what this user can change.</Field.Description>
  </Field.Root>
  <Button type="submit">Save</Button>
</Form>`}
      >
        <Form
          {...stylex.props(pageStyles.form)}
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            window.alert(`Submitted role: ${data.get('role') ?? '(none)'}`);
          }}
        >
          <Field.Root name="role">
            <Field.Label>Role</Field.Label>
            <Select.Root name="role" defaultValue="member">
              <Select.Trigger>
                <Select.Value placeholder="Pick a role" />
                <Select.Icon />
              </Select.Trigger>
              <Select.Portal>
                <Select.Positioner>
                  <Select.Popup>
                    <Select.Viewport>
                      <Select.Item value="admin">
                        <Select.ItemIndicator />
                        <Select.ItemText>Admin</Select.ItemText>
                      </Select.Item>
                      <Select.Item value="member">
                        <Select.ItemIndicator />
                        <Select.ItemText>Member</Select.ItemText>
                      </Select.Item>
                      <Select.Item value="viewer">
                        <Select.ItemIndicator />
                        <Select.ItemText>Viewer</Select.ItemText>
                      </Select.Item>
                    </Select.Viewport>
                  </Select.Popup>
                </Select.Positioner>
              </Select.Portal>
            </Select.Root>
            <Field.Description>Determines what this user can change.</Field.Description>
          </Field.Root>
          <div {...stylex.props(pageStyles.actions)}>
            <Button type="submit">Save</Button>
          </div>
        </Form>
      </Preview>

      <Preview
        title="Groups + separators"
        description="Visually organize options without losing keyboard navigation."
        constrained
        code={`<Select.Root>
  <Select.Trigger><Select.Value placeholder="Pick produce" /><Select.Icon /></Select.Trigger>
  <Select.Portal><Select.Positioner><Select.Popup><Select.Viewport>
    <Select.Group>
      <Select.GroupLabel>Fruit</Select.GroupLabel>
      <Select.Item value="apple"><Select.ItemIndicator /><Select.ItemText>Apple</Select.ItemText></Select.Item>
      <Select.Item value="banana"><Select.ItemIndicator /><Select.ItemText>Banana</Select.ItemText></Select.Item>
    </Select.Group>
    <Select.Separator />
    <Select.Group>
      <Select.GroupLabel>Vegetable</Select.GroupLabel>
      <Select.Item value="carrot"><Select.ItemIndicator /><Select.ItemText>Carrot</Select.ItemText></Select.Item>
      <Select.Item value="spinach"><Select.ItemIndicator /><Select.ItemText>Spinach</Select.ItemText></Select.Item>
    </Select.Group>
  </Select.Viewport></Select.Popup></Select.Positioner></Select.Portal>
</Select.Root>`}
      >
        <Select.Root>
          <Select.Trigger>
            <Select.Value placeholder="Pick produce" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Portal>
            <Select.Positioner>
              <Select.Popup>
                <Select.Viewport>
                  <Select.Group>
                    <Select.GroupLabel>Fruit</Select.GroupLabel>
                    <Select.Item value="apple">
                      <Select.ItemIndicator />
                      <Select.ItemText>Apple</Select.ItemText>
                    </Select.Item>
                    <Select.Item value="banana">
                      <Select.ItemIndicator />
                      <Select.ItemText>Banana</Select.ItemText>
                    </Select.Item>
                  </Select.Group>
                  <Select.Separator />
                  <Select.Group>
                    <Select.GroupLabel>Vegetable</Select.GroupLabel>
                    <Select.Item value="carrot">
                      <Select.ItemIndicator />
                      <Select.ItemText>Carrot</Select.ItemText>
                    </Select.Item>
                    <Select.Item value="spinach">
                      <Select.ItemIndicator />
                      <Select.ItemText>Spinach</Select.ItemText>
                    </Select.Item>
                  </Select.Group>
                </Select.Viewport>
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        </Select.Root>
      </Preview>

      <Preview
        title="Long list with scroll buttons"
        description="When the list overflows, hover the top/bottom edges to scroll. Hidden on touch input."
        constrained
        code={`<Select.Root>
  <Select.Trigger><Select.Value placeholder="Pick a country" /><Select.Icon /></Select.Trigger>
  <Select.Portal>
    <Select.Positioner>
      <Select.ScrollUpButton />
      <Select.Popup>
        <Select.Viewport>
          {countries.map((c) => (
            <Select.Item key={c} value={c}>
              <Select.ItemIndicator />
              <Select.ItemText>{c}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.Viewport>
      </Select.Popup>
      <Select.ScrollDownButton />
    </Select.Positioner>
  </Select.Portal>
</Select.Root>`}
      >
        <Select.Root>
          <Select.Trigger>
            <Select.Value placeholder="Pick a country" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Portal>
            <Select.Positioner>
              <Select.ScrollUpButton />
              <Select.Popup>
                <Select.Viewport>
                  {countries.map((c) => (
                    <Select.Item key={c} value={c}>
                      <Select.ItemIndicator />
                      <Select.ItemText>{c}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Popup>
              <Select.ScrollDownButton />
            </Select.Positioner>
          </Select.Portal>
        </Select.Root>
      </Preview>

      <Preview
        title="Sizes"
        description="Three sizes: sm (32px), md (36px, default), lg (40px). Match Combobox sizing exactly."
        constrained
        code={`<Select.Root size="sm">...</Select.Root>
<Select.Root size="md">...</Select.Root>
<Select.Root size="lg">...</Select.Root>`}
      >
        <div {...stylex.props(pageStyles.sizesColumn)}>
          {sizes.map((s) => (
            <Select.Root key={s} size={s}>
              <Select.Trigger>
                <Select.Value placeholder={`Size "${s}"`} />
                <Select.Icon />
              </Select.Trigger>
              <Select.Portal>
                <Select.Positioner>
                  <Select.Popup>
                    <Select.Viewport>
                      {fruits.slice(0, 4).map((f) => (
                        <Select.Item key={f} value={f}>
                          <Select.ItemIndicator />
                          <Select.ItemText>{f}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Popup>
                </Select.Positioner>
              </Select.Portal>
            </Select.Root>
          ))}
        </div>
      </Preview>
    </>
  );
}
