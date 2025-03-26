import * as Cesium from 'cesium';
import { NativePrimitive } from './NativePrimitive';
import { Destroyable } from 'xbsj-base';
export declare class ModelMatrixUpdating extends Destroyable {
    private _nativePrimitive;
    get nativePrimitive(): NativePrimitive;
    get czmCzmModelPrimitive(): import(".").CzmModelPrimitive;
    get sceneObject(): import(".").CzmModelPrimitive;
    get sceneScaleFromPixelSize(): import("xbsj-base").ReactiveVariable<number | undefined>;
    get viewer(): Cesium.Viewer;
    get finalShow(): boolean;
    get primitive(): Cesium.Model;
    constructor(_nativePrimitive: NativePrimitive);
}
