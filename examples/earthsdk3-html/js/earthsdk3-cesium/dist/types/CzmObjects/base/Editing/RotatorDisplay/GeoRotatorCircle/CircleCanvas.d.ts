import { HasOwner } from "xbsj-base";
import { GeoRotatorCircle } from ".";
export declare class CircleCanvas extends HasOwner<GeoRotatorCircle> {
    private _canvas;
    get canvas(): HTMLCanvasElement;
    private _ctx;
    get ctx(): CanvasRenderingContext2D;
    private _flipText;
    get flipText(): boolean;
    set flipText(v: boolean);
    get flipTextChanged(): import("xbsj-base").Listener<[boolean, boolean]>;
    constructor(owner: GeoRotatorCircle);
}
