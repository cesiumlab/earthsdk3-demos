import { ESLocalPolygon, ESLocalPolygonZ } from "earthsdk3";
import { CzmESLocalVector } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare class CzmESLocalPolygon<T extends ESLocalPolygon = ESLocalPolygon> extends CzmESLocalVector<T> {
    static readonly type: void;
    private _czmESLocalPolygon;
    get czmESLocalPolygon(): ESLocalPolygonZ;
    constructor(sceneObject: T, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
