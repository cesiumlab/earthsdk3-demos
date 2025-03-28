import { PickedInfo } from "earthsdk3";
import { CzmCustomPrimitive, CzmPolyline, GeoCustomDivPoi } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { Destroyable, Event, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
export declare class CzmSpaceAreaMeasurement extends Destroyable {
    private _pickedEvent;
    get pickedEvent(): Event<[PickedInfo]>;
    private _startEvent;
    get startEvent(): Listener;
    start(): void;
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _geoPolyline;
    get geoPolyline(): CzmPolyline | undefined;
    private _customPrimitive;
    get customPrimitive(): CzmCustomPrimitive | undefined;
    private _geoDivPoi;
    get geoDivPoi(): GeoCustomDivPoi<{
        destroy(): undefined;
    }> | undefined;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
    static defaults: {
        positions: never[];
        totalArea: number;
        interpolation: boolean;
        interpolationDistance: number;
        offsetHeight: number;
        drillDepth: number;
        outlineWidth: number;
        outlineColor: number[];
    };
}
export declare namespace CzmSpaceAreaMeasurement {
    const createDefaultProps: () => {
        positions: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
        show: boolean | undefined;
        totalArea: number | undefined;
        interpolationDistance: number | undefined;
        interpolation: boolean | undefined;
        offsetHeight: number | undefined;
        drillDepth: number | undefined;
        outlineWidth: number | undefined;
        outlineColor: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
    };
}
export interface CzmSpaceAreaMeasurement extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmSpaceAreaMeasurement.createDefaultProps>> {
}
