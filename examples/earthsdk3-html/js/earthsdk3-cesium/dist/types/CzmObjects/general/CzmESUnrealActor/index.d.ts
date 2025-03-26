import { ESUnrealActor } from "earthsdk3";
import { CzmESObjectWithLocation, CzmPoint } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare class CzmESUnrealActor extends CzmESObjectWithLocation<ESUnrealActor> {
    static readonly type: void;
    private _czmGeoPoint;
    get czmGeoPoint(): CzmPoint;
    constructor(sceneObject: ESUnrealActor, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
