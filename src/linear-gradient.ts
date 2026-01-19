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
  const stopsStr = stops
    .map(s => {
      let c = s.color;
      if (typeof s.opacity === 'number' && s.opacity < 1) {
        // Примитивная поддержка hex → rgba, остальное оставляем как есть
        if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(c)) {
          const hex = c.length === 4
            ? `#${c[1]}${c[1]}${c[2]}${c[2]}${c[3]}${c[3]}`
            : c;
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          c = `rgba(${r},${g},${b},${s.opacity})`;
        }
      }
      return s.position ? `${c} ${s.position}` : c;
    })
    .join(', ');
  return `linear-gradient(${gradientDirection}, ${stopsStr})`;
}
import { getColorType, extractCssVariableName, isCssVariable, isHexColor, normalizeHex, adjustHexBrightness } from './color-utils';

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
