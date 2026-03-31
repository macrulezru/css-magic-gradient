import type { App } from '@vue/runtime-core';
import type { Ref, ComputedRef } from '@vue/reactivity';
import { GradientOptions, CustomLinearGradientOptions } from './linear-gradient.js';
import type { ColorStop } from './utils.js';
import { RadialGradientOptions } from './radial-gradient.js';
import { createRainbowConicGradient, ConicGradientOptions } from './conic-gradient.js';
import { HarmonyGradientOptions } from './presets.js';
import { AccessibleGradientOptions } from './accessibility.js';
/**
 * Reactive linear gradient. Returns a `ComputedRef<string>` that updates
 * automatically when `first` or `options` refs change.
 *
 * SSR-safe: returns a computed string without accessing DOM.
 */
export declare function useLinearGradient(first: string | ColorStop[] | Ref<string | ColorStop[]>, options?: GradientOptions | CustomLinearGradientOptions | Ref<GradientOptions | CustomLinearGradientOptions | undefined>): ComputedRef<string>;
/**
 * Reactive multi-step linear gradient.
 */
export declare function useMultiStepLinearGradient(baseColor: string | Ref<string>, steps?: number | Ref<number>, options?: Omit<GradientOptions, 'direction'> & {
    direction?: string;
} | Ref<Omit<GradientOptions, 'direction'> & {
    direction?: string;
} | undefined>): ComputedRef<string>;
/**
 * Reactive HSL-mixed linear gradient between two colors.
 */
export declare function useMixedLinearGradient(colorA: string | Ref<string>, colorB: string | Ref<string>, steps?: number | Ref<number>, options?: Omit<GradientOptions, 'offsetPercent'> | Ref<Omit<GradientOptions, 'offsetPercent'> | undefined>): ComputedRef<string>;
/**
 * Reactive radial gradient.
 */
export declare function useRadialGradient(baseColor: string | Ref<string>, options?: RadialGradientOptions | Ref<RadialGradientOptions | undefined>): ComputedRef<string>;
/**
 * Reactive conic gradient.
 */
export declare function useConicGradient(baseColor: string | Ref<string>, options?: ConicGradientOptions | Ref<ConicGradientOptions | undefined>): ComputedRef<string>;
/**
 * Reactive rainbow conic gradient.
 */
export declare function useRainbowConicGradient(options?: Parameters<typeof createRainbowConicGradient>[0] | Ref<Parameters<typeof createRainbowConicGradient>[0] | undefined>): ComputedRef<string>;
/**
 * Reactive complementary gradient.
 */
export declare function useComplementaryGradient(baseColor: string | Ref<string>, options?: HarmonyGradientOptions | Ref<HarmonyGradientOptions | undefined>): ComputedRef<string>;
/**
 * Reactive triadic gradient.
 */
export declare function useTriadicGradient(baseColor: string | Ref<string>, options?: (HarmonyGradientOptions & {
    smoothness?: number;
}) | Ref<(HarmonyGradientOptions & {
    smoothness?: number;
}) | undefined>): ComputedRef<string>;
/**
 * Reactive analogous gradient.
 */
export declare function useAnalogousGradient(baseColor: string | Ref<string>, options?: (HarmonyGradientOptions & {
    spread?: number;
}) | Ref<(HarmonyGradientOptions & {
    spread?: number;
}) | undefined>): ComputedRef<string>;
/**
 * Reactive tetradic gradient.
 */
export declare function useTetradicGradient(baseColor: string | Ref<string>, options?: (HarmonyGradientOptions & {
    type?: 'linear' | 'radial' | 'conic';
}) | Ref<(HarmonyGradientOptions & {
    type?: 'linear' | 'radial' | 'conic';
}) | undefined>): ComputedRef<string>;
/**
 * Reactive split-complementary gradient.
 */
export declare function useSplitComplementaryGradient(baseColor: string | Ref<string>, options?: HarmonyGradientOptions | Ref<HarmonyGradientOptions | undefined>): ComputedRef<string>;
/**
 * Reactive tint gradient (base color → white via Oklab tints).
 */
export declare function useTintGradient(baseColor: string | Ref<string>, steps?: number | Ref<number>, options?: {
    direction?: string;
    angle?: number;
} | Ref<{
    direction?: string;
    angle?: number;
} | undefined>): ComputedRef<string>;
/**
 * Reactive shade gradient (base color → black via Oklab shades).
 */
export declare function useShadeGradient(baseColor: string | Ref<string>, steps?: number | Ref<number>, options?: {
    direction?: string;
    angle?: number;
} | Ref<{
    direction?: string;
    angle?: number;
} | undefined>): ComputedRef<string>;
/**
 * Reactive tone gradient (base color → gray via Oklab tones).
 */
export declare function useToneGradient(baseColor: string | Ref<string>, steps?: number | Ref<number>, options?: {
    direction?: string;
    angle?: number;
    gray?: string;
} | Ref<{
    direction?: string;
    angle?: number;
    gray?: string;
} | undefined>): ComputedRef<string>;
/**
 * Reactive accessible gradient that auto-adjusts stops until `textColor`
 * achieves the target WCAG level.
 *
 * SSR-safe: purely string computation, no DOM access.
 */
export declare function useAccessibleGradient(baseColor: string | Ref<string>, textColor: string | Ref<string>, options?: AccessibleGradientOptions | Ref<AccessibleGradientOptions | undefined>): ComputedRef<string>;
declare const _default: {
    install(app: App): void;
};
export default _default;
