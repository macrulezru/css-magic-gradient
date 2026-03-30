import type { App } from '@vue/runtime-core';
import { computed, isRef } from '@vue/runtime-core';
import type { Ref, ComputedRef } from '@vue/reactivity';
import {
  createLinearGradient,
  createMultiStepLinearGradient,
  createMixedLinearGradient,
  GradientOptions,
  CustomLinearGradientOptions,
} from './linear-gradient.js';
import type { ColorStop } from './utils.js';
import { createRadialGradient, RadialGradientOptions } from './radial-gradient.js';
import {
  createConicGradient,
  createRainbowConicGradient,
  ConicGradientOptions,
} from './conic-gradient.js';

function resolve<T>(value: T | Ref<T>): T {
  return isRef(value) ? value.value : value;
}

/**
 * Reactive linear gradient. Returns a `ComputedRef<string>` that updates
 * automatically when `first` or `options` refs change.
 *
 * @example
 * const color = ref('#3498db')
 * const gradient = useLinearGradient(color, { direction: 'to right' })
 * // gradient.value → 'linear-gradient(to right, …)'
 */
export function useLinearGradient(
  first: string | ColorStop[] | Ref<string | ColorStop[]>,
  options?: GradientOptions | CustomLinearGradientOptions | Ref<GradientOptions | CustomLinearGradientOptions | undefined>,
): ComputedRef<string> {
  return computed(() => createLinearGradient(resolve(first) as string, resolve(options)));
}

/**
 * Reactive multi-step linear gradient.
 */
export function useMultiStepLinearGradient(
  baseColor: string | Ref<string>,
  steps: number | Ref<number> = 3,
  options?: Omit<GradientOptions, 'direction'> & { direction?: string } | Ref<Omit<GradientOptions, 'direction'> & { direction?: string } | undefined>,
): ComputedRef<string> {
  return computed(() =>
    createMultiStepLinearGradient(resolve(baseColor), resolve(steps), resolve(options)),
  );
}

/**
 * Reactive HSL-mixed linear gradient between two colors.
 */
export function useMixedLinearGradient(
  colorA: string | Ref<string>,
  colorB: string | Ref<string>,
  steps: number | Ref<number> = 5,
  options?: Omit<GradientOptions, 'offsetPercent'> | Ref<Omit<GradientOptions, 'offsetPercent'> | undefined>,
): ComputedRef<string> {
  return computed(() =>
    createMixedLinearGradient(resolve(colorA), resolve(colorB), resolve(steps), resolve(options)),
  );
}

/**
 * Reactive radial gradient.
 */
export function useRadialGradient(
  baseColor: string | Ref<string>,
  options?: RadialGradientOptions | Ref<RadialGradientOptions | undefined>,
): ComputedRef<string> {
  return computed(() => createRadialGradient(resolve(baseColor), resolve(options)));
}

/**
 * Reactive conic gradient.
 */
export function useConicGradient(
  baseColor: string | Ref<string>,
  options?: ConicGradientOptions | Ref<ConicGradientOptions | undefined>,
): ComputedRef<string> {
  return computed(() => createConicGradient(resolve(baseColor), resolve(options)));
}

/**
 * Reactive rainbow conic gradient.
 */
export function useRainbowConicGradient(
  options?: Parameters<typeof createRainbowConicGradient>[0] | Ref<Parameters<typeof createRainbowConicGradient>[0] | undefined>,
): ComputedRef<string> {
  return computed(() => createRainbowConicGradient(resolve(options)));
}

export default {
  install(app: App) {
    app.config.globalProperties.$useLinearGradient = useLinearGradient;
    app.config.globalProperties.$useMultiStepLinearGradient = useMultiStepLinearGradient;
    app.config.globalProperties.$useMixedLinearGradient = useMixedLinearGradient;
    app.config.globalProperties.$useRadialGradient = useRadialGradient;
    app.config.globalProperties.$useConicGradient = useConicGradient;
    app.config.globalProperties.$useRainbowConicGradient = useRainbowConicGradient;
  },
};
