import { ESJVector2D, ESJWidgetEventInfo } from "../../../ESJTypes";
import { Event, UniteChanged } from "xbsj-base";
import { ESObjectWithLocation } from "../../base";
import { ESGeoDivInstanceClass } from "./mds";
/**
 * https://www.wolai.com/earthsdk/e17QPxZkVnG3ujXj8sJ2un
 */
export declare class ESGeoDiv extends ESObjectWithLocation {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        opacity: number;
        anchor: import("xbsj-base").ReactiveVariable<[leftRatio: number, topRatio: number]>;
        instanceClassStr: string | undefined;
        innerHTML: string | undefined;
        zOrder: number;
        position: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJVector3D>;
        rotation: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJVector3D>;
        scale: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJVector3D>;
        minVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        maxVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
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
    private _widgetEvent;
    get widgetEvent(): Event<[ESJWidgetEventInfo]>;
    private _echartsFunReact;
    get echartsFun(): (() => any) | undefined;
    set echartsFun(value: (() => any) | undefined);
    get echartsFunChanged(): import("xbsj-base").Listener<[(() => any) | undefined, (() => any) | undefined]>;
    private _instanceClassReact;
    get instanceClass(): ESGeoDivInstanceClass | undefined;
    set instanceClass(value: ESGeoDivInstanceClass | undefined);
    get instanceClassChanged(): import("xbsj-base").Listener<[ESGeoDivInstanceClass<{
        destroy(): undefined;
    }> | undefined, ESGeoDivInstanceClass<{
        destroy(): undefined;
    }> | undefined]>;
    static defaults: {
        opacity: number;
        anchor: ESJVector2D;
        instanceClassStr: string;
        instanceClassStrReadMe: string;
        innerHTML: string;
        zOrder: number;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("../../../ESJTypes").ESJFlyToParam;
        flyInParam: import("../../../ESJTypes").ESJFlyInParam;
    };
    constructor(id?: string);
    getESProperties(): {
        basic: import("../../../ESJTypes").Property[];
        defaultMenu: string;
        location: import("../../../ESJTypes").Property[];
        general: import("../../../ESJTypes").Property[];
        dataSource: import("../../../ESJTypes").Property[];
        coordinate: import("../../../ESJTypes").Property[];
        style: import("../../../ESJTypes").Property[];
    };
    getProperties(language?: string): import("../../../ESJTypes").Property[];
}
export declare namespace ESGeoDiv {
    const createDefaultProps: () => {
        opacity: number;
        anchor: import("xbsj-base").ReactiveVariable<[leftRatio: number, topRatio: number]>;
        instanceClassStr: string | undefined;
        innerHTML: string | undefined;
        zOrder: number;
        position: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJVector3D>;
        rotation: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJVector3D>;
        scale: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJVector3D>;
        minVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        maxVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
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
export interface ESGeoDiv extends UniteChanged<ReturnType<typeof ESGeoDiv.createDefaultProps>> {
}
