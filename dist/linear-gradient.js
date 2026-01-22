"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLinearGradient = createLinearGradient;
exports.createMultiStepLinearGradient = createMultiStepLinearGradient;
const color_utils_1 = require("./color-utils");
function createLinearGradient(first, options) {
    // If first arg is an array, behave like old createCustomLinearGradient
    if (Array.isArray(first)) {
        const stops = first;
        const { direction = 'to bottom', angle } = options || {};
        const gradientDirection = angle ? `${angle}deg` : direction;
        function colorStopToString(item) {
            let colorStr = item.color;
            if (typeof item.opacity === 'number') {
                if (item.opacity === 0) {
                    colorStr = 'transparent';
                }
                else {
                    const type = (0, color_utils_1.getColorType)(item.color);
                    if (type === 'hex') {
                        colorStr = (0, color_utils_1.hexToRgba)(item.color, item.opacity);
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
        const stopsStr = stops.map(colorStopToString).join(', ');
        return `linear-gradient(${gradientDirection}, ${stopsStr})`;
    }
    // Otherwise behave like the original createLinearGradient(baseColor, options)
    const baseColor = first;
    const { offsetPercent = 15, direction = 'to bottom', angle, fallbackColor = '#f5e477', } = options || {};
    const colorType = (0, color_utils_1.getColorType)(baseColor);
    let colorValue;
    let adjustedColor;
    if (colorType === 'css-var') {
        const varName = (0, color_utils_1.extractCssVariableName)(baseColor);
        colorValue = `var(${varName}, ${fallbackColor})`;
        adjustedColor = (0, color_utils_1.adjustHexBrightness)(fallbackColor, offsetPercent);
    }
    else if (colorType === 'hex') {
        colorValue = (0, color_utils_1.normalizeHex)(baseColor);
        adjustedColor = (0, color_utils_1.adjustHexBrightness)(colorValue, offsetPercent);
    }
    else {
        colorValue = fallbackColor;
        adjustedColor = (0, color_utils_1.adjustHexBrightness)(fallbackColor, offsetPercent);
    }
    const startColor = adjustedColor;
    const endColor = colorValue;
    const gradientDirection = angle ? `${angle}deg` : direction;
    return `linear-gradient(${gradientDirection}, ${startColor}, ${endColor})`;
}
function createMultiStepLinearGradient(baseColor, steps = 3, options) {
    const { offsetPercent = 15, direction = 'to bottom', angle, fallbackColor = '#f5e477', } = options || {};
    const colorType = (0, color_utils_1.getColorType)(baseColor);
    let colorValue;
    if (colorType === 'css-var') {
        colorValue = fallbackColor;
    }
    else if (colorType === 'hex') {
        colorValue = (0, color_utils_1.normalizeHex)(baseColor);
    }
    else {
        colorValue = fallbackColor;
    }
    const colors = [];
    for (let i = 0; i < steps; i++) {
        const percent = offsetPercent * (1 - i / (steps - 1));
        const color = (0, color_utils_1.adjustHexBrightness)(colorValue, percent);
        colors.push(color);
    }
    const gradientDirection = angle ? `${angle}deg` : direction;
    return `linear-gradient(${gradientDirection}, ${colors.join(', ')})`;
}
