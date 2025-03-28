import { UniteChanged } from "xbsj-base";
import { ESJResource, ESJVector2D } from "../../ESJTypes";
import { ESVisualObject } from "../base";
export type ESPoiType = {
    type: string;
    povit: ESJVector2D;
    widget: string;
    worldScale: number;
    hiddenDistance: number;
};
export declare class ESPoiTileset extends ESVisualObject {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        url: string | ESJResource;
        poiTypes: import("xbsj-base").ReactiveVariable<ESPoiType[] | undefined>;
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
        poiTypes: {
            type: string;
            widget: string;
            povit: number[];
            worldScale: number;
            hiddenDistance: number;
        }[];
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("../../ESJTypes").ESJFlyToParam;
        flyInParam: import("../../ESJTypes").ESJFlyInParam;
    };
    constructor(id?: string);
    getProperties(language?: string): import("../../ESJTypes").Property[];
}
export declare namespace ESPoiTileset {
    const createDefaultProps: () => {
        url: string | ESJResource;
        poiTypes: import("xbsj-base").ReactiveVariable<ESPoiType[] | undefined>;
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
export interface ESPoiTileset extends UniteChanged<ReturnType<typeof ESPoiTileset.createDefaultProps>> {
}
