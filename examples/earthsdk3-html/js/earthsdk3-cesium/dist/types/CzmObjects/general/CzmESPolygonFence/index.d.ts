import { ESGeoPolygon, ESPolygonFence } from "earthsdk3";
import { CzmESVisualObject } from "../../base";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { CzmPolygonFence } from "./CzmPolygonFence";
export declare class CzmESPolygonFence extends CzmESVisualObject<ESPolygonFence> {
    static readonly type: void;
    private _czmPolygonFence;
    get czmPolygonFence(): CzmPolygonFence;
    private _czmPolygon;
    get czmPolygon(): ESGeoPolygon;
    constructor(sceneObject: ESPolygonFence, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    flyIn(duration: number | undefined, id: number): boolean;
}
