import { getColorType, isHexColor, normalizeHex, adjustHexBrightness, rotateHue, hslToHex, hexToRgba } from './color-utils';

export interface ConicGradientOptions {
  fromAngle?: number;
  position?: string;
  fallbackColor?: string;
  colors?: Array<{
    color: string;
    opacity?: number;
    position?: string | number;
  }>;
  hueRotation?: boolean;
  steps?: number;
  offsetPercent?: number;
}

export function createConicGradient(
  baseColor: string,
  options?: ConicGradientOptions,
): string {
  const {
    fromAngle = 0,
    position = '50% 50%',
    fallbackColor = '#f5e477',
    colors: customColors,
    hueRotation = false,
    steps = 8,
    offsetPercent = 20,
  } = options || {};

  if (customColors && customColors.length > 0) {
    function colorStopToString(item: { color: string; opacity?: number; position?: string | number }): string {
      let colorStr = item.color;
      if (typeof item.opacity === 'number') {
        if (item.opacity === 0) {
          colorStr = 'transparent';
        } else {
          const type = getColorType(item.color);
          if (type === 'hex') {
            colorStr = hexToRgba(item.color, item.opacity);
          } else if (type === 'rgb') {
            colorStr = item.color.replace(/rgb\(([^)]+)\)/, (_, rgb) => `rgba(${rgb}, ${item.opacity})`);
          } else {
            colorStr = item.color;
          }
        }
      }
      return item.position !== undefined ? `${colorStr} ${item.position}` : colorStr;
    }
    const colorsStr = customColors.map(colorStopToString).join(', ');
    return `conic-gradient(from ${fromAngle}deg at ${position}, ${colorsStr})`;
  }

  const resolvedBaseColor = isHexColor(baseColor) ? normalizeHex(baseColor) : fallbackColor;
  const colors: string[] = [];
  if (hueRotation) {
    for (let i = 0; i < steps; i++) {
      const degrees = (i * 360) / steps;
      const color = rotateHue(resolvedBaseColor, degrees);
      const positionPercent = (i * 100) / steps;
      colors.push(`${color} ${positionPercent}%`);
    }
    colors.push(`${rotateHue(resolvedBaseColor, 0)} 100%`);
  } else {
    for (let i = 0; i < steps; i++) {
      const percent = offsetPercent * (1 - i / (steps - 1));
      const color = adjustHexBrightness(resolvedBaseColor, percent);
      const positionPercent = (i * 100) / steps;
      colors.push(`${color} ${positionPercent}%`);
    }
    colors.push(`${adjustHexBrightness(resolvedBaseColor, 0)} 100%`);
  }
  return `conic-gradient(from ${fromAngle}deg at ${position}, ${colors.join(', ')})`;
}

export function createRainbowConicGradient(options?: {
  fromAngle?: number;
  position?: string;
  saturation?: number;
  lightness?: number;
  steps?: number;
}): string {
  const {
    fromAngle = 0,
    position = '50% 50%',
    saturation = 80,
    lightness = 60,
    steps = 12,
  } = options || {};
  const colors: string[] = [];
  const stepSize = 360 / steps;
  for (let i = 0; i <= steps; i++) {
    const hue = (i * stepSize) % 360;
    const color = hslToHex(hue, saturation, lightness);
    const positionPercent = (i * 100) / steps;
    colors.push(`${color} ${positionPercent}%`);
  }
  return `conic-gradient(from ${fromAngle}deg at ${position}, ${colors.join(', ')})`;
}
