import { ESPathImpl, Player, RotLerpModeType } from "earthsdk3";
import { CzmPolyline, GeoCanvasPointPoi } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { Destroyable, Listener, Event, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
export declare class GeoPolylinePath extends Destroyable {
    private _geoPath;
    private _geoPolyline;
    private _geoCanvasPointPoi;
    private _player;
    get geoPath(): ESPathImpl;
    get geoPolyline(): CzmPolyline;
    get geoCanvasPointPoi(): GeoCanvasPointPoi;
    get player(): Player;
    get currentInfo(): import("@sdkSrc/ESObjects/general/ESPath/ESPathImpl/CurrentInfoType").CurrentInfoType | undefined;
    get currentInfoChanged(): Listener<[import("@sdkSrc/ESObjects/general/ESPath/ESPathImpl/CurrentInfoType").CurrentInfoType | undefined, import("@sdkSrc/ESObjects/general/ESPath/ESPathImpl/CurrentInfoType").CurrentInfoType | undefined]>;
    get currentIndex(): number | undefined;
    get currentIndexChanged(): Listener<[import("@sdkSrc/ESObjects/general/ESPath/ESPathImpl/CurrentInfoType").CurrentInfoType | undefined, import("@sdkSrc/ESObjects/general/ESPath/ESPathImpl/CurrentInfoType").CurrentInfoType | undefined]>;
    get currentPosition(): [number, number, number] | undefined;
    get currentPositionChanged(): Listener<[import("@sdkSrc/ESObjects/general/ESPath/ESPathImpl/CurrentInfoType").CurrentInfoType | undefined, import("@sdkSrc/ESObjects/general/ESPath/ESPathImpl/CurrentInfoType").CurrentInfoType | undefined]>;
    get currentRotation(): [number, number, number] | undefined;
    get currentRotationChanged(): Listener<[import("@sdkSrc/ESObjects/general/ESPath/ESPathImpl/CurrentInfoType").CurrentInfoType | undefined, import("@sdkSrc/ESObjects/general/ESPath/ESPathImpl/CurrentInfoType").CurrentInfoType | undefined]>;
    get accumDistances(): number[];
    get accumDistancesChanged(): Event<[]>;
    get totalDistance(): number;
    get totalDistanceChanged(): Event<[]>;
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    subPath(startDistance: number, stopDistance: number): [longitude: number, latitude: number, height: number][] | undefined;
    private _currentDistance;
    get currentDistance(): number;
    set currentDistance(value: number);
    get currentDistanceChanged(): Listener<[number, number]>;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
    private _ratio;
    get ratio(): number;
    set ratio(value: number);
    get ratioChanged(): Listener<[number, number]>;
    get timePosRots(): import("earthsdk3").TimePosRotType[] | undefined;
}
export declare namespace GeoPolylinePath {
    const createDefaultProps: () => {
        show: boolean;
        allowPicking: boolean;
        currentPoiShow: boolean;
        polylineShow: boolean;
        positions: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
        width: number;
        ground: boolean;
        color: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        hasDash: boolean;
        gapColor: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        dashLength: number;
        dashPattern: number;
        hasArrow: boolean;
        arcType: "GEODESIC" | "NONE" | "RHUMB";
        granularity: number;
        editing: boolean;
        pointEditing: boolean;
        loop: boolean;
        currentTime: number;
        duration: number;
        speed: number;
        playing: boolean;
        depthTest: boolean;
        leadTime: number;
        trailTime: number;
        rotationRadius: number[];
        rotLerpMode: RotLerpModeType;
    };
}
export interface GeoPolylinePath extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof GeoPolylinePath.createDefaultProps>> {
}
