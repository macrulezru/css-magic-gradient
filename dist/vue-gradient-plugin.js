"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLinearGradient = useLinearGradient;
exports.useMultiStepLinearGradient = useMultiStepLinearGradient;
exports.useMixedLinearGradient = useMixedLinearGradient;
exports.useRadialGradient = useRadialGradient;
exports.useConicGradient = useConicGradient;
exports.useRainbowConicGradient = useRainbowConicGradient;
exports.useComplementaryGradient = useComplementaryGradient;
exports.useTriadicGradient = useTriadicGradient;
exports.useAnalogousGradient = useAnalogousGradient;
exports.useTetradicGradient = useTetradicGradient;
exports.useSplitComplementaryGradient = useSplitComplementaryGradient;
exports.useTintGradient = useTintGradient;
exports.useShadeGradient = useShadeGradient;
exports.useToneGradient = useToneGradient;
exports.useAccessibleGradient = useAccessibleGradient;
const runtime_core_1 = require("@vue/runtime-core");
const linear_gradient_js_1 = require("./linear-gradient.js");
const radial_gradient_js_1 = require("./radial-gradient.js");
const conic_gradient_js_1 = require("./conic-gradient.js");
const presets_js_1 = require("./presets.js");
const accessibility_js_1 = require("./accessibility.js");
function resolve(value) {
    return (0, runtime_core_1.isRef)(value) ? value.value : value;
}
// ─── Existing hooks ───────────────────────────────────────────────────────────
/**
 * Reactive linear gradient. Returns a `ComputedRef<string>` that updates
 * automatically when `first` or `options` refs change.
 *
 * SSR-safe: returns a computed string without accessing DOM.
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
// ─── New harmony hooks ────────────────────────────────────────────────────────
/**
 * Reactive complementary gradient.
 */
function useComplementaryGradient(baseColor, options) {
    return (0, runtime_core_1.computed)(() => (0, presets_js_1.createComplementaryGradient)(resolve(baseColor), resolve(options)));
}
/**
 * Reactive triadic gradient.
 */
function useTriadicGradient(baseColor, options) {
    return (0, runtime_core_1.computed)(() => (0, presets_js_1.createTriadicGradient)(resolve(baseColor), resolve(options)));
}
/**
 * Reactive analogous gradient.
 */
function useAnalogousGradient(baseColor, options) {
    return (0, runtime_core_1.computed)(() => (0, presets_js_1.createAnalogousGradient)(resolve(baseColor), resolve(options)));
}
/**
 * Reactive tetradic gradient.
 */
function useTetradicGradient(baseColor, options) {
    return (0, runtime_core_1.computed)(() => (0, presets_js_1.createTetradicGradient)(resolve(baseColor), resolve(options)));
}
/**
 * Reactive split-complementary gradient.
 */
function useSplitComplementaryGradient(baseColor, options) {
    return (0, runtime_core_1.computed)(() => (0, presets_js_1.createSplitComplementaryGradient)(resolve(baseColor), resolve(options)));
}
// ─── New palette hooks ────────────────────────────────────────────────────────
/**
 * Reactive tint gradient (base color → white via Oklab tints).
 */
function useTintGradient(baseColor, steps = 5, options) {
    return (0, runtime_core_1.computed)(() => (0, presets_js_1.createTintGradient)(resolve(baseColor), resolve(steps), resolve(options)));
}
/**
 * Reactive shade gradient (base color → black via Oklab shades).
 */
function useShadeGradient(baseColor, steps = 5, options) {
    return (0, runtime_core_1.computed)(() => (0, presets_js_1.createShadeGradient)(resolve(baseColor), resolve(steps), resolve(options)));
}
/**
 * Reactive tone gradient (base color → gray via Oklab tones).
 */
function useToneGradient(baseColor, steps = 5, options) {
    return (0, runtime_core_1.computed)(() => (0, presets_js_1.createToneGradient)(resolve(baseColor), resolve(steps), resolve(options)));
}
// ─── Accessibility hook ───────────────────────────────────────────────────────
/**
 * Reactive accessible gradient that auto-adjusts stops until `textColor`
 * achieves the target WCAG level.
 *
 * SSR-safe: purely string computation, no DOM access.
 */
function useAccessibleGradient(baseColor, textColor, options) {
    return (0, runtime_core_1.computed)(() => (0, accessibility_js_1.createAccessibleGradient)(resolve(baseColor), resolve(textColor), resolve(options)));
}
// ─── Plugin ───────────────────────────────────────────────────────────────────
exports.default = {
    install(app) {
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
