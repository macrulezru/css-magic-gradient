"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRadialGradient = createRadialGradient;
exports.createRadialGradientLayers = createRadialGradientLayers;
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
 * Modes (evaluated in priority order):
 * 1. `layers` — multiple stacked radial gradients.
 * 2. `harmonyType` — auto-generates stops using the specified color harmony.
 * 3. `colors` — explicit color stops.
 * 4. Auto-generate two-stop gradient from `baseColor`.
 *
 * Supports hex, rgb(), hsl(), named colors, and CSS variables as baseColor.
 */
function createRadialGradient(baseColor, options) {
    const { offsetPercent = 15, shape = 'ellipse', size = 'farthest-corner', position = 'center', fallbackColor = '#f5e477', colors: customColors, layers, repeating = false, harmonyType, interpolationSpace = 'oklch', } = options || {};
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
    const resolved = (0, utils_js_1.resolveBaseColor)(baseColor, fallbackColor);
    const mode = (0, utils_js_1.toScaleMode)(interpolationSpace);
    // Harmony mode — derive stops from color harmony
    if (harmonyType) {
        let harmonyColors;
        switch (harmonyType) {
            case 'complementary':
                harmonyColors = [resolved.hex, (0, color_value_tools_1.complement)(resolved.hex)];
                break;
            case 'triadic':
                harmonyColors = (0, color_value_tools_1.triadic)(resolved.hex);
                break;
            case 'tetradic':
                harmonyColors = (0, color_value_tools_1.tetradic)(resolved.hex);
                break;
            case 'analogous':
                harmonyColors = (0, color_value_tools_1.analogous)(resolved.hex);
                break;
        }
        const scale = (0, color_value_tools_1.createColorScale)(harmonyColors, Math.max(harmonyColors.length, 5), {
            space: mode,
            format: 'hex',
        });
        const stops = scale.map(c => (0, utils_js_1.colorStopToString)({ color: c })).join(', ');
        return buildRadialLayer(shape, size, position, stops, repeating);
    }
    // Explicit color stops mode
    if (customColors && customColors.length > 0) {
        const stops = customColors.map(utils_js_1.colorStopToString).join(', ');
        return buildRadialLayer(shape, size, position, stops, repeating);
    }
    // Auto-generate from baseColor
    const endColor = resolved.isCssVar ? resolved.varExpression : resolved.hex;
    const startColor = (0, color_value_tools_1.adjustHexBrightness)(resolved.hex, offsetPercent);
    return buildRadialLayer(shape, size, position, `${startColor}, ${endColor}`, repeating);
}
/**
 * Utility that generates a set of `RadialGradientLayer` objects with evenly
 * distributed sizes and colors from the given harmony.
 *
 * Each layer shrinks from `maxSizePercent` down to `minSizePercent`, creating
 * a nested multi-ring radial effect when composed into `createRadialGradient`.
 *
 * @example
 * const layers = createRadialGradientLayers('#3498db', {
 *   count: 4,
 *   harmonyType: 'triadic',
 * });
 * const gradient = createRadialGradient('#3498db', { layers });
 */
function createRadialGradientLayers(baseColor, options) {
    const { count = 3, minSizePercent = 20, maxSizePercent = 100, harmonyType = 'analogous', interpolationSpace = 'oklch', position = 'center', } = options || {};
    const fallback = '#f5e477';
    const resolved = (0, utils_js_1.resolveBaseColor)(baseColor, fallback);
    const mode = (0, utils_js_1.toScaleMode)(interpolationSpace);
    let harmonyColors;
    switch (harmonyType) {
        case 'complementary':
            harmonyColors = [resolved.hex, (0, color_value_tools_1.complement)(resolved.hex)];
            break;
        case 'triadic':
            harmonyColors = (0, color_value_tools_1.triadic)(resolved.hex);
            break;
        case 'tetradic':
            harmonyColors = (0, color_value_tools_1.tetradic)(resolved.hex);
            break;
        case 'analogous':
        default:
            harmonyColors = (0, color_value_tools_1.analogous)(resolved.hex);
            break;
    }
    const colorScale = (0, color_value_tools_1.createColorScale)(harmonyColors, count, { space: mode, format: 'hex' });
    const sizeStep = count > 1 ? (maxSizePercent - minSizePercent) / (count - 1) : 0;
    return colorScale.map((color, i) => {
        const sizePct = maxSizePercent - i * sizeStep;
        return {
            position,
            size: `${sizePct.toFixed(0)}% ${sizePct.toFixed(0)}%`,
            colors: [
                { color: (0, color_value_tools_1.adjustHexBrightness)(color, 20), position: '0%' },
                { color, position: '100%' },
            ],
        };
    });
}
