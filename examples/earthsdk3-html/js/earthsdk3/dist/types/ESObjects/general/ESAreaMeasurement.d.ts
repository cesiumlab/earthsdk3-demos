import { JsonValue, UniteChanged } from "xbsj-base";
import { ESGeoPolygon } from "./ESGeoPolygon";
import { ESJFillStyle } from "../../ESJTypes";
/**
 * https://www.wolai.com/earthsdk/owzYtkDnctKcA9CCiYAX2i
 */
export declare class ESAreaMeasurement extends ESGeoPolygon {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        stroked: boolean;
        filled: boolean;
        pointed: boolean;
        pointStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJPointStyle>;
        strokeStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJStrokeStyle>;
        fillStyle: import("xbsj-base").ReactiveVariable<ESJFillStyle>;
        points: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJFlyToParam | undefined>;
        flyInParam: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJFlyInParam | undefined>;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
    get fillMaterial(): string;
    set fillMaterial(value: string);
    get fillMaterialParams(): JsonValue | undefined;
    set fillMaterialParams(value: JsonValue | undefined);
    static defaults: {
        fillStyle: ESJFillStyle;
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
    getProperties(language: string): import("../../ESJTypes").Property[];
}
export declare namespace ESAreaMeasurement {
    const createDefaultProps: () => {
        stroked: boolean;
        filled: boolean;
        pointed: boolean;
        pointStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJPointStyle>;
        strokeStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJStrokeStyle>;
        fillStyle: import("xbsj-base").ReactiveVariable<ESJFillStyle>;
        points: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJFlyToParam | undefined>;
        flyInParam: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJFlyInParam | undefined>;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
}
export interface ESAreaMeasurement extends UniteChanged<ReturnType<typeof ESAreaMeasurement.createDefaultProps>> {
}
