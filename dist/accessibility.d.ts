import { bestTextColor, wcagLevel, contrastRatio, isDark } from 'color-value-tools';
import type { GradientDirection, ColorInterpolation } from './linear-gradient.js';
export type WcagLevel = 'AAA' | 'AA' | 'AA-large' | 'fail';
export interface AccessibleGradientOptions {
    direction?: GradientDirection;
    angle?: number;
    /** Contrast level to target. Default: 'AA' */
    targetLevel?: WcagLevel;
    interpolation?: ColorInterpolation;
    repeating?: boolean;
    /** Strategy for adjusting colors to meet contrast. Default: 'lightness' */
    adjustmentStrategy?: 'lightness' | 'saturation' | 'both';
}
/** Detailed WCAG report for a gradient. */
export interface GradientWcagReport {
    /** Minimum WCAG level across the entire gradient. */
    level: WcagLevel;
    /** Minimum contrast ratio found across all sampled stops. */
    minContrast: number;
    /**
     * Fractional positions (0–1) along the gradient where contrast falls below
     * the threshold. Threshold is 4.5 (AA) by default; positions are at 0.1
     * increments that fail.
     */
    problematicStops: number[];
}
/** Detailed result from `bestGradientTextColor` with `detailed: true`. */
export interface BestTextColorDetail {
    /** Best-contrast text color. */
    recommended: '#000000' | '#ffffff';
    black: {
        contrast: number;
        wcag: WcagLevel;
    };
    white: {
        contrast: number;
        wcag: WcagLevel;
    };
}
/**
 * Returns the best text color (`'#000000'` or `'#ffffff'`) to place over a
 * gradient. Accepts two endpoint colors (backward-compatible) or an array of
 * gradient stop colors.
 *
 * With `detailed: true` returns a `BestTextColorDetail` object instead.
 * With `weightByArea: true` the contrast scores are weighted so that sections
 * covering more of the gradient area count more (uniform sampling is used as
 * a reasonable approximation for solid-stop gradients).
 */
export declare function bestGradientTextColor(colorA: string, colorB: string): '#000000' | '#ffffff';
export declare function bestGradientTextColor(colors: string[], options?: {
    detailed?: false;
    weightByArea?: boolean;
}): '#000000' | '#ffffff';
export declare function bestGradientTextColor(colors: string[], options: {
    detailed: true;
    weightByArea?: boolean;
}): BestTextColorDetail;
/**
 * Returns the minimum WCAG contrast ratio between a text color and any point
 * along the gradient. Samples the gradient at uniform intervals.
 *
 * Accepts two endpoint colors (backward-compatible) or an array of stop colors.
 */
export declare function gradientContrastRatio(textColor: string, gradientColorA: string, gradientColorB: string): number;
export declare function gradientContrastRatio(textColor: string, gradientColors: string[]): number;
/**
 * Returns a detailed WCAG report for text placed over a gradient.
 * Checks all sample points along the gradient and reports the minimum level,
 * minimum contrast ratio, and positions where contrast falls below AA.
 */
export declare function gradientWcagLevel(textColor: string, gradientColorA: string, gradientColorB: string): GradientWcagReport;
export declare function gradientWcagLevel(textColor: string, gradientColors: string[]): GradientWcagReport;
/**
 * Creates a linear gradient that is automatically adjusted so that `textColor`
 * achieves at least the `targetLevel` WCAG rating against both gradient stops.
 *
 * `adjustmentStrategy`:
 * - `'lightness'` (default) — lightens or darkens the stops.
 * - `'saturation'` — saturates or desaturates the stops.
 * - `'both'` — adjusts both lightness and saturation.
 *
 * Supports hex, rgb(), hsl(), and named colors as baseColor.
 */
export declare function createAccessibleGradient(baseColor: string, textColor: string, options?: AccessibleGradientOptions): string;
export { bestTextColor, wcagLevel, contrastRatio, isDark };
