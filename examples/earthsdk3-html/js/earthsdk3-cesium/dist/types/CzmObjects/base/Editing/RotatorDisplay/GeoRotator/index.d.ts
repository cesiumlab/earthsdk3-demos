import { CzmModelPrimitive, CzmPoint, PositionEditing } from "../../../../../CzmObjects";
import { ESCesiumViewer } from "../../../../../ESCesiumViewer";
import * as Cesium from 'cesium';
import { Destroyable, Listener, ObjResettingWithEvent, ReactivePropsToNativePropsAndChanged } from "xbsj-base";
import { RotatorPlaneType } from "./RotatorPlaneType";
import { BasePlane } from "./BasePlane";
import { RotatorRunning } from "./RotatorRunning";
import { GeoRotatorCircleWrapper } from "./GeoRotatorCircleWrapper";
export declare class GeoRotator extends Destroyable {
    private _czmViewer;
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _sPositionEditing;
    get sPositionEditing(): PositionEditing | undefined;
    static defaults: {
        position: [number, number, number];
    };
    private _pointer;
    get pointer(): CzmPoint | undefined;
    private _cameraModel;
    get cameraModel(): CzmModelPrimitive | undefined;
    private _hoveredPlaneType;
    get hoveredPlaneType(): RotatorPlaneType;
    set hoveredPlaneType(value: RotatorPlaneType);
    get hoveredPlaneTypeChanged(): Listener<[RotatorPlaneType, RotatorPlaneType]>;
    private _movingPlaneType;
    get movingPlaneType(): RotatorPlaneType;
    set movingPlaneType(value: RotatorPlaneType);
    get movingPlaneTypeChanged(): Listener<[RotatorPlaneType, RotatorPlaneType]>;
    static rotationNum: {
        heading: number;
        pitch: number;
        roll: number;
    };
    static rotationFuncs: {
        heading: ([heading, pitch, roll]: [number, number, number]) => [number, number, number];
        pitch: ([heading, pitch, roll]: [number, number, number]) => [number, number, number];
        roll: ([heading, pitch, roll]: [number, number, number]) => [number, number, number];
    };
    private _circles;
    get circles(): {
        heading: GeoRotatorCircleWrapper;
        pitch: GeoRotatorCircleWrapper;
        roll: GeoRotatorCircleWrapper;
    };
    private _cartesian;
    get cartesian(): Cesium.Cartesian3 | undefined;
    private _cartesianInit;
    private _planes;
    getPlane(type: Exclude<RotatorPlaneType, 'none'>): BasePlane;
    private _rotatorRunningResetting;
    get rotatorRunningResetting(): ObjResettingWithEvent<RotatorRunning, Listener<[boolean, boolean]>>;
    get czmViewer(): ESCesiumViewer;
    constructor(_czmViewer: ESCesiumViewer);
}
export declare namespace GeoRotator {
    const createDefaultProps: () => {
        enabled: boolean;
        position: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        positionEditing: boolean;
        rotation: import("xbsj-base").ReactiveVariable<[number, number, number]>;
        selfRotation: import("xbsj-base").ReactiveVariable<[number, number, number]>;
        pixelSize: number;
        showHelper: boolean;
        debug: boolean;
    };
}
export interface GeoRotator extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof GeoRotator.createDefaultProps>> {
}
