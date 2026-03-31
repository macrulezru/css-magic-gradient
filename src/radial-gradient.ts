import {
  adjustHexBrightness,
  complement,
  triadic,
  tetradic,
  analogous,
  createColorScale,
  interpolateColors,
} from 'color-value-tools';
import type { ScaleInterpolation } from './linear-gradient.js';
import { ColorStop, colorStopToString, resolveBaseColor, toScaleMode } from './utils.js';

export type { ColorStop as RadialGradientColorStop };

export type RadialShape = 'circle' | 'ellipse';
export type RadialSize =
  | 'closest-side'
  | 'closest-corner'
  | 'farthest-side'
  | 'farthest-corner'
  | string
  | { width: string; height: string };

export type RadialHarmonyType = 'complementary' | 'triadic' | 'tetradic' | 'analogous';

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
  /**
   * Auto-generate layer colors from a color harmony. Each harmony color
   * becomes the dominant color for its stop in the gradient.
   */
  harmonyType?: RadialHarmonyType;
  /**
   * Color space used for interpolating between stops when harmonyType is set.
   * Default: 'oklch'.
   */
  interpolationSpace?: ScaleInterpolation;
}

export interface RadialGradientLayersOptions {
  /** Number of layers. Default: 3 */
  count?: number;
  /** Minimum size as a percentage of the container. Default: 20 */
  minSizePercent?: number;
  /** Maximum size as a percentage of the container. Default: 100 */
  maxSizePercent?: number;
  /** Harmony type for distributing colors across layers. Default: 'analogous' */
  harmonyType?: RadialHarmonyType;
  interpolationSpace?: ScaleInterpolation;
  position?: string;
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
 * Modes (evaluated in priority order):
 * 1. `layers` — multiple stacked radial gradients.
 * 2. `harmonyType` — auto-generates stops using the specified color harmony.
 * 3. `colors` — explicit color stops.
 * 4. Auto-generate two-stop gradient from `baseColor`.
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
    harmonyType,
    interpolationSpace = 'oklch',
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

  const resolved = resolveBaseColor(baseColor, fallbackColor);
  const mode = toScaleMode(interpolationSpace);

  // Harmony mode — derive stops from color harmony
  if (harmonyType) {
    let harmonyColors: string[];
    switch (harmonyType) {
      case 'complementary':
        harmonyColors = [resolved.hex, complement(resolved.hex)];
        break;
      case 'triadic':
        harmonyColors = triadic(resolved.hex);
        break;
      case 'tetradic':
        harmonyColors = tetradic(resolved.hex);
        break;
      case 'analogous':
        harmonyColors = analogous(resolved.hex);
        break;
    }
    const scale = createColorScale(harmonyColors, Math.max(harmonyColors.length, 5), {
      space: mode,
      format: 'hex',
    });
    const stops = scale.map(c => colorStopToString({ color: c })).join(', ');
    return buildRadialLayer(shape, size, position, stops, repeating);
  }

  // Explicit color stops mode
  if (customColors && customColors.length > 0) {
    const stops = customColors.map(colorStopToString).join(', ');
    return buildRadialLayer(shape, size, position, stops, repeating);
  }

  // Auto-generate from baseColor
  const endColor = resolved.isCssVar ? resolved.varExpression! : resolved.hex;
  const startColor = adjustHexBrightness(resolved.hex, offsetPercent);

  return buildRadialLayer(shape, size, position, `${startColor}, ${endColor}`, repeating);
}

/**
 * Utility that generates a set of `RadialGradientLayer` objects with evenly
 * distributed sizes and colors from the given harmony.
 *
 * Each layer shrinks from `maxSizePercent` down to `minSizePercent`, creating
 * a nested multi-ring radial effect when composed into `createRadialGradient`.
 *
 * @example
 * const layers = createRadialGradientLayers('#3498db', {
 *   count: 4,
 *   harmonyType: 'triadic',
 * });
 * const gradient = createRadialGradient('#3498db', { layers });
 */
export function createRadialGradientLayers(
  baseColor: string,
  options?: RadialGradientLayersOptions,
): RadialGradientLayer[] {
  const {
    count = 3,
    minSizePercent = 20,
    maxSizePercent = 100,
    harmonyType = 'analogous',
    interpolationSpace = 'oklch',
    position = 'center',
  } = options || {};

  const fallback = '#f5e477';
  const resolved = resolveBaseColor(baseColor, fallback);
  const mode = toScaleMode(interpolationSpace);

  let harmonyColors: string[];
  switch (harmonyType) {
    case 'complementary':
      harmonyColors = [resolved.hex, complement(resolved.hex)];
      break;
    case 'triadic':
      harmonyColors = triadic(resolved.hex);
      break;
    case 'tetradic':
      harmonyColors = tetradic(resolved.hex);
      break;
    case 'analogous':
    default:
      harmonyColors = analogous(resolved.hex);
      break;
  }

  const colorScale = createColorScale(harmonyColors, count, { space: mode, format: 'hex' });
  const sizeStep = count > 1 ? (maxSizePercent - minSizePercent) / (count - 1) : 0;

  return colorScale.map((color, i) => {
    const sizePct = maxSizePercent - i * sizeStep;
    return {
      position,
      size: `${sizePct.toFixed(0)}% ${sizePct.toFixed(0)}%`,
      colors: [
        { color: adjustHexBrightness(color, 20), position: '0%' },
        { color, position: '100%' },
      ],
    };
  });
}
