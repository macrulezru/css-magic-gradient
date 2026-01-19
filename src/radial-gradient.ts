import { getColorType, isHexColor, normalizeHex, adjustHexBrightness } from './color-utils';

export interface RadialGradientOptions {
  offsetPercent?: number;
  fallbackColor?: string;
  shape?: 'circle' | 'ellipse';
  size?: string | { width: string; height: string };
  position?: string;
  useCustomColors?: boolean;
  colors?: Array<{
    color: string;
    opacity?: number;
    position?: string;
  }>;
  layers?: Array<{
    shape?: 'circle' | 'ellipse';
    size?: string | { width: string; height: string };
    position?: string;
    colors: Array<{
      color: string;
      opacity?: number;
      position?: string;
    }>;
  }>;
}

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
    useCustomColors = false,
    colors: customColors,
    layers,
  } = options || {};

  if (layers && layers.length > 0) {
    const layerGradients = layers.map(layer => {
      const layerShape = layer.shape || shape;
      const layerSize = typeof layer.size === 'object' ? `${layer.size.width} ${layer.size.height}` : layer.size || size;
      const layerPosition = layer.position || position;
      const colorsStr = layer.colors.map(colorItem => colorItem.color).join(', ');
      return `radial-gradient(${layerShape} ${layerSize} at ${layerPosition}, ${colorsStr})`;
    });
    return layerGradients.join(', ');
  }

  if (useCustomColors && customColors && customColors.length > 0) {
    const colorsStr = customColors.map(colorItem => colorItem.color).join(', ');
    const sizeStr = typeof size === 'object' ? `${size.width} ${size.height}` : size;
    return `radial-gradient(${shape} ${sizeStr} at ${position}, ${colorsStr})`;
  }

  const resolvedBaseColor = isHexColor(baseColor) ? normalizeHex(baseColor) : fallbackColor;
  const adjustedColor = adjustHexBrightness(resolvedBaseColor, offsetPercent);
  const sizeStr = typeof size === 'object' ? `${size.width} ${size.height}` : size;
  return `radial-gradient(${shape} ${sizeStr} at ${position}, ${adjustedColor}, ${resolvedBaseColor})`;
}
