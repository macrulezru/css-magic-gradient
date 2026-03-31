import type { ScaleInterpolation } from './linear-gradient.js';
import { ColorStop } from './utils.js';
export type { ColorStop as RadialGradientColorStop };
export type RadialShape = 'circle' | 'ellipse';
export type RadialSize = 'closest-side' | 'closest-corner' | 'farthest-side' | 'farthest-corner' | string | {
    width: string;
    height: string;
};
export type RadialHarmonyType = 'complementary' | 'triadic' | 'tetradic' | 'analogous';
export interface RadialGradientLayer {
    shape?: RadialShape;
    size?: RadialSize;
    position?: string;
    colors: ColorStop[];
}
export interface RadialGradientOptions {
    /** Brightness offset (%) for the auto-generated lighter stop. Default: 15 */
    offsetPercent?: number;
    fallbackColor?: string;
    shape?: RadialShape;
    size?: RadialSize;
    position?: string;
    /** Provide explicit color stops instead of auto-generating from baseColor. */
    colors?: ColorStop[];
    /** Compose multiple radial gradient layers (stacked via comma). */
    layers?: RadialGradientLayer[];
    /** Use repeating-radial-gradient instead of radial-gradient. */
    repeating?: boolean;
    /**
     * Auto-generate layer colors from a color harmony. Each harmony color
     * becomes the dominant color for its stop in the gradient.
     */
    harmonyType?: RadialHarmonyType;
    /**
     * Color space used for interpolating between stops when harmonyType is set.
     * Default: 'oklch'.
     */
    interpolationSpace?: ScaleInterpolation;
}
export interface RadialGradientLayersOptions {
    /** Number of layers. Default: 3 */
    count?: number;
    /** Minimum size as a percentage of the container. Default: 20 */
    minSizePercent?: number;
    /** Maximum size as a percentage of the container. Default: 100 */
    maxSizePercent?: number;
    /** Harmony type for distributing colors across layers. Default: 'analogous' */
    harmonyType?: RadialHarmonyType;
    interpolationSpace?: ScaleInterpolation;
    position?: string;
    repeating?: boolean;
}
/**
 * Creates a CSS radial gradient.
 *
 * Modes (evaluated in priority order):
 * 1. `layers` — multiple stacked radial gradients.
 * 2. `harmonyType` — auto-generates stops using the specified color harmony.
 * 3. `colors` — explicit color stops.
 * 4. Auto-generate two-stop gradient from `baseColor`.
 *
 * Supports hex, rgb(), hsl(), named colors, and CSS variables as baseColor.
 */
export declare function createRadialGradient(baseColor: string, options?: RadialGradientOptions): string;
/**
 * Utility that generates a set of `RadialGradientLayer` objects with evenly
 * distributed sizes and colors from the given harmony.
 *
 * Each layer shrinks from `maxSizePercent` down to `minSizePercent`, creating
 * a nested multi-ring radial effect when composed into `createRadialGradient`.
 *
 * @example
 * const layers = createRadialGradientLayers('#3498db', {
 *   count: 4,
 *   harmonyType: 'triadic',
 * });
 * const gradient = createRadialGradient('#3498db', { layers });
 */
export declare function createRadialGradientLayers(baseColor: string, options?: RadialGradientLayersOptions): RadialGradientLayer[];
