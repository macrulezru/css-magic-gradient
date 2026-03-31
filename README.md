# css-magic-gradient

TypeScript library for generating CSS gradients — linear, radial, and conic. Includes gradient presets, color harmony generators, WCAG accessibility utilities, CSS variable support, canvas export, Vue 3 reactive hooks, and React hooks.

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
```

#### `createRadialGradient` — color harmony mode

```ts
// Automatically derive stops from a color harmony
createRadialGradient('#3498db', {
  harmonyType: 'triadic',
  interpolationSpace: 'oklch',
});

createRadialGradient('#e74c3c', {
  harmonyType: 'analogous',
  shape: 'circle',
});
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
| `harmonyType` | `'complementary' \| 'triadic' \| 'tetradic' \| 'analogous'` | — | Auto-generate stops from a color harmony |
| `interpolationSpace` | `'rgb' \| 'hsl' \| 'oklab' \| 'oklch'` | `'oklch'` | Color space for JS-side interpolation. Subset supported by `createColorScale` |

---

#### `createRadialGradientLayers`

Utility that generates a set of `RadialGradientLayer` objects with evenly distributed sizes and harmony-derived colors. Produces a nested multi-ring radial effect when passed to `createRadialGradient`.

```ts
import { createRadialGradientLayers, createRadialGradient } from 'css-magic-gradient';

const layers = createRadialGradientLayers('#3498db', {
  count: 4,
  harmonyType: 'triadic',
  interpolationSpace: 'oklch',
  minSizePercent: 20,
  maxSizePercent: 100,
});

const gradient = createRadialGradient('#3498db', { layers });
```

| Option | Type | Default | Description |
|---|---|---|---|
| `count` | `number` | `3` | Number of layers |
| `minSizePercent` | `number` | `20` | Smallest layer size (%) |
| `maxSizePercent` | `number` | `100` | Largest layer size (%) |
| `harmonyType` | `RadialHarmonyType` | `'analogous'` | Color distribution strategy |
| `interpolationSpace` | `'rgb' \| 'hsl' \| 'oklab' \| 'oklch'` | `'oklch'` | Color space for JS-side interpolation |
| `position` | `string` | `'center'` | Shared center position |

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

// Color harmony mode — interpolates harmony colors around the full circle
createConicGradient('#e74c3c', { harmonyType: 'triadic', steps: 24 });
createConicGradient('#3498db', { harmonyType: 'tetradic', interpolationSpace: 'oklab' });

// Color scale mode — interpolates through an arbitrary list of colors
createConicGradient('#000', {
  colorScale: ['#ff0000', '#00ff00', '#0000ff'],
  steps: 36,
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
| `harmonyType` | `'complementary' \| 'triadic' \| 'tetradic' \| 'analogous'` | — | Generate from a color harmony |
| `colorScale` | `string[]` | — | Interpolate through arbitrary colors around the circle |
| `interpolationSpace` | `'rgb' \| 'hsl' \| 'oklab' \| 'oklch'` | `'oklch'` | Color space for JS-side interpolation |
| `steps` | `number` | `8` | Number of generated stops |
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

Ready-to-use gradient strings and dynamic generators.

#### Fixed gradient strings

```ts
import {
  sunsetGradient, oceanGradient, auroraGradient, fireGradient,
  midnightGradient, peachGradient, mintGradient, rainbowGradient, glowGradient,
  forestGradient, goldenHourGradient, neonGradient,
  nordicGradient, pastelGradient, deepSpaceGradient,
} from 'css-magic-gradient';

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
| `forestGradient` | Light green → deep forest green |
| `goldenHourGradient` | Warm gold → pink → orange |
| `neonGradient` | Electric green → vivid pink → bright cyan |
| `nordicGradient` | Icy blue → cool gray → near-white |
| `pastelGradient` | Soft lavender → blush pink → pale mint |
| `deepSpaceGradient` | Near-black navy → deep indigo → violet |

#### Color harmony generators

These use `interpolateColors` / `createColorScale` from `color-value-tools` for smooth perceptual transitions.

```ts
import {
  createComplementaryGradient,
  createTriadicGradient,
  createAnalogousGradient,
  createTetradicGradient,
  createSplitComplementaryGradient,
  createMonochromaticGradient,
  createHueWheelGradient,
} from 'css-magic-gradient';

// Base color ↔ complement, interpolated in oklch (default)
createComplementaryGradient('#3498db', { steps: 7, interpolationSpace: 'oklch' });

// Triadic — 3 colors 120° apart; smoothness = total interpolated steps
createTriadicGradient('#e74c3c', { smoothness: 9, interpolationSpace: 'oklab' });

// Analogous — spread controls hue angle passed to analogous()
createAnalogousGradient('#2ecc71', { spread: 45, steps: 7 });

// Tetradic — 4 colors 90° apart; supports linear, radial, conic
createTetradicGradient('#9b59b6', { type: 'linear' });
createTetradicGradient('#9b59b6', { type: 'conic',  steps: 24 });
createTetradicGradient('#9b59b6', { type: 'radial', interpolationSpace: 'oklch' });

// Split-complementary — base + two colors at 150° and 210°
createSplitComplementaryGradient('#3498db', { steps: 5 });

// Monochromatic shades via colorShades()
createMonochromaticGradient('#9b59b6', 7, { direction: 'to right' });

// Hue-wheel conic from any base color
createHueWheelGradient('#3498db', { steps: 16, fromAngle: 45 });
```

**`HarmonyGradientOptions`**

| Option | Type | Default | Description |
|---|---|---|---|
| `direction` | `string` | `'to right'` | CSS direction keyword |
| `angle` | `number` | — | Angle in degrees |
| `steps` | `number` | `5` | Interpolation steps (3 = only anchor colors) |
| `interpolationSpace` | `'rgb' \| 'hsl' \| 'oklab' \| 'oklch'` | `'oklch'` | Color space for JS-side interpolation |

> **`interpolationSpace` vs `interpolation`** — these serve different purposes. `interpolationSpace` controls how JavaScript mixes colors when building the stop list (via `createColorScale`/`interpolateColors`). `interpolation` (on `createLinearGradient` etc.) adds `in oklch` to the CSS output and lets the **browser** interpolate between stops. Harmony generators produce pre-computed stop arrays, so only `interpolationSpace` applies to them.
>
> `'lab'` and `'lch'` are intentionally absent from `interpolationSpace` — `createColorScale` does not support them. Use `'oklab'` and `'oklch'` instead (perceptually superior successors).

#### Palette generators

Generate gradients through tints, shades, or tones using Oklab-based interpolation from `color-value-tools`.

```ts
import {
  createTintGradient,
  createShadeGradient,
  createToneGradient,
} from 'css-magic-gradient';

// Base color → white (through Oklab tints)
createTintGradient('#3498db', 7, { direction: 'to right' });

// Base color → black (through Oklab shades)
createShadeGradient('#e74c3c', 5);

// Base color → gray (through Oklab tones)
createToneGradient('#9b59b6', 7, { gray: '#707070' });
```

| Function | Description |
|---|---|
| `createTintGradient(color, steps?, opts?)` | Gradient from base color toward white |
| `createShadeGradient(color, steps?, opts?)` | Gradient from base color toward black |
| `createToneGradient(color, steps?, opts?)` | Gradient from base color toward gray. Accepts optional `gray` color |

---

### Accessibility (WCAG)

#### `bestGradientTextColor`

Returns `'#000000'` or `'#ffffff'` — whichever achieves the best minimum contrast across all gradient stops.

```ts
import { bestGradientTextColor } from 'css-magic-gradient';

// Two-color gradient (backward-compatible)
bestGradientTextColor('#1a1a2e', '#e94560');
// → '#ffffff'

// Multi-stop gradient
bestGradientTextColor(['#1a1a2e', '#c0357a', '#e94560']);
// → '#ffffff'

// Detailed result with per-color scores
const detail = bestGradientTextColor(['#1a1a2e', '#e94560'], { detailed: true });
// → { recommended: '#ffffff', black: { contrast: 1.8, wcag: 'fail' }, white: { contrast: 9.3, wcag: 'AAA' } }
```

#### `gradientContrastRatio`

Returns the **minimum** WCAG contrast ratio of a text color against the gradient. Samples 11 evenly distributed points along the gradient.

```ts
import { gradientContrastRatio } from 'css-magic-gradient';

// Two colors (backward-compatible)
gradientContrastRatio('#ffffff', '#1a1a2e', '#e94560');
// → minimum ratio across all sampled points

// Array of stops
gradientContrastRatio('#ffffff', ['#1a1a2e', '#c0357a', '#e94560']);
```

#### `gradientWcagLevel`

Returns a detailed `GradientWcagReport` with the worst-case WCAG level, minimum contrast, and positions that fail the AA threshold.

```ts
import { gradientWcagLevel } from 'css-magic-gradient';

const report = gradientWcagLevel('#ffffff', '#1a1a2e', '#e94560');
// → {
//     level: 'AAA',
//     minContrast: 8.4,
//     problematicStops: []   // positions (0–1) where contrast < 4.5
//   }

// With a gradient that has a weak midpoint:
const report2 = gradientWcagLevel('#ffffff', ['#ffffff', '#aaaaaa', '#3498db']);
// → { level: 'fail', minContrast: 1.07, problematicStops: [0, 0.09, 0.18, …] }
```

**`GradientWcagReport`**

| Field | Type | Description |
|---|---|---|
| `level` | `WcagLevel` | Worst WCAG level found across all sampled stops |
| `minContrast` | `number` | Minimum contrast ratio along the gradient |
| `problematicStops` | `number[]` | Fractional positions (0–1) where contrast < 4.5 |

#### `createAccessibleGradient`

Auto-adjusts gradient stops until `textColor` achieves the target WCAG level.

```ts
import { createAccessibleGradient } from 'css-magic-gradient';

// Default: adjusts lightness in 5% steps until AA is met
createAccessibleGradient('#3498db', '#ffffff', {
  targetLevel: 'AA',
});

// Adjust saturation instead
createAccessibleGradient('#3498db', '#ffffff', {
  targetLevel: 'AAA',
  adjustmentStrategy: 'saturation',
});

// Adjust both lightness and saturation
createAccessibleGradient('#c0357a', '#000000', {
  adjustmentStrategy: 'both',
  direction: 'to right',
});
```

**`AccessibleGradientOptions`**

| Option | Type | Default | Description |
|---|---|---|---|
| `direction` | `string` | `'to bottom'` | CSS direction keyword |
| `angle` | `number` | — | Angle in degrees |
| `targetLevel` | `'AAA' \| 'AA' \| 'AA-large'` | `'AA'` | Minimum WCAG contrast level |
| `adjustmentStrategy` | `'lightness' \| 'saturation' \| 'both'` | `'lightness'` | How color stops are adjusted |
| `interpolation` | `ColorInterpolation` | — | CSS Color Level 4 interpolation |
| `repeating` | `boolean` | `false` | Use `repeating-linear-gradient` |

---

### CSS variable utilities

```ts
import { extractGradientVariables, resolveGradientVariables } from 'css-magic-gradient';

const gradient = 'linear-gradient(var(--start, #ff0000), var(--end))';

// Extract all CSS custom property names
extractGradientVariables(gradient);
// → ['--start', '--end']

// Substitute variables from a map; falls back to inline fallback or preserves var()
resolveGradientVariables(gradient, { '--end': '#0000ff' });
// → 'linear-gradient(#ff0000, #0000ff)'
```

---

### Canvas & image export

Render gradients to canvas or image data — useful for Open Graph image generation, canvas-based UIs, or server-side rendering with a canvas library (e.g. the [`canvas`](https://www.npmjs.com/package/canvas) npm package).

#### `gradientToCanvasGradient`

Creates a `CanvasGradient` object from the given parameters and applies all color stops.

```ts
import { gradientToCanvasGradient } from 'css-magic-gradient';

const gradient = gradientToCanvasGradient(
  {
    type: 'linear',
    stops: [
      { color: '#ff9a3c', offset: 0 },
      { color: '#c0357a', offset: 1 },
    ],
  },
  ctx,
);

ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);
```

Gradient types:

```ts
// Linear (x0,y0) → (x1,y1); defaults: left-to-right across canvas
{ type: 'linear', stops, x0?, y0?, x1?, y1? }

// Radial — two circles; defaults: concentric circles centered in canvas
{ type: 'radial', stops, x0?, y0?, r0?, x1?, y1?, r1? }

// Conic — startAngle in radians; defaults: center of canvas, 0 rad
{ type: 'conic', stops, startAngle?, x?, y? }
```

#### `gradientToImageData`

Renders the gradient into an `ImageData` object of the given size.

```ts
import { gradientToImageData } from 'css-magic-gradient';

const imageData = gradientToImageData(
  {
    type: 'radial',
    stops: [{ color: '#ffffff', offset: 0 }, { color: '#3498db', offset: 1 }],
  },
  800, 600,
);
```

#### `gradientToDataURL`

Renders the gradient as a PNG data URL (e.g. for `<img src>` or CSS `background`).

```ts
import { gradientToDataURL } from 'css-magic-gradient';

const dataUrl = gradientToDataURL(
  {
    type: 'linear',
    stops: [{ color: '#ff9a3c', offset: 0 }, { color: '#c0357a', offset: 1 }],
  },
  400, 200,
);
// → 'data:image/png;base64,…'
```

> **Note:** Canvas functions require a browser or a server-side canvas implementation. In environments without `document` or `OffscreenCanvas`, they throw a descriptive error.

---

### Vue 3 integration

All hooks return a `ComputedRef<string>` that reacts to `Ref<>` inputs. All hooks are SSR-safe — no DOM access occurs during computation.

#### Setup

```ts
// main.ts
import { createApp } from 'vue';
import { VueGradientPlugin } from 'css-magic-gradient';
import App from './App.vue';

createApp(App).use(VueGradientPlugin).mount('#app');
```

#### Example

```vue
<script setup>
import { ref } from 'vue';
import {
  useLinearGradient,
  useMixedLinearGradient,
  useConicGradient,
  useTetradicGradient,
  useTintGradient,
  useAccessibleGradient,
} from 'css-magic-gradient';

const color = ref('#3498db');

const linear    = useLinearGradient(color, { direction: 'to right', offsetPercent: 20 });
const mixed     = useMixedLinearGradient(color, ref('#e74c3c'), 7);
const conic     = useConicGradient(color, { hueRotation: true, steps: 12 });
const tetradic  = useTetradicGradient(color, { type: 'conic', steps: 24 });
const tint      = useTintGradient(color, 7);
const accessible = useAccessibleGradient(color, ref('#ffffff'), { targetLevel: 'AA' });
</script>

<template>
  <div :style="{ background: linear }">Linear</div>
  <div :style="{ background: tetradic }">Tetradic conic</div>
  <div :style="{ background: tint }">Tint</div>
  <div :style="{ background: accessible }">Accessible</div>
</template>
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
| `useComplementaryGradient(color, options?)` | `ComputedRef<string>` | Complementary harmony gradient |
| `useTriadicGradient(color, options?)` | `ComputedRef<string>` | Triadic harmony gradient |
| `useAnalogousGradient(color, options?)` | `ComputedRef<string>` | Analogous harmony gradient |
| `useTetradicGradient(color, options?)` | `ComputedRef<string>` | Tetradic harmony gradient (linear/radial/conic) |
| `useSplitComplementaryGradient(color, options?)` | `ComputedRef<string>` | Split-complementary harmony gradient |
| `useTintGradient(color, steps?, options?)` | `ComputedRef<string>` | Tint gradient (base → white) |
| `useShadeGradient(color, steps?, options?)` | `ComputedRef<string>` | Shade gradient (base → black) |
| `useToneGradient(color, steps?, options?)` | `ComputedRef<string>` | Tone gradient (base → gray) |
| `useAccessibleGradient(color, textColor, options?)` | `ComputedRef<string>` | Auto-adjusted WCAG-compliant gradient |

#### Global properties (after `VueGradientPlugin` install)

```ts
this.$useLinearGradient(color, options)
this.$useTetradicGradient(color, options)
this.$useTintGradient(color, steps, options)
this.$useAccessibleGradient(color, textColor, options)
// … all hooks available as $use* on the Vue instance
```

---

### React integration

Import from `css-magic-gradient/react`. React is an optional peer dependency — the main bundle is unaffected. All hooks return a plain `string` memoized with `useMemo`, and are SSR-safe.

#### Example

```tsx
import { useState } from 'react';
import {
  useLinearGradient,
  useTetradicGradient,
  useTintGradient,
  useAccessibleGradient,
} from 'css-magic-gradient/react';

export function GradientShowcase() {
  const [color, setColor] = useState('#3498db');

  const linear     = useLinearGradient(color, { direction: 'to right', offsetPercent: 20 });
  const tetradic   = useTetradicGradient(color, { type: 'conic', steps: 24 });
  const tint       = useTintGradient(color, 7);
  const accessible = useAccessibleGradient(color, '#ffffff', { targetLevel: 'AA' });

  return (
    <div>
      <input type="color" value={color} onChange={e => setColor(e.target.value)} />
      <div style={{ background: linear,     height: 80, borderRadius: 8 }} />
      <div style={{ background: tetradic,   height: 80, borderRadius: 8 }} />
      <div style={{ background: tint,       height: 80, borderRadius: 8 }} />
      <div style={{ background: accessible, height: 80, borderRadius: 8 }} />
    </div>
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
| `useComplementaryGradient(color, options?)` | `string` | Complementary harmony gradient |
| `useTriadicGradient(color, options?)` | `string` | Triadic harmony gradient |
| `useAnalogousGradient(color, options?)` | `string` | Analogous harmony gradient |
| `useTetradicGradient(color, options?)` | `string` | Tetradic harmony gradient (linear/radial/conic) |
| `useSplitComplementaryGradient(color, options?)` | `string` | Split-complementary harmony gradient |
| `useTintGradient(color, steps?, options?)` | `string` | Tint gradient (base → white) |
| `useShadeGradient(color, steps?, options?)` | `string` | Shade gradient (base → black) |
| `useToneGradient(color, steps?, options?)` | `string` | Tone gradient (base → gray) |
| `useAccessibleGradient(color, textColor, options?)` | `string` | Auto-adjusted WCAG-compliant gradient |

---

## Entry points

| Entry point | Use for | Contents |
|---|---|---|
| `css-magic-gradient` | Core + Vue | All gradient functions, presets, accessibility, CSS variable utils, canvas export, Vue hooks |
| `css-magic-gradient/vue` | Vue subpath | Vue hooks only (subpath alias) |
| `css-magic-gradient/react` | React projects | React hooks only — no Vue dependency |

```ts
// Core
import {
  createLinearGradient,
  createTetradicGradient,
  sunsetGradient,
  createAccessibleGradient,
  extractGradientVariables,
  gradientToDataURL,
} from 'css-magic-gradient';

// Vue hooks (subpath alias)
import { useTetradicGradient } from 'css-magic-gradient/vue';

// React hooks
import { useTintGradient } from 'css-magic-gradient/react';
```

---

## Changelog

### 1.2.0

- **New gradient types:** `createTetradicGradient`, `createSplitComplementaryGradient`
- **Extended generators:** `createComplementaryGradient`, `createTriadicGradient`, `createAnalogousGradient` now support `interpolationSpace` and use `interpolateColors`/`createColorScale` from `color-value-tools`
- **Palette generators:** `createTintGradient`, `createShadeGradient`, `createToneGradient` using Oklab-based `tints`/`shades`/`tones`
- **Conic gradients:** new `harmonyType`, `colorScale`, `interpolationSpace` options
- **Radial gradients:** new `harmonyType`, `interpolationSpace` options; new `createRadialGradientLayers` utility
- **Accessibility:** `gradientContrastRatio` now checks 11 sample points (returns minimum); `gradientWcagLevel` returns `GradientWcagReport` with `minContrast` and `problematicStops`; `bestGradientTextColor` supports multi-stop arrays and `detailed` mode; `createAccessibleGradient` adds `adjustmentStrategy`
- **CSS variables:** `extractGradientVariables`, `resolveGradientVariables`
- **Canvas export:** `gradientToCanvasGradient`, `gradientToImageData`, `gradientToDataURL`
- **New presets:** `forestGradient`, `goldenHourGradient`, `neonGradient`, `nordicGradient`, `pastelGradient`, `deepSpaceGradient`
- **New Vue/React hooks:** `useComplementaryGradient`, `useTriadicGradient`, `useAnalogousGradient`, `useTetradicGradient`, `useSplitComplementaryGradient`, `useTintGradient`, `useShadeGradient`, `useToneGradient`, `useAccessibleGradient`
- All hooks are SSR-safe

### 1.1.0

- Initial release with linear, radial, conic gradients, presets, WCAG utilities, Vue 3 and React hooks

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
