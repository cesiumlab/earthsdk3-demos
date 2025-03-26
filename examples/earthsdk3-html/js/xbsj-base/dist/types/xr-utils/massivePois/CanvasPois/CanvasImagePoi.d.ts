import { CanvasPoi } from "./CanvasPoi";
import { CanvasPrimitivesContext } from "./CanvasPrimitivesContext";
export declare class CanvasImagePoi extends CanvasPoi {
    private _image?;
    private _size;
    private _originRatioAndOffset;
    private _defaultColorStr;
    private _tooltip;
    private _title;
    private __scale;
    private _tooltipAlpha;
    private _bgColor;
    private _bgColorHexStr;
    private _fgColor;
    private _fgColorHexStr;
    constructor(canvasPrimitivesContext: CanvasPrimitivesContext, _image?: CanvasImageSource | undefined, _size?: [number, number], _originRatioAndOffset?: [number, number, number, number], // 原点在底部中间位置，先到比例所在位置，再做进一步偏移。
    _defaultColorStr?: string);
    set size(value: [width: number, height: number]);
    get size(): [width: number, height: number];
    protected set _scale(value: [width: number, height: number]);
    protected get _scale(): [width: number, height: number];
    set fgColor(value: [red: number, green: number, blue: number, alpha: number]);
    get fgColor(): [red: number, green: number, blue: number, alpha: number];
    set bgColor(value: [red: number, green: number, blue: number, alpha: number]);
    get bgColor(): [red: number, green: number, blue: number, alpha: number];
    set originRatioAndOffset(value: [leftRatio: number, topRatio: number, leftOffset: number, topOffset: number]);
    get originRatioAndOffset(): [leftRatio: number, topRatio: number, leftOffset: number, topOffset: number];
    set image(value: CanvasImageSource | undefined);
    get image(): CanvasImageSource | undefined;
    set defaultColorStr(value: string);
    get defaultColorStr(): string;
    set tooltip(value: string);
    get tooltip(): string;
    set title(value: string);
    get title(): string;
    draw(ctx: CanvasRenderingContext2D): void;
    drawForPick(ctx: CanvasRenderingContext2D, createPickColor: (tag: string) => string): void;
}
