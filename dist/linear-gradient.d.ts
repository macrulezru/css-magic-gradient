import { ColorStop } from './utils.js';
export type { ColorStop as LinearGradientColorStop };
/** Direction keyword or angle (deg) for a linear gradient. */
export type GradientDirection = 'to bottom' | 'to top' | 'to right' | 'to left' | string;
/** CSS Color Level 4 interpolation color space. */
export type ColorInterpolation = 'srgb' | 'oklch' | 'lab' | 'hsl' | 'oklab' | 'lch';
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
export declare function createLinearGradient(first: string | ColorStop[], options?: GradientOptions | CustomLinearGradientOptions): string;
/**
 * Creates a multi-stop linear gradient by interpolating brightness from light
 * to base color across `steps` evenly spaced stops.
 *
 * Supports hex, rgb(), hsl(), and named colors as base color.
 */
export declare function createMultiStepLinearGradient(baseColor: string, steps?: number, options?: Omit<GradientOptions, 'direction'> & {
    direction?: string;
}): string;
/**
 * Creates a linear gradient by evenly mixing two colors across `steps` stops
 * using HSL interpolation. Useful for smooth, perceptually pleasing transitions.
 *
 * Supports any color format accepted by color-value-tools.
 */
export declare function createMixedLinearGradient(colorA: string, colorB: string, steps?: number, options?: Omit<GradientOptions, 'offsetPercent'>): string;
