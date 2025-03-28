import { UniteChanged } from "xbsj-base";
import { ESVisualObject } from "../base";
import { ESJResource, ESJVector4D } from "../../ESJTypes";
/**
 * https://www.wolai.com/earthsdk/mrRQPHx2hww6BgzBwEdPaV
 */
export declare class ESTerrainLayer extends ESVisualObject {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        url: string | ESJResource;
        rectangle: import("xbsj-base").ReactiveVariable<ESJVector4D>;
        zIndex: number;
        czmMaxzoom: number | undefined;
        czmMinzoom: number | undefined;
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
        show: boolean;
        url: string;
        rectangle: ESJVector4D;
        zIndex: number;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("../../ESJTypes").ESJFlyToParam;
        flyInParam: import("../../ESJTypes").ESJFlyInParam;
    };
    constructor(id?: string);
    getESProperties(): {
        defaultMenu: string;
        general: import("../../ESJTypes").Property[];
        basic: import("../../ESJTypes").Property[];
        dataSource: import("../../ESJTypes").Property[];
        location: import("../../ESJTypes").Property[];
        coordinate: import("../../ESJTypes").Property[];
        style: import("../../ESJTypes").Property[];
    };
    getProperties(language?: string): import("../../ESJTypes").Property[];
}
export declare namespace ESTerrainLayer {
    const createDefaultProps: () => {
        url: string | ESJResource;
        rectangle: import("xbsj-base").ReactiveVariable<ESJVector4D>;
        zIndex: number;
        czmMaxzoom: number | undefined;
        czmMinzoom: number | undefined;
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
export interface ESTerrainLayer extends UniteChanged<ReturnType<typeof ESTerrainLayer.createDefaultProps>> {
}
