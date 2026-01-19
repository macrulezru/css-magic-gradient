"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConicGradient = createConicGradient;
exports.createRainbowConicGradient = createRainbowConicGradient;
const color_utils_1 = require("./color-utils");
function createConicGradient(baseColor, options) {
    const { fromAngle = 0, position = '50% 50%', fallbackColor = '#f5e477', colors: customColors, hueRotation = false, steps = 8, offsetPercent = 20, } = options || {};
    if (customColors && customColors.length > 0) {
        const colorsStr = customColors.map(colorItem => colorItem.color).join(', ');
        return `conic-gradient(from ${fromAngle}deg at ${position}, ${colorsStr})`;
    }
    const resolvedBaseColor = (0, color_utils_1.isHexColor)(baseColor) ? (0, color_utils_1.normalizeHex)(baseColor) : fallbackColor;
    const colors = [];
    if (hueRotation) {
        for (let i = 0; i < steps; i++) {
            const degrees = (i * 360) / steps;
            const color = (0, color_utils_1.rotateHue)(resolvedBaseColor, degrees);
            const positionPercent = (i * 100) / steps;
            colors.push(`${color} ${positionPercent}%`);
        }
        colors.push(`${(0, color_utils_1.rotateHue)(resolvedBaseColor, 0)} 100%`);
    }
    else {
        for (let i = 0; i < steps; i++) {
            const percent = offsetPercent * (1 - i / (steps - 1));
            const color = (0, color_utils_1.adjustHexBrightness)(resolvedBaseColor, percent);
            const positionPercent = (i * 100) / steps;
            colors.push(`${color} ${positionPercent}%`);
        }
        colors.push(`${(0, color_utils_1.adjustHexBrightness)(resolvedBaseColor, 0)} 100%`);
    }
    return `conic-gradient(from ${fromAngle}deg at ${position}, ${colors.join(', ')})`;
}
function createRainbowConicGradient(options) {
    const { fromAngle = 0, position = '50% 50%', saturation = 80, lightness = 60, steps = 12, } = options || {};
    const colors = [];
    const stepSize = 360 / steps;
    for (let i = 0; i <= steps; i++) {
        const hue = (i * stepSize) % 360;
        const color = (0, color_utils_1.hslToHex)(hue, saturation, lightness);
        const positionPercent = (i * 100) / steps;
        colors.push(`${color} ${positionPercent}%`);
    }
    return `conic-gradient(from ${fromAngle}deg at ${position}, ${colors.join(', ')})`;
}
