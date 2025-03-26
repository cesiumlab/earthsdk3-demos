import { ESLabel } from "earthsdk3";
import { CzmESObjectWithLocation } from "./CzmESObjectWithLocation";
import { ESCesiumViewer } from "../../ESCesiumViewer";
export declare class CzmESLabel<T extends ESLabel = ESLabel> extends CzmESObjectWithLocation<T> {
    private _lastHoverResult;
    get lastHoverResult(): any | undefined;
    set lastHoverResult(value: any | undefined);
    get lastHoverResultChanged(): import("xbsj-base").Listener<[any, any]>;
    constructor(sceneObject: T, czmViewer: ESCesiumViewer);
}
