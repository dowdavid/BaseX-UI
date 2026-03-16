Base-X UI constrains all animations to five presets. Every component, every interaction, every transition maps to one of these five. Agents never need to invent duration or easing values.

## The five presets

| Preset | Duration | Easing | Use for |
|--------|----------|--------|---------|
| **State** | 100ms | `motionEaseOut` | Hover, focus, active, color changes, border changes |
| **Expand** | 200ms | `motionEaseInOut` | Accordion panels, collapsible content, height transitions |
| **Move** | 200ms | `motionEaseInOut` | Rotation, translation, slide, scale, chevron rotation |
| **Enter** | 200ms | `motionEaseOut` | Popover, tooltip, menu, dialog appear, fade in |
| **Exit** | 100ms | `motionEaseOut` | Popover close, tooltip hide, dialog dismiss, fade out |

## Why five

More presets means more decisions. Fewer presets means forced consistency. Five covers the interaction space without ambiguity:

- Something changed state? → **State**
- Content revealed in place? → **Expand**
- Something physically moved? → **Move**
- Something appeared? → **Enter**
- Something disappeared? → **Exit**

## Usage

```tsx
import { getAnimationPreset, getAnimationPresetForUseCase } from '@basex-ui/intelligence';

// By name
const enter = getAnimationPreset('Enter');
// { name: 'Enter', duration: '200ms', durationToken: 'motionDurationNormal',
//   easing: 'cubic-bezier(0, 0, 0.2, 1)', easingToken: 'motionEaseOut', ... }

// By use case description
const preset = getAnimationPresetForUseCase('accordion panel opening');
// Returns the Expand preset
```

## Design tokens

Each preset maps to design tokens from `@basex-ui/tokens`:

```
State  → motionDurationFast (100ms) + motionEaseOut
Expand → motionDurationNormal (200ms) + motionEaseInOut
Move   → motionDurationNormal (200ms) + motionEaseInOut
Enter  → motionDurationNormal (200ms) + motionEaseOut
Exit   → motionDurationFast (100ms) + motionEaseOut
```

Use the tokens in StyleX, not the raw values:

```tsx
import { tokens } from '@basex-ui/tokens';
import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  fadeIn: {
    animationDuration: tokens.motionDurationNormal,
    animationTimingFunction: tokens.motionEaseOut,
  },
});
```

## Exit is faster than enter

Enter uses 200ms. Exit uses 100ms. This is intentional. When something appears, users need time to register it. When something disappears, they initiated the action and expect it to respond instantly. Fast exits feel snappy. Slow exits feel sluggish.

## Component animation mapping

Every component's setup info includes which presets it uses and where. The MCP server exposes this through `get_component_setup`:

```
Accordion:
  - Panel expand/collapse → Expand preset
  - Chevron rotation → Move preset

Dialog:
  - Backdrop fade in → Enter preset
  - Popup scale in → Enter preset
  - Backdrop fade out → Exit preset
  - Popup scale out → Exit preset

Button:
  - Hover/focus state → State preset
```

Agents can query this per-component so they know exactly which preset to apply to each part of the interaction.
