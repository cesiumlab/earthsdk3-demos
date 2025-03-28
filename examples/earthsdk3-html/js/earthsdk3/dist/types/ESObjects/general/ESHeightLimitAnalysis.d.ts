import { ESClassification } from "./ESClassification";
import { ESGeoExtrudedPolygon } from "./ESGeoExtrudedPolygon";
import { ESGeoPolygon } from "./ESGeoPolygon";
import { UniteChanged, JsonValue } from "xbsj-base";
import { ColorProperty, EnumProperty, BooleanProperty, GroupProperty, NumberProperty } from "../../ESJTypes";
/**
 * https://c0yh9tnn0na.feishu.cn/docx/CKSfdDcwtoVPCtxgolkclEYZn9c
 */
export declare class ESHeightLimitAnalysis extends ESGeoPolygon {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        pointed: boolean;
        pointStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJPointStyle>;
        stroked: boolean;
        strokeStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJStrokeStyle>;
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
        extras: import("xbsj-base").ReactiveVariable<JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
        height: number;
        maxHeight: number;
        overheightColor: number[];
        standardColor: number[];
    };
    get json(): JsonValue;
    set json(value: JsonValue);
    static supportEditingModes: string[];
    private _classification;
    get classification(): ESClassification;
    private _geoExtrudedPolygon;
    get geoExtrudedPolygon(): ESGeoExtrudedPolygon;
    getESProperties(): {
        defaultMenu: string;
        basic: import("../../ESJTypes").Property[];
        style: (GroupProperty | NumberProperty | BooleanProperty | EnumProperty<string> | ColorProperty)[];
        coordinate: import("../../ESJTypes").Property[];
        general: import("../../ESJTypes").Property[];
        dataSource: import("../../ESJTypes").Property[];
        location: import("../../ESJTypes").Property[];
    };
    getProperties(language: string): import("../../ESJTypes").Property[];
    constructor(id?: string);
}
export declare namespace ESHeightLimitAnalysis {
    const createDefaultProps: () => {
        pointed: boolean;
        pointStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJPointStyle>;
        stroked: boolean;
        strokeStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJStrokeStyle>;
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
        extras: import("xbsj-base").ReactiveVariable<JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
        height: number;
        maxHeight: number;
        overheightColor: number[];
        standardColor: number[];
    };
}
export interface ESHeightLimitAnalysis extends UniteChanged<ReturnType<typeof ESHeightLimitAnalysis.createDefaultProps>> {
}
