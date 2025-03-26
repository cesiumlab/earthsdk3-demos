import { PickedInfo } from "earthsdk3";
import { PositionsEditing } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { Destroyable, Listener, Event, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
export declare class GeoHeightMeasurement extends Destroyable {
    private _pickedEvent;
    get pickedEvent(): Event<[PickedInfo]>;
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _sPositionsEditing;
    get sPositionsEditing(): PositionsEditing;
    private _distance;
    get distance(): number;
    get distanceChanged(): Listener<[number, number]>;
    private _surfaceDistance;
    get surfaceDistance(): number;
    get surfaceDistanceChanged(): Listener<[number, number]>;
    private _height;
    get height(): number;
    get heightChanged(): Listener<[number, number]>;
    private _middlePosition;
    get middlePosition(): [number, number, number] | undefined;
    get middlePositionChanged(): Listener<[[number, number, number] | undefined, [number, number, number] | undefined]>;
    private _heightPosition;
    get heightPosition(): [number, number, number] | undefined;
    get heightPositionChanged(): Listener<[[number, number, number] | undefined, [number, number, number] | undefined]>;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
}
export declare namespace GeoHeightMeasurement {
    const createDefaultProps: () => {
        show: boolean;
        allowPicking: boolean;
        positions: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
        width: number;
        color: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        hasDash: boolean;
        gapColor: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        dashLength: number;
        dashPattern: number;
        hasArrow: boolean;
        arcType: string;
        editing: boolean;
        depthTest: boolean;
        shadowDom: boolean;
        cssAllInitial: boolean;
    };
}
export interface GeoHeightMeasurement extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof GeoHeightMeasurement.createDefaultProps>> {
}
