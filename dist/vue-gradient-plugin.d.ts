import type { App } from '@vue/runtime-core';
import type { Ref, ComputedRef } from '@vue/reactivity';
import { GradientOptions, CustomLinearGradientOptions } from './linear-gradient.js';
import type { ColorStop } from './utils.js';
import { RadialGradientOptions } from './radial-gradient.js';
import { createRainbowConicGradient, ConicGradientOptions } from './conic-gradient.js';
/**
 * Reactive linear gradient. Returns a `ComputedRef<string>` that updates
 * automatically when `first` or `options` refs change.
 *
 * @example
 * const color = ref('#3498db')
 * const gradient = useLinearGradient(color, { direction: 'to right' })
 * // gradient.value → 'linear-gradient(to right, …)'
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
declare const _default: {
    install(app: App): void;
};
export default _default;
