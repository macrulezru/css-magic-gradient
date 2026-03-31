/**
 * Parameters for a linear canvas gradient.
 */
export interface CanvasLinearGradientParams {
    type: 'linear';
    stops: Array<{
        color: string;
        offset: number;
    }>;
    /** x-coordinate of the gradient start. Default: 0 */
    x0?: number;
    /** y-coordinate of the gradient start. Default: 0 */
    y0?: number;
    /** x-coordinate of the gradient end. Default: canvas width */
    x1?: number;
    /** y-coordinate of the gradient end. Default: 0 (horizontal) */
    y1?: number;
}
/**
 * Parameters for a radial canvas gradient.
 */
export interface CanvasRadialGradientParams {
    type: 'radial';
    stops: Array<{
        color: string;
        offset: number;
    }>;
    /** x-coordinate of the inner circle center. Default: canvas width / 2 */
    x0?: number;
    /** y-coordinate of the inner circle center. Default: canvas height / 2 */
    y0?: number;
    /** Radius of the inner circle. Default: 0 */
    r0?: number;
    /** x-coordinate of the outer circle center. Default: canvas width / 2 */
    x1?: number;
    /** y-coordinate of the outer circle center. Default: canvas height / 2 */
    y1?: number;
    /** Radius of the outer circle. Default: min(width, height) / 2 */
    r1?: number;
}
/**
 * Parameters for a conic canvas gradient.
 */
export interface CanvasConicGradientParams {
    type: 'conic';
    stops: Array<{
        color: string;
        offset: number;
    }>;
    /** Start angle in radians. Default: 0 */
    startAngle?: number;
    /** x-coordinate of the gradient center. Default: canvas width / 2 */
    x?: number;
    /** y-coordinate of the gradient center. Default: canvas height / 2 */
    y?: number;
}
export type CanvasGradientParams = CanvasLinearGradientParams | CanvasRadialGradientParams | CanvasConicGradientParams;
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
export declare function gradientToCanvasGradient(params: CanvasGradientParams, ctx: CanvasRenderingContext2D): CanvasGradient;
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
export declare function gradientToImageData(params: CanvasGradientParams, width: number, height: number): ImageData;
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
export declare function gradientToDataURL(params: CanvasGradientParams, width: number, height: number): string;
