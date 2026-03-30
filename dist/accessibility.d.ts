import { bestTextColor, wcagLevel, contrastRatio, isDark } from 'color-value-tools';
import { GradientDirection, ColorInterpolation } from './linear-gradient.js';
export type WcagLevel = 'AAA' | 'AA' | 'AA-large' | 'fail';
export interface AccessibleGradientOptions {
    direction?: GradientDirection;
    angle?: number;
    /** Contrast level to target. Default: 'AA' */
    targetLevel?: WcagLevel;
    interpolation?: ColorInterpolation;
    repeating?: boolean;
}
/**
 * Returns the best text color (`'#000000'` or `'#ffffff'`) to place over
 * a gradient built from two hex colors. Uses the average luminance of both
 * stops to pick the most readable option.
 */
export declare function bestGradientTextColor(colorA: string, colorB: string): '#000000' | '#ffffff';
/**
 * Returns the WCAG contrast ratio between a text color and the visual
 * midpoint of a gradient defined by two endpoint colors.
 */
export declare function gradientContrastRatio(textColor: string, gradientColorA: string, gradientColorB: string): number;
/**
 * Returns the WCAG compliance level for text placed over a gradient.
 * Uses the visual midpoint of the gradient as the reference background color.
 */
export declare function gradientWcagLevel(textColor: string, gradientColorA: string, gradientColorB: string): WcagLevel;
/**
 * Creates a linear gradient that is automatically adjusted so that `textColor`
 * achieves at least the `targetLevel` WCAG rating against both gradient stops.
 *
 * If the base color already passes, it is used as-is.
 * If it does not, each stop is lightened or darkened by up to 40 % in 5 %
 * increments until the target contrast is met.
 *
 * Supports hex, rgb(), hsl(), and named colors as baseColor.
 */
export declare function createAccessibleGradient(baseColor: string, textColor: string, options?: AccessibleGradientOptions): string;
export { bestTextColor, wcagLevel, contrastRatio, isDark };
