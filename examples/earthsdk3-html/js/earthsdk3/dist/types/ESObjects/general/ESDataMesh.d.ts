import { UniteChanged } from "xbsj-base";
import { ESJColor, ESJResource } from "../../ESJTypes";
import { ESObjectWithLocation } from "../base";
export type ESDataMeshColorStopType = {
    ratio: number;
    rgba: ESJColor;
};
export declare class ESDataMesh extends ESObjectWithLocation {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        url: string | ESJResource;
        currentTime: number;
        minPropValue: number;
        maxPropValue: number;
        colorStops: import("xbsj-base").ReactiveVariable<ESDataMeshColorStopType[] | undefined>;
        position: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector3D>;
        rotation: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector3D>;
        scale: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector3D>;
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
        maxTime: number;
        currentTime: number;
        minPropValue: number;
        maxPropValue: number;
        colorStops: ESDataMeshColorStopType[];
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("../../ESJTypes").ESJFlyToParam;
        flyInParam: import("../../ESJTypes").ESJFlyInParam;
    };
    private _maxTime;
    get maxTime(): number | undefined;
    get maxTimeChanged(): import("xbsj-base").Listener<[number | undefined, number | undefined]>;
    constructor(id?: string);
    getProperties(language?: string): import("../../ESJTypes").Property[];
}
export declare namespace ESDataMesh {
    const createDefaultProps: () => {
        url: string | ESJResource;
        currentTime: number;
        minPropValue: number;
        maxPropValue: number;
        colorStops: import("xbsj-base").ReactiveVariable<ESDataMeshColorStopType[] | undefined>;
        position: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector3D>;
        rotation: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector3D>;
        scale: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector3D>;
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
export interface ESDataMesh extends UniteChanged<ReturnType<typeof ESDataMesh.createDefaultProps>> {
}
