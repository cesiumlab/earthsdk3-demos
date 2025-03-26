import * as Cesium from 'cesium';
import { NativePrimitiveCreating } from './NativePrimitiveCreating';
import { NativePrimitiveReady } from './NativePrimitiveReady';
import { Destroyable } from 'xbsj-base';
import { PickingManager } from '../../../../ESCesiumViewer';
export declare class NativePrimitive extends Destroyable {
    private _gltf;
    private _primitive;
    private _owner;
    get owner(): NativePrimitiveCreating;
    get czmCzmModelPrimitive(): import(".").CzmModelPrimitive;
    get czmViewer(): import("../../../../ESCesiumViewer").ESCesiumViewer;
    get viewer(): Cesium.Viewer;
    get scene(): Cesium.Scene;
    get primitive(): Cesium.Model;
    get sceneObject(): import(".").CzmModelPrimitive;
    get gltf(): any;
    get pickingManager(): PickingManager;
    private _modelMatrixUpdating;
    private _nativePrimitiveReady?;
    get nativePrimitiveReady(): NativePrimitiveReady | undefined;
    update(): void;
    constructor(_gltf: any, _primitive: Cesium.Model, _owner: NativePrimitiveCreating);
}
