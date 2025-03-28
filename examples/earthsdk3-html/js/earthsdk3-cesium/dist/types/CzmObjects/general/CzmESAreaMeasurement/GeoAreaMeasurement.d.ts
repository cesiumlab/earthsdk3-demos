import { PickedInfo } from "earthsdk3";
import { CzmPolyline } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { Destroyable, Listener, Event, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
export declare class GeoAreaMeasurement extends Destroyable {
    private _pickedEvent;
    get pickedEvent(): Event<[PickedInfo]>;
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _area;
    get area(): number;
    get areaChanged(): Listener<[number, number]>;
    private _centerOfMass;
    get centerOfMass(): [number, number, number] | undefined;
    get centerOfMassChanged(): Listener<[[number, number, number] | undefined, [number, number, number] | undefined]>;
    private _distances;
    get distances(): number[];
    get distancesChanged(): Listener<[number[], number[]]>;
    private _geoPolyline;
    get geoPolyline(): CzmPolyline;
    static defaults: {
        positions: never[];
    };
    private _id;
    get id(): SceneObjectKey;
    set id(value: SceneObjectKey);
    get idChanged(): Listener<[string, string]>;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
}
export declare namespace GeoAreaMeasurement {
    const createDefaultProps: () => {
        show: boolean;
        allowPicking: boolean;
        positions: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
        width: number;
        color: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        fillColor: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        hasDash: boolean;
        gapColor: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        dashLength: number;
        dashPattern: number;
        hasArrow: boolean | undefined;
        editing: boolean;
        depthTest: boolean;
        shadowDom: boolean;
        cssAllInitial: boolean;
        strokeGround: boolean;
        ground: boolean;
    };
}
export interface GeoAreaMeasurement extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof GeoAreaMeasurement.createDefaultProps>> {
}
