import { CanvasPoi, CanvasPrimitivesContext } from "xbsj-base";
export declare class CanvasPointPoi extends CanvasPoi {
    private _scale;
    get scale(): number;
    protected set scale(value: number);
    protected get scaleChanged(): import("xbsj-base").Listener<[number, number]>;
    private _text;
    get text(): string | undefined;
    set text(value: string | undefined);
    get textChanged(): import("xbsj-base").Listener<[string | undefined, string | undefined]>;
    private _font;
    get font(): string | undefined;
    /**
     * @example
     * 'bold 10px Arial'
     */
    set font(value: string | undefined);
    get fontChanged(): import("xbsj-base").Listener<[string | undefined, string | undefined]>;
    private _fontStyle;
    get fontStyle(): string | undefined;
    set fontStyle(value: string | undefined);
    get fontStyleChanged(): import("xbsj-base").Listener<[string | undefined, string | undefined]>;
    private _radius;
    get radius(): number | undefined;
    set radius(value: number | undefined);
    get radiusChanged(): import("xbsj-base").Listener<[number | undefined, number | undefined]>;
    private _outlineStyle;
    get outlineStyle(): string | undefined;
    set outlineStyle(value: string | undefined);
    get outlineStyleChanged(): import("xbsj-base").Listener<[string | undefined, string | undefined]>;
    private _selectedStyle;
    get selectedStyle(): string | undefined;
    set selectedStyle(value: string | undefined);
    get selectedStyleChanged(): import("xbsj-base").Listener<[string | undefined, string | undefined]>;
    private _fillStyle;
    get fillStyle(): string | undefined;
    set fillStyle(value: string | undefined);
    get fillStyleChanged(): import("xbsj-base").Listener<[string | undefined, string | undefined]>;
    constructor(canvasPrimitivesContext: CanvasPrimitivesContext);
    /**
     * 绘制poi
     * @param ctx Canvas的Context，用来绘制
     * @returns
     */
    draw(ctx: CanvasRenderingContext2D): void;
    /**
     * 该操作主要用于拾取，需要在绘制区域返回createPickColor中指定的颜色，借此来拾取相应的对象
     * @param ctx
     * @param createPickColor
     * @returns
     */
    drawForPick(ctx: CanvasRenderingContext2D, createPickColor: (tag: string) => string): void;
}
