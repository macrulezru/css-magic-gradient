import {
  getColorType,
  extractCssVariableName,
  normalizeHex,
  normalizeColor,
  hexToRgba,
  setAlpha,
} from 'color-value-tools';

export interface ColorStop {
  color: string;
  opacity?: number;
  position?: string | number;
}

/**
 * Converts a color stop object to its CSS string representation.
 * Supports opacity for hex, rgb, hsl, and named colors.
 */
export function colorStopToString(item: ColorStop): string {
  let colorStr = item.color;

  if (typeof item.opacity === 'number') {
    if (item.opacity === 0) {
      colorStr = 'transparent';
    } else {
      const type = getColorType(item.color);
      if (type === 'hex') {
        colorStr = hexToRgba(item.color, item.opacity);
      } else if (type === 'rgb' || type === 'hsl' || type === 'named') {
        colorStr = setAlpha(item.color, item.opacity);
      }
    }
  }

  return item.position !== undefined ? `${colorStr} ${item.position}` : colorStr;
}

export interface ResolvedColor {
  /** Normalized hex value of the color (or fallback hex for CSS variables) */
  hex: string;
  /** True when the original input was a CSS variable */
  isCssVar: boolean;
  /** Full `var(--name, fallback)` string — only set when isCssVar is true */
  varExpression?: string;
}

/**
 * Resolves any supported color format (hex, rgb, hsl, named, CSS variable) to
 * a ResolvedColor object that always exposes a usable hex value.
 *
 * CSS variables are resolved to their fallback hex so brightness / hue
 * calculations remain possible; the original var() expression is preserved
 * in `varExpression` for use as the actual CSS color value.
 */
export function resolveBaseColor(color: string, fallback: string): ResolvedColor {
  const type = getColorType(color);

  if (type === 'css-var') {
    const varName = extractCssVariableName(color);
    return {
      hex: normalizeHex(fallback),
      isCssVar: true,
      varExpression: `var(${varName}, ${fallback})`,
    };
  }

  if (type === 'hex') {
    return { hex: normalizeHex(color), isCssVar: false };
  }

  // rgb, hsl, named → convert through normalizeColor
  const parsed = normalizeColor(color);
  if (parsed && parsed.hex) {
    return { hex: parsed.hex as string, isCssVar: false };
  }

  return { hex: normalizeHex(fallback), isCssVar: false };
}
