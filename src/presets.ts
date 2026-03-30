import { complement, triadic, analogous, colorShades, mixColors } from 'color-value-tools';
import { createLinearGradient, createMixedLinearGradient } from './linear-gradient.js';
import { createRadialGradient } from './radial-gradient.js';
import { createConicGradient, createRainbowConicGradient } from './conic-gradient.js';

// ─── Fixed presets ────────────────────────────────────────────────────────────

/** Warm sunset: orange → deep magenta. */
export const sunsetGradient = createLinearGradient(
  [
    { color: '#ff9a3c', position: '0%' },
    { color: '#ff6b6b', position: '50%' },
    { color: '#c0357a', position: '100%' },
  ],
  { direction: 'to bottom right' },
);

/** Deep ocean: light cyan → dark navy. */
export const oceanGradient = createLinearGradient(
  [
    { color: '#43e1f5', position: '0%' },
    { color: '#1a7fd4', position: '50%' },
    { color: '#0a2463', position: '100%' },
  ],
  { direction: 'to bottom' },
);

/** Northern aurora: violet → green → teal. */
export const auroraGradient = createLinearGradient(
  [
    { color: '#7b2ff7', position: '0%' },
    { color: '#0ff591', position: '60%' },
    { color: '#08d9d6', position: '100%' },
  ],
  { direction: 'to right' },
);

/** Fire: yellow → orange → deep red. */
export const fireGradient = createLinearGradient(
  [
    { color: '#ffe600', position: '0%' },
    { color: '#ff7700', position: '45%' },
    { color: '#cc0000', position: '100%' },
  ],
  { direction: 'to top' },
);

/** Midnight: dark indigo → near-black navy. */
export const midnightGradient = createLinearGradient(
  [
    { color: '#2d1b69', position: '0%' },
    { color: '#11101d', position: '100%' },
  ],
  { direction: 'to bottom' },
);

/** Peach: soft pink → warm orange. */
export const peachGradient = createLinearGradient(
  [
    { color: '#ffd6cc', position: '0%' },
    { color: '#ffb347', position: '100%' },
  ],
  { direction: 'to bottom right' },
);

/** Mint: light green → teal. */
export const mintGradient = createLinearGradient(
  [
    { color: '#d4f7e0', position: '0%' },
    { color: '#11998e', position: '100%' },
  ],
  { direction: 'to bottom' },
);

/** Full-spectrum rainbow conic. */
export const rainbowGradient = createRainbowConicGradient({ steps: 24 });

/** Radial glow centered on a warm gold. */
export const glowGradient = createRadialGradient('#f5c842', {
  shape: 'circle',
  size: 'farthest-corner',
  position: 'center',
  offsetPercent: 40,
});

// ─── Dynamic preset generators ────────────────────────────────────────────────

/**
 * Generates a complementary linear gradient (base color ↔ its complement).
 * Direction defaults to 'to right'.
 */
export function createComplementaryGradient(
  baseColor: string,
  options?: { direction?: string; angle?: number; steps?: number },
): string {
  const { direction = 'to right', angle, steps = 5 } = options || {};
  const comp = complement(baseColor);
  return createMixedLinearGradient(baseColor, comp, steps, { direction, angle });
}

/**
 * Generates a triadic linear gradient (3 colors evenly spaced 120° apart).
 */
export function createTriadicGradient(
  baseColor: string,
  options?: { direction?: string; angle?: number },
): string {
  const { direction = 'to right', angle } = options || {};
  const [c1, c2, c3] = triadic(baseColor);
  return createLinearGradient(
    [{ color: c1 }, { color: c2 }, { color: c3 }],
    { direction, angle },
  );
}

/**
 * Generates an analogous linear gradient (3 neighboring hues, default ±30°).
 */
export function createAnalogousGradient(
  baseColor: string,
  options?: { direction?: string; angle?: number; spread?: number },
): string {
  const { direction = 'to right', angle, spread } = options || {};
  const [c1, c2, c3] = analogous(baseColor, spread);
  return createLinearGradient(
    [{ color: c1 }, { color: c2 }, { color: c3 }],
    { direction, angle },
  );
}

/**
 * Generates a monochromatic linear gradient using `steps` shades of the base
 * color, from lightest to darkest.
 */
export function createMonochromaticGradient(
  baseColor: string,
  steps = 5,
  options?: { direction?: string; angle?: number },
): string {
  const { direction = 'to bottom', angle } = options || {};
  const shades = colorShades(baseColor, steps);
  return createLinearGradient(
    shades.map(color => ({ color })),
    { direction, angle },
  );
}

/**
 * Generates a hue-rotating conic gradient from any base color.
 */
export function createHueWheelGradient(
  baseColor: string,
  options?: { fromAngle?: number; position?: string; steps?: number },
): string {
  return createConicGradient(baseColor, { hueRotation: true, ...options });
}
