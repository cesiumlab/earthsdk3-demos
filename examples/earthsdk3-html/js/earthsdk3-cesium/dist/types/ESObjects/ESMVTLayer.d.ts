import { Event, UniteChanged } from "xbsj-base";
import { ESJVector4D, PickedInfo, ESVisualObject } from "earthsdk3";
export declare class ESMVTLayer extends ESVisualObject {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        rectangle: import("xbsj-base").ReactiveVariable<ESJVector4D | undefined>;
        url: import("xbsj-base").ReactiveVariable<string | {
            [xx: string]: any;
        }>;
        zIndex: number;
        accessToken: string;
        tileSize: number;
        maximumLevel: number;
        minimumLevel: number;
        style: import("xbsj-base").ReactiveVariable<{
            [xx: string]: any;
        }[] | undefined>;
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
    private _pickFeaturesEvent;
    get pickFeaturesEvent(): Event<[PickedInfo]>;
    static defaults: {
        url: string;
        zIndex: number;
        accessToken: string;
        tileSizes: [name: string, value: number][];
        tileSize: number;
        maximumLevel: number;
        minimumLevel: number;
        rectangle: [number, number, number, number];
        style: never[];
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
export declare namespace ESMVTLayer {
    const createDefaultProps: () => {
        rectangle: import("xbsj-base").ReactiveVariable<ESJVector4D | undefined>;
        url: import("xbsj-base").ReactiveVariable<string | {
            [xx: string]: any;
        }>;
        zIndex: number;
        accessToken: string;
        tileSize: number;
        maximumLevel: number;
        minimumLevel: number;
        style: import("xbsj-base").ReactiveVariable<{
            [xx: string]: any;
        }[] | undefined>;
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
export interface ESMVTLayer extends UniteChanged<ReturnType<typeof ESMVTLayer.createDefaultProps>> {
}
