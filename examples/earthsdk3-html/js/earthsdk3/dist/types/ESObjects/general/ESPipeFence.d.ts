import { UniteChanged } from "xbsj-base";
import { ESJFillStyle, ESJStrokeStyle } from "../../ESJTypes";
import { ESGeoVector } from "../base";
/**
 * https://www.wolai.com/earthsdk/KumomxD1tKHbq242aFVwz
 */
export declare class ESPipeFence extends ESGeoVector {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        height: number;
        width: number;
        materialMode: string;
        filled: boolean;
        pointed: boolean;
        pointStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJPointStyle>;
        stroked: boolean;
        strokeStyle: import("xbsj-base").ReactiveVariable<ESJStrokeStyle>;
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
    private _distance;
    get distance(): number;
    get distanceChanged(): import("xbsj-base").Listener<[number, number]>;
    static defaults: {
        strokeStyle: ESJStrokeStyle;
        fillStyle: ESJFillStyle;
        filled: boolean;
        stroked: boolean;
        materialModes: [name: string, value: string][];
        points: import("../../ESJTypes").ESJVector3DArray;
        pointStyle: import("../../ESJTypes").ESJPointStyle;
        pointed: boolean;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("../../ESJTypes").ESJFlyToParam;
        flyInParam: import("../../ESJTypes").ESJFlyInParam;
    };
    _deprecated: (string | {
        materialMode: {
            blue: string;
            purple: string;
        };
    })[];
    private _deprecatedWarningFunc;
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
    getProperties(language?: string): import("../../ESJTypes").Property[];
}
export declare namespace ESPipeFence {
    const createDefaultProps: () => {
        height: number;
        width: number;
        materialMode: string;
        filled: boolean;
        pointed: boolean;
        pointStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJPointStyle>;
        stroked: boolean;
        strokeStyle: import("xbsj-base").ReactiveVariable<ESJStrokeStyle>;
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
export interface ESPipeFence extends UniteChanged<ReturnType<typeof ESPipeFence.createDefaultProps>> {
}
