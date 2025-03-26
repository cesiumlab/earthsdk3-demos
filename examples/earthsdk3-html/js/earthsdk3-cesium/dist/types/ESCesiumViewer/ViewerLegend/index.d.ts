import { Destroyable } from "xbsj-base";
import { ESCesiumViewer } from "../index";
import { Legend } from "./Legend";
export declare class ViewerLegend extends Destroyable {
    private _czmViewer;
    private _enabled;
    get enabled(): boolean;
    set enabled(value: boolean);
    get enabledChanged(): import("xbsj-base").Listener<[boolean, boolean]>;
    private _resolution;
    get resolution(): number | undefined;
    set resolution(value: number | undefined);
    get resolutionChanged(): import("xbsj-base").Listener<[number | undefined, number | undefined]>;
    private _center;
    get center(): [number, number, number] | undefined;
    get centerChanged(): import("xbsj-base").Listener<[[number, number, number] | undefined, [number, number, number] | undefined]>;
    private _zoom;
    get zoom(): number | undefined;
    get zoomChanged(): import("xbsj-base").Listener<[number | undefined, number | undefined]>;
    private _legend;
    get legend(): Legend;
    get length(): number;
    constructor(_czmViewer: ESCesiumViewer);
}
