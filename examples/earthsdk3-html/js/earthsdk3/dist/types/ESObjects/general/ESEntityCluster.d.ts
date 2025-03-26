import { ESVisualObject } from "../base";
import { Event, UniteChanged } from "xbsj-base";
import { ESJResource } from "../../ESJTypes";
export type WidgetEventInfo = {
    type: "leftClick" | "rightClick" | "mouseEnter" | "mouseLeave" | "childMouseLeave" | "childMouseEnter";
    add?: {
        children?: string[];
        mousePos?: [number, number];
    };
};
export type ESEntityClusterStyle = {
    cluster?: {
        value?: number;
        minValue?: number;
        maxValue?: number;
        mode?: string;
        style?: {
            [xx: string]: any;
        };
    }[];
    nonCluster?: {
        mode?: string;
        style?: {
            [xx: string]: any;
        };
    };
};
/**
 * 聚合POI标注
 * ESEntityCluster - https://www.wolai.com/earthsdk/5drKAUgDrTcQq4zGVtbbYj
 */
export declare class ESEntityCluster extends ESVisualObject {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        url: string | ESJResource | {
            [xx: string]: any;
        };
        pixelRange: number;
        minimumClusterSize: number;
        style: import("xbsj-base").ReactiveVariable<ESEntityClusterStyle | undefined>;
        heightReference: string;
        perspective: boolean;
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
    private _widgetEvent;
    get widgetEvent(): Event<[WidgetEventInfo]>;
    private _data;
    get data(): Object | undefined;
    set data(value: Object | undefined);
    get dataChanged(): import("xbsj-base").Listener<[Object | undefined, Object | undefined]>;
    getFeatures(): import("xbsj-base").ReactiveVariable<Object | undefined> | undefined;
    static defaults: {
        url: string;
        pixelRange: number;
        minimumClusterSize: number;
        style: ESEntityClusterStyle;
        heightReferences: [name: string, value: string][];
        perspective: boolean;
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
        general: import("../../ESJTypes").Property[];
        dataSource: import("../../ESJTypes").Property[];
        location: import("../../ESJTypes").Property[];
        coordinate: import("../../ESJTypes").Property[];
        style: import("../../ESJTypes").Property[];
    };
    getProperties(language?: string): import("../../ESJTypes").Property[];
}
export declare namespace ESEntityCluster {
    const createDefaultProps: () => {
        url: string | ESJResource | {
            [xx: string]: any;
        };
        pixelRange: number;
        minimumClusterSize: number;
        style: import("xbsj-base").ReactiveVariable<ESEntityClusterStyle | undefined>;
        heightReference: string;
        perspective: boolean;
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
export interface ESEntityCluster extends UniteChanged<ReturnType<typeof ESEntityCluster.createDefaultProps>> {
}
