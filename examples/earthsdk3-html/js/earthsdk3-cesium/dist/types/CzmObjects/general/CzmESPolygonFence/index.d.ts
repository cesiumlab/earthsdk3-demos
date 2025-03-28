import { ESGeoPolygon, ESJEditingBindModeType, ESPolygonFence } from "earthsdk3";
import { CzmESGeoVector } from "../../base";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { CzmPolygonFence } from "./CzmPolygonFence";
export declare class CzmESPolygonFence extends CzmESGeoVector<ESPolygonFence> {
    static readonly type: void;
    editingBindMode: ESJEditingBindModeType;
    private _czmPolygonFence;
    get czmPolygonFence(): CzmPolygonFence;
    private _czmPolygon;
    get czmPolygon(): ESGeoPolygon;
    constructor(sceneObject: ESPolygonFence, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    flyIn(duration: number | undefined, id: number): boolean;
}
