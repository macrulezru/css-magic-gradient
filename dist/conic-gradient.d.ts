import type { ScaleInterpolation } from './linear-gradient.js';
import { ColorStop } from './utils.js';
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
export declare function createConicGradient(baseColor: string, options?: ConicGradientOptions): string;
/**
 * Creates a full-spectrum rainbow conic gradient using HSL color space.
 * The gradient smoothly cycles through all hues starting at `fromAngle`.
 */
export declare function createRainbowConicGradient(options?: {
    fromAngle?: number;
    position?: string;
    saturation?: number;
    lightness?: number;
    steps?: number;
    repeating?: boolean;
}): string;
