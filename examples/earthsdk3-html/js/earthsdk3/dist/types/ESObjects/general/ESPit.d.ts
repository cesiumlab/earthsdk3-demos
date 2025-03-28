import { UniteChanged } from "xbsj-base";
import { BooleanProperty, ColorProperty, EnumProperty, GroupProperty, NumberProperty } from "../../ESJTypes";
import { ESGeoPolygon } from "./ESGeoPolygon";
export type ESJTexture = {
    url: string;
    uDis: number;
    vDis: number;
};
export declare class ESPit extends ESGeoPolygon {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        depth: number;
        sideImage: import("xbsj-base").ReactiveVariable<ESJTexture>;
        bottomImage: import("xbsj-base").ReactiveVariable<ESJTexture>;
        opacity: number;
        interpolation: number;
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
    constructor(id?: string);
    static defaults: {
        depth: number;
        sideImage: ESJTexture;
        bottomImage: ESJTexture;
        opacity: number;
        interpolation: number;
        fillStyle: import("../../ESJTypes").ESJFillStyle;
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
    getESProperties(): {
        basic: import("../../ESJTypes").Property[];
        style: (GroupProperty | NumberProperty | BooleanProperty | EnumProperty<string> | ColorProperty)[];
        coordinate: import("../../ESJTypes").Property[];
        defaultMenu: string;
        general: import("../../ESJTypes").Property[];
        dataSource: import("../../ESJTypes").Property[];
        location: import("../../ESJTypes").Property[];
    };
    getProperties(language: string): import("../../ESJTypes").Property[];
}
export declare namespace ESPit {
    const createDefaultProps: () => {
        depth: number;
        sideImage: import("xbsj-base").ReactiveVariable<ESJTexture>;
        bottomImage: import("xbsj-base").ReactiveVariable<ESJTexture>;
        opacity: number;
        interpolation: number;
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
export interface ESPit extends UniteChanged<ReturnType<typeof ESPit.createDefaultProps>> {
}
