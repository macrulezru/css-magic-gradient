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
export declare function createConicGradient(baseColor: string, options?: ConicGradientOptions): string;
export declare function createRainbowConicGradient(options?: {
    fromAngle?: number;
    position?: string;
    saturation?: number;
    lightness?: number;
    steps?: number;
}): string;
