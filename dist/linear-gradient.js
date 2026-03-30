"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLinearGradient = createLinearGradient;
exports.createMultiStepLinearGradient = createMultiStepLinearGradient;
exports.createMixedLinearGradient = createMixedLinearGradient;
const color_value_tools_1 = require("color-value-tools");
const utils_js_1 = require("./utils.js");
function buildLinearGradient(direction, stops, interpolation, repeating = false) {
    const fn = repeating ? 'repeating-linear-gradient' : 'linear-gradient';
    const interp = interpolation ? ` in ${interpolation}` : '';
    return `${fn}(${direction}${interp}, ${stops})`;
}
/**
 * Creates a CSS linear gradient.
 *
 * Overload 1 — from a base color (auto-generates light → dark stops):
 * ```ts
 * createLinearGradient('#3498db', { direction: 'to right', offsetPercent: 20 })
 * ```
 *
 * Overload 2 — from explicit color stops:
 * ```ts
 * createLinearGradient([
 *   { color: '#ff0000', position: '0%' },
 *   { color: '#0000ff', position: '100%' },
 * ], { angle: 45 })
 * ```
 *
 * Supports hex, rgb(), hsl(), named colors, and CSS variables as base color.
 */
function createLinearGradient(first, options) {
    if (Array.isArray(first)) {
        const { direction = 'to bottom', angle, interpolation, repeating } = options || {};
        const dir = angle ? `${angle}deg` : direction;
        const stops = first.map(utils_js_1.colorStopToString).join(', ');
        return buildLinearGradient(dir, stops, interpolation, repeating);
    }
    const { offsetPercent = 15, direction = 'to bottom', angle, fallbackColor = '#f5e477', interpolation, repeating, } = options || {};
    const resolved = (0, utils_js_1.resolveBaseColor)(first, fallbackColor);
    const endColor = resolved.isCssVar ? resolved.varExpression : resolved.hex;
    const startColor = (0, color_value_tools_1.adjustHexBrightness)(resolved.hex, offsetPercent);
    const dir = angle ? `${angle}deg` : direction;
    return buildLinearGradient(dir, `${startColor}, ${endColor}`, interpolation, repeating);
}
/**
 * Creates a multi-stop linear gradient by interpolating brightness from light
 * to base color across `steps` evenly spaced stops.
 *
 * Supports hex, rgb(), hsl(), and named colors as base color.
 */
function createMultiStepLinearGradient(baseColor, steps = 3, options) {
    const { offsetPercent = 15, direction = 'to bottom', angle, fallbackColor = '#f5e477', interpolation, repeating, } = options || {};
    const resolved = (0, utils_js_1.resolveBaseColor)(baseColor, fallbackColor);
    const colors = [];
    for (let i = 0; i < steps; i++) {
        const percent = offsetPercent * (1 - i / (steps - 1));
        colors.push((0, color_value_tools_1.adjustHexBrightness)(resolved.hex, percent));
    }
    const dir = angle ? `${angle}deg` : direction;
    return buildLinearGradient(dir, colors.join(', '), interpolation, repeating);
}
/**
 * Creates a linear gradient by evenly mixing two colors across `steps` stops
 * using HSL interpolation. Useful for smooth, perceptually pleasing transitions.
 *
 * Supports any color format accepted by color-value-tools.
 */
function createMixedLinearGradient(colorA, colorB, steps = 5, options) {
    const { direction = 'to bottom', angle, fallbackColor = '#f5e477', interpolation, repeating, } = options || {};
    const resolvedA = (0, utils_js_1.resolveBaseColor)(colorA, fallbackColor);
    const resolvedB = (0, utils_js_1.resolveBaseColor)(colorB, fallbackColor);
    const colors = [];
    for (let i = 0; i < steps; i++) {
        const t = steps === 1 ? 0 : i / (steps - 1);
        colors.push((0, color_value_tools_1.mixColors)(resolvedA.hex, resolvedB.hex, t, { mode: 'hsl', format: 'hex' }));
    }
    const dir = angle ? `${angle}deg` : direction;
    return buildLinearGradient(dir, colors.join(', '), interpolation, repeating);
}
