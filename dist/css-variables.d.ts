/**
 * Extracts all CSS custom property names referenced via `var()` in a gradient
 * string. Returns a deduplicated array of variable names (e.g. `'--brand-color'`).
 *
 * @example
 * extractGradientVariables('linear-gradient(var(--start), var(--end, #fff))')
 * // → ['--start', '--end']
 */
export declare function extractGradientVariables(gradient: string): string[];
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
export declare function resolveGradientVariables(gradient: string, variables: Record<string, string>): string;
