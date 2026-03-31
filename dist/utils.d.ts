export interface ColorStop {
    color: string;
    opacity?: number;
    position?: string | number;
}
/**
 * Converts a color stop object to its CSS string representation.
 * Supports opacity for hex, rgb, hsl, and named colors.
 */
export declare function colorStopToString(item: ColorStop): string;
export interface ResolvedColor {
    /** Normalized hex value of the color (or fallback hex for CSS variables) */
    hex: string;
    /** True when the original input was a CSS variable */
    isCssVar: boolean;
    /** Full `var(--name, fallback)` string — only set when isCssVar is true */
    varExpression?: string;
}
/**
 * Resolves any supported color format (hex, rgb, hsl, named, CSS variable) to
 * a ResolvedColor object that always exposes a usable hex value.
 *
 * CSS variables are resolved to their fallback hex so brightness / hue
 * calculations remain possible; the original var() expression is preserved
 * in `varExpression` for use as the actual CSS color value.
 */
export declare function resolveBaseColor(color: string, fallback: string): ResolvedColor;
/**
 * Maps a `ScaleInterpolation` value to the `space` string accepted by
 * `createColorScale` from color-value-tools. Identity for all supported values.
 *
 * `ScaleInterpolation` is already restricted to the supported subset
 * ('rgb' | 'hsl' | 'oklab' | 'oklch'), so no remapping is needed here.
 * The type contract enforces correctness at the call site.
 */
export declare function toScaleMode(space: import('./linear-gradient.js').ScaleInterpolation): 'rgb' | 'hsl' | 'oklab' | 'oklch';
