# BaseX UI — Component Roadmap

> **Process**: Every component follows [`docs/new-component-checklist.md`](../new-component-checklist.md).
>
> **To start a session**: "Build the next component from the roadmap."

## Status

| #   | Component       | Base UI Name     | Status   | Notes        |
| --- | --------------- | ---------------- | -------- | ------------ |
| 1   | Accordion       | `Accordion`      | Done     |              |
| 2   | Alert Dialog    | `AlertDialog`    | Done     |              |
| 3   | Autocomplete    | `Autocomplete`   | Done     |              |
| 4   | Avatar          | `Avatar`         | Done     |              |
| 5   | Button          | `Button`         | Done     |              |
| 6   | Checkbox        | `Checkbox`       | Done     |              |
| 7   | Checkbox Group  | `CheckboxGroup`  | Done     |              |
| 8   | Collapsible     | `Collapsible`    | Done     |              |
| 9   | Combobox        | `Combobox`       | Done     |              |
| 10  | Context Menu    | `ContextMenu`    | —        | Low priority |
| 11  | Dialog          | `Dialog`         | Done     |              |
| 12  | Drawer          | `Drawer`         | Done     |              |
| 13  | Field           | `Field`          | Done     |              |
| 14  | Fieldset        | `Fieldset`       | Done     |              |
| 15  | Form            | `Form`           | Done     |              |
| 16  | Input           | `Input`          | Done     |              |
| 17  | Menu            | `Menu`           | Done     |              |
| 18  | Menubar         | `Menubar`        | Done     |              |
| 19  | Meter           | `Meter`          | Done     |              |
| 20  | Navigation Menu | `NavigationMenu` | Done     |              |
| 21  | Number Field    | `NumberField`    | Done     |              |
| 22  | Popover         | `Popover`        | Done     |              |
| 23  | Preview Card    | `PreviewCard`    | Done     |              |
| 24  | Progress        | `Progress`       | Done     |              |
| 25  | Radio           | `Radio`          | Done     |              |
| 26  | Scroll Area     | `ScrollArea`     | **Next** |              |
| 27  | Select          | `Select`         | —        |              |
| 28  | Separator       | `Separator`      | Done     |              |
| 29  | Slider          | `Slider`         | —        |              |
| 30  | Switch          | `Switch`         | Done     |              |
| 31  | Tabs            | `Tabs`           | —        |              |
| 32  | Toast           | `Toast`          | —        |              |
| 33  | Toggle          | `Toggle`         | —        |              |
| 34  | Toggle Group    | `ToggleGroup`    | —        |              |
| 35  | Toolbar         | `Toolbar`        | —        |              |
| 36  | Tooltip         | `Tooltip`        | —        |              |

## Progress

- **Done**: 26 / 36
- **Next**: Scroll Area

## How to Use This File

1. Agent reads this roadmap to find the component marked **Next**
2. Agent reads `docs/new-component-checklist.md` for the build process
3. Agent reads existing components (e.g. `packages/components/src/accordion/`) for patterns
4. Agent builds the component, following every checklist step
5. When done: mark the component **Done** here, set the next one to **Next**
