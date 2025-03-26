import { ESJVector2D } from "../../ESJTypes";
import { ESVisualObject } from "../base";
import { UniteChanged } from "xbsj-base";
export type ESTreeType = {
    name: string;
    mesh: string;
    cullingDistance: number;
    scale: number;
};
export type ESXiaoBanWidget = {
    class: string;
    pivot: ESJVector2D;
    space: number;
};
export declare class ESForestTileset extends ESVisualObject {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        url: string;
        treeTypes: import("xbsj-base").ReactiveVariable<ESTreeType[] | undefined>;
        xiaoBanWidget: import("xbsj-base").ReactiveVariable<ESXiaoBanWidget | undefined>;
        youShiSZ: string;
        diLei: string;
        senLinLB: string;
        labelMaterial: string;
        heightOffset: number;
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
        url: string;
        treeTypes: ESTreeType[];
        xiaoBanWidgetDefault: {
            class: string;
            pivot: number[];
            space: number;
        };
        youShiSZ: string;
        diLei: string;
        senLinLB: string;
        labelMaterial: string;
        heightOffset: number;
        XiaoBanWidgetSampleValue: string;
        TreeTypeSampleValue: string;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("../../ESJTypes").ESJFlyToParam;
        flyInParam: import("../../ESJTypes").ESJFlyInParam;
    };
    constructor(id?: string);
    getProperties(language?: string): import("../../ESJTypes").Property[];
}
export declare namespace ESForestTileset {
    const createDefaultProps: () => {
        url: string;
        treeTypes: import("xbsj-base").ReactiveVariable<ESTreeType[] | undefined>;
        xiaoBanWidget: import("xbsj-base").ReactiveVariable<ESXiaoBanWidget | undefined>;
        youShiSZ: string;
        diLei: string;
        senLinLB: string;
        labelMaterial: string;
        heightOffset: number;
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
export interface ESForestTileset extends UniteChanged<ReturnType<typeof ESForestTileset.createDefaultProps>> {
}
