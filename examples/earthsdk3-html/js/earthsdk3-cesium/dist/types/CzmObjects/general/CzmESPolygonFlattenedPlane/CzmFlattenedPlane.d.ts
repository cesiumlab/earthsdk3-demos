import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
import * as Cesium from 'cesium';
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { Czm3DTilesCustomShaderInstanceClassType } from "../CzmES3DTileset";
import { ESJNativeNumber16, ESSceneObjectWithId } from "earthsdk3";
import { CzmPolylinesPrimitive } from "../../../CzmObjects";
export declare class CzmFlattenedPlane extends Destroyable {
    private _id;
    get id(): SceneObjectKey;
    set id(value: SceneObjectKey);
    get idChanged(): Listener<[string, string]>;
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    static defaults: {
        position: [number, number, number];
    };
    private _computedCustomShader;
    get computedCustomShader(): Czm3DTilesCustomShaderInstanceClassType | undefined;
    set computedCustomShader(value: Czm3DTilesCustomShaderInstanceClassType | undefined);
    get computedCustomShaderChanged(): Listener<[Czm3DTilesCustomShaderInstanceClassType | undefined, Czm3DTilesCustomShaderInstanceClassType | undefined]>;
    private _polylines;
    get polylines(): CzmPolylinesPrimitive;
    private _finalMatrix;
    get finalMatrix(): Cesium.Matrix4 | undefined;
    set finalMatrix(value: Cesium.Matrix4 | undefined);
    get finalMatrixChanged(): Listener<[Cesium.Matrix4 | undefined, Cesium.Matrix4 | undefined]>;
    private _czmTextureWithId;
    get czmTextureWithId(): ESSceneObjectWithId<import("earthsdk3").ESSceneObject>;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
}
export declare namespace CzmFlattenedPlane {
    const createDefaultProps: () => {
        enabled: boolean;
        showHelper: boolean;
        position: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        rotation: import("xbsj-base").ReactiveVariable<[number, number, number]>;
        modelMatrix: import("xbsj-base").ReactiveVariable<ESJNativeNumber16>;
        reverse: boolean;
        discard: import("xbsj-base").ReactiveVariable<[number, number]>;
        topColor: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        bottomColor: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        edgeColor: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        edgeWidth: number;
        minSize: import("xbsj-base").ReactiveVariable<[number, number]>;
        maxSize: import("xbsj-base").ReactiveVariable<[number, number]>;
        /**
         * @deprecated 该属性已弃用，请使用Czm3dTiles的czmFlattenedPlaneId属性！
        */
        sceneObjectIds: import("xbsj-base").ReactiveVariable<string[]>;
        czmTextureId: string;
    };
}
export interface CzmFlattenedPlane extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmFlattenedPlane.createDefaultProps>> {
}
