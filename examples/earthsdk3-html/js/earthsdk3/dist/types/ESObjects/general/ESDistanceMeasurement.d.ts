import { ESJColor, ESJStrokeStyle } from "../../ESJTypes";
import { ESGeoLineString } from "./ESGeoLineString";
import { UniteChanged } from "xbsj-base";
/**
 * https://www.wolai.com/earthsdk/wxeuk8gv9v4PzHBZ6pURww
 */
export declare class ESDistanceMeasurement extends ESGeoLineString {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        strokeStyle: import("xbsj-base").ReactiveVariable<ESJStrokeStyle>;
        stroked: boolean;
        pointed: boolean;
        pointStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJPointStyle>;
        filled: boolean;
        fillStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJFillStyle>;
        points: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
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
    get strokeColor(): ESJColor;
    set strokeColor(value: ESJColor);
    static defaults: {
        strokeStyle: ESJStrokeStyle;
        stroked: boolean;
        points: import("../../ESJTypes").ESJVector3DArray;
        pointStyle: import("../../ESJTypes").ESJPointStyle;
        fillStyle: import("../../ESJTypes").ESJFillStyle;
        pointed: boolean;
        filled: boolean;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("../../ESJTypes").ESJFlyToParam;
        flyInParam: import("../../ESJTypes").ESJFlyInParam;
    };
    constructor(id?: string);
    getProperties(language?: string): import("../../ESJTypes").Property[];
}
export declare namespace ESDistanceMeasurement {
    const createDefaultProps: () => {
        strokeStyle: import("xbsj-base").ReactiveVariable<ESJStrokeStyle>;
        stroked: boolean;
        pointed: boolean;
        pointStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJPointStyle>;
        filled: boolean;
        fillStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJFillStyle>;
        points: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
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
export interface ESDistanceMeasurement extends UniteChanged<ReturnType<typeof ESDistanceMeasurement.createDefaultProps>> {
}
