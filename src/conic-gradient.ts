import { adjustHexBrightness, rotateHue, hslToHex } from 'color-value-tools';
import { ColorStop, colorStopToString, resolveBaseColor } from './utils.js';

export type { ColorStop as ConicGradientColorStop };

export interface ConicGradientOptions {
  /** Starting angle in degrees. Default: 0 */
  fromAngle?: number;
  /** Gradient center position. Default: '50% 50%' */
  position?: string;
  fallbackColor?: string;
  /** Explicit color stops — when provided, skips auto-generation. */
  colors?: ColorStop[];
  /** Rotate hue evenly across all steps instead of adjusting brightness. */
  hueRotation?: boolean;
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
 * When `options.colors` is provided, those stops are used directly.
 * When `options.hueRotation` is true, auto-generates stops by rotating hue.
 * Otherwise, auto-generates stops by adjusting brightness.
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
    hueRotation = false,
    steps = 8,
    offsetPercent = 20,
    repeating = false,
  } = options || {};

  const fn = repeating ? 'repeating-conic-gradient' : 'conic-gradient';
  const header = `from ${fromAngle}deg at ${position}`;

  // Explicit stops mode
  if (customColors && customColors.length > 0) {
    const stops = customColors.map(colorStopToString).join(', ');
    return `${fn}(${header}, ${stops})`;
  }

  const resolved = resolveBaseColor(baseColor, fallbackColor);
  const colorStops: string[] = [];

  if (hueRotation) {
    for (let i = 0; i < steps; i++) {
      const degrees = (i * 360) / steps;
      const positionPercent = (i * 100) / steps;
      colorStops.push(`${rotateHue(resolved.hex, degrees)} ${positionPercent}%`);
    }
    // Close the circle smoothly
    colorStops.push(`${rotateHue(resolved.hex, 0)} 100%`);
  } else {
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
