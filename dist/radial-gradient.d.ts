import { ColorStop } from './utils.js';
export type { ColorStop as RadialGradientColorStop };
export type RadialShape = 'circle' | 'ellipse';
export type RadialSize = 'closest-side' | 'closest-corner' | 'farthest-side' | 'farthest-corner' | string | {
    width: string;
    height: string;
};
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
}
/**
 * Creates a CSS radial gradient.
 *
 * When `options.colors` is provided, those stops are used directly.
 * When `options.layers` is provided, multiple stacked radial gradients are
 * composed (CSS background-image layering syntax).
 * Otherwise, a two-stop gradient is auto-generated from `baseColor`.
 *
 * Supports hex, rgb(), hsl(), named colors, and CSS variables as baseColor.
 */
export declare function createRadialGradient(baseColor: string, options?: RadialGradientOptions): string;
