import * as Cesium from 'cesium';
import { Destroyable } from "xbsj-base";
/**
 * 环绕中心点飞行
 * @class
 * @extends Destroyable
 */
declare class InnerRotatePoint extends Destroyable {
    private _viewer;
    get viewer(): Cesium.Viewer;
    /**
     * 要环绕的点,经纬度
     * @type {[number, number, number]}
     * @instance
     * @default undefined 即屏幕中心,
     * @memberof RotatePoint
     */
    private _position;
    get position(): [number, number, number] | undefined;
    set position(value: [number, number, number] | undefined);
    get positionChanged(): import("xbsj-base").Listener<[[number, number, number] | undefined, [number, number, number] | undefined]>;
    /**
     * 距离中心点距离
     * @type {number}
     * @instance
     * @default 50000
     * @memberof RotatePoint
     */
    private _distance;
    get distance(): number;
    set distance(value: number);
    get distanceChanged(): import("xbsj-base").Listener<[number, number]>;
    /**
     * 飞行一圈的周期，单位为秒
     * @type {number}
     * @instance
     * @default 60
     * @memberof RotatePoint
     */
    private _cycle;
    get cycle(): number;
    set cycle(value: number);
    get cycleChanged(): import("xbsj-base").Listener<[number, number]>;
    /**
     * 相对中心点的偏航角 单位度
     * @type {number}
     * @instance
     * @default 0
     * @memberof RotatePoint
     */
    private _heading;
    get heading(): number;
    set heading(value: number);
    get headingChanged(): import("xbsj-base").Listener<[number, number]>;
    /**
     * 相对中心点的俯仰角 单位度
     * @type {number}
     * @instance
     * @default -30
     * @memberof RotatePoint
     */
    private _pitch;
    get pitch(): number;
    set pitch(value: number);
    get pitchChanged(): import("xbsj-base").Listener<[number, number]>;
    private _transform;
    private _headingRadius;
    private _pitchRadius;
    private _running;
    private _sseh;
    get sseh(): Cesium.ScreenSpaceEventHandler;
    private _eventDisposer;
    constructor(_viewer: Cesium.Viewer);
    /**
     * 开始飞行
     */
    start(): void;
    /**
     * 取消飞行
     */
    cancel(): void;
}
export { InnerRotatePoint };
