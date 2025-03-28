import { ESGeoVector } from "earthsdk3";
import { ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
export declare class ESRoad extends ESGeoVector {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        width: number;
        arcType: string;
        imageUrl: string;
        repeat: number[];
        stroked: boolean;
        pointed: boolean;
        pointStyle: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJPointStyle>;
        strokeStyle: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJStrokeStyle>;
        filled: boolean;
        fillStyle: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJFillStyle>;
        points: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
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
    static supportEditingModes: string[];
    static defaults: {
        width: number;
        arcType: string;
        imageUrl: string;
        repeat: [number, number];
        points: import("earthsdk3").ESJVector3DArray;
        pointStyle: import("earthsdk3").ESJPointStyle;
        strokeStyle: import("earthsdk3").ESJStrokeStyle;
        fillStyle: import("earthsdk3").ESJFillStyle;
        pointed: boolean;
        stroked: boolean;
        filled: boolean;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("earthsdk3").ESJFlyToParam;
        flyInParam: import("earthsdk3").ESJFlyInParam;
    };
    constructor(id?: SceneObjectKey);
    getProperties(language?: string): import("earthsdk3").Property[];
}
export declare namespace ESRoad {
    const createDefaultProps: () => {
        width: number;
        arcType: string;
        imageUrl: string;
        repeat: number[];
        stroked: boolean;
        pointed: boolean;
        pointStyle: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJPointStyle>;
        strokeStyle: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJStrokeStyle>;
        filled: boolean;
        fillStyle: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJFillStyle>;
        points: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
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
export interface ESRoad extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof ESRoad.createDefaultProps>> {
}
