import { ESPoi3D } from "earthsdk3";
import { CzmESObjectWithLocation } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare class CzmESPoi3D extends CzmESObjectWithLocation<ESPoi3D> {
    static readonly type: void;
    private _czmModelPoi3D?;
    constructor(sceneObject: ESPoi3D, czmViewer: ESCesiumViewer);
    visibleDistance(sceneObject: ESPoi3D, czmViewer: ESCesiumViewer): void;
    flyTo(duration: number | undefined, id: number): boolean;
}
