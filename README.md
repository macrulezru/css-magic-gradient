# css-magic-gradient

TypeScript library for generating CSS gradients — linear, radial, and conic. Includes gradient presets, WCAG accessibility utilities, Vue 3 reactive hooks, and React hooks.

## Installation

```bash
npm install css-magic-gradient
```

---

## Features & API

### Core — linear gradients

#### `createLinearGradient` — from a base color (auto-generates stops)

Accepts any color format: hex, `rgb()`, `hsl()`, named CSS color, or CSS variable.

```ts
import { createLinearGradient } from 'css-magic-gradient';

// Hex
createLinearGradient('#3498db');
// → 'linear-gradient(to bottom, #5faee3, #3498db)'

// Named color
createLinearGradient('cornflowerblue', { direction: 'to right', offsetPercent: 20 });

// CSS variable (uses fallback for brightness calculation)
createLinearGradient('var(--brand-color)', { fallbackColor: '#3498db' });

// Angle instead of direction keyword
createLinearGradient('#e74c3c', { angle: 135 });

// CSS Color Level 4 interpolation (oklch, lab, hsl, srgb, oklab, lch)
createLinearGradient('#9b59b6', { direction: 'to right', interpolation: 'oklch' });
// → 'linear-gradient(to right in oklch, …)'

// Repeating variant
createLinearGradient('#2ecc71', { angle: 45, repeating: true });
// → 'repeating-linear-gradient(45deg, …)'
```

**`GradientOptions`**

| Option | Type | Default | Description |
|---|---|---|---|
| `direction` | `string` | `'to bottom'` | CSS direction keyword |
| `angle` | `number` | — | Angle in degrees. Overrides `direction` |
| `offsetPercent` | `number` | `15` | Brightness offset (%) for the lighter start stop |
| `fallbackColor` | `string` | `'#f5e477'` | Fallback for CSS variables or unknown formats |
| `interpolation` | `'srgb' \| 'oklch' \| 'lab' \| 'hsl' \| 'oklab' \| 'lch'` | — | CSS Color Level 4 interpolation space |
| `repeating` | `boolean` | `false` | Use `repeating-linear-gradient` |

---

#### `createLinearGradient` — from explicit color stops

```ts
import { createLinearGradient } from 'css-magic-gradient';

createLinearGradient(
  [
    { color: '#ff6b6b', position: '0%' },
    { color: '#feca57', position: '50%' },
    { color: '#48dbfb', position: '100%' },
  ],
  { direction: 'to right' },
);
// → 'linear-gradient(to right, #ff6b6b 0%, #feca57 50%, #48dbfb 100%)'

// With per-stop opacity
createLinearGradient(
  [
    { color: '#e74c3c', opacity: 1, position: '0%' },
    { color: '#e74c3c', opacity: 0, position: '100%' },
  ],
  { angle: 90 },
);
// → 'linear-gradient(90deg, #e74c3c 0%, rgba(231, 76, 60, 0) 100%)'

// opacity: 0 shorthand → 'transparent'
createLinearGradient([{ color: '#3498db' }, { color: '#3498db', opacity: 0 }]);
```

**`ColorStop`**

| Field | Type | Description |
|---|---|---|
| `color` | `string` | Any CSS color value |
| `opacity` | `number` | 0–1. `0` → `transparent`. Applies via RGBA conversion |
| `position` | `string \| number` | e.g. `'0%'`, `'20px'` |

---

#### `createMultiStepLinearGradient`

Generates multiple evenly spaced stops by interpolating brightness from light to the base color.

```ts
import { createMultiStepLinearGradient } from 'css-magic-gradient';

createMultiStepLinearGradient('#3498db', 5, { offsetPercent: 25, direction: 'to right' });
// → 'linear-gradient(to right, #80beea, #639fd8, #4780c5, #3060b3, #3498db)'
```

| Parameter | Type | Default | Description |
|---|---|---|---|
| `baseColor` | `string` | — | Any supported color format |
| `steps` | `number` | `3` | Number of color stops |
| `options` | `GradientOptions` | — | Same as `createLinearGradient` |

---

#### `createMixedLinearGradient`

Creates a gradient by HSL-interpolating between two arbitrary colors across `steps` stops.

```ts
import { createMixedLinearGradient } from 'css-magic-gradient';

createMixedLinearGradient('#ff6b6b', '#4ecdc4', 7, { direction: 'to right' });
// → 'linear-gradient(to right, #ff6b6b, #e8857b, #d19f8b, …, #4ecdc4)'

// Works with any color format
createMixedLinearGradient('tomato', 'steelblue', 5);
createMixedLinearGradient('rgb(255, 100, 100)', 'hsl(200, 60%, 50%)', 6);
```

---

### Core — radial gradients

#### `createRadialGradient` — from a base color

```ts
import { createRadialGradient } from 'css-magic-gradient';

createRadialGradient('#e74c3c');
// → 'radial-gradient(ellipse farthest-corner at center, #ed7060, #e74c3c)'

createRadialGradient('#9b59b6', {
  shape: 'circle',
  size: 'closest-side',
  position: '30% 60%',
  offsetPercent: 30,
});
```

#### `createRadialGradient` — explicit color stops

```ts
createRadialGradient('#000', {
  colors: [
    { color: '#f39c12', position: '0%' },
    { color: '#e74c3c', position: '50%' },
    { color: '#8e44ad', opacity: 0.5, position: '100%' },
  ],
});
```

#### `createRadialGradient` — multiple layers

Layers are composed as comma-separated `radial-gradient()` calls (CSS background-image layering syntax).

```ts
createRadialGradient('#000', {
  layers: [
    {
      shape: 'circle',
      size: '40%',
      position: '30% 40%',
      colors: [{ color: '#f39c12' }, { color: 'transparent' }],
    },
    {
      shape: 'circle',
      size: '30%',
      position: '70% 60%',
      colors: [{ color: '#3498db' }, { color: 'transparent' }],
    },
  ],
});
// → 'radial-gradient(circle 40% at 30% 40%, #f39c12, transparent),
//    radial-gradient(circle 30% at 70% 60%, #3498db, transparent)'
```

**`RadialGradientOptions`**

| Option | Type | Default | Description |
|---|---|---|---|
| `shape` | `'circle' \| 'ellipse'` | `'ellipse'` | Gradient shape |
| `size` | `string \| { width, height }` | `'farthest-corner'` | Size keyword or explicit dimensions |
| `position` | `string` | `'center'` | Center position |
| `offsetPercent` | `number` | `15` | Brightness offset for auto-generated stops |
| `fallbackColor` | `string` | `'#f5e477'` | Fallback for unsupported color formats |
| `colors` | `ColorStop[]` | — | Explicit stops (overrides auto-generation) |
| `layers` | `RadialGradientLayer[]` | — | Multiple stacked layers |
| `repeating` | `boolean` | `false` | Use `repeating-radial-gradient` |

---

### Core — conic gradients

#### `createConicGradient`

```ts
import { createConicGradient } from 'css-magic-gradient';

// Auto brightness steps (default)
createConicGradient('#3498db', { steps: 10, offsetPercent: 25 });

// Hue rotation across the circle
createConicGradient('#e74c3c', { hueRotation: true, steps: 12 });

// Custom starting angle and position
createConicGradient('#9b59b6', { fromAngle: 45, position: '30% 70%' });

// Explicit color stops
createConicGradient('#000', {
  colors: [
    { color: '#ff6b6b', position: '0%' },
    { color: '#feca57', position: '25%' },
    { color: '#48dbfb', position: '75%' },
    { color: '#ff6b6b', position: '100%' },
  ],
});

// Repeating variant
createConicGradient('#2ecc71', { repeating: true, steps: 4, offsetPercent: 30 });
```

**`ConicGradientOptions`**

| Option | Type | Default | Description |
|---|---|---|---|
| `fromAngle` | `number` | `0` | Starting angle in degrees |
| `position` | `string` | `'50% 50%'` | Gradient center |
| `hueRotation` | `boolean` | `false` | Rotate hue instead of adjusting brightness |
| `steps` | `number` | `8` | Number of auto-generated stops |
| `offsetPercent` | `number` | `20` | Brightness offset for auto-generated stops |
| `colors` | `ColorStop[]` | — | Explicit stops |
| `fallbackColor` | `string` | `'#f5e477'` | Fallback color |
| `repeating` | `boolean` | `false` | Use `repeating-conic-gradient` |

#### `createRainbowConicGradient`

Generates a full-spectrum rainbow by cycling through all hues in HSL space.

```ts
import { createRainbowConicGradient } from 'css-magic-gradient';

createRainbowConicGradient();
createRainbowConicGradient({ steps: 24, saturation: 90, lightness: 55, fromAngle: 90 });
createRainbowConicGradient({ repeating: true, steps: 6 });
```

---

### Presets

Ready-to-use gradient strings and dynamic generators powered by `color-value-tools` harmonies.

#### Fixed gradient strings

```ts
import {
  sunsetGradient,
  oceanGradient,
  auroraGradient,
  fireGradient,
  midnightGradient,
  peachGradient,
  mintGradient,
  rainbowGradient,
  glowGradient,
} from 'css-magic-gradient';

// Use directly as a CSS value
element.style.background = sunsetGradient;
```

| Export | Description |
|---|---|
| `sunsetGradient` | Orange → magenta, bottom-right |
| `oceanGradient` | Cyan → dark navy, bottom |
| `auroraGradient` | Violet → green → teal, right |
| `fireGradient` | Yellow → orange → red, top |
| `midnightGradient` | Dark indigo → near-black |
| `peachGradient` | Soft pink → warm orange |
| `mintGradient` | Light green → teal |
| `rainbowGradient` | Full-spectrum conic (24 steps) |
| `glowGradient` | Radial warm-gold glow |

#### Dynamic preset generators

```ts
import {
  createComplementaryGradient,
  createTriadicGradient,
  createAnalogousGradient,
  createMonochromaticGradient,
  createHueWheelGradient,
} from 'css-magic-gradient';

// Base color ↔ its complement (180° hue rotation), HSL-interpolated
createComplementaryGradient('#3498db', { direction: 'to right', steps: 7 });

// 3 colors evenly spaced 120° apart
createTriadicGradient('#e74c3c', { angle: 45 });

// 3 neighboring hues (±30° by default)
createAnalogousGradient('#2ecc71', { direction: 'to bottom right', spread: 45 });

// Light-to-dark shade scale via colorShades()
createMonochromaticGradient('#9b59b6', 7, { direction: 'to right' });

// Hue-wheel conic from any base color
createHueWheelGradient('#3498db', { steps: 16, fromAngle: 45 });
```

---

### Accessibility (WCAG)

```ts
import {
  bestGradientTextColor,
  gradientContrastRatio,
  gradientWcagLevel,
  createAccessibleGradient,
} from 'css-magic-gradient';

// Best text color (#000 or #fff) for text placed over a gradient
bestGradientTextColor('#1a1a2e', '#e94560');  // → '#ffffff'

// WCAG contrast ratio against the gradient's visual midpoint
gradientContrastRatio('#ffffff', '#1a1a2e', '#e94560');  // → 8.3

// WCAG level: 'AAA' | 'AA' | 'AA-large' | 'fail'
gradientWcagLevel('#ffffff', '#1a1a2e', '#e94560');  // → 'AAA'

// Auto-adjust gradient stops until text achieves target WCAG level
const gradient = createAccessibleGradient('#3498db', '#ffffff', {
  direction: 'to right',
  targetLevel: 'AA',   // default
});
// If #3498db already passes AA against #fff → used as-is.
// Otherwise → lightened or darkened in 5% steps until it passes.
```

**`createAccessibleGradient` options**

| Option | Type | Default | Description |
|---|---|---|---|
| `direction` | `string` | `'to bottom'` | CSS direction keyword |
| `angle` | `number` | — | Angle in degrees |
| `targetLevel` | `'AAA' \| 'AA' \| 'AA-large'` | `'AA'` | Minimum WCAG contrast level |
| `interpolation` | `ColorInterpolation` | — | CSS Color Level 4 interpolation |
| `repeating` | `boolean` | `false` | Use `repeating-linear-gradient` |

---

### Vue 3 integration

All hooks return a `ComputedRef<string>` that reacts to `Ref<>` inputs.

#### Setup

```ts
// main.ts
import { createApp } from 'vue';
import { VueGradientPlugin } from 'css-magic-gradient';
import App from './App.vue';

createApp(App).use(VueGradientPlugin).mount('#app');
```

#### Example: reactive gradient in a component

```vue
<script setup>
import { ref } from 'vue';
import {
  useLinearGradient,
  useMixedLinearGradient,
  useConicGradient,
} from 'css-magic-gradient';
// or: import { … } from 'css-magic-gradient/vue';

const color = ref('#3498db');
const opts  = ref({ direction: 'to right', offsetPercent: 20 });

// Updates automatically when color or opts change
const linear = useLinearGradient(color, opts);

// HSL-mixed between two reactive colors
const colorA = ref('#ff6b6b');
const colorB = ref('#4ecdc4');
const mixed  = useMixedLinearGradient(colorA, colorB, 7);

// Hue-rotating conic
const conic = useConicGradient(color, { hueRotation: true, steps: 12 });
</script>

<template>
  <div :style="{ background: linear }">Linear</div>
  <div :style="{ background: mixed  }">Mixed</div>
  <div :style="{ background: conic  }">Conic</div>
</template>
```

#### Global properties (after `VueGradientPlugin` install)

```ts
// In Options API components
this.$useLinearGradient(color, options)
this.$useMultiStepLinearGradient(color, steps, options)
this.$useMixedLinearGradient(colorA, colorB, steps, options)
this.$useRadialGradient(color, options)
this.$useConicGradient(color, options)
this.$useRainbowConicGradient(options)
```

#### Vue hooks

| Hook | Returns | Description |
|---|---|---|
| `useLinearGradient(first, options?)` | `ComputedRef<string>` | Linear gradient from color or stops |
| `useMultiStepLinearGradient(color, steps?, options?)` | `ComputedRef<string>` | Multi-stop brightness gradient |
| `useMixedLinearGradient(colorA, colorB, steps?, options?)` | `ComputedRef<string>` | HSL-interpolated two-color gradient |
| `useRadialGradient(color, options?)` | `ComputedRef<string>` | Radial gradient |
| `useConicGradient(color, options?)` | `ComputedRef<string>` | Conic gradient |
| `useRainbowConicGradient(options?)` | `ComputedRef<string>` | Full-spectrum rainbow conic |

---

### React integration

Import from `css-magic-gradient/react`. React is an optional peer dependency — the main bundle is not affected.

All hooks return a plain `string` memoized with `useMemo`. Values recompute when inputs change (compared by serialized value).

#### Example: color picker with live gradient

```tsx
import { useState } from 'react';
import { useLinearGradient, useMixedLinearGradient } from 'css-magic-gradient/react';

export function GradientCard() {
  const [color, setColor] = useState('#3498db');

  const linear = useLinearGradient(color, { direction: 'to right', offsetPercent: 20 });
  const mixed  = useMixedLinearGradient(color, '#e74c3c', 7);

  return (
    <div>
      <input type="color" value={color} onChange={e => setColor(e.target.value)} />
      <div style={{ background: linear, height: 80, borderRadius: 8 }} />
      <div style={{ background: mixed,  height: 80, borderRadius: 8 }} />
    </div>
  );
}
```

#### Example: radial and conic gradients

```tsx
import { useRadialGradient, useConicGradient, useRainbowConicGradient } from 'css-magic-gradient/react';

export function Showcase() {
  const radial  = useRadialGradient('#9b59b6', { shape: 'circle', offsetPercent: 35 });
  const conic   = useConicGradient('#e74c3c', { hueRotation: true, steps: 12 });
  const rainbow = useRainbowConicGradient({ steps: 24, saturation: 85 });

  return (
    <>
      <div style={{ background: radial,  width: 200, height: 200, borderRadius: '50%' }} />
      <div style={{ background: conic,   width: 200, height: 200, borderRadius: '50%' }} />
      <div style={{ background: rainbow, width: 200, height: 200, borderRadius: '50%' }} />
    </>
  );
}
```

#### React hooks

| Hook | Returns | Description |
|---|---|---|
| `useLinearGradient(first, options?)` | `string` | Linear gradient from color or stops |
| `useMultiStepLinearGradient(color, steps?, options?)` | `string` | Multi-stop brightness gradient |
| `useMixedLinearGradient(colorA, colorB, steps?, options?)` | `string` | HSL-interpolated two-color gradient |
| `useRadialGradient(color, options?)` | `string` | Radial gradient |
| `useConicGradient(color, options?)` | `string` | Conic gradient |
| `useRainbowConicGradient(options?)` | `string` | Full-spectrum rainbow conic |

---

## Entry points

| Entry point | Use for | Contents |
|---|---|---|
| `css-magic-gradient` | Core + Vue | All gradient functions, presets, accessibility, Vue hooks |
| `css-magic-gradient/vue` | Vue subpath | Vue hooks only (subpath alias) |
| `css-magic-gradient/react` | React projects | React hooks only — no Vue dependency |

```ts
// Core
import { createLinearGradient, sunsetGradient, createAccessibleGradient } from 'css-magic-gradient';

// Vue hooks (subpath alias)
import { useLinearGradient } from 'css-magic-gradient/vue';

// React hooks
import { useLinearGradient } from 'css-magic-gradient/react';
```

---

## Requirements

- Node.js >= 16.0.0
- TypeScript >= 5.0 (for projects using type declarations)
- Vue >= 3.0.0 (optional peer dependency, required for Vue hooks)
- React >= 17.0.0 (optional peer dependency, required for React hooks)

---

## Development

```bash
git clone https://github.com/macrulezru/css-magic-gradient.git
cd css-magic-gradient
npm install
npm run build
```

---

## License

MIT

---

## Author

Danil Lisin Vladimirovich aka Macrulez

GitHub: [macrulezru](https://github.com/macrulezru) · Website: [macrulez.ru](https://macrulez.ru/)
