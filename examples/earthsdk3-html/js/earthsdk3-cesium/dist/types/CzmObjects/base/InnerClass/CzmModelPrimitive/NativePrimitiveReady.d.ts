import * as Cesium from 'cesium';
import { NativePrimitive } from './NativePrimitive';
import { Destroyable } from 'xbsj-base';
export declare class NativePrimitiveReady extends Destroyable {
    private _owner;
    get owner(): NativePrimitive;
    updateNodeMatrix(primitive: Cesium.Model): void;
    constructor(_owner: NativePrimitive);
    update(): void;
}
