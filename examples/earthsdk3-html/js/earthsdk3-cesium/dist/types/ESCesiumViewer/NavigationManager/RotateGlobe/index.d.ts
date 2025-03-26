import { Destroyable } from "xbsj-base";
import { ESCesiumViewer } from '../../index';
import { InnerRotateGlobe } from "./InnerRotateGlobe";
export declare class RotateGlobe extends Destroyable {
    private _czmViewer;
    private _height;
    /**
     * 相机高度
     * @type {number}
     * @instance
     * @default 10000000
     * @memberof RotateGlobe
     */
    get height(): number;
    set height(value: number);
    get heightChanged(): import("xbsj-base").Listener<[number, number]>;
    private _cycle;
    /**
     * 飞行一圈的周期，单位为秒
     * @type {number}
     * @instance
     * @default 60
     * @memberof RotateGlobe
     */
    get cycle(): number;
    set cycle(value: number);
    get cycleChanged(): import("xbsj-base").Listener<[number, number]>;
    private _latitude;
    /**
     * 相机所在纬线高度 单位弧度
     * @type {number}
     * @instance
     * @default 北纬38°
     * @memberof RotateGlobe
     */
    get latitude(): number;
    set latitude(value: number);
    get latitudeChanged(): import("xbsj-base").Listener<[number, number]>;
    private _inner;
    get inner(): InnerRotateGlobe;
    start(): void;
    cancel(): void;
    constructor(_czmViewer: ESCesiumViewer);
}
