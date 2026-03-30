"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDark = exports.contrastRatio = exports.wcagLevel = exports.bestTextColor = void 0;
exports.bestGradientTextColor = bestGradientTextColor;
exports.gradientContrastRatio = gradientContrastRatio;
exports.gradientWcagLevel = gradientWcagLevel;
exports.createAccessibleGradient = createAccessibleGradient;
const color_value_tools_1 = require("color-value-tools");
Object.defineProperty(exports, "bestTextColor", { enumerable: true, get: function () { return color_value_tools_1.bestTextColor; } });
Object.defineProperty(exports, "wcagLevel", { enumerable: true, get: function () { return color_value_tools_1.wcagLevel; } });
Object.defineProperty(exports, "contrastRatio", { enumerable: true, get: function () { return color_value_tools_1.contrastRatio; } });
Object.defineProperty(exports, "isDark", { enumerable: true, get: function () { return color_value_tools_1.isDark; } });
const utils_js_1 = require("./utils.js");
const linear_gradient_js_1 = require("./linear-gradient.js");
/**
 * Returns the best text color (`'#000000'` or `'#ffffff'`) to place over
 * a gradient built from two hex colors. Uses the average luminance of both
 * stops to pick the most readable option.
 */
function bestGradientTextColor(colorA, colorB) {
    // Mix the two endpoints at the midpoint and ask what text color works there
    const mid = (0, color_value_tools_1.mixColors)(colorA, colorB, 0.5, { mode: 'rgb', format: 'hex' });
    return (0, color_value_tools_1.bestTextColor)(mid);
}
/**
 * Returns the WCAG contrast ratio between a text color and the visual
 * midpoint of a gradient defined by two endpoint colors.
 */
function gradientContrastRatio(textColor, gradientColorA, gradientColorB) {
    const mid = (0, color_value_tools_1.mixColors)(gradientColorA, gradientColorB, 0.5, { mode: 'rgb', format: 'hex' });
    return (0, color_value_tools_1.contrastRatio)(textColor, mid);
}
/**
 * Returns the WCAG compliance level for text placed over a gradient.
 * Uses the visual midpoint of the gradient as the reference background color.
 */
function gradientWcagLevel(textColor, gradientColorA, gradientColorB) {
    const mid = (0, color_value_tools_1.mixColors)(gradientColorA, gradientColorB, 0.5, { mode: 'rgb', format: 'hex' });
    return (0, color_value_tools_1.wcagLevel)(textColor, mid);
}
/**
 * Creates a linear gradient that is automatically adjusted so that `textColor`
 * achieves at least the `targetLevel` WCAG rating against both gradient stops.
 *
 * If the base color already passes, it is used as-is.
 * If it does not, each stop is lightened or darkened by up to 40 % in 5 %
 * increments until the target contrast is met.
 *
 * Supports hex, rgb(), hsl(), and named colors as baseColor.
 */
function createAccessibleGradient(baseColor, textColor, options) {
    const { direction = 'to bottom', angle, targetLevel = 'AA', interpolation, repeating, } = options || {};
    const fallback = '#f5e477';
    const resolved = (0, utils_js_1.resolveBaseColor)(baseColor, fallback);
    const levelPriority = ['AAA', 'AA', 'AA-large', 'fail'];
    const targetIndex = levelPriority.indexOf(targetLevel);
    function passes(color) {
        const level = (0, color_value_tools_1.wcagLevel)(textColor, color);
        return levelPriority.indexOf(level) <= targetIndex;
    }
    function adjust(color) {
        if (passes(color))
            return color;
        const shouldLighten = (0, color_value_tools_1.isDark)(textColor);
        for (let step = 5; step <= 40; step += 5) {
            const candidate = shouldLighten ? (0, color_value_tools_1.lighten)(color, step) : (0, color_value_tools_1.darken)(color, step);
            if (passes(candidate))
                return candidate;
        }
        return color;
    }
    const startColor = adjust((0, color_value_tools_1.lighten)(resolved.hex, 15));
    const endColor = adjust(resolved.hex);
    return (0, linear_gradient_js_1.createLinearGradient)([{ color: startColor }, { color: endColor }], { direction, angle, interpolation, repeating });
}
