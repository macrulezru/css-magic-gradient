"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCssVariable = isCssVariable;
exports.isHexColor = isHexColor;
exports.isRgbColor = isRgbColor;
exports.isHslColor = isHslColor;
exports.getColorType = getColorType;
exports.extractCssVariableName = extractCssVariableName;
exports.normalizeHex = normalizeHex;
exports.hexToRgb = hexToRgb;
exports.hexToRgba = hexToRgba;
exports.hexToHsl = hexToHsl;
exports.hslToHex = hslToHex;
exports.adjustHexBrightness = adjustHexBrightness;
exports.rotateHue = rotateHue;
function isCssVariable(value) {
    return value.trim().startsWith('var(--');
}
function isHexColor(value) {
    const trimmed = value.trim();
    return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(trimmed);
}
function isRgbColor(value) {
    const trimmed = value.trim().toLowerCase();
    return trimmed.startsWith('rgb(') || trimmed.startsWith('rgba(');
}
function isHslColor(value) {
    const trimmed = value.trim().toLowerCase();
    return trimmed.startsWith('hsl(') || trimmed.startsWith('hsla(');
}
function getColorType(value) {
    const trimmed = value.trim().toLowerCase();
    if (isCssVariable(trimmed))
        return 'css-var';
    if (isHexColor(trimmed))
        return 'hex';
    if (isRgbColor(trimmed))
        return 'rgb';
    if (isHslColor(trimmed))
        return 'hsl';
    const namedColors = [
        'transparent', 'currentcolor', 'inherit', 'initial', 'unset', 'black', 'white', 'red', 'green', 'blue', 'yellow', 'purple', 'orange', 'gray', 'grey', 'pink', 'brown', 'cyan', 'magenta', 'violet', 'aqua', 'beige', 'coral', 'gold', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'maroon', 'navy', 'olive', 'orchid', 'plum', 'salmon', 'silver', 'tan', 'teal', 'tomato', 'wheat',
    ];
    if (namedColors.includes(trimmed))
        return 'named';
    return 'unknown';
}
function extractCssVariableName(value) {
    const match = value.match(/var\((--[^)]+)\)/);
    return (match === null || match === void 0 ? void 0 : match[1]) || value;
}
function normalizeHex(hex) {
    let cleanHex = hex.trim();
    if (!cleanHex.startsWith('#'))
        cleanHex = `#${cleanHex}`;
    if (cleanHex.length === 4) {
        cleanHex = `#${cleanHex.slice(1).split('').map(c => c + c).join('')}`;
    }
    if (!/^#[0-9A-Fa-f]{6}$/.test(cleanHex)) {
        return '#f5e477';
    }
    return cleanHex.toLowerCase();
}
function hexToRgb(hex) {
    const normalizedHex = normalizeHex(hex);
    const r = parseInt(normalizedHex.slice(1, 3), 16);
    const g = parseInt(normalizedHex.slice(3, 5), 16);
    const b = parseInt(normalizedHex.slice(5, 7), 16);
    return [r, g, b];
}
function hexToRgba(hex, opacity = 1) {
    const [r, g, b] = hexToRgb(hex);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
function hexToHsl(hex) {
    const [r, g, b] = hexToRgb(hex);
    const red = r / 255;
    const green = g / 255;
    const blue = b / 255;
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case red:
                h = (green - blue) / d + (green < blue ? 6 : 0);
                break;
            case green:
                h = (blue - red) / d + 2;
                break;
            case blue:
                h = (red - green) / d + 4;
                break;
        }
        h /= 6;
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}
function hslToHex(h, s, l) {
    h = h % 360;
    s = Math.max(0, Math.min(100, s)) / 100;
    l = Math.max(0, Math.min(100, l)) / 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;
    if (h >= 0 && h < 60) {
        r = c;
        g = x;
        b = 0;
    }
    else if (h >= 60 && h < 120) {
        r = x;
        g = c;
        b = 0;
    }
    else if (h >= 120 && h < 180) {
        r = 0;
        g = c;
        b = x;
    }
    else if (h >= 180 && h < 240) {
        r = 0;
        g = x;
        b = c;
    }
    else if (h >= 240 && h < 300) {
        r = x;
        g = 0;
        b = c;
    }
    else {
        r = c;
        g = 0;
        b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
function adjustHexBrightness(hex, offsetPercent) {
    const normalizedHex = normalizeHex(hex);
    const p = Math.max(-100, Math.min(100, offsetPercent)) / 100;
    const r = parseInt(normalizedHex.slice(1, 3), 16);
    const g = parseInt(normalizedHex.slice(3, 5), 16);
    const b = parseInt(normalizedHex.slice(5, 7), 16);
    const adjustChannel = (channel) => {
        if (p > 0)
            return Math.min(255, Math.floor(channel + (255 - channel) * p));
        else if (p < 0)
            return Math.max(0, Math.floor(channel * (1 + p)));
        return channel;
    };
    const newR = adjustChannel(r);
    const newG = adjustChannel(g);
    const newB = adjustChannel(b);
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}
function rotateHue(hex, degrees) {
    const [h, s, l] = hexToHsl(hex);
    const newH = (h + degrees) % 360;
    return hslToHex(newH, s, l);
}
