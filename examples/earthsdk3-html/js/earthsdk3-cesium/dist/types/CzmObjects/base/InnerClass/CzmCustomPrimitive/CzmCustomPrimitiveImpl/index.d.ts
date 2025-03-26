import * as Cesium from 'cesium';
import { CzmBasePrimitive } from './CzmBasePrimitive';
import { ReactivePropsToNativePropsAndChanged, SceneObjectKey } from 'xbsj-base';
import { CzmAttributesType } from '../../../../../ESJTypesCzm';
export type BoundingVolumeType = Cesium.BoundingSphere | Cesium.BoundingRectangle | Cesium.OrientedBoundingBox;
export declare class CzmCustomPrimitiveImpl extends CzmBasePrimitive {
    private _scene;
    private _updateEvent;
    private _drawCommand?;
    get drawCommand(): Cesium.DrawCommand | undefined;
    private _ESSceneObjectID;
    get ESSceneObjectID(): SceneObjectKey;
    set ESSceneObjectID(value: SceneObjectKey);
    get ESSceneObjectIDChanged(): import("xbsj-base").Listener<[string, string]>;
    constructor(_scene: Cesium.Scene, id?: string);
    update(frameState: Cesium.FrameState): void;
}
export declare namespace CzmCustomPrimitiveImpl {
    const createDefaultProps: () => {
        modelMatrix: import("xbsj-base").ReactiveVariable<Cesium.Matrix4>;
        boundingVolume: BoundingVolumeType | undefined;
        pass: Cesium.Pass;
        attributes: CzmAttributesType;
        cull: boolean;
        occlude: boolean;
        count: number | undefined;
        offset: number;
        indexTypedArray: any;
        instanceCount: number;
        vertexShaderSource: string;
        fragmentShaderSource: string;
        castShadows: boolean;
        receiveShadows: boolean;
        uniformMap: Cesium.UniformMap;
        renderState: Cesium.RenderStateOptions;
        primitiveType: Cesium.PrimitiveType;
        executeInClosestFrustum: boolean;
        owner: Object | undefined;
        debugShowBoundingVolume: boolean;
        debugOverlappingFrustums: number;
        allowPicking: boolean | undefined;
        pickOnly: boolean;
        depthForTranslucentClassification: boolean;
    };
}
export interface CzmCustomPrimitiveImpl extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmCustomPrimitiveImpl.createDefaultProps>> {
}
