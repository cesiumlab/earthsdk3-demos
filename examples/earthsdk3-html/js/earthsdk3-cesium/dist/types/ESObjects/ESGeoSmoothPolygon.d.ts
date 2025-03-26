import { ESGeoVector, ESJFillStyle } from "earthsdk3";
import { ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
export declare class ESGeoSmoothPolygon extends ESGeoVector {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        ground: boolean;
        depth: number;
        pointed: boolean;
        pointStyle: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJPointStyle>;
        stroked: boolean;
        strokeStyle: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJStrokeStyle>;
        filled: boolean;
        fillStyle: import("xbsj-base").ReactiveVariable<ESJFillStyle>;
        points: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJFlyToParam | undefined>;
        flyInParam: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJFlyInParam | undefined>;
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
    constructor(id?: SceneObjectKey);
    static defaults: {
        fillStyle: ESJFillStyle;
        points: import("earthsdk3").ESJVector3DArray;
        pointStyle: import("earthsdk3").ESJPointStyle;
        strokeStyle: import("earthsdk3").ESJStrokeStyle;
        pointed: boolean;
        stroked: boolean;
        filled: boolean;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("earthsdk3").ESJFlyToParam;
        flyInParam: import("earthsdk3").ESJFlyInParam;
    };
    getProperties(language: string): import("earthsdk3").Property[];
}
export declare namespace ESGeoSmoothPolygon {
    const createDefaultProps: () => {
        ground: boolean;
        depth: number;
        pointed: boolean;
        pointStyle: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJPointStyle>;
        stroked: boolean;
        strokeStyle: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJStrokeStyle>;
        filled: boolean;
        fillStyle: import("xbsj-base").ReactiveVariable<ESJFillStyle>;
        points: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJFlyToParam | undefined>;
        flyInParam: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJFlyInParam | undefined>;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
}
export interface ESGeoSmoothPolygon extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof ESGeoSmoothPolygon.createDefaultProps>> {
}
