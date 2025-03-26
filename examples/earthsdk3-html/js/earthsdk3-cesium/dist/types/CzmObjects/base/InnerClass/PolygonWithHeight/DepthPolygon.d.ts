import { Destroyable } from "xbsj-base";
import { InnerPolygon } from "./InnerPolygon";
import { BottomPolyline } from "./BottomPolyline";
import { CzmPolygonWithHeight } from ".";
import { ESCesiumViewer } from "../../../../ESCesiumViewer";
export declare class DepthPolygon extends Destroyable {
    private _innerPolygon;
    get innerPolygon(): InnerPolygon;
    private _bottomPolyline;
    get bottomPolyline(): BottomPolyline;
    constructor(sceneObject: CzmPolygonWithHeight, czmViewer: ESCesiumViewer);
}
