import { adjustHexBrightness } from 'color-value-tools';
import { ColorStop, colorStopToString, resolveBaseColor } from './utils.js';

export type { ColorStop as RadialGradientColorStop };

export type RadialShape = 'circle' | 'ellipse';
export type RadialSize =
  | 'closest-side'
  | 'closest-corner'
  | 'farthest-side'
  | 'farthest-corner'
  | string
  | { width: string; height: string };

export interface RadialGradientLayer {
  shape?: RadialShape;
  size?: RadialSize;
  position?: string;
  colors: ColorStop[];
}

export interface RadialGradientOptions {
  /** Brightness offset (%) for the auto-generated lighter stop. Default: 15 */
  offsetPercent?: number;
  fallbackColor?: string;
  shape?: RadialShape;
  size?: RadialSize;
  position?: string;
  /** Provide explicit color stops instead of auto-generating from baseColor. */
  colors?: ColorStop[];
  /** Compose multiple radial gradient layers (stacked via comma). */
  layers?: RadialGradientLayer[];
  /** Use repeating-radial-gradient instead of radial-gradient. */
  repeating?: boolean;
}

function sizeStr(size: RadialSize): string {
  return typeof size === 'object' ? `${size.width} ${size.height}` : size;
}

function buildRadialLayer(
  shape: RadialShape,
  size: RadialSize,
  position: string,
  stops: string,
  repeating: boolean,
): string {
  const fn = repeating ? 'repeating-radial-gradient' : 'radial-gradient';
  return `${fn}(${shape} ${sizeStr(size)} at ${position}, ${stops})`;
}

/**
 * Creates a CSS radial gradient.
 *
 * When `options.colors` is provided, those stops are used directly.
 * When `options.layers` is provided, multiple stacked radial gradients are
 * composed (CSS background-image layering syntax).
 * Otherwise, a two-stop gradient is auto-generated from `baseColor`.
 *
 * Supports hex, rgb(), hsl(), named colors, and CSS variables as baseColor.
 */
export function createRadialGradient(
  baseColor: string,
  options?: RadialGradientOptions,
): string {
  const {
    offsetPercent = 15,
    shape = 'ellipse',
    size = 'farthest-corner',
    position = 'center',
    fallbackColor = '#f5e477',
    colors: customColors,
    layers,
    repeating = false,
  } = options || {};

  // Multi-layer mode
  if (layers && layers.length > 0) {
    return layers
      .map(layer => {
        const stops = layer.colors.map(colorStopToString).join(', ');
        return buildRadialLayer(
          layer.shape ?? shape,
          layer.size ?? size,
          layer.position ?? position,
          stops,
          repeating,
        );
      })
      .join(', ');
  }

  // Explicit color stops mode
  if (customColors && customColors.length > 0) {
    const stops = customColors.map(colorStopToString).join(', ');
    return buildRadialLayer(shape, size, position, stops, repeating);
  }

  // Auto-generate from baseColor
  const resolved = resolveBaseColor(baseColor, fallbackColor);
  const endColor = resolved.isCssVar ? resolved.varExpression! : resolved.hex;
  const startColor = adjustHexBrightness(resolved.hex, offsetPercent);

  return buildRadialLayer(shape, size, position, `${startColor}, ${endColor}`, repeating);
}
