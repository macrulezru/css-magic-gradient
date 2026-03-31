"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractGradientVariables = extractGradientVariables;
exports.resolveGradientVariables = resolveGradientVariables;
/**
 * Extracts all CSS custom property names referenced via `var()` in a gradient
 * string. Returns a deduplicated array of variable names (e.g. `'--brand-color'`).
 *
 * @example
 * extractGradientVariables('linear-gradient(var(--start), var(--end, #fff))')
 * // → ['--start', '--end']
 */
function extractGradientVariables(gradient) {
    const regex = /var\(\s*(--[\w-]+)\s*(?:,[^)]+)?\)/g;
    const seen = new Set();
    let match;
    while ((match = regex.exec(gradient)) !== null) {
        seen.add(match[1]);
    }
    return Array.from(seen);
}
/**
 * Substitutes CSS custom properties referenced in a gradient string with the
 * values from the `variables` map. Falls back to the inline fallback value
 * declared in `var(--name, fallback)` when the variable is not in the map.
 * If neither is available, the original `var(...)` expression is preserved.
 *
 * @example
 * resolveGradientVariables(
 *   'linear-gradient(var(--start, #ff0000), var(--end))',
 *   { '--end': '#0000ff' }
 * )
 * // → 'linear-gradient(#ff0000, #0000ff)'
 */
function resolveGradientVariables(gradient, variables) {
    return gradient.replace(/var\(\s*(--[\w-]+)\s*(?:,\s*([^)]+?)\s*)?\)/g, (_match, varName, fallback) => {
        if (variables[varName] !== undefined)
            return variables[varName];
        if (fallback !== undefined)
            return fallback.trim();
        return `var(${varName})`;
    });
}
