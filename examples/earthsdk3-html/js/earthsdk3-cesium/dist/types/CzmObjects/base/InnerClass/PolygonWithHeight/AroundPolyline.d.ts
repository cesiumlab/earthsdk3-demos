import { Destroyable } from "xbsj-base";
import { CzmPolygonWithHeight } from ".";
import { ESCesiumViewer } from "../../../../ESCesiumViewer";
export declare class AroundPolyline extends Destroyable {
    constructor(sceneObject: CzmPolygonWithHeight, czmViewer: ESCesiumViewer);
}
