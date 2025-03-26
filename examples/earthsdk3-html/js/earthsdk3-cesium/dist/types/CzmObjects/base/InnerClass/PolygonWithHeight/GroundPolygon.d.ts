import { Destroyable } from "xbsj-base";
import { GroundInnerPolygon } from "./GroundInnerPolygon";
import { GroundBottomPolyline } from "./GroundBottomPolyline";
import { CzmPolygonWithHeight } from ".";
import { ESCesiumViewer } from "../../../../ESCesiumViewer";
export declare class GroundPolygon extends Destroyable {
    private _innerPolygon;
    get innerPolygon(): GroundInnerPolygon;
    private _bottomPolyline;
    get bottomPolyline(): GroundBottomPolyline;
    constructor(sceneObject: CzmPolygonWithHeight, czmViewer: ESCesiumViewer);
}
