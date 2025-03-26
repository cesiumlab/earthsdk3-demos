import { CzmPolyline } from "../../../../CzmObjects";
import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { Destroyable } from "xbsj-base";
import { CzmPolygonWithHeight } from ".";
export declare class BottomPolyline extends Destroyable {
    private _geoPolyline;
    get geoPolyline(): CzmPolyline;
    constructor(sceneObject: CzmPolygonWithHeight, czmViewer: ESCesiumViewer, ground: boolean);
}
