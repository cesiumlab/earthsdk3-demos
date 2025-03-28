import { ESJVector4D } from "../../ESJTypes";
import { UniteChanged } from "xbsj-base";
import { ESGeoVector } from "../base";
export declare class ESRectangle extends ESGeoVector {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        ground: boolean;
        outlineTranslucent: boolean;
        height: number;
        extrudedHeight: number;
        rectangle: import("xbsj-base").ReactiveVariable<ESJVector4D | undefined>;
        rotation: number;
        stRotation: number;
        pointEditing: boolean;
        filled: boolean;
        pointed: boolean;
        pointStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJPointStyle>;
        stroked: boolean;
        strokeStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJStrokeStyle>;
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
    _deprecated: string[];
    private _deprecatedWarningFunc;
    constructor(id?: string);
    static supportEditingModes: string[];
    static defaults: {
        ground: boolean;
        outlineTranslucent: boolean;
        height: number;
        extrudedHeight: number;
        rectangle: undefined;
        stRotation: number;
        rotation: number;
        pointEditing: boolean;
        allowPicking: boolean;
        points: import("../../ESJTypes").ESJVector3DArray;
        pointStyle: import("../../ESJTypes").ESJPointStyle;
        strokeStyle: import("../../ESJTypes").ESJStrokeStyle;
        fillStyle: import("../../ESJTypes").ESJFillStyle;
        pointed: boolean;
        stroked: boolean;
        filled: boolean;
        show: boolean;
        collision: boolean;
        flyToParam: import("../../ESJTypes").ESJFlyToParam;
        flyInParam: import("../../ESJTypes").ESJFlyInParam;
    };
    getProperties(language: string): import("../../ESJTypes").Property[];
}
export declare namespace ESRectangle {
    const createDefaultProps: () => {
        ground: boolean;
        outlineTranslucent: boolean;
        height: number;
        extrudedHeight: number;
        rectangle: import("xbsj-base").ReactiveVariable<ESJVector4D | undefined>;
        rotation: number;
        stRotation: number;
        pointEditing: boolean;
        filled: boolean;
        pointed: boolean;
        pointStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJPointStyle>;
        stroked: boolean;
        strokeStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJStrokeStyle>;
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
export interface ESRectangle extends UniteChanged<ReturnType<typeof ESRectangle.createDefaultProps>> {
}
