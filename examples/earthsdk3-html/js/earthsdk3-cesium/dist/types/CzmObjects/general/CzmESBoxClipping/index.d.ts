import { ESBoxClipping, ESSceneObjectWithId } from "earthsdk3";
import { CzmESObjectWithLocation } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { CzmBoxClippingPlanes } from "./CzmBoxClippingPlanes";
export declare class CzmESBoxClipping extends CzmESObjectWithLocation<ESBoxClipping> {
    static readonly type: void;
    private _czmBoxClippingPlanes;
    get czmBoxClippingPlanes(): CzmBoxClippingPlanes;
    private _tilesSceneObjectWithId;
    get tilesSceneObjectWithId(): ESSceneObjectWithId<import("earthsdk3").ESSceneObject>;
    constructor(sceneObject: ESBoxClipping, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
