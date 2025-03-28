import { ESJColor } from "../../ESJTypes";
import { UniteChanged } from "xbsj-base";
import { ESGeoPolygon } from "./ESGeoPolygon";
/**
 * https://www.wolai.com/earthsdk/jRv9H5BbPGUaJ8MwxPf5oF
 */
export declare class ESGeoWater extends ESGeoPolygon {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        waterImage: import("xbsj-base").ReactiveVariable<{
            [xx: string]: any;
        } | undefined>;
        waterColor: ESJColor;
        frequency: number;
        waveVelocity: number;
        amplitude: number;
        specularIntensity: number;
        waterType: "river" | "ocean" | "lake" | "custom";
        flowDirection: number;
        flowSpeed: number;
        allowPicking: boolean;
        pointed: boolean;
        pointStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJPointStyle>;
        stroked: boolean;
        strokeStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJStrokeStyle>;
        filled: boolean;
        fillStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJFillStyle>;
        points: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
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
     * flowDirection: 0 流动方向：控制水流方向，局部坐标方向
     * flowSpeed: 0 流动速度：控制水流速度，单位 米/秒
     */
    static defaults: {
        waterColor: ESJColor;
        frequency: number;
        waveVelocity: number;
        amplitude: number;
        specularIntensity: number;
        waterTypes: [name: string, value: string][];
        waterType: "river" | "ocean" | "lake" | "custom";
        flowDirection: number;
        flowSpeed: number;
        waterImage: undefined;
        fillStyle: import("../../ESJTypes").ESJFillStyle;
        strokeStyle: import("../../ESJTypes").ESJStrokeStyle;
        filled: boolean;
        stroked: boolean;
        collision: boolean;
        points: import("../../ESJTypes").ESJVector3DArray;
        pointStyle: import("../../ESJTypes").ESJPointStyle;
        pointed: boolean;
        show: boolean;
        allowPicking: boolean;
        flyToParam: import("../../ESJTypes").ESJFlyToParam;
        flyInParam: import("../../ESJTypes").ESJFlyInParam;
    };
    constructor(id?: string);
    getESProperties(): {
        defaultMenu: string;
        basic: import("../../ESJTypes").Property[];
        coordinate: import("../../ESJTypes").Property[];
        style: import("../../ESJTypes").Property[];
        general: import("../../ESJTypes").Property[];
        dataSource: import("../../ESJTypes").Property[];
        location: import("../../ESJTypes").Property[];
    };
    getProperties(language: string): import("../../ESJTypes").Property[];
}
export declare namespace ESGeoWater {
    const createDefaultProps: () => {
        waterImage: import("xbsj-base").ReactiveVariable<{
            [xx: string]: any;
        } | undefined>;
        waterColor: ESJColor;
        frequency: number;
        waveVelocity: number;
        amplitude: number;
        specularIntensity: number;
        waterType: "river" | "ocean" | "lake" | "custom";
        flowDirection: number;
        flowSpeed: number;
        allowPicking: boolean;
        pointed: boolean;
        pointStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJPointStyle>;
        stroked: boolean;
        strokeStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJStrokeStyle>;
        filled: boolean;
        fillStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJFillStyle>;
        points: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
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
export interface ESGeoWater extends UniteChanged<ReturnType<typeof ESGeoWater.createDefaultProps>> {
}
