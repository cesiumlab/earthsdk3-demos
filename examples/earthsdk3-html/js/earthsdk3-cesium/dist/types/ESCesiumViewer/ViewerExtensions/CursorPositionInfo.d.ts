import { Destroyable } from "xbsj-base";
import * as Cesium from 'cesium';
export declare class CursorPositionInfo extends Destroyable {
    private _enabled;
    get enabled(): boolean;
    set enabled(value: boolean);
    get enabledChanged(): import("xbsj-base").Listener<[boolean, boolean]>;
    private _cursorPosition;
    get cursorPosition(): [number, number, number] | undefined;
    get cursorPositionChanged(): import("xbsj-base").Listener<[[number, number, number] | undefined, [number, number, number] | undefined]>;
    quickPickPosition: boolean;
    constructor(viewer: Cesium.Viewer);
}
