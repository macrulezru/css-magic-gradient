"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.glowGradient = exports.rainbowGradient = exports.mintGradient = exports.peachGradient = exports.midnightGradient = exports.fireGradient = exports.auroraGradient = exports.oceanGradient = exports.sunsetGradient = void 0;
exports.createComplementaryGradient = createComplementaryGradient;
exports.createTriadicGradient = createTriadicGradient;
exports.createAnalogousGradient = createAnalogousGradient;
exports.createMonochromaticGradient = createMonochromaticGradient;
exports.createHueWheelGradient = createHueWheelGradient;
const color_value_tools_1 = require("color-value-tools");
const linear_gradient_js_1 = require("./linear-gradient.js");
const radial_gradient_js_1 = require("./radial-gradient.js");
const conic_gradient_js_1 = require("./conic-gradient.js");
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
// ─── Dynamic preset generators ────────────────────────────────────────────────
/**
 * Generates a complementary linear gradient (base color ↔ its complement).
 * Direction defaults to 'to right'.
 */
function createComplementaryGradient(baseColor, options) {
    const { direction = 'to right', angle, steps = 5 } = options || {};
    const comp = (0, color_value_tools_1.complement)(baseColor);
    return (0, linear_gradient_js_1.createMixedLinearGradient)(baseColor, comp, steps, { direction, angle });
}
/**
 * Generates a triadic linear gradient (3 colors evenly spaced 120° apart).
 */
function createTriadicGradient(baseColor, options) {
    const { direction = 'to right', angle } = options || {};
    const [c1, c2, c3] = (0, color_value_tools_1.triadic)(baseColor);
    return (0, linear_gradient_js_1.createLinearGradient)([{ color: c1 }, { color: c2 }, { color: c3 }], { direction, angle });
}
/**
 * Generates an analogous linear gradient (3 neighboring hues, default ±30°).
 */
function createAnalogousGradient(baseColor, options) {
    const { direction = 'to right', angle, spread } = options || {};
    const [c1, c2, c3] = (0, color_value_tools_1.analogous)(baseColor, spread);
    return (0, linear_gradient_js_1.createLinearGradient)([{ color: c1 }, { color: c2 }, { color: c3 }], { direction, angle });
}
/**
 * Generates a monochromatic linear gradient using `steps` shades of the base
 * color, from lightest to darkest.
 */
function createMonochromaticGradient(baseColor, steps = 5, options) {
    const { direction = 'to bottom', angle } = options || {};
    const shades = (0, color_value_tools_1.colorShades)(baseColor, steps);
    return (0, linear_gradient_js_1.createLinearGradient)(shades.map(color => ({ color })), { direction, angle });
}
/**
 * Generates a hue-rotating conic gradient from any base color.
 */
function createHueWheelGradient(baseColor, options) {
    return (0, conic_gradient_js_1.createConicGradient)(baseColor, { hueRotation: true, ...options });
}
