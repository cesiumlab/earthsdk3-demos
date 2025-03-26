import { Destroyable } from "xbsj-base";
import { CzmPolygonWithHeight } from ".";
import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { CzmPolygonPrimitiveWithHeight } from "./CzmPolygonPrimitiveWithHeight";
export declare class InnerPolygon extends Destroyable {
    private _czmInnerPolygonPrimitive;
    get czmInnerPolygonPrimitive(): CzmPolygonPrimitiveWithHeight;
    constructor(sceneObject: CzmPolygonWithHeight, czmViewer: ESCesiumViewer, depthEnabled: boolean, ground: boolean);
}
