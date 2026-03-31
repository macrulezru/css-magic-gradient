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
const SAMPLE_STEPS = 9; // number of interior sample points
const CONTRAST_THRESHOLD = 4.5; // WCAG AA normal text
/**
 * Samples `SAMPLE_STEPS` positions along a gradient defined by `colors` (hex
 * strings at uniform intervals) and returns the contrast ratio at each position
 * against `textColor`. Returns an array of `{ position, contrast }` objects.
 */
function sampleGradientContrasts(textColor, colors) {
    if (colors.length === 0)
        return [];
    if (colors.length === 1) {
        return [{ position: 0, contrast: (0, color_value_tools_1.contrastRatio)(textColor, colors[0]) }];
    }
    const results = [];
    const totalSamples = SAMPLE_STEPS + 2; // include 0 and 1
    for (let i = 0; i < totalSamples; i++) {
        const t = i / (totalSamples - 1);
        // Find which segment of the gradient we're in
        const segCount = colors.length - 1;
        const rawPos = t * segCount;
        const segIndex = Math.min(Math.floor(rawPos), segCount - 1);
        const segT = rawPos - segIndex;
        const sampled = (0, color_value_tools_1.mixColors)(colors[segIndex], colors[segIndex + 1], segT, {
            mode: 'rgb',
            format: 'hex',
        });
        results.push({ position: t, contrast: (0, color_value_tools_1.contrastRatio)(textColor, sampled) });
    }
    return results;
}
function bestGradientTextColor(firstArg, secondArgOrOptions) {
    // Normalize arguments — handle legacy (colorA, colorB) signature
    let gradientColors;
    let detailed = false;
    if (typeof firstArg === 'string' && typeof secondArgOrOptions === 'string') {
        // Legacy: bestGradientTextColor(colorA, colorB)
        gradientColors = [firstArg, secondArgOrOptions];
    }
    else if (Array.isArray(firstArg)) {
        gradientColors = firstArg;
        const opts = secondArgOrOptions;
        detailed = (opts === null || opts === void 0 ? void 0 : opts.detailed) === true;
    }
    else {
        gradientColors = [firstArg];
    }
    const samplesBlack = sampleGradientContrasts('#000000', gradientColors);
    const samplesWhite = sampleGradientContrasts('#ffffff', gradientColors);
    const minBlack = Math.min(...samplesBlack.map(s => s.contrast));
    const minWhite = Math.min(...samplesWhite.map(s => s.contrast));
    const recommended = minBlack >= minWhite ? '#000000' : '#ffffff';
    if (detailed) {
        return {
            recommended,
            black: {
                contrast: minBlack,
                wcag: (0, color_value_tools_1.wcagLevel)('#000000', gradientColors[0]),
            },
            white: {
                contrast: minWhite,
                wcag: (0, color_value_tools_1.wcagLevel)('#ffffff', gradientColors[0]),
            },
        };
    }
    return recommended;
}
function gradientContrastRatio(textColor, colorAOrArray, colorB) {
    const colors = Array.isArray(colorAOrArray)
        ? colorAOrArray
        : [colorAOrArray, colorB];
    const samples = sampleGradientContrasts(textColor, colors);
    return samples.length > 0 ? Math.min(...samples.map(s => s.contrast)) : 0;
}
function gradientWcagLevel(textColor, colorAOrArray, colorB) {
    const colors = Array.isArray(colorAOrArray)
        ? colorAOrArray
        : [colorAOrArray, colorB];
    const samples = sampleGradientContrasts(textColor, colors);
    const minContrast = samples.length > 0 ? Math.min(...samples.map(s => s.contrast)) : 0;
    const problematicStops = samples
        .filter(s => s.contrast < CONTRAST_THRESHOLD)
        .map(s => parseFloat(s.position.toFixed(2)));
    const levelOrder = ['AAA', 'AA', 'AA-large', 'fail'];
    let worstLevel = 'AAA';
    for (const { contrast } of samples) {
        let sampleLevel;
        if (contrast >= 7)
            sampleLevel = 'AAA';
        else if (contrast >= 4.5)
            sampleLevel = 'AA';
        else if (contrast >= 3)
            sampleLevel = 'AA-large';
        else
            sampleLevel = 'fail';
        if (levelOrder.indexOf(sampleLevel) > levelOrder.indexOf(worstLevel)) {
            worstLevel = sampleLevel;
        }
    }
    return { level: worstLevel, minContrast, problematicStops };
}
/**
 * Creates a linear gradient that is automatically adjusted so that `textColor`
 * achieves at least the `targetLevel` WCAG rating against both gradient stops.
 *
 * `adjustmentStrategy`:
 * - `'lightness'` (default) — lightens or darkens the stops.
 * - `'saturation'` — saturates or desaturates the stops.
 * - `'both'` — adjusts both lightness and saturation.
 *
 * Supports hex, rgb(), hsl(), and named colors as baseColor.
 */
function createAccessibleGradient(baseColor, textColor, options) {
    const { direction = 'to bottom', angle, targetLevel = 'AA', interpolation, repeating, adjustmentStrategy = 'lightness', } = options || {};
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
            let candidate = color;
            if (adjustmentStrategy === 'lightness' || adjustmentStrategy === 'both') {
                candidate = shouldLighten ? (0, color_value_tools_1.lighten)(candidate, step) : (0, color_value_tools_1.darken)(candidate, step);
            }
            if (adjustmentStrategy === 'saturation' || adjustmentStrategy === 'both') {
                candidate = shouldLighten ? (0, color_value_tools_1.desaturate)(candidate, step / 2) : (0, color_value_tools_1.saturate)(candidate, step / 2);
            }
            if (passes(candidate))
                return candidate;
        }
        // Fallback: try combined approach if single strategy failed
        if (adjustmentStrategy !== 'both') {
            for (let step = 5; step <= 40; step += 5) {
                const combined = shouldLighten
                    ? (0, color_value_tools_1.desaturate)((0, color_value_tools_1.lighten)(color, step), step / 2)
                    : (0, color_value_tools_1.saturate)((0, color_value_tools_1.darken)(color, step), step / 2);
                if (passes(combined))
                    return combined;
            }
        }
        return color;
    }
    const startColor = adjust((0, color_value_tools_1.lighten)(resolved.hex, 15));
    const endColor = adjust(resolved.hex);
    return (0, linear_gradient_js_1.createLinearGradient)([{ color: startColor }, { color: endColor }], { direction, angle, interpolation, repeating });
}
