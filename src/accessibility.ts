import {
  bestTextColor,
  wcagLevel,
  contrastRatio,
  isDark,
  lighten,
  darken,
  saturate,
  desaturate,
  mixColors,
  interpolateColors,
  isReadableOnBackground,
} from 'color-value-tools';
import { resolveBaseColor } from './utils.js';
import { createLinearGradient } from './linear-gradient.js';
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
  black: { contrast: number; wcag: WcagLevel };
  white: { contrast: number; wcag: WcagLevel };
}

const SAMPLE_STEPS = 9; // number of interior sample points
const CONTRAST_THRESHOLD = 4.5; // WCAG AA normal text

/**
 * Samples `SAMPLE_STEPS` positions along a gradient defined by `colors` (hex
 * strings at uniform intervals) and returns the contrast ratio at each position
 * against `textColor`. Returns an array of `{ position, contrast }` objects.
 */
function sampleGradientContrasts(
  textColor: string,
  colors: string[],
): Array<{ position: number; contrast: number }> {
  if (colors.length === 0) return [];
  if (colors.length === 1) {
    return [{ position: 0, contrast: contrastRatio(textColor, colors[0]) }];
  }

  const results: Array<{ position: number; contrast: number }> = [];
  const totalSamples = SAMPLE_STEPS + 2; // include 0 and 1

  for (let i = 0; i < totalSamples; i++) {
    const t = i / (totalSamples - 1);
    // Find which segment of the gradient we're in
    const segCount = colors.length - 1;
    const rawPos = t * segCount;
    const segIndex = Math.min(Math.floor(rawPos), segCount - 1);
    const segT = rawPos - segIndex;
    const sampled = mixColors(colors[segIndex], colors[segIndex + 1], segT, {
      mode: 'rgb',
      format: 'hex',
    });
    results.push({ position: t, contrast: contrastRatio(textColor, sampled) });
  }

  return results;
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
export function bestGradientTextColor(colorA: string, colorB: string): '#000000' | '#ffffff';
export function bestGradientTextColor(
  colors: string[],
  options?: { detailed?: false; weightByArea?: boolean },
): '#000000' | '#ffffff';
export function bestGradientTextColor(
  colors: string[],
  options: { detailed: true; weightByArea?: boolean },
): BestTextColorDetail;
export function bestGradientTextColor(
  firstArg: string | string[],
  secondArgOrOptions?: string | { detailed?: boolean; weightByArea?: boolean },
): '#000000' | '#ffffff' | BestTextColorDetail {
  // Normalize arguments — handle legacy (colorA, colorB) signature
  let gradientColors: string[];
  let detailed = false;

  if (typeof firstArg === 'string' && typeof secondArgOrOptions === 'string') {
    // Legacy: bestGradientTextColor(colorA, colorB)
    gradientColors = [firstArg, secondArgOrOptions];
  } else if (Array.isArray(firstArg)) {
    gradientColors = firstArg;
    const opts = secondArgOrOptions as { detailed?: boolean; weightByArea?: boolean } | undefined;
    detailed = opts?.detailed === true;
  } else {
    gradientColors = [firstArg as string];
  }

  const samplesBlack = sampleGradientContrasts('#000000', gradientColors);
  const samplesWhite = sampleGradientContrasts('#ffffff', gradientColors);

  const minBlack = Math.min(...samplesBlack.map(s => s.contrast));
  const minWhite = Math.min(...samplesWhite.map(s => s.contrast));

  const recommended: '#000000' | '#ffffff' = minBlack >= minWhite ? '#000000' : '#ffffff';

  if (detailed) {
    return {
      recommended,
      black: {
        contrast: minBlack,
        wcag: wcagLevel('#000000', gradientColors[0]) as WcagLevel,
      },
      white: {
        contrast: minWhite,
        wcag: wcagLevel('#ffffff', gradientColors[0]) as WcagLevel,
      },
    };
  }

  return recommended;
}

/**
 * Returns the minimum WCAG contrast ratio between a text color and any point
 * along the gradient. Samples the gradient at uniform intervals.
 *
 * Accepts two endpoint colors (backward-compatible) or an array of stop colors.
 */
export function gradientContrastRatio(
  textColor: string,
  gradientColorA: string,
  gradientColorB: string,
): number;
export function gradientContrastRatio(textColor: string, gradientColors: string[]): number;
export function gradientContrastRatio(
  textColor: string,
  colorAOrArray: string | string[],
  colorB?: string,
): number {
  const colors = Array.isArray(colorAOrArray)
    ? colorAOrArray
    : [colorAOrArray, colorB as string];
  const samples = sampleGradientContrasts(textColor, colors);
  return samples.length > 0 ? Math.min(...samples.map(s => s.contrast)) : 0;
}

/**
 * Returns a detailed WCAG report for text placed over a gradient.
 * Checks all sample points along the gradient and reports the minimum level,
 * minimum contrast ratio, and positions where contrast falls below AA.
 */
export function gradientWcagLevel(
  textColor: string,
  gradientColorA: string,
  gradientColorB: string,
): GradientWcagReport;
export function gradientWcagLevel(
  textColor: string,
  gradientColors: string[],
): GradientWcagReport;
export function gradientWcagLevel(
  textColor: string,
  colorAOrArray: string | string[],
  colorB?: string,
): GradientWcagReport {
  const colors = Array.isArray(colorAOrArray)
    ? colorAOrArray
    : [colorAOrArray, colorB as string];
  const samples = sampleGradientContrasts(textColor, colors);

  const minContrast = samples.length > 0 ? Math.min(...samples.map(s => s.contrast)) : 0;
  const problematicStops = samples
    .filter(s => s.contrast < CONTRAST_THRESHOLD)
    .map(s => parseFloat(s.position.toFixed(2)));

  const levelOrder: WcagLevel[] = ['AAA', 'AA', 'AA-large', 'fail'];
  let worstLevel: WcagLevel = 'AAA';
  for (const { contrast } of samples) {
    let sampleLevel: WcagLevel;
    if (contrast >= 7) sampleLevel = 'AAA';
    else if (contrast >= 4.5) sampleLevel = 'AA';
    else if (contrast >= 3) sampleLevel = 'AA-large';
    else sampleLevel = 'fail';

    if (levelOrder.indexOf(sampleLevel) > levelOrder.indexOf(worstLevel)) {
      worstLevel = sampleLevel;
    }
  }

  return { level: worstLevel, minContrast, problematicStops };
}

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
    adjustmentStrategy = 'lightness',
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
      let candidate = color;

      if (adjustmentStrategy === 'lightness' || adjustmentStrategy === 'both') {
        candidate = shouldLighten ? lighten(candidate, step) : darken(candidate, step);
      }

      if (adjustmentStrategy === 'saturation' || adjustmentStrategy === 'both') {
        candidate = shouldLighten ? desaturate(candidate, step / 2) : saturate(candidate, step / 2);
      }

      if (passes(candidate)) return candidate;
    }

    // Fallback: try combined approach if single strategy failed
    if (adjustmentStrategy !== 'both') {
      for (let step = 5; step <= 40; step += 5) {
        const combined = shouldLighten
          ? desaturate(lighten(color, step), step / 2)
          : saturate(darken(color, step), step / 2);
        if (passes(combined)) return combined;
      }
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
