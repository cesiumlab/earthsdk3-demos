import { ESPath } from "earthsdk3";
import { CzmESGeoLineString } from "../CzmESGeoLineString";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { CzmSignalTransmission } from "../../../CzmObjects";
export declare class CzmESPath<T extends ESPath = ESPath> extends CzmESGeoLineString<T> {
    static readonly type: void;
    private _signal;
    get signal(): CzmSignalTransmission;
    constructor(sceneObject: T, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    flyIn(duration: number | undefined, id: number): boolean;
}
