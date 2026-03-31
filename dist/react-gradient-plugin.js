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
const react_1 = require("react");
const linear_gradient_js_1 = require("./linear-gradient.js");
const radial_gradient_js_1 = require("./radial-gradient.js");
const conic_gradient_js_1 = require("./conic-gradient.js");
const presets_js_1 = require("./presets.js");
const accessibility_js_1 = require("./accessibility.js");
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
function useLinearGradient(first, options) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return (0, react_1.useMemo)(() => (0, linear_gradient_js_1.createLinearGradient)(first, options), [
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
function useMultiStepLinearGradient(baseColor, steps = 3, options) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return (0, react_1.useMemo)(() => (0, linear_gradient_js_1.createMultiStepLinearGradient)(baseColor, steps, options), [
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
function useMixedLinearGradient(colorA, colorB, steps = 5, options) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return (0, react_1.useMemo)(() => (0, linear_gradient_js_1.createMixedLinearGradient)(colorA, colorB, steps, options), [
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
function useRadialGradient(baseColor, options) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return (0, react_1.useMemo)(() => (0, radial_gradient_js_1.createRadialGradient)(baseColor, options), [
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
function useConicGradient(baseColor, options) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return (0, react_1.useMemo)(() => (0, conic_gradient_js_1.createConicGradient)(baseColor, options), [
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
function useRainbowConicGradient(options) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return (0, react_1.useMemo)(() => (0, conic_gradient_js_1.createRainbowConicGradient)(options), [JSON.stringify(options)]);
}
// ─── New harmony hooks ────────────────────────────────────────────────────────
/**
 * Returns a memoized complementary gradient string.
 * SSR-safe.
 *
 * @example
 * const gradient = useComplementaryGradient('#3498db', { steps: 7, interpolationSpace: 'oklab' });
 */
function useComplementaryGradient(baseColor, options) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return (0, react_1.useMemo)(() => (0, presets_js_1.createComplementaryGradient)(baseColor, options), [
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
function useTriadicGradient(baseColor, options) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return (0, react_1.useMemo)(() => (0, presets_js_1.createTriadicGradient)(baseColor, options), [
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
function useAnalogousGradient(baseColor, options) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return (0, react_1.useMemo)(() => (0, presets_js_1.createAnalogousGradient)(baseColor, options), [
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
function useTetradicGradient(baseColor, options) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return (0, react_1.useMemo)(() => (0, presets_js_1.createTetradicGradient)(baseColor, options), [
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
function useSplitComplementaryGradient(baseColor, options) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return (0, react_1.useMemo)(() => (0, presets_js_1.createSplitComplementaryGradient)(baseColor, options), [
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
function useTintGradient(baseColor, steps = 5, options) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return (0, react_1.useMemo)(() => (0, presets_js_1.createTintGradient)(baseColor, steps, options), [
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
function useShadeGradient(baseColor, steps = 5, options) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return (0, react_1.useMemo)(() => (0, presets_js_1.createShadeGradient)(baseColor, steps, options), [
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
function useToneGradient(baseColor, steps = 5, options) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return (0, react_1.useMemo)(() => (0, presets_js_1.createToneGradient)(baseColor, steps, options), [
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
function useAccessibleGradient(baseColor, textColor, options) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return (0, react_1.useMemo)(() => (0, accessibility_js_1.createAccessibleGradient)(baseColor, textColor, options), [
        baseColor,
        textColor,
        JSON.stringify(options),
    ]);
}
