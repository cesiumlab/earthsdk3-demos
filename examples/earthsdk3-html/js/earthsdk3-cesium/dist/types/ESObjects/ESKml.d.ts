import { ESJClockRangeType, ESJClockStepType, ESJResource, ESSceneObject, Property } from "earthsdk3";
import { Listener, Event, ReactivePropsToNativePropsAndChanged } from "xbsj-base";
export declare class ESKml extends ESSceneObject {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
        show: boolean;
        uri: string | ESJResource | undefined;
        allowPicking: boolean;
        loadFuncStr: string | undefined;
        data: string | undefined;
        autoResetClock: boolean;
        clockEnabled: boolean;
        startTime: number | undefined;
        stopTime: number | undefined;
        currentTime: number | undefined;
        multiplier: number;
        clockStep: string;
        clockRange: string;
        shouldAnimate: boolean;
        clampToGround: boolean;
    };
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _resetClockEvent;
    get resetClockEvent(): Event<[]>;
    resetClock(): void;
    constructor(id?: string);
    static defaults: {
        show: boolean;
        allowPicking: boolean;
        defaultLoadFuncStr: string;
        defaultLoadFuncDocStr: string;
        data: string;
        dataMd: string;
        autoResetClock: boolean;
        clockEnabled: boolean;
        startTime: () => number;
        stopTime: () => number;
        currentTime: () => number;
        multiplier: number;
        clockStep: ESJClockStepType;
        clockRange: ESJClockRangeType;
        shouldAnimate: boolean;
        uri: string;
    };
    getESProperties(): {
        defaultMenu: string;
        basic: Property[];
        general: Property[];
        dataSource: Property[];
        location: Property[];
        coordinate: Property[];
        style: Property[];
    };
    getProperties(language?: string): Property[];
}
export declare namespace ESKml {
    const createDefaultProps: () => {
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
        show: boolean;
        uri: string | ESJResource | undefined;
        allowPicking: boolean;
        loadFuncStr: string | undefined;
        data: string | undefined;
        autoResetClock: boolean;
        clockEnabled: boolean;
        startTime: number | undefined;
        stopTime: number | undefined;
        currentTime: number | undefined;
        multiplier: number;
        clockStep: string;
        clockRange: string;
        shouldAnimate: boolean;
        clampToGround: boolean;
    };
}
export interface ESKml extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof ESKml.createDefaultProps>> {
}
