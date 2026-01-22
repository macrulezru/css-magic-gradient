# css-magic-gradient

Generate CSS gradients (linear, radial, conic) with zero dependencies. TypeScript-first, Vue plugin included.

## Installation

```
npm install css-magic-gradient
```

## Usage (Vanilla/TypeScript)

```ts
import { createLinearGradient, createRadialGradient, createConicGradient } from 'css-magic-gradient';

const linear = createLinearGradient('#ff0000');
const radial = createRadialGradient('#00ff00');
const conic = createConicGradient('#0000ff');
```


## API & Options


### Linear Gradient

**createLinearGradient(baseColor, options?)**

- `baseColor` (string): Base color (hex, CSS variable, etc)
- `options` (object, optional):
	- `offsetPercent` (number): Brightness offset for the start color, -100 to 100 (default: 15)
	- `direction` (string): CSS direction, e.g. 'to right', 'to bottom', or custom (default: 'to bottom')
	- `angle` (number): Angle in degrees (overrides direction)
	- `fallbackColor` (string): Fallback color if variable not found (default: '#f5e477')


#### Custom color stops example:

For fully custom color stops and positions, pass an array of stops as the first argument to `createLinearGradient`:

```ts
import { createLinearGradient } from 'css-magic-gradient';

const gradient = createLinearGradient([
  { color: '#00f', position: '0%' },
  { color: '#fff', opacity: 0.5, position: '50%' },
  { color: '#f00', position: '100%' }
], {
  direction: 'to right'
});
// Produces a linear gradient with custom color stops and positions
```

### Radial Gradient

**createRadialGradient(baseColor, options?)**

- `baseColor` (string): Base color
- `options` (object, optional):
	- `offsetPercent` (number): Brightness offset for the start color (default: 15)
	- `fallbackColor` (string): Fallback color (default: '#f5e477')
	- `shape` ('circle' | 'ellipse'): Shape of the gradient (default: 'ellipse')
	- `size` (string | { width: string, height: string }): Size, e.g. '50% 50%' or object (default: 'farthest-corner')
	- `position` (string): Center position, e.g. 'center', '50% 50%' (default: 'center')
	- `useCustomColors` (boolean): Use custom color stops (see below)
	- `colors` (array): Custom color stops: `{ color, opacity?, position? }`
	- `layers` (array): Multi-layer gradients, each with its own shape/size/colors

**Custom color stops example:**

```ts
createRadialGradient('#00f', {
	useCustomColors: true,
	colors: [
		{ color: '#00f', position: '0%' },
		{ color: '#fff', opacity: 0.5, position: '100%' }
	]
})
```

### Conic Gradient

**createConicGradient(baseColor, options?)**

- `baseColor` (string): Base color
- `options` (object, optional):
	- `fromAngle` (number): Start angle in degrees (default: 0)
	- `position` (string): Center position (default: '50% 50%')
	- `fallbackColor` (string): Fallback color (default: '#f5e477')
	- `colors` (array): Custom color stops: `{ color, opacity?, position? }`
	- `hueRotation` (boolean): Use hue rotation for steps (default: false)
	- `steps` (number): Number of steps for auto-generation (default: 8)
	- `offsetPercent` (number): Brightness offset for steps (default: 20)

**Custom color stops example:**

```ts
createConicGradient('#f00', {
	colors: [
		{ color: '#f00', position: '0%' },
		{ color: '#0f0', position: '50%' },
		{ color: '#00f', position: '100%' }
	]
})
```

### Color Utilities

The package also exports a set of helper utilities for working with colors. Import them from the package, for example: `import { normalizeHex, isHexColor } from 'css-magic-gradient'`.

- **`isCssVariable`**: Check if a string is a CSS variable (e.g. `var(--main)`).
- **`isHexColor`**: Detect hex color strings (3- or 6-digit, with or without `#`).
- **`isRgbColor`**: Detect `rgb()` / `rgba()` color strings.
- **`isHslColor`**: Detect `hsl()` / `hsla()` color strings.
- **`getColorType`**: Returns the color type: `hex`, `css-var`, `rgb`, `hsl`, `named`, or `unknown`.
- **`extractCssVariableName`**: Extracts the CSS variable name from `var(--name)`.
- **`normalizeHex`**: Normalizes and validates hex strings, returns a 6-digit lowercase hex (fallback `#f5e477`).
- **`hexToRgb`**: Convert a hex color to an `[r, g, b]` tuple.
- **`hexToRgba`**: Convert a hex color to an `rgba(...)` string with opacity.
- **`hexToHsl`**: Convert a hex color to an `[h, s, l]` tuple.
- **`hslToHex`**: Convert HSL values to a hex color string.
- **`adjustHexBrightness`**: Lighten or darken a hex color by a percentage offset.
- **`rotateHue`**: Rotate the hue of a hex color by degrees.

## Vue 3 Plugin & Reactive Hooks

This package provides a Vue 3 plugin and composition API hooks for fully reactive gradients.

### Register plugin (optional)

```ts
import { createApp } from 'vue';
import App from './App.vue';
import { VueGradientPlugin } from 'css-magic-gradient';

const app = createApp(App);
app.use(VueGradientPlugin);
```

### Usage in setup()

```ts
import { ref } from 'vue';
import { useLinearGradient, useRadialGradient, useConicGradient } from 'css-magic-gradient';

const color = ref('#ff0000');
const options = ref({ direction: 'to right' });

const linearGradient = useLinearGradient(color, options); // ComputedRef<string>
const radialGradient = useRadialGradient(color);
const conicGradient = useConicGradient(color);
```

### Usage via globalProperties (if plugin registered)

```ts
// In any component:
const gradient = this.$useLinearGradient('#00f');
```

## Author

Danil Lisin Vladimirovich aka Macrulez

GitHub: [macrulezru](https://github.com/macrulezru)

Website: [macrulez.ru](https://macrulez.ru/)

## License

MIT