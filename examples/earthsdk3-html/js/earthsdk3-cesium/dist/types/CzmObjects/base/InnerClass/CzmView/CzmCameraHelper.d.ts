import { CzmModelPrimitive, CzmPoint, CzmView, GeoAxis } from "../../../../CzmObjects";
import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { Destroyable } from "xbsj-base";
export declare class CzmCameraHelper extends Destroyable {
    private _model;
    get model(): CzmModelPrimitive;
    private _geoPoint;
    get geoPoint(): CzmPoint;
    private _geoAxis;
    get geoAxis(): GeoAxis;
    constructor(sceneObject: CzmView, czmViewer: ESCesiumViewer);
}
