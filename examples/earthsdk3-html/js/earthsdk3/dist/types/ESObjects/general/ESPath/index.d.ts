import { ESGeoLineString } from "../ESGeoLineString";
import { EnumProperty, ESJStrokeStyle, GroupProperty, NumberProperty } from "../../../ESJTypes";
import { ReactivePropsToNativePropsAndChanged, SceneObjectKey, Event } from "xbsj-base";
import { ESPathImpl } from "./ESPathImpl";
export * from './ESPathImpl';
export declare class ESPath extends ESGeoLineString {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        timeStamps: import("xbsj-base").ReactiveVariable<number[] | undefined>;
        speed: number;
        materialMode: string;
        stroked: boolean;
        strokeStyle: import("xbsj-base").ReactiveVariable<ESJStrokeStyle>;
        rotationRadius: number[];
        pointed: boolean;
        pointStyle: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJPointStyle>;
        filled: boolean;
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
    private _path;
    get path(): ESPathImpl;
    get currentPosition(): [number, number, number] | undefined;
    private _currentPositionChanged;
    get currentPositionChanged(): Event<[[number, number, number] | undefined]>;
    get currentRotation(): [number, number, number] | undefined;
    private _currentRotationChanged;
    get currentRotationChanged(): Event<[[number, number, number] | undefined]>;
    get current(): {
        position: [number, number, number] | undefined;
        rotation: [number, number, number] | undefined;
    };
    private _currentChanged;
    get currentChanged(): Event<[{
        position: [number, number, number] | undefined;
        rotation: [number, number, number] | undefined;
    }]>;
    static defaults: {
        materialModes: [name: string, value: string][];
        points: import("../../../ESJTypes").ESJVector3DArray;
        pointStyle: import("../../../ESJTypes").ESJPointStyle;
        strokeStyle: ESJStrokeStyle;
        fillStyle: import("../../../ESJTypes").ESJFillStyle;
        pointed: boolean;
        stroked: boolean;
        filled: boolean;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("../../../ESJTypes").ESJFlyToParam;
        flyInParam: import("../../../ESJTypes").ESJFlyInParam;
    };
    _deprecated: (string | {
        materialMode: {
            blue: string;
            purple: string;
        };
    })[];
    private _deprecatedWarningFunc;
    getESProperties(): {
        basic: import("../../../ESJTypes").Property[];
        coordinate: import("../../../ESJTypes").Property[];
        style: (GroupProperty | NumberProperty | import("../../../ESJTypes").BooleanProperty | EnumProperty<string> | import("../../../ESJTypes").ColorProperty)[];
        defaultMenu: string;
        general: import("../../../ESJTypes").Property[];
        dataSource: import("../../../ESJTypes").Property[];
        location: import("../../../ESJTypes").Property[];
    };
    getProperties(language?: string): import("../../../ESJTypes").Property[];
    constructor(id?: SceneObjectKey);
}
export declare namespace ESPath {
    const createDefaultProps: () => {
        timeStamps: import("xbsj-base").ReactiveVariable<number[] | undefined>;
        speed: number;
        materialMode: string;
        stroked: boolean;
        strokeStyle: import("xbsj-base").ReactiveVariable<ESJStrokeStyle>;
        rotationRadius: number[];
        pointed: boolean;
        pointStyle: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJPointStyle>;
        filled: boolean;
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
export interface ESPath extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof ESPath.createDefaultProps>> {
}
