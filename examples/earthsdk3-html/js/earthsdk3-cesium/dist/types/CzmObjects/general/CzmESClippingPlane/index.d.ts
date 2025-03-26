import { ESClippingPlane, ESSceneObjectWithId } from "earthsdk3";
import { CzmESObjectWithLocation } from '../../../CzmObjects';
import { ESCesiumViewer } from '../../../ESCesiumViewer';
import { CzmPlane } from './CzmPlane';
export * from './CzmClippingPlanes';
export declare class CzmESClippingPlane extends CzmESObjectWithLocation<ESClippingPlane> {
    static readonly type: void;
    private _innerPositionReact;
    private _czmPlane;
    get czmPlane(): CzmPlane;
    private _tilesSceneObjectWithId;
    get tilesSceneObjectWithId(): ESSceneObjectWithId<import("earthsdk3").ESSceneObject>;
    constructor(sceneObject: ESClippingPlane, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
