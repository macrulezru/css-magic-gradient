import type { App } from '@vue/runtime-core';
import type { Ref, ComputedRef } from '@vue/reactivity';
import { GradientOptions } from './linear-gradient';
import { RadialGradientOptions } from './radial-gradient';
import { ConicGradientOptions } from './conic-gradient';
export declare function useLinearGradient(baseColor: string | Ref<string>, options?: GradientOptions | Ref<GradientOptions | undefined>): ComputedRef<string>;
export declare function useRadialGradient(baseColor: string | Ref<string>, options?: RadialGradientOptions | Ref<RadialGradientOptions | undefined>): ComputedRef<string>;
export declare function useConicGradient(baseColor: string | Ref<string>, options?: ConicGradientOptions | Ref<ConicGradientOptions | undefined>): ComputedRef<string>;
declare const _default: {
    install(app: App): void;
};
export default _default;
