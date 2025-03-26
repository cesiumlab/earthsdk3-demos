import { UniteChanged } from "xbsj-base";
import { ESGeoVector } from "../base";
import { ESJVector3DArray } from "../../ESJTypes";
/**
 * https://www.wolai.com/earthsdk/pxKbJ5g7Sf59UJgqwZpyzc
 */
export declare class ESGeoRectangle extends ESGeoVector {
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
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
    toPolygon(): ESJVector3DArray | undefined;
    _updateArea(): void;
    _updatePerimeter(): void;
    constructor(id?: string);
    static defaults: {
        points: ESJVector3DArray;
        pointStyle: import("../../ESJTypes").ESJPointStyle;
        strokeStyle: import("../../ESJTypes").ESJStrokeStyle;
        fillStyle: import("../../ESJTypes").ESJFillStyle;
        pointed: boolean;
        stroked: boolean;
        filled: boolean;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("../../ESJTypes").ESJFlyToParam;
        flyInParam: import("../../ESJTypes").ESJFlyInParam;
    };
    getESProperties(): {
        defaultMenu: string;
        coordinate: import("../../ESJTypes").Property[];
        style: import("../../ESJTypes").Property[];
        general: import("../../ESJTypes").Property[];
        basic: import("../../ESJTypes").Property[];
        dataSource: import("../../ESJTypes").Property[];
        location: import("../../ESJTypes").Property[];
    };
    getProperties(language: string): import("../../ESJTypes").Property[];
}
export declare namespace ESGeoRectangle {
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
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
}
export interface ESGeoRectangle extends UniteChanged<ReturnType<typeof ESGeoRectangle.createDefaultProps>> {
}
