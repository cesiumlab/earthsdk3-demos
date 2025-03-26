import { Destroyable, ObjResettingWithEvent } from "xbsj-base";
import { GeoPolylineEditorImpl } from ".";
import { CzmArcType } from "../../../../../ESJTypesCzm";
import { CzmPolyline } from "../../../../../CzmObjects";
declare class Polyline extends Destroyable {
    private _polyline;
    get polyline(): CzmPolyline;
    constructor(wrapper: PolylineWrapper);
}
/**
 * 用于线编辑的示意线
 */
export declare class PolylineWrapper extends Destroyable {
    private _impl;
    static defaults: {
        show: boolean;
        color: [number, number, number, number];
        arcType: CzmArcType;
        width: number;
    };
    private _show;
    get show(): boolean | undefined;
    get showChanged(): import("xbsj-base").Listener<[boolean | undefined, boolean | undefined]>;
    set show(value: boolean | undefined);
    private _color;
    get color(): [number, number, number, number] | undefined;
    get colorChanged(): import("xbsj-base").Listener<[[number, number, number, number] | undefined, [number, number, number, number] | undefined]>;
    set color(value: [number, number, number, number] | undefined);
    private _width;
    get width(): number | undefined;
    get widthChanged(): import("xbsj-base").Listener<[number | undefined, number | undefined]>;
    set width(value: number | undefined);
    private _arcType;
    get arcType(): CzmArcType | undefined;
    get arcTypeChanged(): import("xbsj-base").Listener<[CzmArcType | undefined, CzmArcType | undefined]>;
    set arcType(value: CzmArcType | undefined);
    get impl(): GeoPolylineEditorImpl;
    private _resetting;
    get resetting(): ObjResettingWithEvent<Polyline, import("xbsj-base").Listener<[boolean | undefined, boolean | undefined]>>;
    flyTo(duration?: number): void;
    constructor(_impl: GeoPolylineEditorImpl);
}
export {};
