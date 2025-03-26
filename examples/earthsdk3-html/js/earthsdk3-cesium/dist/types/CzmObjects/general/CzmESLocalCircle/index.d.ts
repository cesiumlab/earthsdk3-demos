import { ESLocalCircle } from "earthsdk3";
import { CzmCircle, CzmESObjectWithLocation, CzmPolyline } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare class CzmESLocalCircle extends CzmESObjectWithLocation<ESLocalCircle> {
    static readonly type: void;
    private _czmGeoCircle;
    get czmGeoCircle(): CzmCircle;
    private _geoPolyline;
    get geoPolyline(): CzmPolyline;
    private _innerPositionReact;
    constructor(sceneObject: ESLocalCircle, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
