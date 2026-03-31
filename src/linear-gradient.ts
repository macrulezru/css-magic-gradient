import { adjustHexBrightness, mixColors } from 'color-value-tools';
import { ColorStop, colorStopToString, resolveBaseColor } from './utils.js';

export type { ColorStop as LinearGradientColorStop };

/** Direction keyword or angle (deg) for a linear gradient. */
export type GradientDirection = 'to bottom' | 'to top' | 'to right' | 'to left' | string;

/** CSS Color Level 4 interpolation color space. */
export type ColorInterpolation = 'srgb' | 'oklch' | 'lab' | 'hsl' | 'oklab' | 'lch';

/**
 * Subset of color spaces supported by `createColorScale` from color-value-tools.
 * `lab` and `lch` are intentionally excluded — `createColorScale` does not accept
 * them. Use `oklab` and `oklch` instead (perceptually superior alternatives).
 */
export type ScaleInterpolation = 'rgb' | 'hsl' | 'oklab' | 'oklch';

export interface GradientOptions {
  /** Brightness offset (%) applied to create the lighter start color. Default: 15 */
  offsetPercent?: number;
  direction?: GradientDirection;
  /** Angle in degrees. Takes precedence over `direction` when provided. */
  angle?: number;
  /** Fallback color for unsupported or CSS-variable inputs. Default: '#f5e477' */
  fallbackColor?: string;
  /** CSS Color Level 4 interpolation method, e.g. 'oklch'. */
  interpolation?: ColorInterpolation;
  /** Use repeating-linear-gradient instead of linear-gradient. */
  repeating?: boolean;
}

export interface CustomLinearGradientOptions {
  direction?: GradientDirection;
  angle?: number;
  interpolation?: ColorInterpolation;
  repeating?: boolean;
}

function buildLinearGradient(
  direction: string,
  stops: string,
  interpolation?: ColorInterpolation,
  repeating = false,
): string {
  const fn = repeating ? 'repeating-linear-gradient' : 'linear-gradient';
  const interp = interpolation ? ` in ${interpolation}` : '';
  return `${fn}(${direction}${interp}, ${stops})`;
}

/**
 * Creates a CSS linear gradient.
 *
 * Overload 1 — from a base color (auto-generates light → dark stops):
 * ```ts
 * createLinearGradient('#3498db', { direction: 'to right', offsetPercent: 20 })
 * ```
 *
 * Overload 2 — from explicit color stops:
 * ```ts
 * createLinearGradient([
 *   { color: '#ff0000', position: '0%' },
 *   { color: '#0000ff', position: '100%' },
 * ], { angle: 45 })
 * ```
 *
 * Supports hex, rgb(), hsl(), named colors, and CSS variables as base color.
 */
export function createLinearGradient(
  first: string | ColorStop[],
  options?: GradientOptions | CustomLinearGradientOptions,
): string {
  if (Array.isArray(first)) {
    const { direction = 'to bottom', angle, interpolation, repeating } =
      (options as CustomLinearGradientOptions) || {};
    const dir = angle ? `${angle}deg` : direction;
    const stops = first.map(colorStopToString).join(', ');
    return buildLinearGradient(dir, stops, interpolation, repeating);
  }

  const {
    offsetPercent = 15,
    direction = 'to bottom',
    angle,
    fallbackColor = '#f5e477',
    interpolation,
    repeating,
  } = (options as GradientOptions) || {};

  const resolved = resolveBaseColor(first, fallbackColor);
  const endColor = resolved.isCssVar ? resolved.varExpression! : resolved.hex;
  const startColor = adjustHexBrightness(resolved.hex, offsetPercent);
  const dir = angle ? `${angle}deg` : direction;

  return buildLinearGradient(dir, `${startColor}, ${endColor}`, interpolation, repeating);
}

/**
 * Creates a multi-stop linear gradient by interpolating brightness from light
 * to base color across `steps` evenly spaced stops.
 *
 * Supports hex, rgb(), hsl(), and named colors as base color.
 */
export function createMultiStepLinearGradient(
  baseColor: string,
  steps = 3,
  options?: Omit<GradientOptions, 'direction'> & { direction?: string },
): string {
  const {
    offsetPercent = 15,
    direction = 'to bottom',
    angle,
    fallbackColor = '#f5e477',
    interpolation,
    repeating,
  } = options || {};

  const resolved = resolveBaseColor(baseColor, fallbackColor);
  const colors: string[] = [];

  for (let i = 0; i < steps; i++) {
    const percent = offsetPercent * (1 - i / (steps - 1));
    colors.push(adjustHexBrightness(resolved.hex, percent));
  }

  const dir = angle ? `${angle}deg` : direction;
  return buildLinearGradient(dir, colors.join(', '), interpolation, repeating);
}

/**
 * Creates a linear gradient by evenly mixing two colors across `steps` stops
 * using HSL interpolation. Useful for smooth, perceptually pleasing transitions.
 *
 * Supports any color format accepted by color-value-tools.
 */
export function createMixedLinearGradient(
  colorA: string,
  colorB: string,
  steps = 5,
  options?: Omit<GradientOptions, 'offsetPercent'>,
): string {
  const {
    direction = 'to bottom',
    angle,
    fallbackColor = '#f5e477',
    interpolation,
    repeating,
  } = options || {};

  const resolvedA = resolveBaseColor(colorA, fallbackColor);
  const resolvedB = resolveBaseColor(colorB, fallbackColor);

  const colors: string[] = [];
  for (let i = 0; i < steps; i++) {
    const t = steps === 1 ? 0 : i / (steps - 1);
    colors.push(mixColors(resolvedA.hex, resolvedB.hex, t, { mode: 'hsl', format: 'hex' }));
  }

  const dir = angle ? `${angle}deg` : direction;
  return buildLinearGradient(dir, colors.join(', '), interpolation, repeating);
}
