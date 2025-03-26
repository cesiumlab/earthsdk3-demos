import * as Cesium from 'cesium';
import { ESVisualObject } from "earthsdk3";
import { CzmCustomPrimitive, CzmModelPrimitive } from '../../CzmObjects';
import { ESCesiumViewer } from '../../ESCesiumViewer';
export declare const defaultFlyToRotation: [number, number, number];
export type CzmFlyToOptions = {
    position?: [number, number, number];
    viewDistance?: number;
    rotation?: [number, number, number];
    duration?: number;
    hdelta?: number;
    pdelta?: number;
    cancelCallback?: () => void;
};
/**
 *
 * @param czmCamera Cesium.Camera
 * @param options options.duration的单位是毫秒！
 * @returns
 */
export declare function czmFlyTo(czmCamera: Cesium.Camera, options: CzmFlyToOptions): Promise<boolean> | undefined;
/**
 *
 * @param czmCamera cesium的Camera
 * @param position 目标位置, 形式如：[经度, 纬度, 高度] 其中经纬度的单位是弧度，高度的单位是米。
 * @param viewDistance 距离目标多远距离时停下，默认为0，即直接飞到目标点处，单位是米。
 * @param rotation 相机飞入后的姿态控制，从什么角度观察目标，形式如: [偏航角, 俯仰角, 翻转角], 单位是弧度。
 * @param duration 飞行持续时间，如果是0，则直接跳转，单位是秒。
 * @returns
 *
 * @example
 * // 示例1
 * // 相机直接飞入北京(116.39, 39.9)的位置，高度100米。相机位于目标点上。
 * flyTo(camera, [116.39, 39.9, 100]);
 *
 * // 示例2
 * // 相机直接飞向北京(116.39, 39.9)的位置，高度100米的目标，再距离目标点1000米的距离停下来，此时目标点刚好位置屏幕中心位置。
 * flyTo(camera, [116.39, 39.9, 100], 1000);
 *
 * // 示例3
 * // 相机直接飞向北京(116.39, 39.9)的位置，高度100米的目标，再距离目标点1000米的距离停下来，此时目标点刚好位置屏幕中心位置。
 * // 同时相机的方向是正东向，向下倾斜30度。
 * // 相机方向是这样的 朝北是0度，朝东是90度，朝南是180度，朝西是270度。抬头看天的俯仰角是90度，俯视地面是-90度。
 * flyTo(camera, [116.39, 39.9, 100], 1000, [90, -30, 0]);
 *
 */
export declare function flyTo(viewer: Cesium.Viewer | undefined, position?: [number, number, number], viewDistance?: number, rotation?: [number, number, number], duration?: number, cancelCallback?: () => void): Promise<boolean> | undefined;
export declare function flyWithPosition(czmViewer: ESCesiumViewer, sceneObject: ESVisualObject, id: number, position: [number, number, number], radius: number, duration: number | undefined, useSceneObjectHeading?: boolean): Promise<boolean | undefined>;
export declare function flyWithPositions(czmViewer: ESCesiumViewer, sceneObject: ESVisualObject, id: number, positions: [number, number, number][], duration: number | undefined, useSceneObjectHeading?: boolean): Promise<boolean>;
export declare function flyWithPrimitive(czmViewer: ESCesiumViewer, sceneObject: ESVisualObject, id: number, duration: number | undefined, czmPrimitive: CzmCustomPrimitive | CzmModelPrimitive, useSceneObjectHeading?: boolean): Promise<boolean>;
export declare function getCenterAndViewDistance(czmViewer: ESCesiumViewer, boundingVolume: Cesium.BoundingSphere | Cesium.BoundingRectangle | Cesium.OrientedBoundingBox): [center: [number, number, number], viewDistance: number] | undefined;
