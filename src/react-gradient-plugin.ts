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

/**
 * Returns a memoized CSS linear gradient string.
 * Accepts the same arguments as `createLinearGradient`.
 * Recomputes only when inputs change (compared by serialized value).
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
 * Recomputes only when inputs change.
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
 * Recomputes only when inputs change.
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
 * Accepts the same arguments as `createRadialGradient`.
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
 * Accepts the same arguments as `createConicGradient`.
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
 * Accepts the same arguments as `createRainbowConicGradient`.
 *
 * @example
 * const gradient = useRainbowConicGradient({ steps: 24 });
 */
export function useRainbowConicGradient(options?: Parameters<typeof createRainbowConicGradient>[0]): string {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => createRainbowConicGradient(options), [JSON.stringify(options)]);
}
