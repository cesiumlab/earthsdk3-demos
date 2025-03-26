import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { Destroyable } from "xbsj-base";
import { GeoClassificationPolygon } from "./GeoClassificationPolygon";
export declare class CzmClassificationPolygon extends Destroyable {
    private _czmClassificationPolygonPrimitive;
    constructor(sceneObject: GeoClassificationPolygon, czmViewer: ESCesiumViewer);
}
