import { UniteChanged } from "xbsj-base";
import { ESGeoVector } from "../base";
import { BooleanProperty, ColorProperty, EnumProperty, ESJStrokeStyle, GroupProperty, NumberProperty } from "../../ESJTypes";
/**
 * https://www.wolai.com/earthsdk/wAn2bN9HA2mo8uw56dPa76
 */
export declare class ESGeoLineString extends ESGeoVector {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        stroked: boolean;
        strokeStyle: import("xbsj-base").ReactiveVariable<ESJStrokeStyle>;
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
    private _distance;
    get distance(): number;
    get distanceChanged(): import("xbsj-base").Listener<[number, number]>;
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
    getESProperties(): {
        coordinate: import("../../ESJTypes").Property[];
        style: (GroupProperty | NumberProperty | BooleanProperty | EnumProperty<string> | ColorProperty)[];
        defaultMenu: string;
        general: import("../../ESJTypes").Property[];
        basic: import("../../ESJTypes").Property[];
        dataSource: import("../../ESJTypes").Property[];
        location: import("../../ESJTypes").Property[];
    };
    getProperties(language?: string): import("../../ESJTypes").Property[];
    constructor(id?: string);
}
export declare namespace ESGeoLineString {
    const createDefaultProps: () => {
        stroked: boolean;
        strokeStyle: import("xbsj-base").ReactiveVariable<ESJStrokeStyle>;
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
export interface ESGeoLineString extends UniteChanged<ReturnType<typeof ESGeoLineString.createDefaultProps>> {
}
