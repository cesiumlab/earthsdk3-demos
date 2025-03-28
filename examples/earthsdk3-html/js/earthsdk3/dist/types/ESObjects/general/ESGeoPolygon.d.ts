import { ESJFillStyle, ESJStrokeStyle } from "../../ESJTypes";
import { ESGeoVector } from "../base/ESGeoVector";
import { UniteChanged } from "xbsj-base";
export declare class ESGeoPolygon extends ESGeoVector {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        pointed: boolean;
        pointStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJPointStyle>;
        stroked: boolean;
        strokeStyle: import("xbsj-base").ReactiveVariable<ESJStrokeStyle>;
        filled: boolean;
        fillStyle: import("xbsj-base").ReactiveVariable<ESJFillStyle>;
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
    static supportEditingModes: string[];
    static defaults: {
        fillStyle: ESJFillStyle;
        strokeStyle: ESJStrokeStyle;
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
        coordinate: import("../../ESJTypes").Property[];
        defaultMenu: string;
        style: import("../../ESJTypes").Property[];
        general: import("../../ESJTypes").Property[];
        basic: import("../../ESJTypes").Property[];
        dataSource: import("../../ESJTypes").Property[];
        location: import("../../ESJTypes").Property[];
    };
    getProperties(language: string): import("../../ESJTypes").Property[];
}
export declare namespace ESGeoPolygon {
    const createDefaultProps: () => {
        pointed: boolean;
        pointStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJPointStyle>;
        stroked: boolean;
        strokeStyle: import("xbsj-base").ReactiveVariable<ESJStrokeStyle>;
        filled: boolean;
        fillStyle: import("xbsj-base").ReactiveVariable<ESJFillStyle>;
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
export interface ESGeoPolygon extends UniteChanged<ReturnType<typeof ESGeoPolygon.createDefaultProps>> {
}
