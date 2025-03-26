import { ESJVector4D } from "../../../ESJTypes";
import { ESGeoPolygon } from "../ESGeoPolygon";
import { Event, UniteChanged } from "xbsj-base";
export declare class ESSunshineAnalysis extends ESGeoPolygon {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        extrudedHeight: number;
        height: number;
        sampleDistance: number;
        startColor: import("xbsj-base").ReactiveVariable<ESJVector4D>;
        endColor: import("xbsj-base").ReactiveVariable<ESJVector4D>;
        startTime: number;
        endTime: number;
        spanTime: number;
        progress: number;
        filled: boolean;
        stroked: boolean;
        pointed: boolean;
        pointStyle: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJPointStyle>;
        strokeStyle: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJStrokeStyle>;
        fillStyle: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJFillStyle>;
        points: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
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
    private _startEvent;
    get startEvent(): Event<[]>;
    start(): void;
    private _stopEvent;
    get stopEvent(): Event<[]>;
    stop(): void;
    static defaults: {
        fillStyle: import("../../../ESJTypes").ESJFillStyle;
        strokeStyle: import("../../../ESJTypes").ESJStrokeStyle;
        filled: boolean;
        stroked: boolean;
        collision: boolean;
        points: import("../../../ESJTypes").ESJVector3DArray;
        pointStyle: import("../../../ESJTypes").ESJPointStyle;
        pointed: boolean;
        show: boolean;
        allowPicking: boolean;
        flyToParam: import("../../../ESJTypes").ESJFlyToParam;
        flyInParam: import("../../../ESJTypes").ESJFlyInParam;
    };
    constructor(id?: string);
    getProperties(language: string): import("../../../ESJTypes").Property[];
}
export declare namespace ESSunshineAnalysis {
    const createDefaultProps: () => {
        extrudedHeight: number;
        height: number;
        sampleDistance: number;
        startColor: import("xbsj-base").ReactiveVariable<ESJVector4D>;
        endColor: import("xbsj-base").ReactiveVariable<ESJVector4D>;
        startTime: number;
        endTime: number;
        spanTime: number;
        progress: number;
        filled: boolean;
        stroked: boolean;
        pointed: boolean;
        pointStyle: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJPointStyle>;
        strokeStyle: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJStrokeStyle>;
        fillStyle: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJFillStyle>;
        points: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
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
export interface ESSunshineAnalysis extends UniteChanged<ReturnType<typeof ESSunshineAnalysis.createDefaultProps>> {
}
