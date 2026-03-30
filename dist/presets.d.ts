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
/**
 * Generates a complementary linear gradient (base color ↔ its complement).
 * Direction defaults to 'to right'.
 */
export declare function createComplementaryGradient(baseColor: string, options?: {
    direction?: string;
    angle?: number;
    steps?: number;
}): string;
/**
 * Generates a triadic linear gradient (3 colors evenly spaced 120° apart).
 */
export declare function createTriadicGradient(baseColor: string, options?: {
    direction?: string;
    angle?: number;
}): string;
/**
 * Generates an analogous linear gradient (3 neighboring hues, default ±30°).
 */
export declare function createAnalogousGradient(baseColor: string, options?: {
    direction?: string;
    angle?: number;
    spread?: number;
}): string;
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
