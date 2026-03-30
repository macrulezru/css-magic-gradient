"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConicGradient = createConicGradient;
exports.createRainbowConicGradient = createRainbowConicGradient;
const color_value_tools_1 = require("color-value-tools");
const utils_js_1 = require("./utils.js");
/**
 * Creates a CSS conic gradient.
 *
 * When `options.colors` is provided, those stops are used directly.
 * When `options.hueRotation` is true, auto-generates stops by rotating hue.
 * Otherwise, auto-generates stops by adjusting brightness.
 *
 * Supports hex, rgb(), hsl(), named colors, and CSS variables as baseColor.
 */
function createConicGradient(baseColor, options) {
    const { fromAngle = 0, position = '50% 50%', fallbackColor = '#f5e477', colors: customColors, hueRotation = false, steps = 8, offsetPercent = 20, repeating = false, } = options || {};
    const fn = repeating ? 'repeating-conic-gradient' : 'conic-gradient';
    const header = `from ${fromAngle}deg at ${position}`;
    // Explicit stops mode
    if (customColors && customColors.length > 0) {
        const stops = customColors.map(utils_js_1.colorStopToString).join(', ');
        return `${fn}(${header}, ${stops})`;
    }
    const resolved = (0, utils_js_1.resolveBaseColor)(baseColor, fallbackColor);
    const colorStops = [];
    if (hueRotation) {
        for (let i = 0; i < steps; i++) {
            const degrees = (i * 360) / steps;
            const positionPercent = (i * 100) / steps;
            colorStops.push(`${(0, color_value_tools_1.rotateHue)(resolved.hex, degrees)} ${positionPercent}%`);
        }
        // Close the circle smoothly
        colorStops.push(`${(0, color_value_tools_1.rotateHue)(resolved.hex, 0)} 100%`);
    }
    else {
        for (let i = 0; i < steps; i++) {
            const percent = offsetPercent * (1 - i / (steps - 1));
            const positionPercent = (i * 100) / steps;
            colorStops.push(`${(0, color_value_tools_1.adjustHexBrightness)(resolved.hex, percent)} ${positionPercent}%`);
        }
        colorStops.push(`${(0, color_value_tools_1.adjustHexBrightness)(resolved.hex, 0)} 100%`);
    }
    return `${fn}(${header}, ${colorStops.join(', ')})`;
}
/**
 * Creates a full-spectrum rainbow conic gradient using HSL color space.
 * The gradient smoothly cycles through all hues starting at `fromAngle`.
 */
function createRainbowConicGradient(options) {
    const { fromAngle = 0, position = '50% 50%', saturation = 80, lightness = 60, steps = 12, repeating = false, } = options || {};
    const fn = repeating ? 'repeating-conic-gradient' : 'conic-gradient';
    const stepSize = 360 / steps;
    const colorStops = [];
    for (let i = 0; i <= steps; i++) {
        const hue = (i * stepSize) % 360;
        colorStops.push(`${(0, color_value_tools_1.hslToHex)(hue, saturation, lightness)} ${(i * 100) / steps}%`);
    }
    return `${fn}(from ${fromAngle}deg at ${position}, ${colorStops.join(', ')})`;
}
