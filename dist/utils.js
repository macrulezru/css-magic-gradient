"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorStopToString = colorStopToString;
exports.resolveBaseColor = resolveBaseColor;
exports.toScaleMode = toScaleMode;
const color_value_tools_1 = require("color-value-tools");
/**
 * Converts a color stop object to its CSS string representation.
 * Supports opacity for hex, rgb, hsl, and named colors.
 */
function colorStopToString(item) {
    let colorStr = item.color;
    if (typeof item.opacity === 'number') {
        if (item.opacity === 0) {
            colorStr = 'transparent';
        }
        else {
            const type = (0, color_value_tools_1.getColorType)(item.color);
            if (type === 'hex') {
                colorStr = (0, color_value_tools_1.hexToRgba)(item.color, item.opacity);
            }
            else if (type === 'rgb' || type === 'hsl' || type === 'named') {
                colorStr = (0, color_value_tools_1.setAlpha)(item.color, item.opacity);
            }
        }
    }
    return item.position !== undefined ? `${colorStr} ${item.position}` : colorStr;
}
/**
 * Resolves any supported color format (hex, rgb, hsl, named, CSS variable) to
 * a ResolvedColor object that always exposes a usable hex value.
 *
 * CSS variables are resolved to their fallback hex so brightness / hue
 * calculations remain possible; the original var() expression is preserved
 * in `varExpression` for use as the actual CSS color value.
 */
function resolveBaseColor(color, fallback) {
    const type = (0, color_value_tools_1.getColorType)(color);
    if (type === 'css-var') {
        const varName = (0, color_value_tools_1.extractCssVariableName)(color);
        return {
            hex: (0, color_value_tools_1.normalizeHex)(fallback),
            isCssVar: true,
            varExpression: `var(${varName}, ${fallback})`,
        };
    }
    if (type === 'hex') {
        return { hex: (0, color_value_tools_1.normalizeHex)(color), isCssVar: false };
    }
    // rgb, hsl, named → convert through normalizeColor
    const parsed = (0, color_value_tools_1.normalizeColor)(color);
    if (parsed && parsed.hex) {
        return { hex: parsed.hex, isCssVar: false };
    }
    return { hex: (0, color_value_tools_1.normalizeHex)(fallback), isCssVar: false };
}
/**
 * Maps a `ScaleInterpolation` value to the `space` string accepted by
 * `createColorScale` from color-value-tools. Identity for all supported values.
 *
 * `ScaleInterpolation` is already restricted to the supported subset
 * ('rgb' | 'hsl' | 'oklab' | 'oklch'), so no remapping is needed here.
 * The type contract enforces correctness at the call site.
 */
function toScaleMode(space) {
    return space;
}
