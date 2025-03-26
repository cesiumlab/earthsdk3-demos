import { ESLocalPolygonZ } from "earthsdk3";
import { CzmESGeoPolygonImpl, CzmESLocalVector } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare class CzmESLocalPolygonZ extends CzmESLocalVector<ESLocalPolygonZ> {
    static readonly type: void;
    private _czmGeoPolygon;
    get czmGeoPolygon(): CzmESGeoPolygonImpl;
    constructor(sceneObject: ESLocalPolygonZ, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
