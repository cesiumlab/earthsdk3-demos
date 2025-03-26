import { ESJClockRangeType, ESJClockStepType } from "earthsdk3";
import { CzmClock } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { Destroyable, Listener, Event, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
import * as Cesium from 'cesium';
export declare class CzmCzml extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _loadFuncReact;
    get loadFun(): ((dataSource: Cesium.CzmlDataSource) => void) | undefined;
    set loadFun(value: ((dataSource: Cesium.CzmlDataSource) => void) | undefined);
    get loadFunChanged(): Listener<[((dataSource: Cesium.CzmlDataSource) => void) | undefined, ((dataSource: Cesium.CzmlDataSource) => void) | undefined]>;
    private _clock;
    get clock(): CzmClock;
    private _resetClockEvent;
    get resetClockEvent(): Event<[]>;
    resetClock(): void;
    private _dataSource;
    get dataSource(): Cesium.CzmlDataSource | undefined;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
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
        clockRange: ESJClockRangeType;
        shouldAnimate: boolean;
        uri: string;
        defaultLoadFuncStr: string;
        defaultLoadFuncDocStr: string;
    };
}
export declare namespace CzmCzml {
    const createDefaultProps: () => {
        show: boolean | undefined;
        uri: string | undefined;
        allowPicking: boolean | undefined;
        data: import("xbsj-base").ReactiveVariable<undefined>;
        autoResetClock: boolean | undefined;
        clockEnabled: boolean | undefined;
        startTime: number | undefined;
        stopTime: number | undefined;
        currentTime: number | undefined;
        multiplier: number | undefined;
        clockStep: ESJClockStepType | undefined;
        clockRange: ESJClockRangeType | undefined;
        shouldAnimate: boolean | undefined;
        loadFuncStr: string | undefined;
    };
}
export interface CzmCzml extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmCzml.createDefaultProps>> {
}
