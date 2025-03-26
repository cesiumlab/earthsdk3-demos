import * as Cesium from 'cesium';
import { Destroyable, Event } from 'xbsj-base';
/**
 * 获取相机偏移后的位置
 * @param position
 * @param rotation
 * @param viewDistance
 * @param result
 * @returns
 */
export declare function getCameraTargetPos(position: [number, number, number], rotation: [number, number, number], viewDistance: number, result?: [number, number, number]): [number, number, number] | undefined;
/**
 * 获取相机位置
 * @param camera
 * @param result
 * @returns
 */
export declare function getCameraPosition(camera: Cesium.Camera, result?: [number, number, number]): [number, number, number];
/**
 * 获取相机旋转
 * @param camera
 * @param result
 * @returns
 */
export declare function getCameraRotation(camera: Cesium.Camera, result?: [number, number, number]): [number, number, number];
export declare class CzmCameraChanged extends Destroyable {
    private _scene;
    _originViewMatrix: Cesium.Matrix4;
    _originProjMatrix: Cesium.Matrix4;
    _changed: Event;
    constructor(_scene: Cesium.Scene);
    _update(): void;
    get changed(): Event<[]>;
}
