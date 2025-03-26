import { ESJArcType } from "../../../../ESJTypes";
import { Destroyable, Listener, Event, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
import { CurrentInfoType } from "./CurrentInfoType";
import { Player } from "../../../../utils";
import { getLeftRotation, getRightRotation } from "./getCurrent";
import { computeRotIfUndefinedUsingLerp, computeRotIfUndefinedUsingNextLine, computeRotIfUndefinedUsingPrevLine } from "./computeRotIfUndefined";
import { GetCurrentFuncType } from "./GetCurrentFuncType";
import { parseData } from "./parseData";
import { ESSceneObject } from "../../../../ESObjects/base";
export type RotLerpModeType = 'Lerp' | 'Prev' | 'Next';
export declare class ESPathImpl extends Destroyable {
    private _scratchCurrentInfo;
    private _currentInfo;
    get currentInfo(): CurrentInfoType | undefined;
    get currentInfoChanged(): Listener<[CurrentInfoType | undefined, CurrentInfoType | undefined]>;
    get currentIndex(): number | undefined;
    get currentIndexChanged(): Listener<[CurrentInfoType | undefined, CurrentInfoType | undefined]>;
    get currentPosition(): [number, number, number] | undefined;
    get currentPositionChanged(): Listener<[CurrentInfoType | undefined, CurrentInfoType | undefined]>;
    get currentRotation(): [number, number, number] | undefined;
    get currentRotationChanged(): Listener<[CurrentInfoType | undefined, CurrentInfoType | undefined]>;
    private _player;
    get player(): Player;
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _accumDistancesChanged;
    private _accumDistancesChangedInit;
    get accumDistancesChanged(): Event<[]>;
    private _accumDistancesDirty;
    private _accumDistances;
    get accumDistances(): number[];
    get totalDistanceChanged(): Event<[]>;
    get totalDistance(): number;
    getCurrent(timeStamp: number): CurrentInfoType | undefined;
    subPath(startTimeStamp: number, stopTimeStamp: number): TimePosRotType[] | undefined;
    static computeRotIfUndefinedUsingPrevLine: typeof computeRotIfUndefinedUsingPrevLine;
    static computeRotIfUndefinedUsingNextLine: typeof computeRotIfUndefinedUsingNextLine;
    static computeRotIfUndefinedUsingLerp: typeof computeRotIfUndefinedUsingLerp;
    static getLeftRotation: typeof getLeftRotation;
    static getRightRotation: typeof getRightRotation;
    computeRotIfUndefinedUsingPrevLine(force?: boolean): void;
    computeRotIfUndefinedUsingNextLine(force?: boolean): void;
    computeRotIfUndefinedUsingLerp(force?: boolean): void;
    /**
     * @deprecated computeRotIfUndefined已弃用，请使用computeRotIfUndefinedUsingPrevLine
     * @param force 即使rotation不是undefined，也会被强制赋值
     */
    computeRotIfUndefined(force?: boolean): void;
    /**
     * 在控制点周边增加新的控制点
     * @param intervalDistance 间隔距离，单位是米
     * @param reserveOrigin 保留原控制点
     */
    addAroundPoints(intervalDistance: number[], reserveOrigin: boolean): void;
    private _getCurrentFunc;
    get getCurrentFunc(): GetCurrentFuncType | undefined;
    set getCurrentFunc(value: GetCurrentFuncType | undefined);
    get getCurrentFuncChanged(): Listener<[GetCurrentFuncType | undefined, GetCurrentFuncType | undefined]>;
    computeTimeFromTimePosRots(): void;
    static parseData: typeof parseData;
    static defaults: {
        timePosRots: TimePosRotType[];
        startTime: number;
        stopTime: number;
        loop: boolean;
        duration: number;
        playing: boolean;
        dataText: string;
    };
    constructor(sceneObject?: ESSceneObject, id?: SceneObjectKey);
    get ratio(): number;
    set ratio(value: number);
    get ratioChanged(): Listener<[number, number]>;
    static timePosRotsMd: string;
}
export type TimePosRotType = [timeStamp: number, position: [longitude: number, latitude: number, height: number], rotation?: [heading: number, pitch: number, roll: number] | undefined];
export declare namespace ESPathImpl {
    const createDefaultProps: () => {
        show: boolean;
        currentPoiShow: boolean;
        timePosRots: import("xbsj-base").ReactiveVariable<TimePosRotType[] | undefined>;
        autoComputeTimeFromTimePosRots: boolean;
        leadTime: number;
        trailTime: number;
        startTime: number | undefined;
        stopTime: number | undefined;
        loop: boolean;
        currentTime: number;
        duration: number | undefined;
        speed: number;
        playing: boolean;
        polylineShow: boolean;
        width: number;
        ground: boolean;
        color: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        hasDash: boolean;
        gapColor: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        dashLength: number;
        dashPattern: number;
        hasArrow: boolean;
        depthTest: boolean;
        arcType: ESJArcType;
        allowPicking: boolean;
        dataUri: string;
        dataText: string | undefined;
        rotLerpMode: RotLerpModeType;
        debug: boolean;
    };
}
export interface ESPathImpl extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof ESPathImpl.createDefaultProps>> {
}
