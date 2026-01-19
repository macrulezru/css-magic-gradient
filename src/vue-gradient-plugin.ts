import type { App } from '@vue/runtime-core';
import { computed, isRef } from '@vue/runtime-core';
import type { Ref, ComputedRef } from '@vue/reactivity';
import { createLinearGradient, GradientOptions } from './linear-gradient';
import { createRadialGradient, RadialGradientOptions } from './radial-gradient';
import { createConicGradient, ConicGradientOptions } from './conic-gradient';

function resolve<T>(value: T | Ref<T>): T {
  return isRef(value) ? value.value : value;
}


export function useLinearGradient(
  baseColor: string | Ref<string>,
  options?: GradientOptions | Ref<GradientOptions | undefined>
): ComputedRef<string> {
  return computed(() => createLinearGradient(resolve(baseColor), resolve(options)));
}

export function useRadialGradient(
  baseColor: string | Ref<string>,
  options?: RadialGradientOptions | Ref<RadialGradientOptions | undefined>
): ComputedRef<string> {
  return computed(() => createRadialGradient(resolve(baseColor), resolve(options)));
}

export function useConicGradient(
  baseColor: string | Ref<string>,
  options?: ConicGradientOptions | Ref<ConicGradientOptions | undefined>
): ComputedRef<string> {
  return computed(() => createConicGradient(resolve(baseColor), resolve(options)));
}

export default {
  install(app: App) {
    app.config.globalProperties.$useLinearGradient = useLinearGradient;
    app.config.globalProperties.$useRadialGradient = useRadialGradient;
    app.config.globalProperties.$useConicGradient = useConicGradient;
  }
};
