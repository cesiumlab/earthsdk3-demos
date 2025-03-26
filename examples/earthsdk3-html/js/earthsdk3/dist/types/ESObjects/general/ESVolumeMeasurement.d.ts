import { Listener, UniteChanged } from "xbsj-base";
import { ESGeoPolygon } from "./ESGeoPolygon";
/**
 * https://www.wolai.com/earthsdk/qwNTqqCTPy5XHw6MYrkkoK
 */
export declare class ESVolumeMeasurement extends ESGeoPolygon {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        planeHeight: import("xbsj-base").ReactiveVariable<number | undefined>;
        gridWidth: number;
        cutVolume: number;
        fillVolume: number;
        cutAndFillVolume: number;
        progress: number;
        depthTest: boolean;
        pointed: boolean;
        pointStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJPointStyle>;
        stroked: boolean;
        strokeStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJStrokeStyle>;
        filled: boolean;
        fillStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJFillStyle>;
        points: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
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
    private _startEvent;
    get startEvent(): Listener;
    start(): void;
    private _clearEvent;
    get clearEvent(): Listener;
    clear(): void;
    constructor(id?: string);
    static defaults: {
        fillStyle: import("../../ESJTypes").ESJFillStyle;
        strokeStyle: import("../../ESJTypes").ESJStrokeStyle;
        filled: boolean;
        stroked: boolean;
        collision: boolean;
        points: import("../../ESJTypes").ESJVector3DArray;
        pointStyle: import("../../ESJTypes").ESJPointStyle;
        pointed: boolean;
        show: boolean;
        allowPicking: boolean;
        flyToParam: import("../../ESJTypes").ESJFlyToParam;
        flyInParam: import("../../ESJTypes").ESJFlyInParam;
    };
    getProperties(language: string): import("../../ESJTypes").Property[];
}
export declare namespace ESVolumeMeasurement {
    const createDefaultProps: () => {
        planeHeight: import("xbsj-base").ReactiveVariable<number | undefined>;
        gridWidth: number;
        cutVolume: number;
        fillVolume: number;
        cutAndFillVolume: number;
        progress: number;
        depthTest: boolean;
        pointed: boolean;
        pointStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJPointStyle>;
        stroked: boolean;
        strokeStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJStrokeStyle>;
        filled: boolean;
        fillStyle: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJFillStyle>;
        points: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
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
export interface ESVolumeMeasurement extends UniteChanged<ReturnType<typeof ESVolumeMeasurement.createDefaultProps>> {
}
