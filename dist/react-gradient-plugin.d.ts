import { GradientOptions, CustomLinearGradientOptions } from './linear-gradient.js';
import type { ColorStop } from './utils.js';
import { RadialGradientOptions } from './radial-gradient.js';
import { createRainbowConicGradient, ConicGradientOptions } from './conic-gradient.js';
/**
 * Returns a memoized CSS linear gradient string.
 * Accepts the same arguments as `createLinearGradient`.
 * Recomputes only when inputs change (compared by serialized value).
 *
 * @example
 * const gradient = useLinearGradient('#3498db', { direction: 'to right', offsetPercent: 20 });
 * // <div style={{ background: gradient }} />
 */
export declare function useLinearGradient(first: string | ColorStop[], options?: GradientOptions | CustomLinearGradientOptions): string;
/**
 * Returns a memoized multi-stop linear gradient string.
 * Recomputes only when inputs change.
 *
 * @example
 * const gradient = useMultiStepLinearGradient('#3498db', 5, { offsetPercent: 20 });
 */
export declare function useMultiStepLinearGradient(baseColor: string, steps?: number, options?: Omit<GradientOptions, 'direction'> & {
    direction?: string;
}): string;
/**
 * Returns a memoized mixed (HSL-interpolated) linear gradient string.
 * Recomputes only when inputs change.
 *
 * @example
 * const gradient = useMixedLinearGradient('#ff6b6b', '#4ecdc4', 7);
 */
export declare function useMixedLinearGradient(colorA: string, colorB: string, steps?: number, options?: Omit<GradientOptions, 'offsetPercent'>): string;
/**
 * Returns a memoized CSS radial gradient string.
 * Accepts the same arguments as `createRadialGradient`.
 *
 * @example
 * const gradient = useRadialGradient('#e74c3c', { shape: 'circle', offsetPercent: 30 });
 */
export declare function useRadialGradient(baseColor: string, options?: RadialGradientOptions): string;
/**
 * Returns a memoized CSS conic gradient string.
 * Accepts the same arguments as `createConicGradient`.
 *
 * @example
 * const gradient = useConicGradient('#9b59b6', { hueRotation: true, steps: 12 });
 */
export declare function useConicGradient(baseColor: string, options?: ConicGradientOptions): string;
/**
 * Returns a memoized rainbow conic gradient string.
 * Accepts the same arguments as `createRainbowConicGradient`.
 *
 * @example
 * const gradient = useRainbowConicGradient({ steps: 24 });
 */
export declare function useRainbowConicGradient(options?: Parameters<typeof createRainbowConicGradient>[0]): string;
