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

function resolve<T>(value: T | Ref<T>): T {
  return isRef(value) ? value.value : value;
}

// ─── Existing hooks ───────────────────────────────────────────────────────────

/**
 * Reactive linear gradient. Returns a `ComputedRef<string>` that updates
 * automatically when `first` or `options` refs change.
 *
 * SSR-safe: returns a computed string without accessing DOM.
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

// ─── New harmony hooks ────────────────────────────────────────────────────────

/**
 * Reactive complementary gradient.
 */
export function useComplementaryGradient(
  baseColor: string | Ref<string>,
  options?: HarmonyGradientOptions | Ref<HarmonyGradientOptions | undefined>,
): ComputedRef<string> {
  return computed(() => createComplementaryGradient(resolve(baseColor), resolve(options)));
}

/**
 * Reactive triadic gradient.
 */
export function useTriadicGradient(
  baseColor: string | Ref<string>,
  options?: (HarmonyGradientOptions & { smoothness?: number }) | Ref<(HarmonyGradientOptions & { smoothness?: number }) | undefined>,
): ComputedRef<string> {
  return computed(() => createTriadicGradient(resolve(baseColor), resolve(options)));
}

/**
 * Reactive analogous gradient.
 */
export function useAnalogousGradient(
  baseColor: string | Ref<string>,
  options?: (HarmonyGradientOptions & { spread?: number }) | Ref<(HarmonyGradientOptions & { spread?: number }) | undefined>,
): ComputedRef<string> {
  return computed(() => createAnalogousGradient(resolve(baseColor), resolve(options)));
}

/**
 * Reactive tetradic gradient.
 */
export function useTetradicGradient(
  baseColor: string | Ref<string>,
  options?: (HarmonyGradientOptions & { type?: 'linear' | 'radial' | 'conic' }) | Ref<(HarmonyGradientOptions & { type?: 'linear' | 'radial' | 'conic' }) | undefined>,
): ComputedRef<string> {
  return computed(() => createTetradicGradient(resolve(baseColor), resolve(options)));
}

/**
 * Reactive split-complementary gradient.
 */
export function useSplitComplementaryGradient(
  baseColor: string | Ref<string>,
  options?: HarmonyGradientOptions | Ref<HarmonyGradientOptions | undefined>,
): ComputedRef<string> {
  return computed(() => createSplitComplementaryGradient(resolve(baseColor), resolve(options)));
}

// ─── New palette hooks ────────────────────────────────────────────────────────

/**
 * Reactive tint gradient (base color → white via Oklab tints).
 */
export function useTintGradient(
  baseColor: string | Ref<string>,
  steps: number | Ref<number> = 5,
  options?: { direction?: string; angle?: number } | Ref<{ direction?: string; angle?: number } | undefined>,
): ComputedRef<string> {
  return computed(() => createTintGradient(resolve(baseColor), resolve(steps), resolve(options)));
}

/**
 * Reactive shade gradient (base color → black via Oklab shades).
 */
export function useShadeGradient(
  baseColor: string | Ref<string>,
  steps: number | Ref<number> = 5,
  options?: { direction?: string; angle?: number } | Ref<{ direction?: string; angle?: number } | undefined>,
): ComputedRef<string> {
  return computed(() => createShadeGradient(resolve(baseColor), resolve(steps), resolve(options)));
}

/**
 * Reactive tone gradient (base color → gray via Oklab tones).
 */
export function useToneGradient(
  baseColor: string | Ref<string>,
  steps: number | Ref<number> = 5,
  options?: { direction?: string; angle?: number; gray?: string } | Ref<{ direction?: string; angle?: number; gray?: string } | undefined>,
): ComputedRef<string> {
  return computed(() => createToneGradient(resolve(baseColor), resolve(steps), resolve(options)));
}

// ─── Accessibility hook ───────────────────────────────────────────────────────

/**
 * Reactive accessible gradient that auto-adjusts stops until `textColor`
 * achieves the target WCAG level.
 *
 * SSR-safe: purely string computation, no DOM access.
 */
export function useAccessibleGradient(
  baseColor: string | Ref<string>,
  textColor: string | Ref<string>,
  options?: AccessibleGradientOptions | Ref<AccessibleGradientOptions | undefined>,
): ComputedRef<string> {
  return computed(() =>
    createAccessibleGradient(resolve(baseColor), resolve(textColor), resolve(options)),
  );
}

// ─── Plugin ───────────────────────────────────────────────────────────────────

export default {
  install(app: App) {
    app.config.globalProperties.$useLinearGradient = useLinearGradient;
    app.config.globalProperties.$useMultiStepLinearGradient = useMultiStepLinearGradient;
    app.config.globalProperties.$useMixedLinearGradient = useMixedLinearGradient;
    app.config.globalProperties.$useRadialGradient = useRadialGradient;
    app.config.globalProperties.$useConicGradient = useConicGradient;
    app.config.globalProperties.$useRainbowConicGradient = useRainbowConicGradient;
    app.config.globalProperties.$useComplementaryGradient = useComplementaryGradient;
    app.config.globalProperties.$useTriadicGradient = useTriadicGradient;
    app.config.globalProperties.$useAnalogousGradient = useAnalogousGradient;
    app.config.globalProperties.$useTetradicGradient = useTetradicGradient;
    app.config.globalProperties.$useSplitComplementaryGradient = useSplitComplementaryGradient;
    app.config.globalProperties.$useTintGradient = useTintGradient;
    app.config.globalProperties.$useShadeGradient = useShadeGradient;
    app.config.globalProperties.$useToneGradient = useToneGradient;
    app.config.globalProperties.$useAccessibleGradient = useAccessibleGradient;
  },
};
