import { UniteChanged } from "xbsj-base";
import { ESJResource, ESJVector3D } from "../../ESJTypes";
import { ESObjectWithLocation } from "../base";
export declare class ESLevelRuntimeModel extends ESObjectWithLocation {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        url: string | ESJResource;
        downloadProgress: number;
        levelName: string;
        levelOffset: import("xbsj-base").ReactiveVariable<ESJVector3D>;
        levelLoadDistance: number;
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
    static defaults: {
        url: string;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("../../ESJTypes").ESJFlyToParam;
        flyInParam: import("../../ESJTypes").ESJFlyInParam;
    };
    constructor(id?: string);
    getESProperties(): {
        basic: import("../../ESJTypes").Property[];
        dataSource: import("../../ESJTypes").Property[];
        defaultMenu: string;
        location: import("../../ESJTypes").Property[];
        general: import("../../ESJTypes").Property[];
        coordinate: import("../../ESJTypes").Property[];
        style: import("../../ESJTypes").Property[];
    };
    getProperties(language?: string): import("../../ESJTypes").Property[];
}
export declare namespace ESLevelRuntimeModel {
    const createDefaultProps: () => {
        url: string | ESJResource;
        downloadProgress: number;
        levelName: string;
        levelOffset: import("xbsj-base").ReactiveVariable<ESJVector3D>;
        levelLoadDistance: number;
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
export interface ESLevelRuntimeModel extends UniteChanged<ReturnType<typeof ESLevelRuntimeModel.createDefaultProps>> {
}
