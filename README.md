# **CSS Magic Gradient**

![CSS Magic Gradient](https://github.com/macrulezru/assets/blob/master/packages-images/css-magic-gradient.png?raw=true)

TypeScript library for generating CSS gradients — linear, radial, and conic. Includes gradient presets, color harmony generators, WCAG accessibility utilities, CSS variable support, canvas export, Vue 3 reactive hooks, and React hooks — with a single runtime dependency.

---

## Features

- **`createLinearGradient`** — linear (and repeating) gradients from a single base color or explicit color stops; accepts hex, `rgb()`, `hsl()`, named CSS colors, and CSS variables; CSS Color Level 4 interpolation with `in oklch / lab / hsl`
- **`createRadialGradient`** — radial gradients in auto-brightness, explicit stops, multi-layer, or color-harmony mode; `circle` / `ellipse`, custom size and position
- **`createConicGradient`** — conic gradients with hue-rotation, color-scale, harmony, or explicit stops; `createRainbowConicGradient` for a full-spectrum rainbow in one call
- **Color harmony generators** — `createComplementaryGradient`, `createTriadicGradient`, `createAnalogousGradient`, `createTetradicGradient`, `createSplitComplementaryGradient` — all backed by `color-value-tools` for perceptually uniform interpolation
- **Palette generators** — `createTintGradient`, `createShadeGradient`, `createToneGradient` — Oklab-based tints, shades, and tones
- **15 gradient presets** — `sunsetGradient`, `oceanGradient`, `auroraGradient`, and 12 more ready-to-use gradient strings
- **Accessibility (WCAG)** — `bestGradientTextColor`, `gradientContrastRatio` (11-point sampling), `gradientWcagLevel`, `createAccessibleGradient` — auto-adjust stops to meet AA / AAA
- **CSS variable utilities** — `extractGradientVariables`, `resolveGradientVariables`
- **Canvas & image export** — `gradientToCanvasGradient`, `gradientToImageData`, `gradientToDataURL`; works with any `CanvasRenderingContext2D` or server-side canvas library
- **Vue 3 integration** — `VueGradientPlugin` + 15 reactive `use*` hooks returning `ComputedRef<string>`; SSR-safe; own entry point (`css-magic-gradient/vue`), never loaded unless imported
- **React integration** — same 15 hooks in `css-magic-gradient/react`; plain `string` via `useMemo`; no Vue dependency; SSR-safe
- **Full TypeScript** — exported types for all options, return shapes, and discriminated unions
- **Single runtime dependency** — `color-value-tools` for color math; Vue and React are optional peer deps, and neither is ever pulled in by the core entry point

---

## When you'd reach for this

A gradient that looks smooth in a design mockup can show muddy transitions and visible banding in the browser — css-magic-gradient computes the transition through more accurate color spaces instead of a straight line between two colors, so no banding survives to the output.

- **A background needs to match brand colors** — A brand's design system defines one accent color — the rest of the gradient is generated automatically as a harmonious scheme around it, instead of hunting for neighboring shades by eye.
- **Text over a gradient isn't readable everywhere** — Light text reads fine on the dark end of a gradient and disappears on the light end — contrast can be checked across the whole transition at once, and the color stops shifted automatically so the text stays readable everywhere.
- **A social preview image is generated without a browser** — An image for a shared link gets built on the server when an article is published, not painted by hand each time — the same gradient used on the site can be rendered straight into a plain image file, no browser and no designer required.
- **Only gradient generation is needed, no extra framework** — The utility gets used in a plain TypeScript script or an entirely different framework — Vue and React stay out of the build, even if the rest of the project happens to use them for something else.

---

## Installation

| Environment | Minimum version                                            |
| ----------- | ----------------------------------------------------------- |
| Node.js     | `18+`                                                        |
| `vue`       | `3.0.0+` (optional — only for `css-magic-gradient/vue`)      |
| `react`     | `17.0.0+` (optional — only for `css-magic-gradient/react`)   |

The core entry point (`css-magic-gradient`) never requires `vue` or `react` — only the `/vue` and `/react` subpaths do, and only when you actually import them.

```bash
npm install css-magic-gradient
```

Optional peer dependencies — install only what you need:

```bash
npm install vue@>=3.0.0    # required for Vue hooks
npm install react@>=17.0.0 # required for React hooks
```

### Quick start

**Vanilla TypeScript:**

```ts
import { createLinearGradient, sunsetGradient } from 'css-magic-gradient'

const gradient = createLinearGradient('#3498db', { direction: 'to right' })
// → 'linear-gradient(to right, #5faee3, #3498db)'

document.body.style.background = sunsetGradient
```

**Vue 3:**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useLinearGradient } from 'css-magic-gradient/vue'

const color = ref('#3498db')
const gradient = useLinearGradient(color, { direction: 'to right', offsetPercent: 20 })
</script>

<template>
  <div :style="{ background: gradient }">Hello</div>
</template>
```

**React:**

```tsx
import { useState } from 'react'
import { useLinearGradient } from 'css-magic-gradient/react'

export function Demo() {
  const [color, setColor] = useState('#3498db')
  const gradient = useLinearGradient(color, { direction: 'to right' })

  return <div style={{ background: gradient }}>Hello</div>
}
```

### More examples

#### Vanilla JS

**A gradient that doesn't wreck text readability**

`createAccessibleGradient` adjusts the colors' lightness (or saturation) until white text stays readable across the whole gradient, not just at its ends — checked against real WCAG contrast.

```ts
import { createAccessibleGradient } from 'css-magic-gradient'

const gradient = createAccessibleGradient('#3498db', '#ffffff', {
  targetLevel: 'AA',
})

// Adjusts lightness (or saturation) in small steps until white text stays
// readable across the whole gradient — not just at its two endpoints,
// checked against real WCAG contrast ratios.
```

#### Vue

**Reactive gradients in Vue — contrast check included**

`useTetradicGradient` and `useAccessibleGradient` both return a `ComputedRef` — change the source color and the whole chain, including the accessible variant, recomputes itself.

```ts
import { ref } from 'vue'
import { useTetradicGradient, useAccessibleGradient } from 'css-magic-gradient'

const color = ref('#3498db')

const tetradic = useTetradicGradient(color, { type: 'conic', steps: 24 })
const accessible = useAccessibleGradient(color, ref('#ffffff'), { targetLevel: 'AA' })

// Both are ComputedRef<string> — change color.value and every gradient
// derived from it, including the accessible one, recomputes on its own.
```

#### React

**The same hooks in React — with a live color picker**

Hooks from `css-magic-gradient/react` return a plain `string` memoized with `useMemo` — change `color` through `useState`, and all four gradients recompute along with it.

```tsx
import { useState } from 'react'
import {
  useLinearGradient,
  useTetradicGradient,
  useTintGradient,
  useAccessibleGradient,
} from 'css-magic-gradient/react'

export function GradientShowcase() {
  const [color, setColor] = useState('#3498db')

  const linear = useLinearGradient(color, { direction: 'to right', offsetPercent: 20 })
  const tetradic = useTetradicGradient(color, { type: 'conic', steps: 24 })
  const tint = useTintGradient(color, 7)
  const accessible = useAccessibleGradient(color, '#ffffff', { targetLevel: 'AA' })

  return (
    <div>
      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      <div style={{ background: linear, height: 80, borderRadius: 8 }} />
      <div style={{ background: tetradic, height: 80, borderRadius: 8 }} />
      <div style={{ background: tint, height: 80, borderRadius: 8 }} />
      <div style={{ background: accessible, height: 80, borderRadius: 8 }} />
    </div>
  )
}
```

---

## Documentation & links

- 📖 **Full documentation:** [npm.vuecraft.ru/en/packages/css-magic-gradient](https://npm.vuecraft.ru/en/packages/css-magic-gradient/guide/overview.html)
- 🌐 **VueCraft:** [vuecraft.ru/en](https://vuecraft.ru/en)
- 👤 **Author:** [macrulez.ru/en](https://macrulez.ru/en)
- 💻 **GitHub:** [macrulezru/css-magic-gradient](https://github.com/macrulezru/css-magic-gradient)
- 📦 **NPM:** [css-magic-gradient](https://www.npmjs.com/package/css-magic-gradient)
- 🐛 **Issues:** [github.com/macrulezru/css-magic-gradient/issues](https://github.com/macrulezru/css-magic-gradient/issues)

---

## License

MIT

---

## 💖 Support the project

Open source takes time and effort. If this library saves you time or brings value, consider supporting further development.

<a href="https://donate.cryptocloud.plus/M6O34NIN" target="_blank">
  <img src="https://img.shields.io/badge/Donate-CryptoCloud-8A2BE2?style=for-the-badge&logo=cryptocurrency&logoColor=white" alt="Donate via CryptoCloud">
</a>

Thank you for being part of this journey. ❤️
