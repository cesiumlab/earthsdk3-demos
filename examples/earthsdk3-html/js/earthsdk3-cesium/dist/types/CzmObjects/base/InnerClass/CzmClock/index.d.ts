import { ESJClockRangeType, ESJClockStepType } from "earthsdk3";
import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { Destroyable, ReactivePropsToNativePropsAndChanged } from "xbsj-base";
import * as Cesium from 'cesium';
export declare class CzmClock extends Destroyable {
    static czmJulianDateToTimeStamp: typeof czmJulianDateToTimeStamp;
    static getClockRange: typeof getClockRange;
    static getClockStep: typeof getClockStep;
    constructor(czmViewer: ESCesiumViewer);
    static defaults: {
        enabled: boolean;
        startTime: () => number;
        stopTime: () => number;
        currentTime: () => number;
        multiplier: number;
        clockStep: ESJClockStepType;
        clockRange: ESJClockRangeType;
        shouldAnimate: boolean;
    };
}
export declare namespace CzmClock {
    const createDefaultProps: () => {
        enabled: boolean | undefined;
        startTime: number | undefined;
        stopTime: number | undefined;
        currentTime: number | undefined;
        multiplier: number | undefined;
        clockStep: ESJClockStepType | undefined;
        clockRange: ESJClockRangeType | undefined;
        shouldAnimate: boolean | undefined;
    };
}
export interface CzmClock extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmClock.createDefaultProps>> {
}
declare function czmJulianDateToTimeStamp(julianDate: Cesium.JulianDate): number;
declare function getClockRange(value: Cesium.ClockRange): "UNBOUNDED" | "CLAMPED" | "LOOP_STOP";
declare function getClockStep(value: Cesium.ClockStep): "SYSTEM_CLOCK_MULTIPLIER" | "TICK_DEPENDENT" | "SYSTEM_CLOCK";
export {};
