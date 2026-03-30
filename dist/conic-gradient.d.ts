import { ColorStop } from './utils.js';
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
