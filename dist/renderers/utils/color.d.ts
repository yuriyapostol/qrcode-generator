export type RGB = [number, number, number];
export type RGBA = [number, number, number, number];
export declare const parseRgbColor: (value: string, fallback: RGB) => RGB;
export declare const parseRgbaColor: (value: string, fallback: RGBA) => RGBA;
