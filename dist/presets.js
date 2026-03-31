"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepSpaceGradient = exports.pastelGradient = exports.nordicGradient = exports.neonGradient = exports.goldenHourGradient = exports.forestGradient = exports.glowGradient = exports.rainbowGradient = exports.mintGradient = exports.peachGradient = exports.midnightGradient = exports.fireGradient = exports.auroraGradient = exports.oceanGradient = exports.sunsetGradient = void 0;
exports.createComplementaryGradient = createComplementaryGradient;
exports.createTriadicGradient = createTriadicGradient;
exports.createAnalogousGradient = createAnalogousGradient;
exports.createTetradicGradient = createTetradicGradient;
exports.createSplitComplementaryGradient = createSplitComplementaryGradient;
exports.createMonochromaticGradient = createMonochromaticGradient;
exports.createHueWheelGradient = createHueWheelGradient;
exports.createTintGradient = createTintGradient;
exports.createShadeGradient = createShadeGradient;
exports.createToneGradient = createToneGradient;
const color_value_tools_1 = require("color-value-tools");
const linear_gradient_js_1 = require("./linear-gradient.js");
const radial_gradient_js_1 = require("./radial-gradient.js");
const conic_gradient_js_1 = require("./conic-gradient.js");
const utils_js_1 = require("./utils.js");
// ─── Fixed presets ────────────────────────────────────────────────────────────
/** Warm sunset: orange → deep magenta. */
exports.sunsetGradient = (0, linear_gradient_js_1.createLinearGradient)([
    { color: '#ff9a3c', position: '0%' },
    { color: '#ff6b6b', position: '50%' },
    { color: '#c0357a', position: '100%' },
], { direction: 'to bottom right' });
/** Deep ocean: light cyan → dark navy. */
exports.oceanGradient = (0, linear_gradient_js_1.createLinearGradient)([
    { color: '#43e1f5', position: '0%' },
    { color: '#1a7fd4', position: '50%' },
    { color: '#0a2463', position: '100%' },
], { direction: 'to bottom' });
/** Northern aurora: violet → green → teal. */
exports.auroraGradient = (0, linear_gradient_js_1.createLinearGradient)([
    { color: '#7b2ff7', position: '0%' },
    { color: '#0ff591', position: '60%' },
    { color: '#08d9d6', position: '100%' },
], { direction: 'to right' });
/** Fire: yellow → orange → deep red. */
exports.fireGradient = (0, linear_gradient_js_1.createLinearGradient)([
    { color: '#ffe600', position: '0%' },
    { color: '#ff7700', position: '45%' },
    { color: '#cc0000', position: '100%' },
], { direction: 'to top' });
/** Midnight: dark indigo → near-black navy. */
exports.midnightGradient = (0, linear_gradient_js_1.createLinearGradient)([
    { color: '#2d1b69', position: '0%' },
    { color: '#11101d', position: '100%' },
], { direction: 'to bottom' });
/** Peach: soft pink → warm orange. */
exports.peachGradient = (0, linear_gradient_js_1.createLinearGradient)([
    { color: '#ffd6cc', position: '0%' },
    { color: '#ffb347', position: '100%' },
], { direction: 'to bottom right' });
/** Mint: light green → teal. */
exports.mintGradient = (0, linear_gradient_js_1.createLinearGradient)([
    { color: '#d4f7e0', position: '0%' },
    { color: '#11998e', position: '100%' },
], { direction: 'to bottom' });
/** Full-spectrum rainbow conic. */
exports.rainbowGradient = (0, conic_gradient_js_1.createRainbowConicGradient)({ steps: 24 });
/** Radial glow centered on a warm gold. */
exports.glowGradient = (0, radial_gradient_js_1.createRadialGradient)('#f5c842', {
    shape: 'circle',
    size: 'farthest-corner',
    position: 'center',
    offsetPercent: 40,
});
/** Forest: fresh light green to deep forest green. */
exports.forestGradient = (0, linear_gradient_js_1.createLinearGradient)([
    { color: '#a8e6a3', position: '0%' },
    { color: '#4caf50', position: '50%' },
    { color: '#1b5e20', position: '100%' },
], { direction: 'to bottom' });
/** Golden hour: warm gold → soft pink → rich orange. */
exports.goldenHourGradient = (0, linear_gradient_js_1.createLinearGradient)([
    { color: '#ffd700', position: '0%' },
    { color: '#ffb347', position: '40%' },
    { color: '#ff8c69', position: '75%' },
    { color: '#e8508a', position: '100%' },
], { direction: 'to bottom right' });
/** Neon: electric green → vivid pink → bright cyan. */
exports.neonGradient = (0, linear_gradient_js_1.createLinearGradient)([
    { color: '#39ff14', position: '0%' },
    { color: '#ff1493', position: '50%' },
    { color: '#00e5ff', position: '100%' },
], { direction: 'to right' });
/** Nordic: icy blue → cool gray → near-white. */
exports.nordicGradient = (0, linear_gradient_js_1.createLinearGradient)([
    { color: '#5b8fa8', position: '0%' },
    { color: '#8fa8b8', position: '50%' },
    { color: '#dce8f0', position: '100%' },
], { direction: 'to bottom' });
/** Pastel: soft lavender → blush pink → pale mint. */
exports.pastelGradient = (0, linear_gradient_js_1.createLinearGradient)([
    { color: '#d4b8e0', position: '0%' },
    { color: '#f7c5c5', position: '50%' },
    { color: '#b8e0d4', position: '100%' },
], { direction: 'to right' });
/** Deep space: near-black navy → deep indigo → violet accent. */
exports.deepSpaceGradient = (0, linear_gradient_js_1.createLinearGradient)([
    { color: '#0a0a1a', position: '0%' },
    { color: '#1a0a3a', position: '40%' },
    { color: '#2d0a6b', position: '75%' },
    { color: '#5a0fa0', position: '100%' },
], { direction: 'to bottom' });
/**
 * Generates a complementary linear gradient (base color ↔ its complement).
 * Uses `interpolateColors` with the specified color space for smooth transitions.
 * Direction defaults to 'to right'.
 */
function createComplementaryGradient(baseColor, options) {
    const { direction = 'to right', angle, steps = 5, interpolationSpace = 'oklch' } = options || {};
    const resolved = (0, utils_js_1.resolveBaseColor)(baseColor, '#f5e477');
    const comp = (0, color_value_tools_1.complement)(resolved.hex);
    const mode = (0, utils_js_1.toScaleMode)(interpolationSpace);
    const colors = (0, color_value_tools_1.interpolateColors)(resolved.hex, comp, steps, { space: mode, format: 'hex' });
    return (0, linear_gradient_js_1.createLinearGradient)(colors.map(c => ({ color: c })), { direction, angle });
}
/**
 * Generates a triadic linear gradient (3 colors evenly spaced 120° apart).
 * `smoothness` controls total interpolated steps (default 3 = just the anchors).
 */
function createTriadicGradient(baseColor, options) {
    const { direction = 'to right', angle, smoothness = 3, interpolationSpace = 'oklch', } = options || {};
    const [c1, c2, c3] = (0, color_value_tools_1.triadic)(baseColor);
    const totalSteps = Math.max(3, smoothness);
    if (totalSteps === 3) {
        return (0, linear_gradient_js_1.createLinearGradient)([{ color: c1 }, { color: c2 }, { color: c3 }], {
            direction,
            angle,
        });
    }
    const mode = (0, utils_js_1.toScaleMode)(interpolationSpace);
    const scale = (0, color_value_tools_1.createColorScale)([c1, c2, c3], totalSteps, { space: mode, format: 'hex' });
    return (0, linear_gradient_js_1.createLinearGradient)(scale.map(c => ({ color: c })), { direction, angle });
}
/**
 * Generates an analogous linear gradient (3 neighboring hues).
 * `spread` controls the hue spread angle passed to `analogous()`.
 */
function createAnalogousGradient(baseColor, options) {
    var _a;
    const { direction = 'to right', angle, spread, interpolationSpace = 'oklch' } = options || {};
    const [c1, c2, c3] = (0, color_value_tools_1.analogous)(baseColor, spread);
    const steps = ((_a = options === null || options === void 0 ? void 0 : options.steps) !== null && _a !== void 0 ? _a : 3);
    if (steps === 3) {
        return (0, linear_gradient_js_1.createLinearGradient)([{ color: c1 }, { color: c2 }, { color: c3 }], {
            direction,
            angle,
        });
    }
    const mode = (0, utils_js_1.toScaleMode)(interpolationSpace);
    const scale = (0, color_value_tools_1.createColorScale)([c1, c2, c3], steps, { space: mode, format: 'hex' });
    return (0, linear_gradient_js_1.createLinearGradient)(scale.map(c => ({ color: c })), { direction, angle });
}
/**
 * Generates a 4-color gradient based on the tetradic (square) color harmony.
 * Supports 'linear', 'radial', and 'conic' gradient types.
 */
function createTetradicGradient(baseColor, options) {
    const { direction = 'to right', angle, type = 'linear', steps = 9, interpolationSpace = 'oklch', } = options || {};
    const [c1, c2, c3, c4] = (0, color_value_tools_1.tetradic)(baseColor);
    const mode = (0, utils_js_1.toScaleMode)(interpolationSpace);
    if (type === 'conic') {
        const scale = (0, color_value_tools_1.createColorScale)([c1, c2, c3, c4, c1], steps, { space: mode, format: 'hex' });
        const stops = scale
            .map((c, i) => `${c} ${((i / (scale.length - 1)) * 100).toFixed(1)}%`)
            .join(', ');
        return `conic-gradient(from 0deg at 50% 50%, ${stops})`;
    }
    if (type === 'radial') {
        const scale = (0, color_value_tools_1.createColorScale)([c1, c2, c3, c4], steps, { space: mode, format: 'hex' });
        return (0, radial_gradient_js_1.createRadialGradient)(baseColor, {
            colors: scale.map(c => ({ color: c })),
        });
    }
    const scale = (0, color_value_tools_1.createColorScale)([c1, c2, c3, c4], steps, { space: mode, format: 'hex' });
    return (0, linear_gradient_js_1.createLinearGradient)(scale.map(c => ({ color: c })), { direction, angle });
}
/**
 * Generates a gradient based on the split-complementary color harmony
 * (base + two colors at 150° and 210°).
 */
function createSplitComplementaryGradient(baseColor, options) {
    const { direction = 'to right', angle, steps = 5, interpolationSpace = 'oklch' } = options || {};
    const [c1, c2, c3] = (0, color_value_tools_1.splitComplementary)(baseColor);
    if (steps === 3) {
        return (0, linear_gradient_js_1.createLinearGradient)([{ color: c1 }, { color: c2 }, { color: c3 }], {
            direction,
            angle,
        });
    }
    const mode = (0, utils_js_1.toScaleMode)(interpolationSpace);
    const scale = (0, color_value_tools_1.createColorScale)([c1, c2, c3], steps, { space: mode, format: 'hex' });
    return (0, linear_gradient_js_1.createLinearGradient)(scale.map(c => ({ color: c })), { direction, angle });
}
/**
 * Generates a monochromatic linear gradient using `steps` shades of the base
 * color, from lightest to darkest.
 */
function createMonochromaticGradient(baseColor, steps = 5, options) {
    const { direction = 'to bottom', angle } = options || {};
    const colorShadeArr = (0, color_value_tools_1.colorShades)(baseColor, steps);
    return (0, linear_gradient_js_1.createLinearGradient)(colorShadeArr.map(color => ({ color })), { direction, angle });
}
/**
 * Generates a hue-rotating conic gradient from any base color.
 */
function createHueWheelGradient(baseColor, options) {
    return (0, conic_gradient_js_1.createConicGradient)(baseColor, { hueRotation: true, ...options });
}
/**
 * Generates a gradient from the base color to white using Oklab tints.
 */
function createTintGradient(baseColor, steps = 5, options) {
    const { direction = 'to right', angle } = options || {};
    const resolved = (0, utils_js_1.resolveBaseColor)(baseColor, '#f5e477');
    const tintColors = (0, color_value_tools_1.tints)(resolved.hex, steps);
    return (0, linear_gradient_js_1.createLinearGradient)(tintColors.map(c => ({ color: c })), { direction, angle });
}
/**
 * Generates a gradient from the base color to black using Oklab shades.
 */
function createShadeGradient(baseColor, steps = 5, options) {
    const { direction = 'to right', angle } = options || {};
    const resolved = (0, utils_js_1.resolveBaseColor)(baseColor, '#f5e477');
    const shadeColors = (0, color_value_tools_1.shades)(resolved.hex, steps);
    return (0, linear_gradient_js_1.createLinearGradient)(shadeColors.map(c => ({ color: c })), { direction, angle });
}
/**
 * Generates a gradient from the base color toward gray using Oklab tones.
 */
function createToneGradient(baseColor, steps = 5, options) {
    const { direction = 'to right', angle, gray } = options || {};
    const resolved = (0, utils_js_1.resolveBaseColor)(baseColor, '#f5e477');
    const toneColors = (0, color_value_tools_1.tones)(resolved.hex, steps, gray);
    return (0, linear_gradient_js_1.createLinearGradient)(toneColors.map(c => ({ color: c })), { direction, angle });
}
