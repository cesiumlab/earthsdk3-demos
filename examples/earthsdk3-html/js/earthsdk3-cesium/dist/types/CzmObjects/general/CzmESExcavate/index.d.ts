import { ESExcavate, ESSceneObject, ESSceneObjectWithId } from "earthsdk3";
import { CzmESGeoPolygon } from "../CzmESGeoPolygon";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { CzmPolygonClipping } from "./CzmPolygonClipping";
export * from './CzmPolygonClipping';
export declare class CzmESExcavate extends CzmESGeoPolygon<ESExcavate> {
    static readonly type: void;
    private _czmPolygonClipping;
    get czmPolygonClipping(): CzmPolygonClipping;
    private _tilesSceneObjectWithId;
    get tilesSceneObjectWithId(): ESSceneObjectWithId<ESSceneObject>;
    constructor(sceneObject: ESExcavate, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
