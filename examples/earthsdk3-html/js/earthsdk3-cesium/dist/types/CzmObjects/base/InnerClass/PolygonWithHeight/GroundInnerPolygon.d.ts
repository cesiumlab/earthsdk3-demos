import { Destroyable } from "xbsj-base";
import { CzmPolygonGroundPrimitiveWithHeight } from "./CzmPolygonGroundPrimitiveWithHeight";
import { CzmPolygonWithHeight } from ".";
import { ESCesiumViewer } from "../../../../ESCesiumViewer";
export declare class GroundInnerPolygon extends Destroyable {
    private _groundPolygonPrimitive;
    get groundPolygonPrimitive(): CzmPolygonGroundPrimitiveWithHeight;
    constructor(sceneObject: CzmPolygonWithHeight, czmViewer: ESCesiumViewer);
}
