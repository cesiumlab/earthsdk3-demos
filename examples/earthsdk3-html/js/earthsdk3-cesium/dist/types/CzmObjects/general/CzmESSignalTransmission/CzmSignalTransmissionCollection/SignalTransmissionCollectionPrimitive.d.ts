import { Destroyable } from "xbsj-base";
import { CzmSignalTransmissionCollection } from ".";
import * as Cesium from 'cesium';
export declare class SignalTransmissionCollectionPrimitive extends Destroyable {
    private _viewer;
    private _nativePrimitive?;
    get nativePrimitive(): Cesium.Primitive | undefined;
    constructor(_viewer: Cesium.Viewer, sceneObject: CzmSignalTransmissionCollection, getTextureFunc?: () => Cesium.Texture);
}
