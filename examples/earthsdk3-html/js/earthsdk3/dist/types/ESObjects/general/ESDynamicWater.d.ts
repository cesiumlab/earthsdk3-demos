import { ESJColor } from "../../ESJTypes";
import { UniteChanged } from "xbsj-base";
import { ESLocalPolygon } from "./ESLocalPolygon";
export declare class ESDynamicWater extends ESLocalPolygon {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        waterColor: ESJColor;
        frequency: number;
        waveVelocity: number;
        amplitude: number;
        specularIntensity: number;
        waterType: string;
        flowDirection: number;
        flowSpeed: number;
        allowPicking: boolean;
        points: import("xbsj-base").ReactiveVariable<[number, number][] | undefined>;
        pointed: boolean;
        pointStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJPointStyle>;
        stroked: boolean;
        strokeStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJStrokeStyle>;
        filled: boolean;
        fillStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJFillStyle>;
        position: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector3D>;
        rotation: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector3D>;
        scale: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector3D>;
        minVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        maxVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        show: boolean;
        collision: boolean;
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
    /**
     * @description 默认属性
     * baseWaterColor: [0.1497, 0.165, 0.0031, 1] 水的底色
     * frequency: 1000 频率：控制波数的数值,单位 次/千米
     * waveVelocity: 0.5 波动速率：控制水波纹扰动的速率
     * amplitude: 0.1 振幅：控制水波振幅的数值
     * specularIntensity: 0.8 镜面反射强度：控制镜面反射强度的数值
     * waterType:river 水域类型，当为custom是其他控制效果的参数生效，否则不生效，使用对应水域类型的预定效果
     * flowDirection: [0, 0, 0] 流动方向：控制水流方向，局部坐标方向
     * flowSpeed: 1 流动速度：控制水流速度，单位 米/秒
     */
    static defaults: {
        waterColor: ESJColor;
        frequency: number;
        waveVelocity: number;
        amplitude: number;
        specularIntensity: number;
        waterTypes: [name: string, value: string][];
        waterType: string;
        flowDirection: number;
        flowSpeed: number;
        points: import("../../ESJTypes").ESJVector2DArray;
        filled: boolean;
        pointStyle: import("../../ESJTypes").ESJPointStyle;
        strokeStyle: import("../../ESJTypes").ESJStrokeStyle;
        fillStyle: import("../../ESJTypes").ESJFillStyle;
        pointed: boolean;
        stroked: boolean;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("../../ESJTypes").ESJFlyToParam;
        flyInParam: import("../../ESJTypes").ESJFlyInParam;
    };
    constructor(id?: string);
    getESProperties(): {
        basic: import("../../ESJTypes").Property[];
        coordinate: import("../../ESJTypes").Property[];
        style: import("../../ESJTypes").Property[];
        defaultMenu: string;
        location: import("../../ESJTypes").Property[];
        general: import("../../ESJTypes").Property[];
        dataSource: import("../../ESJTypes").Property[];
    };
    getProperties(language?: string): import("../../ESJTypes").Property[];
}
export declare namespace ESDynamicWater {
    const createDefaultProps: () => {
        waterColor: ESJColor;
        frequency: number;
        waveVelocity: number;
        amplitude: number;
        specularIntensity: number;
        waterType: string;
        flowDirection: number;
        flowSpeed: number;
        allowPicking: boolean;
        points: import("xbsj-base").ReactiveVariable<[number, number][] | undefined>;
        pointed: boolean;
        pointStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJPointStyle>;
        stroked: boolean;
        strokeStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJStrokeStyle>;
        filled: boolean;
        fillStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJFillStyle>;
        position: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector3D>;
        rotation: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector3D>;
        scale: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector3D>;
        minVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        maxVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        show: boolean;
        collision: boolean;
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
export interface ESDynamicWater extends UniteChanged<ReturnType<typeof ESDynamicWater.createDefaultProps>> {
}
