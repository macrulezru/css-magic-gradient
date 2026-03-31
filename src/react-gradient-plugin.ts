import { useMemo } from 'react';
import {
  createLinearGradient,
  createMultiStepLinearGradient,
  createMixedLinearGradient,
  GradientOptions,
  CustomLinearGradientOptions,
} from './linear-gradient.js';
import type { ColorStop } from './utils.js';
import { createRadialGradient, RadialGradientOptions } from './radial-gradient.js';
import { createConicGradient, createRainbowConicGradient, ConicGradientOptions } from './conic-gradient.js';
import {
  createComplementaryGradient,
  createTriadicGradient,
  createAnalogousGradient,
  createTetradicGradient,
  createSplitComplementaryGradient,
  createTintGradient,
  createShadeGradient,
  createToneGradient,
  HarmonyGradientOptions,
} from './presets.js';
import { createAccessibleGradient, AccessibleGradientOptions } from './accessibility.js';

// ─── Existing hooks ───────────────────────────────────────────────────────────

/**
 * Returns a memoized CSS linear gradient string.
 * Accepts the same arguments as `createLinearGradient`.
 * SSR-safe: no DOM access.
 *
 * @example
 * const gradient = useLinearGradient('#3498db', { direction: 'to right', offsetPercent: 20 });
 * // <div style={{ background: gradient }} />
 */
export function useLinearGradient(
  first: string | ColorStop[],
  options?: GradientOptions | CustomLinearGradientOptions,
): string {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => createLinearGradient(first, options), [
    JSON.stringify(first),
    JSON.stringify(options),
  ]);
}

/**
 * Returns a memoized multi-stop linear gradient string.
 * SSR-safe.
 *
 * @example
 * const gradient = useMultiStepLinearGradient('#3498db', 5, { offsetPercent: 20 });
 */
export function useMultiStepLinearGradient(
  baseColor: string,
  steps = 3,
  options?: Omit<GradientOptions, 'direction'> & { direction?: string },
): string {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => createMultiStepLinearGradient(baseColor, steps, options), [
    baseColor,
    steps,
    JSON.stringify(options),
  ]);
}

/**
 * Returns a memoized mixed (HSL-interpolated) linear gradient string.
 * SSR-safe.
 *
 * @example
 * const gradient = useMixedLinearGradient('#ff6b6b', '#4ecdc4', 7);
 */
export function useMixedLinearGradient(
  colorA: string,
  colorB: string,
  steps = 5,
  options?: Omit<GradientOptions, 'offsetPercent'>,
): string {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => createMixedLinearGradient(colorA, colorB, steps, options), [
    colorA,
    colorB,
    steps,
    JSON.stringify(options),
  ]);
}

/**
 * Returns a memoized CSS radial gradient string.
 * SSR-safe.
 *
 * @example
 * const gradient = useRadialGradient('#e74c3c', { shape: 'circle', offsetPercent: 30 });
 */
export function useRadialGradient(
  baseColor: string,
  options?: RadialGradientOptions,
): string {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => createRadialGradient(baseColor, options), [
    baseColor,
    JSON.stringify(options),
  ]);
}

/**
 * Returns a memoized CSS conic gradient string.
 * SSR-safe.
 *
 * @example
 * const gradient = useConicGradient('#9b59b6', { hueRotation: true, steps: 12 });
 */
export function useConicGradient(
  baseColor: string,
  options?: ConicGradientOptions,
): string {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => createConicGradient(baseColor, options), [
    baseColor,
    JSON.stringify(options),
  ]);
}

/**
 * Returns a memoized rainbow conic gradient string.
 * SSR-safe.
 *
 * @example
 * const gradient = useRainbowConicGradient({ steps: 24 });
 */
export function useRainbowConicGradient(
  options?: Parameters<typeof createRainbowConicGradient>[0],
): string {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => createRainbowConicGradient(options), [JSON.stringify(options)]);
}

// ─── New harmony hooks ────────────────────────────────────────────────────────

/**
 * Returns a memoized complementary gradient string.
 * SSR-safe.
 *
 * @example
 * const gradient = useComplementaryGradient('#3498db', { steps: 7, interpolationSpace: 'oklab' });
 */
export function useComplementaryGradient(
  baseColor: string,
  options?: HarmonyGradientOptions,
): string {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => createComplementaryGradient(baseColor, options), [
    baseColor,
    JSON.stringify(options),
  ]);
}

/**
 * Returns a memoized triadic gradient string.
 * SSR-safe.
 *
 * @example
 * const gradient = useTriadicGradient('#e74c3c', { smoothness: 9 });
 */
export function useTriadicGradient(
  baseColor: string,
  options?: HarmonyGradientOptions & { smoothness?: number },
): string {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => createTriadicGradient(baseColor, options), [
    baseColor,
    JSON.stringify(options),
  ]);
}

/**
 * Returns a memoized analogous gradient string.
 * SSR-safe.
 *
 * @example
 * const gradient = useAnalogousGradient('#2ecc71', { spread: 45 });
 */
export function useAnalogousGradient(
  baseColor: string,
  options?: HarmonyGradientOptions & { spread?: number },
): string {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => createAnalogousGradient(baseColor, options), [
    baseColor,
    JSON.stringify(options),
  ]);
}

/**
 * Returns a memoized tetradic gradient string.
 * SSR-safe.
 *
 * @example
 * const gradient = useTetradicGradient('#9b59b6', { type: 'conic' });
 */
export function useTetradicGradient(
  baseColor: string,
  options?: HarmonyGradientOptions & { type?: 'linear' | 'radial' | 'conic' },
): string {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => createTetradicGradient(baseColor, options), [
    baseColor,
    JSON.stringify(options),
  ]);
}

/**
 * Returns a memoized split-complementary gradient string.
 * SSR-safe.
 *
 * @example
 * const gradient = useSplitComplementaryGradient('#3498db');
 */
export function useSplitComplementaryGradient(
  baseColor: string,
  options?: HarmonyGradientOptions,
): string {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => createSplitComplementaryGradient(baseColor, options), [
    baseColor,
    JSON.stringify(options),
  ]);
}

// ─── New palette hooks ────────────────────────────────────────────────────────

/**
 * Returns a memoized tint gradient (base → white via Oklab).
 * SSR-safe.
 *
 * @example
 * const gradient = useTintGradient('#3498db', 7);
 */
export function useTintGradient(
  baseColor: string,
  steps = 5,
  options?: { direction?: string; angle?: number },
): string {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => createTintGradient(baseColor, steps, options), [
    baseColor,
    steps,
    JSON.stringify(options),
  ]);
}

/**
 * Returns a memoized shade gradient (base → black via Oklab).
 * SSR-safe.
 *
 * @example
 * const gradient = useShadeGradient('#e74c3c', 7);
 */
export function useShadeGradient(
  baseColor: string,
  steps = 5,
  options?: { direction?: string; angle?: number },
): string {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => createShadeGradient(baseColor, steps, options), [
    baseColor,
    steps,
    JSON.stringify(options),
  ]);
}

/**
 * Returns a memoized tone gradient (base → gray via Oklab).
 * SSR-safe.
 *
 * @example
 * const gradient = useToneGradient('#9b59b6', 7);
 */
export function useToneGradient(
  baseColor: string,
  steps = 5,
  options?: { direction?: string; angle?: number; gray?: string },
): string {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => createToneGradient(baseColor, steps, options), [
    baseColor,
    steps,
    JSON.stringify(options),
  ]);
}

// ─── Accessibility hook ───────────────────────────────────────────────────────

/**
 * Returns a memoized accessible gradient that auto-adjusts stops so that
 * `textColor` achieves the target WCAG level.
 * SSR-safe.
 *
 * @example
 * const gradient = useAccessibleGradient('#3498db', '#ffffff', { targetLevel: 'AAA' });
 */
export function useAccessibleGradient(
  baseColor: string,
  textColor: string,
  options?: AccessibleGradientOptions,
): string {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => createAccessibleGradient(baseColor, textColor, options), [
    baseColor,
    textColor,
    JSON.stringify(options),
  ]);
}
