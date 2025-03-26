import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { Destroyable, ReactivePropsToNativePropsAndChanged, Event, Listener, SceneObjectKey } from "xbsj-base";
import { GeoPolylinePath } from "./GeoPolylinePath";
import { PointEditing, PositionsEditing } from "../../../CzmObjects";
export declare class GeoBezierPath extends Destroyable {
    private _geoPolylinePath;
    get geoPolylinePath(): GeoPolylinePath;
    get geoPath(): import("earthsdk3").ESPathImpl;
    get ratio(): number;
    set ratio(value: number);
    get ratioChanged(): Listener<[number, number]>;
    get player(): import("earthsdk3").Player;
    get currentInfo(): import("@sdkSrc/ESObjects/general/ESPath/ESPathImpl/CurrentInfoType").CurrentInfoType | undefined;
    get currentInfoChanged(): Listener<[import("@sdkSrc/ESObjects/general/ESPath/ESPathImpl/CurrentInfoType").CurrentInfoType | undefined, import("@sdkSrc/ESObjects/general/ESPath/ESPathImpl/CurrentInfoType").CurrentInfoType | undefined]>;
    get currentIndex(): number | undefined;
    get currentIndexChanged(): Listener<[import("@sdkSrc/ESObjects/general/ESPath/ESPathImpl/CurrentInfoType").CurrentInfoType | undefined, import("@sdkSrc/ESObjects/general/ESPath/ESPathImpl/CurrentInfoType").CurrentInfoType | undefined]>;
    get currentPosition(): [number, number, number] | undefined;
    get currentPositionChanged(): Listener<[import("@sdkSrc/ESObjects/general/ESPath/ESPathImpl/CurrentInfoType").CurrentInfoType | undefined, import("@sdkSrc/ESObjects/general/ESPath/ESPathImpl/CurrentInfoType").CurrentInfoType | undefined]>;
    get currentRotation(): [number, number, number] | undefined;
    get currentRotationChanged(): Listener<[import("@sdkSrc/ESObjects/general/ESPath/ESPathImpl/CurrentInfoType").CurrentInfoType | undefined, import("@sdkSrc/ESObjects/general/ESPath/ESPathImpl/CurrentInfoType").CurrentInfoType | undefined]>;
    get accumDistances(): number[];
    get accumDistancesChanged(): number[];
    get totalDistance(): number;
    get totalDistanceChanged(): Event<[]>;
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _currentDistance;
    get currentDistance(): number;
    set currentDistance(value: number);
    get currentDistanceChanged(): Listener<[number, number]>;
    private _sPositionsEditing;
    get sPositionsEditing(): PositionsEditing;
    private _pointEditor;
    get pointEditor(): PointEditing;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
    get timePosRots(): import("earthsdk3").TimePosRotType[] | undefined;
}
export declare namespace GeoBezierPath {
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
        arcType: string;
        editing: boolean;
        pointEditing: boolean;
        loop: boolean;
        currentTime: number;
        duration: number;
        speed: number;
        playing: boolean;
        resolution: number;
        sharpness: number;
        depthTest: boolean;
        leadTime: number;
        trailTime: number;
    };
}
export interface GeoBezierPath extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof GeoBezierPath.createDefaultProps>> {
}
