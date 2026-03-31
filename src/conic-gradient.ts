import {
  adjustHexBrightness,
  rotateHue,
  hslToHex,
  complement,
  triadic,
  tetradic,
  analogous,
  createColorScale,
} from 'color-value-tools';
import type { ScaleInterpolation } from './linear-gradient.js';
import { ColorStop, colorStopToString, resolveBaseColor, toScaleMode } from './utils.js';

export type { ColorStop as ConicGradientColorStop };

export type ConicHarmonyType = 'complementary' | 'triadic' | 'tetradic' | 'analogous';

export interface ConicGradientOptions {
  /** Starting angle in degrees. Default: 0 */
  fromAngle?: number;
  /** Gradient center position. Default: '50% 50%' */
  position?: string;
  fallbackColor?: string;
  /** Explicit color stops — when provided, skips auto-generation. */
  colors?: ColorStop[];
  /**
   * Array of hex/CSS color strings for the colorScale mode. The gradient
   * smoothly interpolates through all given colors around the full circle.
   * When set, `baseColor` and `colors` are ignored.
   */
  colorScale?: string[];
  /** Rotate hue evenly across all steps instead of adjusting brightness. */
  hueRotation?: boolean;
  /**
   * Generate stops from a color harmony derived from the base color.
   * The harmony colors are interpolated around the full circle.
   */
  harmonyType?: ConicHarmonyType;
  /**
   * Color space used for JS-side interpolation in harmony and colorScale modes.
   * Restricted to spaces supported by `createColorScale`: 'rgb' | 'hsl' | 'oklab' | 'oklch'.
   * Default: 'oklch'.
   */
  interpolationSpace?: ScaleInterpolation;
  /** Number of auto-generated stops. Default: 8 */
  steps?: number;
  /** Brightness offset (%) for auto-generated brightness stops. Default: 20 */
  offsetPercent?: number;
  /** Use repeating-conic-gradient instead of conic-gradient. */
  repeating?: boolean;
}

/**
 * Creates a CSS conic gradient.
 *
 * Modes (evaluated in priority order):
 * 1. `colorScale` — interpolates through an array of colors around the circle.
 * 2. `harmonyType` — auto-generates colors from a color harmony.
 * 3. `colors` — uses explicit ColorStop array directly.
 * 4. `hueRotation` — rotates hue evenly across all steps.
 * 5. Auto-generate stops by adjusting brightness.
 *
 * Supports hex, rgb(), hsl(), named colors, and CSS variables as baseColor.
 */
export function createConicGradient(
  baseColor: string,
  options?: ConicGradientOptions,
): string {
  const {
    fromAngle = 0,
    position = '50% 50%',
    fallbackColor = '#f5e477',
    colors: customColors,
    colorScale,
    hueRotation = false,
    harmonyType,
    interpolationSpace = 'oklch',
    steps = 8,
    offsetPercent = 20,
    repeating = false,
  } = options || {};

  const fn = repeating ? 'repeating-conic-gradient' : 'conic-gradient';
  const header = `from ${fromAngle}deg at ${position}`;
  const scaleMode = toScaleMode(interpolationSpace);

  // ── colorScale mode: interpolate through an arbitrary list of colors ────────
  if (colorScale && colorScale.length >= 2) {
    // Close the loop by appending the first color at the end
    const anchors = [...colorScale, colorScale[0]];
    const scale = createColorScale(anchors, steps + 1, { space: scaleMode, format: 'hex' });
    const stops = scale
      .map((c, i) => `${c} ${((i / (scale.length - 1)) * 100).toFixed(1)}%`)
      .join(', ');
    return `${fn}(${header}, ${stops})`;
  }

  const resolved = resolveBaseColor(baseColor, fallbackColor);

  // ── harmonyType mode: use color harmony around the circle ───────────────────
  if (harmonyType) {
    let harmonyColors: string[];
    switch (harmonyType) {
      case 'complementary':
        harmonyColors = [resolved.hex, complement(resolved.hex)];
        break;
      case 'triadic':
        harmonyColors = triadic(resolved.hex);
        break;
      case 'tetradic':
        harmonyColors = tetradic(resolved.hex);
        break;
      case 'analogous':
        harmonyColors = analogous(resolved.hex);
        break;
    }
    // Close the circle by looping back to the start
    const anchors = [...harmonyColors, harmonyColors[0]];
    const scale = createColorScale(anchors, steps + 1, { space: scaleMode, format: 'hex' });
    const stops = scale
      .map((c, i) => `${c} ${((i / (scale.length - 1)) * 100).toFixed(1)}%`)
      .join(', ');
    return `${fn}(${header}, ${stops})`;
  }

  // ── Explicit stops mode ─────────────────────────────────────────────────────
  if (customColors && customColors.length > 0) {
    const stops = customColors.map(colorStopToString).join(', ');
    return `${fn}(${header}, ${stops})`;
  }

  const colorStops: string[] = [];

  // ── hueRotation mode ────────────────────────────────────────────────────────
  if (hueRotation) {
    for (let i = 0; i < steps; i++) {
      const degrees = (i * 360) / steps;
      const positionPercent = (i * 100) / steps;
      colorStops.push(`${rotateHue(resolved.hex, degrees)} ${positionPercent}%`);
    }
    // Close the circle smoothly
    colorStops.push(`${rotateHue(resolved.hex, 0)} 100%`);
  } else {
    // ── Brightness mode (default) ──────────────────────────────────────────
    for (let i = 0; i < steps; i++) {
      const percent = offsetPercent * (1 - i / (steps - 1));
      const positionPercent = (i * 100) / steps;
      colorStops.push(`${adjustHexBrightness(resolved.hex, percent)} ${positionPercent}%`);
    }
    colorStops.push(`${adjustHexBrightness(resolved.hex, 0)} 100%`);
  }

  return `${fn}(${header}, ${colorStops.join(', ')})`;
}

/**
 * Creates a full-spectrum rainbow conic gradient using HSL color space.
 * The gradient smoothly cycles through all hues starting at `fromAngle`.
 */
export function createRainbowConicGradient(options?: {
  fromAngle?: number;
  position?: string;
  saturation?: number;
  lightness?: number;
  steps?: number;
  repeating?: boolean;
}): string {
  const {
    fromAngle = 0,
    position = '50% 50%',
    saturation = 80,
    lightness = 60,
    steps = 12,
    repeating = false,
  } = options || {};

  const fn = repeating ? 'repeating-conic-gradient' : 'conic-gradient';
  const stepSize = 360 / steps;
  const colorStops: string[] = [];

  for (let i = 0; i <= steps; i++) {
    const hue = (i * stepSize) % 360;
    colorStops.push(`${hslToHex(hue, saturation, lightness)} ${(i * 100) / steps}%`);
  }

  return `${fn}(from ${fromAngle}deg at ${position}, ${colorStops.join(', ')})`;
}
