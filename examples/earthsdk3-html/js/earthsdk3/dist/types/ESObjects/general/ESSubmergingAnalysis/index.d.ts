import { ESJColor, Property } from "../../../ESJTypes";
import { ESObjectWithLocation } from "../../base";
import { ReactivePropsToNativePropsAndChanged, SceneObjectKey, Event } from "xbsj-base";
/**
 * 淹没分析
 * https://www.wolai.com/earthsdk/mZGssfGULnZsZuP7wEqno7
 */
export declare class ESSubmergingAnalysis extends ESObjectWithLocation {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        url: string;
        currentTime: number;
        materialParams: import("xbsj-base").ReactiveVariable<{
            [xx: string]: any;
        }>;
        waterColor: ESJColor;
        frequency: number;
        waveVelocity: number;
        amplitude: number;
        specularIntensity: number;
        waterType: string;
        flowSpeed: number;
        allowPicking: boolean;
        position: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJVector3D>;
        rotation: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJVector3D>;
        scale: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJVector3D>;
        minVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        maxVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        show: boolean;
        collision: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJFlyToParam | undefined>;
        flyInParam: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJFlyInParam | undefined>;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
    private _submergingData;
    get getSubmergingData(): any;
    private _allMoments;
    getAllMoments(): number[];
    readyEvent: Event<[]>;
    /**
     * @description 默认属性
     * baseWaterColor: [0.1497, 0.165, 0.0031, 1] 水的底色
     * frequency: 1000 频率：控制波数的数值,单位 次/千米
     * waveVelocity: 0.5 波动速率：控制水波纹扰动的速率
     * amplitude: 0.1 振幅：控制水波振幅的数值
     * specularIntensity: 0.8 镜面反射强度：控制镜面反射强度的数值
     * waterType:river 水域类型，当为custom是其他控制效果的参数生效，否则不生效，使用对应水域类型的预定效果
     * flowSpeed: 0 流动速度：控制水流速度，单位 米/秒
     */
    static defaults: {
        url: string;
        currentTime: number;
        materialParams: {};
        waterColor: ESJColor;
        frequency: number;
        waveVelocity: number;
        amplitude: number;
        specularIntensity: number;
        waterTypes: [name: string, value: string][];
        waterType: string;
        flowSpeed: number;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("../../../ESJTypes").ESJFlyToParam;
        flyInParam: import("../../../ESJTypes").ESJFlyInParam;
    };
    constructor(id?: SceneObjectKey);
    getESProperties(): {
        basic: Property[];
        defaultMenu: string;
        location: Property[];
        general: Property[];
        dataSource: Property[];
        coordinate: Property[];
        style: Property[];
    };
    getProperties(language?: string): Property[];
}
export declare namespace ESSubmergingAnalysis {
    const createDefaultProps: () => {
        url: string;
        currentTime: number;
        materialParams: import("xbsj-base").ReactiveVariable<{
            [xx: string]: any;
        }>;
        waterColor: ESJColor;
        frequency: number;
        waveVelocity: number;
        amplitude: number;
        specularIntensity: number;
        waterType: string;
        flowSpeed: number;
        allowPicking: boolean;
        position: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJVector3D>;
        rotation: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJVector3D>;
        scale: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJVector3D>;
        minVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        maxVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        show: boolean;
        collision: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJFlyToParam | undefined>;
        flyInParam: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJFlyInParam | undefined>;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
}
export interface ESSubmergingAnalysis extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof ESSubmergingAnalysis.createDefaultProps>> {
}
