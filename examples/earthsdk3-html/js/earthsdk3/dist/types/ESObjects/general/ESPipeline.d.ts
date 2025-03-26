import { BooleanProperty, ColorProperty, EnumProperty, ESJResource, GroupProperty, NumberProperty } from "../../ESJTypes";
import { UniteChanged } from "xbsj-base";
import { ESGeoLineString } from "./ESGeoLineString";
/**
 * 管线
 * https://www.wolai.com/earthsdk/2X9zwccAfriMJiogcgNwep
 */
export declare class ESPipeline extends ESGeoLineString {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        radius: number;
        sides: number;
        materialMode: string;
        materialImage: import("xbsj-base").ReactiveVariable<{
            url: string | ESJResource;
            uDis: number;
            vDis: number;
        }>;
        speed: number;
        stroked: boolean;
        strokeStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJStrokeStyle>;
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
    static defaults: {
        radius: number;
        sides: number;
        materialModes: [xx: string, value: string][];
        materialImage: {
            url: string | ESJResource;
            uDis: number;
            vDis: number;
        };
        speed: number;
        strokeStyle: import("../../ESJTypes").ESJStrokeStyle;
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
    getESProperties(): {
        defaultMenu: string;
        basic: import("../../ESJTypes").Property[];
        style: (GroupProperty | NumberProperty | BooleanProperty | EnumProperty<string> | ColorProperty)[];
        coordinate: import("../../ESJTypes").Property[];
        general: import("../../ESJTypes").Property[];
        dataSource: import("../../ESJTypes").Property[];
        location: import("../../ESJTypes").Property[];
    };
    getProperties(language?: string): import("../../ESJTypes").Property[];
}
export declare namespace ESPipeline {
    const createDefaultProps: () => {
        radius: number;
        sides: number;
        materialMode: string;
        materialImage: import("xbsj-base").ReactiveVariable<{
            url: string | ESJResource;
            uDis: number;
            vDis: number;
        }>;
        speed: number;
        stroked: boolean;
        strokeStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJStrokeStyle>;
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
export interface ESPipeline extends UniteChanged<ReturnType<typeof ESPipeline.createDefaultProps>> {
}
