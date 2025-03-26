import { Destroyable } from "xbsj-base";
import { ESCesiumViewer } from "../../index";
import { InnerRotatePoint } from "./InnerRotatePoint";
export declare class RotatePoint extends Destroyable {
    private _czmViewer;
    /**
     * 要环绕的点
     * @type {[number,number,number]|undefined}
     * @instance
     * @default undefined
     * @memberof RotatePoint
     */
    private _position;
    get position(): [number, number, number] | undefined;
    set position(value: [number, number, number] | undefined);
    get positionChanged(): import("xbsj-base").Listener<[[number, number, number] | undefined, [number, number, number] | undefined]>;
    /**
     * 相机距离点的距离
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
     * 相机偏航角
     * @type {number}
     * @instance
     * @default 0°
     * @memberof RotatePoint
     */
    private _heading;
    get heading(): number;
    set heading(value: number);
    get headingChanged(): import("xbsj-base").Listener<[number, number]>;
    /**
     * 相机俯仰角
     * @type {number}
     * @instance
     * @default -30°
     * @memberof RotatePoint
     */
    private _pitch;
    get pitch(): number;
    set pitch(value: number);
    get pitchChanged(): import("xbsj-base").Listener<[number, number]>;
    private _inner;
    get inner(): InnerRotatePoint;
    start(): void;
    cancel(): void;
    constructor(_czmViewer: ESCesiumViewer);
}
