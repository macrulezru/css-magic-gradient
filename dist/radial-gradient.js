"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRadialGradient = createRadialGradient;
const color_value_tools_1 = require("color-value-tools");
const utils_js_1 = require("./utils.js");
function sizeStr(size) {
    return typeof size === 'object' ? `${size.width} ${size.height}` : size;
}
function buildRadialLayer(shape, size, position, stops, repeating) {
    const fn = repeating ? 'repeating-radial-gradient' : 'radial-gradient';
    return `${fn}(${shape} ${sizeStr(size)} at ${position}, ${stops})`;
}
/**
 * Creates a CSS radial gradient.
 *
 * When `options.colors` is provided, those stops are used directly.
 * When `options.layers` is provided, multiple stacked radial gradients are
 * composed (CSS background-image layering syntax).
 * Otherwise, a two-stop gradient is auto-generated from `baseColor`.
 *
 * Supports hex, rgb(), hsl(), named colors, and CSS variables as baseColor.
 */
function createRadialGradient(baseColor, options) {
    const { offsetPercent = 15, shape = 'ellipse', size = 'farthest-corner', position = 'center', fallbackColor = '#f5e477', colors: customColors, layers, repeating = false, } = options || {};
    // Multi-layer mode
    if (layers && layers.length > 0) {
        return layers
            .map(layer => {
            var _a, _b, _c;
            const stops = layer.colors.map(utils_js_1.colorStopToString).join(', ');
            return buildRadialLayer((_a = layer.shape) !== null && _a !== void 0 ? _a : shape, (_b = layer.size) !== null && _b !== void 0 ? _b : size, (_c = layer.position) !== null && _c !== void 0 ? _c : position, stops, repeating);
        })
            .join(', ');
    }
    // Explicit color stops mode
    if (customColors && customColors.length > 0) {
        const stops = customColors.map(utils_js_1.colorStopToString).join(', ');
        return buildRadialLayer(shape, size, position, stops, repeating);
    }
    // Auto-generate from baseColor
    const resolved = (0, utils_js_1.resolveBaseColor)(baseColor, fallbackColor);
    const endColor = resolved.isCssVar ? resolved.varExpression : resolved.hex;
    const startColor = (0, color_value_tools_1.adjustHexBrightness)(resolved.hex, offsetPercent);
    return buildRadialLayer(shape, size, position, `${startColor}, ${endColor}`, repeating);
}
