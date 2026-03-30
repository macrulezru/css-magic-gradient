import {
  bestTextColor,
  wcagLevel,
  contrastRatio,
  isDark,
  lighten,
  darken,
  mixColors,
} from 'color-value-tools';
import { resolveBaseColor } from './utils.js';
import { createLinearGradient } from './linear-gradient.js';
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
export function bestGradientTextColor(
  colorA: string,
  colorB: string,
): '#000000' | '#ffffff' {
  // Mix the two endpoints at the midpoint and ask what text color works there
  const mid = mixColors(colorA, colorB, 0.5, { mode: 'rgb', format: 'hex' });
  return bestTextColor(mid);
}

/**
 * Returns the WCAG contrast ratio between a text color and the visual
 * midpoint of a gradient defined by two endpoint colors.
 */
export function gradientContrastRatio(
  textColor: string,
  gradientColorA: string,
  gradientColorB: string,
): number {
  const mid = mixColors(gradientColorA, gradientColorB, 0.5, { mode: 'rgb', format: 'hex' });
  return contrastRatio(textColor, mid);
}

/**
 * Returns the WCAG compliance level for text placed over a gradient.
 * Uses the visual midpoint of the gradient as the reference background color.
 */
export function gradientWcagLevel(
  textColor: string,
  gradientColorA: string,
  gradientColorB: string,
): WcagLevel {
  const mid = mixColors(gradientColorA, gradientColorB, 0.5, { mode: 'rgb', format: 'hex' });
  return wcagLevel(textColor, mid) as WcagLevel;
}

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
export function createAccessibleGradient(
  baseColor: string,
  textColor: string,
  options?: AccessibleGradientOptions,
): string {
  const {
    direction = 'to bottom',
    angle,
    targetLevel = 'AA',
    interpolation,
    repeating,
  } = options || {};

  const fallback = '#f5e477';
  const resolved = resolveBaseColor(baseColor, fallback);

  const levelPriority: WcagLevel[] = ['AAA', 'AA', 'AA-large', 'fail'];
  const targetIndex = levelPriority.indexOf(targetLevel);

  function passes(color: string): boolean {
    const level = wcagLevel(textColor, color) as WcagLevel;
    return levelPriority.indexOf(level) <= targetIndex;
  }

  function adjust(color: string): string {
    if (passes(color)) return color;
    const shouldLighten = isDark(textColor);
    for (let step = 5; step <= 40; step += 5) {
      const candidate = shouldLighten ? lighten(color, step) : darken(color, step);
      if (passes(candidate)) return candidate;
    }
    return color;
  }

  const startColor = adjust(lighten(resolved.hex, 15));
  const endColor = adjust(resolved.hex);

  return createLinearGradient(
    [{ color: startColor }, { color: endColor }],
    { direction, angle, interpolation, repeating },
  );
}

export { bestTextColor, wcagLevel, contrastRatio, isDark };
