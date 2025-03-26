import { Listener, Event, ReactivePropsToNativePropsAndChanged } from "xbsj-base";
import { ESSceneObject } from "../base";
import { ESJClockStepType, Property } from "../../ESJTypes";
export declare class ESCzml extends ESSceneObject {
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
        uri: string;
        allowPicking: boolean;
        data: import("xbsj-base").ReactiveVariable<undefined>;
        autoResetClock: boolean;
        clockEnabled: boolean;
        startTime: number | undefined;
        stopTime: number | undefined;
        currentTime: number | undefined;
        multiplier: number;
        clockStep: string;
        clockRange: string;
        shouldAnimate: boolean;
        loadFuncStr: string | undefined;
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
        data: ({
            id: string;
            version: string;
            availability?: undefined;
            billboard?: undefined;
            label?: undefined;
            path?: undefined;
            position?: undefined;
        } | {
            id: string;
            availability: string;
            billboard: {
                eyeOffset: {
                    cartesian: number[];
                };
                horizontalOrigin: string;
                image: string;
                pixelOffset: {
                    cartesian2: number[];
                };
                scale: number;
                show: {
                    interval: string;
                    boolean: boolean;
                }[];
                verticalOrigin: string;
            };
            label: {
                fillColor: {
                    interval: string;
                    rgba: number[];
                }[];
                font: string;
                horizontalOrigin: string;
                outlineColor: {
                    rgba: number[];
                };
                pixelOffset: {
                    cartesian2: number[];
                };
                scale: number;
                show: {
                    interval: string;
                    boolean: boolean;
                }[];
                style: string;
                text: string;
                verticalOrigin: string;
            };
            path: {
                material: {
                    solidColor: {
                        color: {
                            interval: string;
                            rgba: number[];
                        };
                    };
                };
                width: {
                    interval: string;
                    number: number;
                }[];
                show: {
                    interval: string;
                    boolean: boolean;
                }[];
            };
            position: {
                interpolationAlgorithm: string;
                interpolationDegree: number;
                epoch: string;
                cartesian: number[];
            };
            version?: undefined;
        })[];
        dataMd: string;
        autoResetClock: boolean;
        clockEnabled: boolean;
        startTime: () => number;
        stopTime: () => number;
        currentTime: () => number;
        multiplier: number;
        clockStep: ESJClockStepType;
        clockRange: ESJClockStepType;
        shouldAnimate: boolean;
        uri: string;
        defaultLoadFuncStr: string;
        defaultLoadFuncDocStr: string;
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
export declare namespace ESCzml {
    const createDefaultProps: () => {
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
        show: boolean;
        uri: string;
        allowPicking: boolean;
        data: import("xbsj-base").ReactiveVariable<undefined>;
        autoResetClock: boolean;
        clockEnabled: boolean;
        startTime: number | undefined;
        stopTime: number | undefined;
        currentTime: number | undefined;
        multiplier: number;
        clockStep: string;
        clockRange: string;
        shouldAnimate: boolean;
        loadFuncStr: string | undefined;
    };
}
export interface ESCzml extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof ESCzml.createDefaultProps>> {
}
