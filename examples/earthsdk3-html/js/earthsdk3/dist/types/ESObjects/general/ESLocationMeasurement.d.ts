import { ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
import { ESObjectWithLocation } from "../base";
/**
 * https://www.wolai.com/earthsdk/dQJgf3fj4X1xUwZ38dfiMB
 */
export declare class ESLocationMeasurement extends ESObjectWithLocation {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        position: import("xbsj-base").ReactiveVariable<import("../..").ESJVector3D>;
        rotation: import("xbsj-base").ReactiveVariable<import("../..").ESJVector3D>;
        scale: import("xbsj-base").ReactiveVariable<import("../..").ESJVector3D>;
        minVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        maxVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<import("../..").ESJFlyToParam | undefined>;
        flyInParam: import("xbsj-base").ReactiveVariable<import("../..").ESJFlyInParam | undefined>;
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
        flyToParam: import("../..").ESJFlyToParam;
        flyInParam: import("../..").ESJFlyInParam;
    };
    constructor(id?: SceneObjectKey);
    getProperties(language?: string): import("../..").Property[];
}
export declare namespace ESLocationMeasurement {
    const createDefaultProps: () => {
        position: import("xbsj-base").ReactiveVariable<import("../..").ESJVector3D>;
        rotation: import("xbsj-base").ReactiveVariable<import("../..").ESJVector3D>;
        scale: import("xbsj-base").ReactiveVariable<import("../..").ESJVector3D>;
        minVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        maxVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<import("../..").ESJFlyToParam | undefined>;
        flyInParam: import("xbsj-base").ReactiveVariable<import("../..").ESJFlyInParam | undefined>;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
}
export interface ESLocationMeasurement extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof ESLocationMeasurement.createDefaultProps>> {
}
