"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLinearGradient = useLinearGradient;
exports.useMultiStepLinearGradient = useMultiStepLinearGradient;
exports.useMixedLinearGradient = useMixedLinearGradient;
exports.useRadialGradient = useRadialGradient;
exports.useConicGradient = useConicGradient;
exports.useRainbowConicGradient = useRainbowConicGradient;
const react_1 = require("react");
const linear_gradient_js_1 = require("./linear-gradient.js");
const radial_gradient_js_1 = require("./radial-gradient.js");
const conic_gradient_js_1 = require("./conic-gradient.js");
/**
 * Returns a memoized CSS linear gradient string.
 * Accepts the same arguments as `createLinearGradient`.
 * Recomputes only when inputs change (compared by serialized value).
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
 * Recomputes only when inputs change.
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
 * Recomputes only when inputs change.
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
 * Accepts the same arguments as `createRadialGradient`.
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
 * Accepts the same arguments as `createConicGradient`.
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
 * Accepts the same arguments as `createRainbowConicGradient`.
 *
 * @example
 * const gradient = useRainbowConicGradient({ steps: 24 });
 */
function useRainbowConicGradient(options) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return (0, react_1.useMemo)(() => (0, conic_gradient_js_1.createRainbowConicGradient)(options), [JSON.stringify(options)]);
}
