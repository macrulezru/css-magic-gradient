import {
  complement,
  triadic,
  analogous,
  colorShades,
  interpolateColors,
  createColorScale,
  tetradic,
  splitComplementary,
  tints,
  shades,
  tones,
} from 'color-value-tools';
import { createLinearGradient, createMixedLinearGradient } from './linear-gradient.js';
import type { ColorInterpolation, ScaleInterpolation } from './linear-gradient.js';
import { createRadialGradient } from './radial-gradient.js';
import { createConicGradient, createRainbowConicGradient } from './conic-gradient.js';
import { resolveBaseColor, toScaleMode } from './utils.js';

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

/** Forest: fresh light green to deep forest green. */
export const forestGradient = createLinearGradient(
  [
    { color: '#a8e6a3', position: '0%' },
    { color: '#4caf50', position: '50%' },
    { color: '#1b5e20', position: '100%' },
  ],
  { direction: 'to bottom' },
);

/** Golden hour: warm gold → soft pink → rich orange. */
export const goldenHourGradient = createLinearGradient(
  [
    { color: '#ffd700', position: '0%' },
    { color: '#ffb347', position: '40%' },
    { color: '#ff8c69', position: '75%' },
    { color: '#e8508a', position: '100%' },
  ],
  { direction: 'to bottom right' },
);

/** Neon: electric green → vivid pink → bright cyan. */
export const neonGradient = createLinearGradient(
  [
    { color: '#39ff14', position: '0%' },
    { color: '#ff1493', position: '50%' },
    { color: '#00e5ff', position: '100%' },
  ],
  { direction: 'to right' },
);

/** Nordic: icy blue → cool gray → near-white. */
export const nordicGradient = createLinearGradient(
  [
    { color: '#5b8fa8', position: '0%' },
    { color: '#8fa8b8', position: '50%' },
    { color: '#dce8f0', position: '100%' },
  ],
  { direction: 'to bottom' },
);

/** Pastel: soft lavender → blush pink → pale mint. */
export const pastelGradient = createLinearGradient(
  [
    { color: '#d4b8e0', position: '0%' },
    { color: '#f7c5c5', position: '50%' },
    { color: '#b8e0d4', position: '100%' },
  ],
  { direction: 'to right' },
);

/** Deep space: near-black navy → deep indigo → violet accent. */
export const deepSpaceGradient = createLinearGradient(
  [
    { color: '#0a0a1a', position: '0%' },
    { color: '#1a0a3a', position: '40%' },
    { color: '#2d0a6b', position: '75%' },
    { color: '#5a0fa0', position: '100%' },
  ],
  { direction: 'to bottom' },
);

// ─── Dynamic preset generators ────────────────────────────────────────────────

export interface HarmonyGradientOptions {
  direction?: string;
  angle?: number;
  steps?: number;
  /**
   * Color space for JS-side interpolation via `createColorScale`.
   * Restricted to spaces supported by `createColorScale`: 'rgb', 'hsl', 'oklab', 'oklch'.
   * For CSS Color Level 4 output interpolation, use `interpolation` on the
   * underlying gradient function directly.
   */
  interpolationSpace?: ScaleInterpolation;
}

/**
 * Generates a complementary linear gradient (base color ↔ its complement).
 * Uses `interpolateColors` with the specified color space for smooth transitions.
 * Direction defaults to 'to right'.
 */
export function createComplementaryGradient(
  baseColor: string,
  options?: HarmonyGradientOptions,
): string {
  const { direction = 'to right', angle, steps = 5, interpolationSpace = 'oklch' } = options || {};
  const resolved = resolveBaseColor(baseColor, '#f5e477');
  const comp = complement(resolved.hex);
  const mode = toScaleMode(interpolationSpace);
  const colors = interpolateColors(resolved.hex, comp, steps, { space: mode, format: 'hex' });
  return createLinearGradient(
    colors.map(c => ({ color: c })),
    { direction, angle },
  );
}

/**
 * Generates a triadic linear gradient (3 colors evenly spaced 120° apart).
 * `smoothness` controls total interpolated steps (default 3 = just the anchors).
 */
export function createTriadicGradient(
  baseColor: string,
  options?: HarmonyGradientOptions & { smoothness?: number },
): string {
  const {
    direction = 'to right',
    angle,
    smoothness = 3,
    interpolationSpace = 'oklch',
  } = options || {};
  const [c1, c2, c3] = triadic(baseColor);
  const totalSteps = Math.max(3, smoothness);
  if (totalSteps === 3) {
    return createLinearGradient([{ color: c1 }, { color: c2 }, { color: c3 }], {
      direction,
      angle,
    });
  }
  const mode = toScaleMode(interpolationSpace);
  const scale = createColorScale([c1, c2, c3], totalSteps, { space: mode, format: 'hex' });
  return createLinearGradient(
    scale.map(c => ({ color: c })),
    { direction, angle },
  );
}

/**
 * Generates an analogous linear gradient (3 neighboring hues).
 * `spread` controls the hue spread angle passed to `analogous()`.
 */
export function createAnalogousGradient(
  baseColor: string,
  options?: HarmonyGradientOptions & { spread?: number },
): string {
  const { direction = 'to right', angle, spread, interpolationSpace = 'oklch' } = options || {};
  const [c1, c2, c3] = analogous(baseColor, spread);
  const steps = (options?.steps ?? 3);
  if (steps === 3) {
    return createLinearGradient([{ color: c1 }, { color: c2 }, { color: c3 }], {
      direction,
      angle,
    });
  }
  const mode = toScaleMode(interpolationSpace);
  const scale = createColorScale([c1, c2, c3], steps, { space: mode, format: 'hex' });
  return createLinearGradient(
    scale.map(c => ({ color: c })),
    { direction, angle },
  );
}

/**
 * Generates a 4-color gradient based on the tetradic (square) color harmony.
 * Supports 'linear', 'radial', and 'conic' gradient types.
 */
export function createTetradicGradient(
  baseColor: string,
  options?: HarmonyGradientOptions & { type?: 'linear' | 'radial' | 'conic' },
): string {
  const {
    direction = 'to right',
    angle,
    type = 'linear',
    steps = 9,
    interpolationSpace = 'oklch',
  } = options || {};
  const [c1, c2, c3, c4] = tetradic(baseColor);
  const mode = toScaleMode(interpolationSpace);

  if (type === 'conic') {
    const scale = createColorScale([c1, c2, c3, c4, c1], steps, { space: mode, format: 'hex' });
    const stops = scale
      .map((c, i) => `${c} ${((i / (scale.length - 1)) * 100).toFixed(1)}%`)
      .join(', ');
    return `conic-gradient(from 0deg at 50% 50%, ${stops})`;
  }

  if (type === 'radial') {
    const scale = createColorScale([c1, c2, c3, c4], steps, { space: mode, format: 'hex' });
    return createRadialGradient(baseColor, {
      colors: scale.map(c => ({ color: c })),
    });
  }

  const scale = createColorScale([c1, c2, c3, c4], steps, { space: mode, format: 'hex' });
  return createLinearGradient(
    scale.map(c => ({ color: c })),
    { direction, angle },
  );
}

/**
 * Generates a gradient based on the split-complementary color harmony
 * (base + two colors at 150° and 210°).
 */
export function createSplitComplementaryGradient(
  baseColor: string,
  options?: HarmonyGradientOptions,
): string {
  const { direction = 'to right', angle, steps = 5, interpolationSpace = 'oklch' } = options || {};
  const [c1, c2, c3] = splitComplementary(baseColor);
  if (steps === 3) {
    return createLinearGradient([{ color: c1 }, { color: c2 }, { color: c3 }], {
      direction,
      angle,
    });
  }
  const mode = toScaleMode(interpolationSpace);
  const scale = createColorScale([c1, c2, c3], steps, { space: mode, format: 'hex' });
  return createLinearGradient(
    scale.map(c => ({ color: c })),
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
  const colorShadeArr = colorShades(baseColor, steps);
  return createLinearGradient(
    colorShadeArr.map(color => ({ color })),
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

/**
 * Generates a gradient from the base color to white using Oklab tints.
 */
export function createTintGradient(
  baseColor: string,
  steps = 5,
  options?: { direction?: string; angle?: number },
): string {
  const { direction = 'to right', angle } = options || {};
  const resolved = resolveBaseColor(baseColor, '#f5e477');
  const tintColors = tints(resolved.hex, steps);
  return createLinearGradient(
    tintColors.map(c => ({ color: c })),
    { direction, angle },
  );
}

/**
 * Generates a gradient from the base color to black using Oklab shades.
 */
export function createShadeGradient(
  baseColor: string,
  steps = 5,
  options?: { direction?: string; angle?: number },
): string {
  const { direction = 'to right', angle } = options || {};
  const resolved = resolveBaseColor(baseColor, '#f5e477');
  const shadeColors = shades(resolved.hex, steps);
  return createLinearGradient(
    shadeColors.map(c => ({ color: c })),
    { direction, angle },
  );
}

/**
 * Generates a gradient from the base color toward gray using Oklab tones.
 */
export function createToneGradient(
  baseColor: string,
  steps = 5,
  options?: { direction?: string; angle?: number; gray?: string },
): string {
  const { direction = 'to right', angle, gray } = options || {};
  const resolved = resolveBaseColor(baseColor, '#f5e477');
  const toneColors = tones(resolved.hex, steps, gray);
  return createLinearGradient(
    toneColors.map(c => ({ color: c })),
    { direction, angle },
  );
}
