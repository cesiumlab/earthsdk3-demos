export type ColorLevel = {
    shadow: number;
    midtones: number;
    highlight: number;
    outputShadow: number;
    outputHighlight: number;
};
export type ColorHSL = {
    hue: number;
    saturation: number;
    lightness: number;
};
export type ColorHSLs = {
    colorIndex: number;
    hue: number;
    saturation: number;
    lightness: number;
};
export type HSLChannel = {
    colorIndex: number;
    hue: number;
    saturation: number;
    lightness: number;
    _left: number;
    left: number;
    right: number;
    _right: number;
    defined: boolean;
};
export type CurveChannel = {
    controlPoints: number[][];
    points: number[][];
    density: number;
};
export type CurveChannels = {
    rgbColor: number[][];
    redColor: number[][];
    greenColor: number[][];
    blueColor: number[][];
};
export declare function createTable(): number[][];
export declare function clipRange(value: number, min: number, max: number): number;
export declare function brightnessContrast(pixelValue: number, brightness?: number, contrast?: number): number;
export declare function colorLevelChannel(level: ColorLevel, colorTable: number[]): number[];
export declare function getColorsLevelTable(list: number[][], levelRgb: ColorLevel, levelRed: ColorLevel, levelGreen: ColorLevel, levelBlue: ColorLevel): number[][];
export declare function setBrightnessContrast(arr: number[][], brightness?: number, contrast?: number): number[][];
export declare function getHsvScope(index: number): {
    _left: number;
    left: number;
    right: number;
    _right: number;
};
export declare function calcDefined(hue: number, saturation: number, lightness: number): boolean;
export declare function getHSLChannels(arr: ColorHSLs[]): HSLChannel[];
export declare const sampleColorValue: {
    colorLevel: string;
    colorHSL: string;
    curve: string;
    brightness: string;
    contrast: string;
};
export declare const defaultColorValue: {
    colorLevel: {
        shadow: number;
        midtones: number;
        highlight: number;
        outputShadow: number;
        outputHighlight: number;
    };
    colorHSL: {
        hue: number;
        saturation: number;
        lightness: number;
    };
    curve: {
        controlPoints: number[][];
        points: number[][];
        density: number;
    };
    brightness: number;
    contrast: number;
};
