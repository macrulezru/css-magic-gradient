"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gradientToCanvasGradient = gradientToCanvasGradient;
exports.gradientToImageData = gradientToImageData;
exports.gradientToDataURL = gradientToDataURL;
/**
 * Creates a canvas `CanvasGradient` object from the given parameters and
 * applies all color stops. Returns the gradient ready to be used as
 * `ctx.fillStyle`.
 *
 * @example
 * const gradient = gradientToCanvasGradient(
 *   { type: 'linear', stops: [{ color: '#ff0000', offset: 0 }, { color: '#0000ff', offset: 1 }] },
 *   ctx
 * );
 * ctx.fillStyle = gradient;
 * ctx.fillRect(0, 0, width, height);
 */
function gradientToCanvasGradient(params, ctx) {
    const { width, height } = ctx.canvas;
    let gradient;
    if (params.type === 'linear') {
        const { x0 = 0, y0 = 0, x1 = width, y1 = 0 } = params;
        gradient = ctx.createLinearGradient(x0, y0, x1, y1);
    }
    else if (params.type === 'radial') {
        const { x0 = width / 2, y0 = height / 2, r0 = 0, x1 = width / 2, y1 = height / 2, r1 = Math.min(width, height) / 2, } = params;
        gradient = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
    }
    else {
        // conic
        const { startAngle = 0, x = width / 2, y = height / 2 } = params;
        gradient = ctx.createConicGradient(startAngle, x, y);
    }
    for (const stop of params.stops) {
        gradient.addColorStop(stop.offset, stop.color);
    }
    return gradient;
}
/**
 * Renders a gradient to an `ImageData` object of the given dimensions.
 * Useful for server-side generation (e.g., Open Graph images) when used with
 * a canvas library like `canvas` (npm).
 *
 * Throws if a canvas context cannot be created in the current environment.
 *
 * @example
 * const imageData = gradientToImageData(
 *   { type: 'radial', stops: [{ color: '#ffffff', offset: 0 }, { color: '#3498db', offset: 1 }] },
 *   800, 600
 * );
 */
function gradientToImageData(params, width, height) {
    const canvas = createCanvas(width, height);
    const ctx = getContext(canvas);
    const gradient = gradientToCanvasGradient(params, ctx);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    return ctx.getImageData(0, 0, width, height);
}
/**
 * Renders a gradient to a PNG data URL string.
 * Useful for embedding gradient previews in HTML `<img>` or CSS `background`.
 *
 * Throws if a canvas context cannot be created in the current environment.
 *
 * @example
 * const dataUrl = gradientToDataURL(
 *   { type: 'linear', stops: [{ color: '#ff9a3c', offset: 0 }, { color: '#c0357a', offset: 1 }] },
 *   400, 200
 * );
 * // <img src={dataUrl} />
 */
function gradientToDataURL(params, width, height) {
    const canvas = createCanvas(width, height);
    const ctx = getContext(canvas);
    const gradient = gradientToCanvasGradient(params, ctx);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    return canvas.toDataURL('image/png');
}
// ─── Internal helpers ─────────────────────────────────────────────────────────
function createCanvas(width, height) {
    if (typeof OffscreenCanvas !== 'undefined') {
        return new OffscreenCanvas(width, height);
    }
    if (typeof document !== 'undefined') {
        const el = document.createElement('canvas');
        el.width = width;
        el.height = height;
        return el;
    }
    throw new Error('[css-magic-gradient] Canvas is not available in this environment. ' +
        'Install a server-side canvas implementation (e.g., the "canvas" npm package) ' +
        'and ensure globalThis.document or OffscreenCanvas is available.');
}
function getContext(canvas) {
    const ctx = canvas instanceof HTMLCanvasElement
        ? canvas.getContext('2d')
        : canvas.getContext('2d');
    if (!ctx) {
        throw new Error('[css-magic-gradient] Could not obtain 2D rendering context from canvas.');
    }
    return ctx;
}
