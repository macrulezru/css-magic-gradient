"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLinearGradient = useLinearGradient;
exports.useMultiStepLinearGradient = useMultiStepLinearGradient;
exports.useMixedLinearGradient = useMixedLinearGradient;
exports.useRadialGradient = useRadialGradient;
exports.useConicGradient = useConicGradient;
exports.useRainbowConicGradient = useRainbowConicGradient;
const runtime_core_1 = require("@vue/runtime-core");
const linear_gradient_js_1 = require("./linear-gradient.js");
const radial_gradient_js_1 = require("./radial-gradient.js");
const conic_gradient_js_1 = require("./conic-gradient.js");
function resolve(value) {
    return (0, runtime_core_1.isRef)(value) ? value.value : value;
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
function useLinearGradient(first, options) {
    return (0, runtime_core_1.computed)(() => (0, linear_gradient_js_1.createLinearGradient)(resolve(first), resolve(options)));
}
/**
 * Reactive multi-step linear gradient.
 */
function useMultiStepLinearGradient(baseColor, steps = 3, options) {
    return (0, runtime_core_1.computed)(() => (0, linear_gradient_js_1.createMultiStepLinearGradient)(resolve(baseColor), resolve(steps), resolve(options)));
}
/**
 * Reactive HSL-mixed linear gradient between two colors.
 */
function useMixedLinearGradient(colorA, colorB, steps = 5, options) {
    return (0, runtime_core_1.computed)(() => (0, linear_gradient_js_1.createMixedLinearGradient)(resolve(colorA), resolve(colorB), resolve(steps), resolve(options)));
}
/**
 * Reactive radial gradient.
 */
function useRadialGradient(baseColor, options) {
    return (0, runtime_core_1.computed)(() => (0, radial_gradient_js_1.createRadialGradient)(resolve(baseColor), resolve(options)));
}
/**
 * Reactive conic gradient.
 */
function useConicGradient(baseColor, options) {
    return (0, runtime_core_1.computed)(() => (0, conic_gradient_js_1.createConicGradient)(resolve(baseColor), resolve(options)));
}
/**
 * Reactive rainbow conic gradient.
 */
function useRainbowConicGradient(options) {
    return (0, runtime_core_1.computed)(() => (0, conic_gradient_js_1.createRainbowConicGradient)(resolve(options)));
}
exports.default = {
    install(app) {
        app.config.globalProperties.$useLinearGradient = useLinearGradient;
        app.config.globalProperties.$useMultiStepLinearGradient = useMultiStepLinearGradient;
        app.config.globalProperties.$useMixedLinearGradient = useMixedLinearGradient;
        app.config.globalProperties.$useRadialGradient = useRadialGradient;
        app.config.globalProperties.$useConicGradient = useConicGradient;
        app.config.globalProperties.$useRainbowConicGradient = useRainbowConicGradient;
    },
};
