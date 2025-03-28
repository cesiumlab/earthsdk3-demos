import { ObjResettingWithEvent, ReactivePropsToNativePropsAndChanged } from "xbsj-base";
import { PointEditing } from "..";
import { CzmModelPrimitive, ESCesiumViewer } from "../../../../index";
import * as Cesium from 'cesium';
import { BasePlane } from "./GeoRotatorPlane";
import { GeoRotatorCircle } from "./GeoRotatorCircle";
import { RotatorRunning } from "./RotatorRunning";
export type RotatorPlaneType = 'none' | 'heading' | 'pitch' | 'roll';
export declare class RotationEditing extends PointEditing {
    private _czmViewer;
    private _hoveredPlaneType;
    get hoveredPlaneType(): RotatorPlaneType;
    set hoveredPlaneType(value: RotatorPlaneType);
    get hoveredPlaneTypeChanged(): import("xbsj-base").Listener<[RotatorPlaneType, RotatorPlaneType]>;
    private _movingPlaneType;
    get movingPlaneType(): RotatorPlaneType;
    set movingPlaneType(value: RotatorPlaneType);
    get movingPlaneTypeChanged(): import("xbsj-base").Listener<[RotatorPlaneType, RotatorPlaneType]>;
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
        heading: GeoRotatorCircle;
        pitch: GeoRotatorCircle;
        roll: GeoRotatorCircle;
    };
    private _czmCameraModel?;
    get czmCameraModel(): CzmModelPrimitive | undefined;
    private _cartesian;
    get cartesian(): Cesium.Cartesian3 | undefined;
    get czmViewer(): ESCesiumViewer;
    private _planes;
    getPlane(type: Exclude<RotatorPlaneType, 'none'>): BasePlane;
    private _rotatorRunningResetting;
    get rotatorRunningResetting(): ObjResettingWithEvent<RotatorRunning, import("xbsj-base").Listener<[boolean, boolean]>>;
    constructor(_czmViewer: ESCesiumViewer);
    private _createCameraModel;
    private _createRotatorCircle;
}
export declare namespace RotationEditing {
    const createDefaultProps: () => {
        rotation: import("xbsj-base").ReactiveVariable<[number, number, number]>;
        selfRotation: import("xbsj-base").ReactiveVariable<[number, number, number]>;
        pixelSize: number;
        showHelper: boolean;
        debug: boolean;
        position: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJVector3D | undefined>;
        enabled: boolean;
    };
}
export interface RotationEditing extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof RotationEditing.createDefaultProps>> {
}
