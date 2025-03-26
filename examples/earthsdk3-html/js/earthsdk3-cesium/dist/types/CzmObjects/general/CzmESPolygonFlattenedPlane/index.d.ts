import { ESPolygonFlattenedPlane, ESSceneObjectWithId } from "earthsdk3";
import { CzmESGeoVector } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { CzmPolygonFlattenedPlane } from "./CzmPolygonFlattenedPlane";
export * from './CzmFlattenedPlane';
export declare class CzmESPolygonFlattenedPlane<T extends ESPolygonFlattenedPlane = ESPolygonFlattenedPlane> extends CzmESGeoVector<T> {
    static readonly type: void;
    private _polygonFlattenedPlane;
    get polygonFlattenedPlane(): CzmPolygonFlattenedPlane;
    private _tilesSceneObjectWithId;
    get tilesSceneObjectWithId(): ESSceneObjectWithId<import("earthsdk3").ESSceneObject>;
    constructor(sceneObject: T, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
