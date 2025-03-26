import { UniteChanged } from "xbsj-base";
import { ESGeoVector } from "../base";
/**
 * https://www.wolai.com/earthsdk/37rp47JvTtZqEJESf5AuQu
 */
export declare class ESDirectionMeasurement extends ESGeoVector {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        pointed: boolean;
        pointStyle: import("xbsj-base").ReactiveVariable<import("../..").ESJPointStyle>;
        stroked: boolean;
        strokeStyle: import("xbsj-base").ReactiveVariable<import("../..").ESJStrokeStyle>;
        filled: boolean;
        fillStyle: import("xbsj-base").ReactiveVariable<import("../..").ESJFillStyle>;
        points: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<import("../..").ESJFlyToParam | undefined>;
        flyInParam: import("xbsj-base").ReactiveVariable<import("../..").ESJFlyInParam | undefined>;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
    get strokeWidth(): number;
    set strokeWidth(value: number);
    constructor(id?: string);
    static defaults: {
        points: import("../..").ESJVector3DArray;
        pointStyle: import("../..").ESJPointStyle;
        strokeStyle: import("../..").ESJStrokeStyle;
        fillStyle: import("../..").ESJFillStyle;
        pointed: boolean;
        stroked: boolean;
        filled: boolean;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("../..").ESJFlyToParam;
        flyInParam: import("../..").ESJFlyInParam;
    };
    getProperties(language?: string): import("../..").Property[];
}
export declare namespace ESDirectionMeasurement {
    const createDefaultProps: () => {
        pointed: boolean;
        pointStyle: import("xbsj-base").ReactiveVariable<import("../..").ESJPointStyle>;
        stroked: boolean;
        strokeStyle: import("xbsj-base").ReactiveVariable<import("../..").ESJStrokeStyle>;
        filled: boolean;
        fillStyle: import("xbsj-base").ReactiveVariable<import("../..").ESJFillStyle>;
        points: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<import("../..").ESJFlyToParam | undefined>;
        flyInParam: import("xbsj-base").ReactiveVariable<import("../..").ESJFlyInParam | undefined>;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
}
export interface ESDirectionMeasurement extends UniteChanged<ReturnType<typeof ESDirectionMeasurement.createDefaultProps>> {
}
