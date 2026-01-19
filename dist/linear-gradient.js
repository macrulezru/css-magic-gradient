"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomLinearGradient = createCustomLinearGradient;
exports.createLinearGradient = createLinearGradient;
exports.createMultiStepLinearGradient = createMultiStepLinearGradient;
function createCustomLinearGradient(stops, options) {
    const { direction = 'to bottom', angle } = options || {};
    const gradientDirection = angle ? `${angle}deg` : direction;
    const stopsStr = stops
        .map(s => {
        let c = s.color;
        if (typeof s.opacity === 'number' && s.opacity < 1) {
            // Примитивная поддержка hex → rgba, остальное оставляем как есть
            if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(c)) {
                const hex = c.length === 4
                    ? `#${c[1]}${c[1]}${c[2]}${c[2]}${c[3]}${c[3]}`
                    : c;
                const r = parseInt(hex.slice(1, 3), 16);
                const g = parseInt(hex.slice(3, 5), 16);
                const b = parseInt(hex.slice(5, 7), 16);
                c = `rgba(${r},${g},${b},${s.opacity})`;
            }
        }
        return s.position ? `${c} ${s.position}` : c;
    })
        .join(', ');
    return `linear-gradient(${gradientDirection}, ${stopsStr})`;
}
const color_utils_1 = require("./color-utils");
function createLinearGradient(baseColor, options) {
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
