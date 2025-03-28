import { ESJEditingBindModeType, ESLocalCircle } from "earthsdk3";
import { CzmCircle, CzmESObjectWithLocation, CzmPolyline } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare class CzmESLocalCircle extends CzmESObjectWithLocation<ESLocalCircle> {
    static readonly type: void;
    editingBindMode: ESJEditingBindModeType;
    private _czmGeoCircle;
    get czmGeoCircle(): CzmCircle;
    private _geoPolyline;
    get geoPolyline(): CzmPolyline;
    constructor(sceneObject: ESLocalCircle, czmViewer: ESCesiumViewer);
    visibleDistance(sceneObject: ESLocalCircle, czmViewer: ESCesiumViewer): void;
    flyTo(duration: number | undefined, id: number): boolean;
}
