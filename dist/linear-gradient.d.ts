export interface LinearGradientColorStop {
    color: string;
    position?: string;
    opacity?: number;
}
export interface CustomLinearGradientOptions {
    direction?: string;
    angle?: number;
}
export declare function createCustomLinearGradient(stops: LinearGradientColorStop[], options?: CustomLinearGradientOptions): string;
export interface GradientOptions {
    offsetPercent?: number;
    direction?: 'to bottom' | 'to top' | 'to right' | 'to left' | string;
    angle?: number;
    fallbackColor?: string;
}
export declare function createLinearGradient(baseColor: string, options?: GradientOptions): string;
export declare function createMultiStepLinearGradient(baseColor: string, steps?: number, options?: Omit<GradientOptions, 'direction'> & {
    direction?: string;
}): string;
