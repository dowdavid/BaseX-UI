# Animation System

Every animation in BaseX UI uses one of five presets. When building a component, pick the preset — never invent a new duration/easing pair.

## Presets

| Preset | Duration | Easing | Token (duration) | Token (easing) |
|--------|----------|--------|------------------|----------------|
| **State** | 100ms | ease-out | `motionDurationFast` | `motionEaseOut` |
| **Expand** | 200ms | ease-in-out | `motionDurationNormal` | `motionEaseInOut` |
| **Move** | 200ms | ease-in-out | `motionDurationNormal` | `motionEaseInOut` |
| **Enter** | 200ms | ease-out | `motionDurationNormal` | `motionEaseOut` |
| **Exit** | 100ms | ease-out | `motionDurationFast` | `motionEaseOut` |

### When to use each

**State** — Hover, focus, active, color changes, border changes. Anything that responds to pointer/keyboard interaction on an element that's already visible.

**Expand** — Height or size reveals: accordion panels, collapsibles, disclosure content. Elements growing or shrinking in place.

**Move** — Transforms: rotation (chevron icons), translation (slide), scale. Physical movement of an element.

**Enter** — Elements appearing: popovers, tooltips, menus, dialogs fading/scaling in. First visibility.

**Exit** — Elements disappearing: same components leaving. Exits are faster than enters so they feel snappy and don't block the next action.

## Easing curves

| Token | Value | Feel |
|-------|-------|------|
| `motionEaseOut` | `cubic-bezier(0, 0, 0.2, 1)` | Decelerates into rest. Natural for arrivals. |
| `motionEaseInOut` | `cubic-bezier(0.4, 0, 0.2, 1)` | Accelerates then decelerates. Natural for movement with a start and end. |
| `motionEaseSpring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Overshoots then settles. Reserved for playful emphasis (not currently used). |

## In StyleX (static styles)

```tsx
// State preset — button hover
transitionProperty: 'background-color, color, border-color',
transitionDuration: tokens.motionDurationFast,    // 100ms
transitionTimingFunction: tokens.motionEaseOut,

// Move preset — chevron rotation
transitionProperty: 'transform',
transitionDuration: tokens.motionDurationNormal,   // 200ms
transitionTimingFunction: tokens.motionEaseInOut,
```

## In global CSS (animated panels)

Height animations driven by Base UI data attributes must use global CSS. Use the raw values — they match the tokens exactly.

```css
@layer priority1 {
  /* Expand preset: 200ms ease-in-out */
  .basex-accordion-panel {
    height: var(--accordion-panel-height);
    overflow: hidden;
    transition: height 200ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .basex-accordion-panel[data-starting-style],
  .basex-accordion-panel[data-ending-style] {
    height: 0;
  }
}
```

## Reference: which preset each component uses

| Component | Interaction | Preset |
|-----------|-------------|--------|
| Button | hover/focus/active color | State |
| Button | :active scale(0.98) | State |
| Accordion Trigger | hover/focus | State |
| Accordion Chevron | rotation on open | Move |
| Accordion Panel | height expand/collapse | Expand |
