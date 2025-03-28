import { Destroyable } from "xbsj-base";
import { PickedResult } from "earthsdk3";
import { ESCesiumViewer } from "../index";
export declare class PickingManager extends Destroyable {
    private _pause;
    get pause(): boolean;
    set pause(value: boolean);
    get pauseChanged(): import("xbsj-base").Listener<[boolean, boolean]>;
    private _pickPositionTasks;
    pickPosition(windowPosition: [left: number, top: number]): Promise<[number, number, number] | undefined>;
    quickPickPosition(windowPosition: [left: number, top: number]): Promise<[number, number, number] | undefined>;
    private _pickTasks;
    pick(windowPosition: [left: number, top: number], windowSize?: [width: number, height: number], attachedInfo?: any): Promise<PickedResult>;
    pickHeightMustGreaterThanZero: boolean;
    objectsToExclude: any[];
    constructor(czmViewer: ESCesiumViewer);
}
