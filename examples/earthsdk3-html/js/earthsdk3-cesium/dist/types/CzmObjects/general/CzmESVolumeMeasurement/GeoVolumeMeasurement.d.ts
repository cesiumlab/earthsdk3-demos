import { ESJVector3DArray } from "earthsdk3";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { Destroyable, Event, SceneObjectKey, UniteChanged } from "xbsj-base";
import { CzmPolylinesPrimitive } from "../../../CzmObjects";
export declare class GeoVolumeMeasurement extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Event<[number | undefined]>;
    flyTo(duration?: number): void;
    private _enableEvent;
    get enableEvent(): Event<[]>;
    enableEmit(): void;
    private _clearEvent;
    get clearEvent(): Event<[]>;
    clearEmit(): void;
    private _gridPoints;
    get gridPoints(): ESJVector3DArray;
    set gridPoints(value: ESJVector3DArray);
    get gridPointsChanged(): import("xbsj-base").Listener<[ESJVector3DArray, ESJVector3DArray]>;
    excavationPolylines: CzmPolylinesPrimitive | undefined;
    fillPolylines: CzmPolylinesPrimitive | undefined;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
}
export declare namespace GeoVolumeMeasurement {
    const createDefaultProps: () => {
        show: boolean;
        allowPicking: boolean;
        positions: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
        planeHeight: import("xbsj-base").ReactiveVariable<number | undefined>;
        gridWidth: number;
        area: number;
        cutVolume: number;
        fillVolume: number;
        cutAndFillVolume: number;
        progress: number;
        depthTest: boolean;
        outlineWidth: number;
        outlineColor: number[];
        outline: boolean;
        filled: boolean;
        fillColor: number[];
        fillGround: boolean;
        strokeGround: boolean;
    };
}
export interface GeoVolumeMeasurement extends UniteChanged<ReturnType<typeof GeoVolumeMeasurement.createDefaultProps>> {
}
