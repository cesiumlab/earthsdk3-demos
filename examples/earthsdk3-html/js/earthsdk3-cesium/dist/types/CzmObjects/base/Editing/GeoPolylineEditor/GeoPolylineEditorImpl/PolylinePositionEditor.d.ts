import { Destroyable } from "xbsj-base";
import { GeoPolylineEditorImpl } from ".";
import { GeoCanvasImagePoi, GeoCanvasMenuPoi } from "../../../../../CzmObjects";
export declare class PolylinePositionEditor extends Destroyable {
    private _impl;
    private _position;
    get position(): [number, number, number] | undefined;
    get positionChanged(): import("xbsj-base").Listener<[[number, number, number] | undefined, [number, number, number] | undefined]>;
    set position(value: [number, number, number] | undefined);
    private _menuPoi;
    get menuPoi(): GeoCanvasMenuPoi;
    private _middlePoi;
    get middlePoi(): GeoCanvasImagePoi;
    private _id;
    get id(): number;
    get impl(): GeoPolylineEditorImpl;
    constructor(_impl: GeoPolylineEditorImpl, position?: [number, number, number]);
}
