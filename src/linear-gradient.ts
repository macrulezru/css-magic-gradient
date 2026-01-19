export interface LinearGradientColorStop {
  color: string;
  position?: string;
  opacity?: number;
}

export interface CustomLinearGradientOptions {
  direction?: string;
  angle?: number;
}

export function createCustomLinearGradient(
  stops: LinearGradientColorStop[],
  options?: CustomLinearGradientOptions
): string {
  const { direction = 'to bottom', angle } = options || {};
  const gradientDirection = angle ? `${angle}deg` : direction;
  function colorStopToString(item: LinearGradientColorStop): string {
    let colorStr = item.color;
    if (typeof item.opacity === 'number') {
      if (item.opacity === 0) {
        colorStr = 'transparent';
      } else {
        const type = getColorType(item.color);
        if (type === 'hex') {
          // @ts-ignore
          colorStr = hexToRgba(item.color, item.opacity);
        } else if (type === 'rgb') {
          colorStr = item.color.replace(/rgb\(([^)]+)\)/, (_, rgb) => `rgba(${rgb}, ${item.opacity})`);
        } else {
          colorStr = item.color;
        }
      }
    }
    return item.position ? `${colorStr} ${item.position}` : colorStr;
  }
  const stopsStr = stops.map(colorStopToString).join(', ');
  return `linear-gradient(${gradientDirection}, ${stopsStr})`;
}
import { getColorType, extractCssVariableName, isCssVariable, isHexColor, normalizeHex, adjustHexBrightness, hexToRgba } from './color-utils';

export interface GradientOptions {
  offsetPercent?: number;
  direction?: 'to bottom' | 'to top' | 'to right' | 'to left' | string;
  angle?: number;
  fallbackColor?: string;
}

export function createLinearGradient(baseColor: string, options?: GradientOptions): string {
  const {
    offsetPercent = 15,
    direction = 'to bottom',
    angle,
    fallbackColor = '#f5e477',
  } = options || {};

  const colorType = getColorType(baseColor);
  let colorValue: string;
  let adjustedColor: string;

  if (colorType === 'css-var') {
    const varName = extractCssVariableName(baseColor);
    colorValue = `var(${varName}, ${fallbackColor})`;
    adjustedColor = adjustHexBrightness(fallbackColor, offsetPercent);
  } else if (colorType === 'hex') {
    colorValue = normalizeHex(baseColor);
    adjustedColor = adjustHexBrightness(colorValue, offsetPercent);
  } else {
    colorValue = fallbackColor;
    adjustedColor = adjustHexBrightness(fallbackColor, offsetPercent);
  }

  const startColor = adjustedColor;
  const endColor = colorValue;
  const gradientDirection = angle ? `${angle}deg` : direction;
  return `linear-gradient(${gradientDirection}, ${startColor}, ${endColor})`;
}

export function createMultiStepLinearGradient(
  baseColor: string,
  steps: number = 3,
  options?: Omit<GradientOptions, 'direction'> & { direction?: string },
): string {
  const {
    offsetPercent = 15,
    direction = 'to bottom',
    angle,
    fallbackColor = '#f5e477',
  } = options || {};

  const colorType = getColorType(baseColor);
  let colorValue: string;
  if (colorType === 'css-var') {
    colorValue = fallbackColor;
  } else if (colorType === 'hex') {
    colorValue = normalizeHex(baseColor);
  } else {
    colorValue = fallbackColor;
  }

  const colors: string[] = [];
  for (let i = 0; i < steps; i++) {
    const percent = offsetPercent * (1 - i / (steps - 1));
    const color = adjustHexBrightness(colorValue, percent);
    colors.push(color);
  }
  const gradientDirection = angle ? `${angle}deg` : direction;
  return `linear-gradient(${gradientDirection}, ${colors.join(', ')})`;
}
