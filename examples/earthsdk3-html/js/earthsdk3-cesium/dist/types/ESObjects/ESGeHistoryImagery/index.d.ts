import { Event, UniteChanged } from "xbsj-base";
import { ESJVector4D, ESViewer, ESVisualObject, ESImageryLayer } from "earthsdk3";
export declare class ESGeHistoryImagery extends ESVisualObject {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        currentDate: string;
        zIndex: number;
        rectangle: import("xbsj-base").ReactiveVariable<ESJVector4D>;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJFlyToParam | undefined>;
        flyInParam: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJFlyInParam | undefined>;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
    private _esImageryLayer;
    get esImageryLayer(): ESImageryLayer;
    private _datesEvent;
    get datesEvent(): Event<[string[] | undefined, ESViewer]>;
    static defaults: {
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("earthsdk3").ESJFlyToParam;
        flyInParam: import("earthsdk3").ESJFlyInParam;
    };
    constructor(id?: string);
    getESProperties(): {
        basic: import("earthsdk3").Property[];
        defaultMenu: string;
        general: import("earthsdk3").Property[];
        dataSource: import("earthsdk3").Property[];
        location: import("earthsdk3").Property[];
        coordinate: import("earthsdk3").Property[];
        style: import("earthsdk3").Property[];
    };
    getProperties(language?: string): import("earthsdk3").Property[];
}
export declare namespace ESGeHistoryImagery {
    const createDefaultProps: () => {
        currentDate: string;
        zIndex: number;
        rectangle: import("xbsj-base").ReactiveVariable<ESJVector4D>;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJFlyToParam | undefined>;
        flyInParam: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJFlyInParam | undefined>;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
}
export interface ESGeHistoryImagery extends UniteChanged<ReturnType<typeof ESGeHistoryImagery.createDefaultProps>> {
}
