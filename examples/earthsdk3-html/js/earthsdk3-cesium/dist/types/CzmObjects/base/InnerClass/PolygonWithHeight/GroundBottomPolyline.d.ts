import { CzmPolyline } from "../../../../CzmObjects";
import { Destroyable } from "xbsj-base";
import { CzmPolygonWithHeight } from ".";
import { ESCesiumViewer } from "../../../../ESCesiumViewer";
export declare class GroundBottomPolyline extends Destroyable {
    private _geoPolyline;
    get geoPolyline(): CzmPolyline;
    constructor(sceneObject: CzmPolygonWithHeight, czmViewer: ESCesiumViewer, ground: boolean);
}
