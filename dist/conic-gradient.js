"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConicGradient = createConicGradient;
exports.createRainbowConicGradient = createRainbowConicGradient;
const color_value_tools_1 = require("color-value-tools");
const utils_js_1 = require("./utils.js");
/**
 * Creates a CSS conic gradient.
 *
 * Modes (evaluated in priority order):
 * 1. `colorScale` — interpolates through an array of colors around the circle.
 * 2. `harmonyType` — auto-generates colors from a color harmony.
 * 3. `colors` — uses explicit ColorStop array directly.
 * 4. `hueRotation` — rotates hue evenly across all steps.
 * 5. Auto-generate stops by adjusting brightness.
 *
 * Supports hex, rgb(), hsl(), named colors, and CSS variables as baseColor.
 */
function createConicGradient(baseColor, options) {
    const { fromAngle = 0, position = '50% 50%', fallbackColor = '#f5e477', colors: customColors, colorScale, hueRotation = false, harmonyType, interpolationSpace = 'oklch', steps = 8, offsetPercent = 20, repeating = false, } = options || {};
    const fn = repeating ? 'repeating-conic-gradient' : 'conic-gradient';
    const header = `from ${fromAngle}deg at ${position}`;
    const scaleMode = (0, utils_js_1.toScaleMode)(interpolationSpace);
    // ── colorScale mode: interpolate through an arbitrary list of colors ────────
    if (colorScale && colorScale.length >= 2) {
        // Close the loop by appending the first color at the end
        const anchors = [...colorScale, colorScale[0]];
        const scale = (0, color_value_tools_1.createColorScale)(anchors, steps + 1, { space: scaleMode, format: 'hex' });
        const stops = scale
            .map((c, i) => `${c} ${((i / (scale.length - 1)) * 100).toFixed(1)}%`)
            .join(', ');
        return `${fn}(${header}, ${stops})`;
    }
    const resolved = (0, utils_js_1.resolveBaseColor)(baseColor, fallbackColor);
    // ── harmonyType mode: use color harmony around the circle ───────────────────
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
        // Close the circle by looping back to the start
        const anchors = [...harmonyColors, harmonyColors[0]];
        const scale = (0, color_value_tools_1.createColorScale)(anchors, steps + 1, { space: scaleMode, format: 'hex' });
        const stops = scale
            .map((c, i) => `${c} ${((i / (scale.length - 1)) * 100).toFixed(1)}%`)
            .join(', ');
        return `${fn}(${header}, ${stops})`;
    }
    // ── Explicit stops mode ─────────────────────────────────────────────────────
    if (customColors && customColors.length > 0) {
        const stops = customColors.map(utils_js_1.colorStopToString).join(', ');
        return `${fn}(${header}, ${stops})`;
    }
    const colorStops = [];
    // ── hueRotation mode ────────────────────────────────────────────────────────
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
        // ── Brightness mode (default) ──────────────────────────────────────────
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
