export interface RadialGradientOptions {
    offsetPercent?: number;
    fallbackColor?: string;
    shape?: 'circle' | 'ellipse';
    size?: string | {
        width: string;
        height: string;
    };
    position?: string;
    useCustomColors?: boolean;
    colors?: Array<{
        color: string;
        opacity?: number;
        position?: string;
    }>;
    layers?: Array<{
        shape?: 'circle' | 'ellipse';
        size?: string | {
            width: string;
            height: string;
        };
        position?: string;
        colors: Array<{
            color: string;
            opacity?: number;
            position?: string;
        }>;
    }>;
}
export declare function createRadialGradient(baseColor: string, options?: RadialGradientOptions): string;
