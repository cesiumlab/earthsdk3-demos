import { ESJVector3D } from "../../ESJTypes";
import { Event, Listener, UniteChanged } from "xbsj-base";
import { ESVisualObject } from "./ESVisualObject";
export declare abstract class ESObjectWithLocation extends ESVisualObject {
    private _statusDis;
    get statusDis(): boolean;
    get statusDisChanged(): Listener<[boolean, boolean]>;
    private _smoothMoveEvent;
    get smoothMoveEvent(): Event<[ESJVector3D, number]>;
    /**
     * 平滑移动到指定位置
     * @param Destination - 目标位置，格式为[经度, 纬度, 高度]
     * @param Time - 平滑移动所需的时间，单位为秒
     */
    smoothMove(Destination: ESJVector3D, Time: number): void;
    private _smoothMoveWithRotationEvent;
    get smoothMoveWithRotationEvent(): Event<[ESJVector3D, ESJVector3D, number]>;
    /**
     * 平滑偏移到指定位置和姿态
     * @param destination - 目标位置，格式为[经度, 纬度, 高度]
     * @param newRotation - 目标姿态，格式为[偏航角, 俯仰角, 翻转角]
     * @param time - 平滑移动所需的时间，单位为秒
     */
    smoothMoveWithRotation(Destination: ESJVector3D, NewRotation: ESJVector3D, Time: number): void;
    private _smoothMoveOnGroundEvent;
    get smoothMoveOnGroundEvent(): Event<[number, number, number, string]>;
    /**
     * 贴地平滑移动
     * @param Lon - 目标位置的经度
     * @param Lat - 目标位置的纬度
     * @param Time - 平滑移动所需的时间，单位为秒
     * @param Ground - 地面类型，ue特有属性
     */
    smoothMoveOnGround(Lon: number, Lat: number, Time: number, Ground: string): void;
    private _smoothMoveWithRotationOnGroundEvent;
    get smoothMoveWithRotationOnGroundEvent(): Event<[ESJVector3D, number, number, number, string]>;
    /**
     * 贴地平滑偏移到指定位置和姿态
     * @param newRotation - 目标姿态，格式为[偏航角, 俯仰角, 翻转角]
     * @param lon - 目标位置的经度
     * @param lat - 目标位置的纬度
     * @param time - 平滑移动所需的时间，单位为秒
     * @param ground - 地面类型，ue特有属性
     */
    smoothMoveWithRotationOnGround(NewRotation: ESJVector3D, Lon: number, Lat: number, Time: number, Ground: string): void;
    private _automaticLandingEvent;
    get automaticLandingEvent(): Listener<[flag: boolean]>;
    /**
     * 自动落地
     */
    automaticLanding(): void;
    private _smoothMoveKeepPitchEvent;
    get smoothMoveKeepPitchEvent(): Event<[ESJVector3D, number]>;
    smoothMoveKeepPitch(Destination: ESJVector3D, Time: number): void;
    private _smoothMoveRelativelyEvent;
    get smoothMoveRelativelyEvent(): Event<[ESJVector3D, number]>;
    smoothMoveRelatively(RelativePosition: ESJVector3D, Time: number): void;
    private _smoothMoveRelativelyWithRotationEvent;
    get smoothMoveRelativelyWithRotationEvent(): Event<[ESJVector3D, ESJVector3D, number]>;
    smoothMoveRelativelyWithRotation(RelativePosition: ESJVector3D, NewRotation: ESJVector3D, Time: number): void;
    private _editing;
    get editing(): boolean;
    set editing(value: boolean);
    get editingChanged(): Listener<[boolean, boolean]>;
    static defaults: {
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("../../ESJTypes").ESJFlyToParam;
        flyInParam: import("../../ESJTypes").ESJFlyInParam;
    };
    /**
   * 是否使用ESObjectWithLocation类中的calcFlyToParam
   */
    useCalcFlyToParamInESObjectWithLocation: boolean;
    getESProperties(): {
        defaultMenu: string;
        location: import("../../ESJTypes").Property[];
        general: import("../../ESJTypes").Property[];
        basic: import("../../ESJTypes").Property[];
        dataSource: import("../../ESJTypes").Property[];
        coordinate: import("../../ESJTypes").Property[];
        style: import("../../ESJTypes").Property[];
    };
    getProperties(language?: string): import("../../ESJTypes").Property[];
}
export declare namespace ESObjectWithLocation {
    const createDefaultProps: () => {
        position: import("xbsj-base").ReactiveVariable<ESJVector3D>;
        rotation: import("xbsj-base").ReactiveVariable<ESJVector3D>;
        scale: import("xbsj-base").ReactiveVariable<ESJVector3D>;
        minVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        maxVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJFlyToParam | undefined>;
        flyInParam: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJFlyInParam | undefined>;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
}
export interface ESObjectWithLocation extends UniteChanged<ReturnType<typeof ESObjectWithLocation.createDefaultProps>> {
}
