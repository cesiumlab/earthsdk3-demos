import * as Cesium from 'cesium';
import { Destroyable } from "xbsj-base";
/**
 * 取自EarthSDK1的同名代码Source\scene\CameraFlight\RotateGlobe.js，
 * 只是代码结构适配了EarthSDK2，代码原逻辑不变，代码原逻辑为康总所写
 */
export declare class InnerRotateGlobe extends Destroyable {
    private _viewer;
    get viewer(): Cesium.Viewer;
    /**
     * 相机高度
     * @type {number}
     * @instance
     * @default 10000000
     * @memberof RotateGlobe
     */
    height: number;
    /**
     * 飞行一圈的周期，单位为秒
     * @type {number}
     * @instance
     * @default 60
     * @memberof RotateGlobe
     */
    cycle: number;
    /**
     * 相机所在纬线高度 单位弧度
     * @type {number}
     * @instance
     * @default 北纬38°
     * @memberof RotateGlobe
     */
    latitude: number;
    private _running;
    private _sseh;
    get sseh(): Cesium.ScreenSpaceEventHandler;
    private _eventDisposer;
    constructor(_viewer: Cesium.Viewer);
    /**
     * 开始飞行 自动飞行为互斥状态，这个飞行开始后，cameraflight下其他自动飞行被取消
     */
    start(): void;
    /**
     * 取消飞行
     */
    cancel(): void;
}
