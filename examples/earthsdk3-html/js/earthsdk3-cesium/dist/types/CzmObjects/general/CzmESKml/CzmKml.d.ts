import { ESJClockRangeType, ESJClockStepType } from "earthsdk3";
import { CzmClock } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { Destroyable, Listener, Event, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
import * as Cesium from 'cesium';
export declare class CzmKml extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _loadFuncReact;
    get loadFun(): ((dataSource: Cesium.KmlDataSource, viewer?: Cesium.Viewer) => void) | undefined;
    set loadFun(value: ((dataSource: Cesium.KmlDataSource, viewer?: Cesium.Viewer) => void) | undefined);
    get loadFunChanged(): Listener<[((dataSource: Cesium.KmlDataSource, viewer?: Cesium.Viewer | undefined) => void) | undefined, ((dataSource: Cesium.KmlDataSource, viewer?: Cesium.Viewer | undefined) => void) | undefined]>;
    private _clock;
    get clock(): CzmClock;
    private _resetClockEvent;
    get resetClockEvent(): Event<[]>;
    resetClock(): void;
    private _dataSource;
    get dataSource(): Cesium.KmlDataSource | undefined;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
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
        clampToGround: boolean;
    };
}
export declare namespace CzmKml {
    const createDefaultProps: () => {
        show: boolean;
        uri: string | undefined;
        allowPicking: boolean | undefined;
        loadFuncStr: string | undefined;
        data: string | undefined;
        autoResetClock: boolean | undefined;
        clockEnabled: boolean | undefined;
        startTime: number | undefined;
        stopTime: number | undefined;
        currentTime: number | undefined;
        multiplier: number | undefined;
        clockStep: ESJClockStepType | undefined;
        clockRange: ESJClockRangeType | undefined;
        shouldAnimate: boolean | undefined;
        clampToGround: boolean | undefined;
    };
}
export interface CzmKml extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmKml.createDefaultProps>> {
}
