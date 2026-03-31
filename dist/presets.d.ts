import type { ScaleInterpolation } from './linear-gradient.js';
/** Warm sunset: orange → deep magenta. */
export declare const sunsetGradient: string;
/** Deep ocean: light cyan → dark navy. */
export declare const oceanGradient: string;
/** Northern aurora: violet → green → teal. */
export declare const auroraGradient: string;
/** Fire: yellow → orange → deep red. */
export declare const fireGradient: string;
/** Midnight: dark indigo → near-black navy. */
export declare const midnightGradient: string;
/** Peach: soft pink → warm orange. */
export declare const peachGradient: string;
/** Mint: light green → teal. */
export declare const mintGradient: string;
/** Full-spectrum rainbow conic. */
export declare const rainbowGradient: string;
/** Radial glow centered on a warm gold. */
export declare const glowGradient: string;
/** Forest: fresh light green to deep forest green. */
export declare const forestGradient: string;
/** Golden hour: warm gold → soft pink → rich orange. */
export declare const goldenHourGradient: string;
/** Neon: electric green → vivid pink → bright cyan. */
export declare const neonGradient: string;
/** Nordic: icy blue → cool gray → near-white. */
export declare const nordicGradient: string;
/** Pastel: soft lavender → blush pink → pale mint. */
export declare const pastelGradient: string;
/** Deep space: near-black navy → deep indigo → violet accent. */
export declare const deepSpaceGradient: string;
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
export declare function createComplementaryGradient(baseColor: string, options?: HarmonyGradientOptions): string;
/**
 * Generates a triadic linear gradient (3 colors evenly spaced 120° apart).
 * `smoothness` controls total interpolated steps (default 3 = just the anchors).
 */
export declare function createTriadicGradient(baseColor: string, options?: HarmonyGradientOptions & {
    smoothness?: number;
}): string;
/**
 * Generates an analogous linear gradient (3 neighboring hues).
 * `spread` controls the hue spread angle passed to `analogous()`.
 */
export declare function createAnalogousGradient(baseColor: string, options?: HarmonyGradientOptions & {
    spread?: number;
}): string;
/**
 * Generates a 4-color gradient based on the tetradic (square) color harmony.
 * Supports 'linear', 'radial', and 'conic' gradient types.
 */
export declare function createTetradicGradient(baseColor: string, options?: HarmonyGradientOptions & {
    type?: 'linear' | 'radial' | 'conic';
}): string;
/**
 * Generates a gradient based on the split-complementary color harmony
 * (base + two colors at 150° and 210°).
 */
export declare function createSplitComplementaryGradient(baseColor: string, options?: HarmonyGradientOptions): string;
/**
 * Generates a monochromatic linear gradient using `steps` shades of the base
 * color, from lightest to darkest.
 */
export declare function createMonochromaticGradient(baseColor: string, steps?: number, options?: {
    direction?: string;
    angle?: number;
}): string;
/**
 * Generates a hue-rotating conic gradient from any base color.
 */
export declare function createHueWheelGradient(baseColor: string, options?: {
    fromAngle?: number;
    position?: string;
    steps?: number;
}): string;
/**
 * Generates a gradient from the base color to white using Oklab tints.
 */
export declare function createTintGradient(baseColor: string, steps?: number, options?: {
    direction?: string;
    angle?: number;
}): string;
/**
 * Generates a gradient from the base color to black using Oklab shades.
 */
export declare function createShadeGradient(baseColor: string, steps?: number, options?: {
    direction?: string;
    angle?: number;
}): string;
/**
 * Generates a gradient from the base color toward gray using Oklab tones.
 */
export declare function createToneGradient(baseColor: string, steps?: number, options?: {
    direction?: string;
    angle?: number;
    gray?: string;
}): string;
