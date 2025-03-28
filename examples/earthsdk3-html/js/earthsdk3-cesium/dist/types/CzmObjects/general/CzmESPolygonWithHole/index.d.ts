import { ESPolygonWithHole } from "earthsdk3";
import { CzmESGeoPolygon } from "../CzmESGeoPolygon";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { CzmPolygonPrimitiveWithHeight } from "../../../CzmObjects";
export declare class CzmESPolygonWithHole extends CzmESGeoPolygon<ESPolygonWithHole> {
    static readonly type: void;
    private _czmPolygonPrimitive;
    get czmPolygonPrimitive(): CzmPolygonPrimitiveWithHeight;
    private _geoPolylines;
    constructor(sceneObject: ESPolygonWithHole, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    flyIn(duration: number | undefined, id: number): boolean;
}
