"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRadialGradient = createRadialGradient;
const color_value_tools_1 = require("color-value-tools");
function createRadialGradient(baseColor, options) {
    const { offsetPercent = 15, shape = 'ellipse', size = 'farthest-corner', position = 'center', fallbackColor = '#f5e477', useCustomColors = false, colors: customColors, layers, } = options || {};
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
                else if (type === 'rgb') {
                    colorStr = item.color.replace(/rgb\(([^)]+)\)/, (_, rgb) => `rgba(${rgb}, ${item.opacity})`);
                }
                else {
                    colorStr = item.color;
                }
            }
        }
        return item.position ? `${colorStr} ${item.position}` : colorStr;
    }
    if (layers && layers.length > 0) {
        const layerGradients = layers.map(layer => {
            const layerShape = layer.shape || shape;
            const layerSize = typeof layer.size === 'object' ? `${layer.size.width} ${layer.size.height}` : layer.size || size;
            const layerPosition = layer.position || position;
            const colorsStr = layer.colors.map(colorStopToString).join(', ');
            return `radial-gradient(${layerShape} ${layerSize} at ${layerPosition}, ${colorsStr})`;
        });
        return layerGradients.join(', ');
    }
    if (useCustomColors && customColors && customColors.length > 0) {
        const colorsStr = customColors.map(colorStopToString).join(', ');
        const sizeStr = typeof size === 'object' ? `${size.width} ${size.height}` : size;
        return `radial-gradient(${shape} ${sizeStr} at ${position}, ${colorsStr})`;
    }
    const resolvedBaseColor = (0, color_value_tools_1.isHexColor)(baseColor) ? (0, color_value_tools_1.normalizeHex)(baseColor) : fallbackColor;
    const adjustedColor = (0, color_value_tools_1.adjustHexBrightness)(resolvedBaseColor, offsetPercent);
    const sizeStr = typeof size === 'object' ? `${size.width} ${size.height}` : size;
    return `radial-gradient(${shape} ${sizeStr} at ${position}, ${adjustedColor}, ${resolvedBaseColor})`;
}
