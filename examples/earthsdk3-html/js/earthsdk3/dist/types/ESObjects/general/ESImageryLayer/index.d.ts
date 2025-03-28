import { ESJResource, ESJVector4D } from "../../../ESJTypes";
import { ESVisualObject } from "../../../ESObjects";
import { UniteChanged } from "xbsj-base";
import { CzmSplitDirectionType, ESImageryLayerOptionsType } from "./types";
/**
 * https://www.wolai.com/earthsdk/sTpXjiETeVPfEwGfqDqUUw
 */
export declare class ESImageryLayer extends ESVisualObject {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        url: string | ESJResource;
        rectangle: import("xbsj-base").ReactiveVariable<ESJVector4D | undefined>;
        options: import("xbsj-base").ReactiveVariable<ESImageryLayerOptionsType | undefined>;
        zIndex: number;
        actorTag: string;
        componentTag: string;
        maximumLevel: number;
        minimumLevel: number;
        targetID: string | undefined;
        opacity: number;
        czmSplitDirection: CzmSplitDirectionType;
        czmAlpha: number;
        czmBrightness: number;
        czmContrast: number;
        czmHue: number;
        czmSaturation: number;
        czmGamma: number;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJFlyToParam | undefined>;
        flyInParam: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJFlyInParam | undefined>;
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
        rectangle: ESJVector4D;
        options: {};
        zIndex: number;
        actorTag: string;
        componentTag: string;
        minimumLevel: number;
        maximumLevel: number;
        targetID: string;
        opacity: number;
        czmSplitDirection: CzmSplitDirectionType;
        czmSplitDirectionEnum: [name: string, value: string][];
        czmAlpha: number;
        czmBrightness: number;
        czmContrast: number;
        czmHue: number;
        czmSaturation: number;
        czmGamma: number;
        czmSubdomains: never[];
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("../../../ESJTypes").ESJFlyToParam;
        flyInParam: import("../../../ESJTypes").ESJFlyInParam;
    };
    constructor(id?: string);
    getESProperties(): {
        defaultMenu: string;
        basic: import("../../../ESJTypes").Property[];
        dataSource: import("../../../ESJTypes").Property[];
        general: import("../../../ESJTypes").Property[];
        location: import("../../../ESJTypes").Property[];
        coordinate: import("../../../ESJTypes").Property[];
        style: import("../../../ESJTypes").Property[];
    };
    getProperties(language?: string): import("../../../ESJTypes").Property[];
}
export declare namespace ESImageryLayer {
    const createDefaultProps: () => {
        url: string | ESJResource;
        rectangle: import("xbsj-base").ReactiveVariable<ESJVector4D | undefined>;
        options: import("xbsj-base").ReactiveVariable<ESImageryLayerOptionsType | undefined>;
        zIndex: number;
        actorTag: string;
        componentTag: string;
        maximumLevel: number;
        minimumLevel: number;
        targetID: string | undefined;
        opacity: number;
        czmSplitDirection: CzmSplitDirectionType;
        czmAlpha: number;
        czmBrightness: number;
        czmContrast: number;
        czmHue: number;
        czmSaturation: number;
        czmGamma: number;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJFlyToParam | undefined>;
        flyInParam: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJFlyInParam | undefined>;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
}
export interface ESImageryLayer extends UniteChanged<ReturnType<typeof ESImageryLayer.createDefaultProps>> {
}
