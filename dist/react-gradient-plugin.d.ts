import { GradientOptions, CustomLinearGradientOptions } from './linear-gradient.js';
import type { ColorStop } from './utils.js';
import { RadialGradientOptions } from './radial-gradient.js';
import { createRainbowConicGradient, ConicGradientOptions } from './conic-gradient.js';
import { HarmonyGradientOptions } from './presets.js';
import { AccessibleGradientOptions } from './accessibility.js';
/**
 * Returns a memoized CSS linear gradient string.
 * Accepts the same arguments as `createLinearGradient`.
 * SSR-safe: no DOM access.
 *
 * @example
 * const gradient = useLinearGradient('#3498db', { direction: 'to right', offsetPercent: 20 });
 * // <div style={{ background: gradient }} />
 */
export declare function useLinearGradient(first: string | ColorStop[], options?: GradientOptions | CustomLinearGradientOptions): string;
/**
 * Returns a memoized multi-stop linear gradient string.
 * SSR-safe.
 *
 * @example
 * const gradient = useMultiStepLinearGradient('#3498db', 5, { offsetPercent: 20 });
 */
export declare function useMultiStepLinearGradient(baseColor: string, steps?: number, options?: Omit<GradientOptions, 'direction'> & {
    direction?: string;
}): string;
/**
 * Returns a memoized mixed (HSL-interpolated) linear gradient string.
 * SSR-safe.
 *
 * @example
 * const gradient = useMixedLinearGradient('#ff6b6b', '#4ecdc4', 7);
 */
export declare function useMixedLinearGradient(colorA: string, colorB: string, steps?: number, options?: Omit<GradientOptions, 'offsetPercent'>): string;
/**
 * Returns a memoized CSS radial gradient string.
 * SSR-safe.
 *
 * @example
 * const gradient = useRadialGradient('#e74c3c', { shape: 'circle', offsetPercent: 30 });
 */
export declare function useRadialGradient(baseColor: string, options?: RadialGradientOptions): string;
/**
 * Returns a memoized CSS conic gradient string.
 * SSR-safe.
 *
 * @example
 * const gradient = useConicGradient('#9b59b6', { hueRotation: true, steps: 12 });
 */
export declare function useConicGradient(baseColor: string, options?: ConicGradientOptions): string;
/**
 * Returns a memoized rainbow conic gradient string.
 * SSR-safe.
 *
 * @example
 * const gradient = useRainbowConicGradient({ steps: 24 });
 */
export declare function useRainbowConicGradient(options?: Parameters<typeof createRainbowConicGradient>[0]): string;
/**
 * Returns a memoized complementary gradient string.
 * SSR-safe.
 *
 * @example
 * const gradient = useComplementaryGradient('#3498db', { steps: 7, interpolationSpace: 'oklab' });
 */
export declare function useComplementaryGradient(baseColor: string, options?: HarmonyGradientOptions): string;
/**
 * Returns a memoized triadic gradient string.
 * SSR-safe.
 *
 * @example
 * const gradient = useTriadicGradient('#e74c3c', { smoothness: 9 });
 */
export declare function useTriadicGradient(baseColor: string, options?: HarmonyGradientOptions & {
    smoothness?: number;
}): string;
/**
 * Returns a memoized analogous gradient string.
 * SSR-safe.
 *
 * @example
 * const gradient = useAnalogousGradient('#2ecc71', { spread: 45 });
 */
export declare function useAnalogousGradient(baseColor: string, options?: HarmonyGradientOptions & {
    spread?: number;
}): string;
/**
 * Returns a memoized tetradic gradient string.
 * SSR-safe.
 *
 * @example
 * const gradient = useTetradicGradient('#9b59b6', { type: 'conic' });
 */
export declare function useTetradicGradient(baseColor: string, options?: HarmonyGradientOptions & {
    type?: 'linear' | 'radial' | 'conic';
}): string;
/**
 * Returns a memoized split-complementary gradient string.
 * SSR-safe.
 *
 * @example
 * const gradient = useSplitComplementaryGradient('#3498db');
 */
export declare function useSplitComplementaryGradient(baseColor: string, options?: HarmonyGradientOptions): string;
/**
 * Returns a memoized tint gradient (base → white via Oklab).
 * SSR-safe.
 *
 * @example
 * const gradient = useTintGradient('#3498db', 7);
 */
export declare function useTintGradient(baseColor: string, steps?: number, options?: {
    direction?: string;
    angle?: number;
}): string;
/**
 * Returns a memoized shade gradient (base → black via Oklab).
 * SSR-safe.
 *
 * @example
 * const gradient = useShadeGradient('#e74c3c', 7);
 */
export declare function useShadeGradient(baseColor: string, steps?: number, options?: {
    direction?: string;
    angle?: number;
}): string;
/**
 * Returns a memoized tone gradient (base → gray via Oklab).
 * SSR-safe.
 *
 * @example
 * const gradient = useToneGradient('#9b59b6', 7);
 */
export declare function useToneGradient(baseColor: string, steps?: number, options?: {
    direction?: string;
    angle?: number;
    gray?: string;
}): string;
/**
 * Returns a memoized accessible gradient that auto-adjusts stops so that
 * `textColor` achieves the target WCAG level.
 * SSR-safe.
 *
 * @example
 * const gradient = useAccessibleGradient('#3498db', '#ffffff', { targetLevel: 'AAA' });
 */
export declare function useAccessibleGradient(baseColor: string, textColor: string, options?: AccessibleGradientOptions): string;
