import { UniteChanged } from "xbsj-base";
import { ESJColor, ESJVector3D } from "../../ESJTypes";
import { ESObjectWithLocation } from "../base";
/**
 * https://www.wolai.com/earthsdk/hPLjF6oi2a2mxDuRdqbPUS
 */
export declare class ESBoxClipping extends ESObjectWithLocation {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        reverse: boolean;
        edgeColor: import("xbsj-base").ReactiveVariable<ESJColor>;
        edgeWidth: number;
        size: import("xbsj-base").ReactiveVariable<ESJVector3D>;
        /**
         * 目标  ES3DTileset ID ,为空时代表裁切地形
         */
        targetID: string;
        position: import("xbsj-base").ReactiveVariable<ESJVector3D>;
        rotation: import("xbsj-base").ReactiveVariable<ESJVector3D>;
        scale: import("xbsj-base").ReactiveVariable<ESJVector3D>;
        minVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        maxVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
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
        reverse: boolean;
        edgeColor: ESJColor;
        edgeWidth: number;
        size: ESJVector3D;
        targetID: string;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("../../ESJTypes").ESJFlyToParam;
        flyInParam: import("../../ESJTypes").ESJFlyInParam;
    };
    constructor(id?: string);
    getESProperties(): {
        basic: import("../../ESJTypes").Property[];
        defaultMenu: string;
        location: import("../../ESJTypes").Property[];
        general: import("../../ESJTypes").Property[];
        dataSource: import("../../ESJTypes").Property[];
        coordinate: import("../../ESJTypes").Property[];
        style: import("../../ESJTypes").Property[];
    };
    getProperties(language?: string): import("../../ESJTypes").Property[];
}
export declare namespace ESBoxClipping {
    const createDefaultProps: () => {
        reverse: boolean;
        edgeColor: import("xbsj-base").ReactiveVariable<ESJColor>;
        edgeWidth: number;
        size: import("xbsj-base").ReactiveVariable<ESJVector3D>;
        /**
         * 目标  ES3DTileset ID ,为空时代表裁切地形
         */
        targetID: string;
        position: import("xbsj-base").ReactiveVariable<ESJVector3D>;
        rotation: import("xbsj-base").ReactiveVariable<ESJVector3D>;
        scale: import("xbsj-base").ReactiveVariable<ESJVector3D>;
        minVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        maxVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
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
export interface ESBoxClipping extends UniteChanged<ReturnType<typeof ESBoxClipping.createDefaultProps>> {
}
