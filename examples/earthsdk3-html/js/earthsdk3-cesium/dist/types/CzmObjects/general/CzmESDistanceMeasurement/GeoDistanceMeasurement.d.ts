import { PickedInfo } from "earthsdk3";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { Destroyable, Listener, Event, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
export declare class GeoDistanceMeasurement extends Destroyable {
    private _pickedEvent;
    get pickedEvent(): Event<[PickedInfo]>;
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _distances;
    get distances(): number[];
    get distancesChanged(): Listener<[number[], number[]]>;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
    static defaults: {
        positions: never[];
    };
}
export declare namespace GeoDistanceMeasurement {
    const createDefaultProps: () => {
        show: boolean;
        allowPicking: boolean;
        positions: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
        width: number;
        color: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        hasDash: boolean;
        gapColor: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        dashLength: number;
        dashPattern: number;
        hasArrow: boolean;
        arcType: string;
        editing: boolean;
        depthTest: boolean;
        shadowDom: boolean;
        cssAllInitial: boolean;
        strokeGround: boolean;
    };
}
export interface GeoDistanceMeasurement extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof GeoDistanceMeasurement.createDefaultProps>> {
}
