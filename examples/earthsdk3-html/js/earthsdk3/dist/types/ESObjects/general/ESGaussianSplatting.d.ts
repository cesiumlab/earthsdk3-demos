import { ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
import { ESObjectWithLocation } from "../base";
import { ESJResource } from "../../ESJTypes";
export declare class ESGaussianSplatting extends ESObjectWithLocation {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        url: string | ESJResource;
        progress: number;
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
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("../../ESJTypes").ESJFlyToParam;
        flyInParam: import("../../ESJTypes").ESJFlyInParam;
    };
    constructor(id?: SceneObjectKey);
    getESProperties(): {
        basic: import("../../ESJTypes").Property[];
        defaultMenu: string;
        location: import("../../ESJTypes").Property[];
        general: import("../../ESJTypes").Property[];
        dataSource: import("../../ESJTypes").Property[];
        coordinate: import("../../ESJTypes").Property[];
        style: import("../../ESJTypes").Property[];
    };
    getProperties(language: string): import("../../ESJTypes").Property[];
}
export declare namespace ESGaussianSplatting {
    const createDefaultProps: () => {
        url: string | ESJResource;
        progress: number;
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
export interface ESGaussianSplatting extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof ESGaussianSplatting.createDefaultProps>> {
}
