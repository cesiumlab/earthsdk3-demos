import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { Destroyable, UniteChanged } from "xbsj-base";
import { PolylinePath } from "../../../CzmObjects";
import { GeoCameraController } from "../GeoSceneObjectCameraController/GeoCameraController";
export declare class GeoPolylinePathCameraController extends Destroyable {
    private _geoCameraController;
    get geoCameraController(): GeoCameraController;
    private _geoPolylinePath;
    get polylinePath(): PolylinePath;
    constructor(czmViewer: ESCesiumViewer);
    get position(): import("@sdkSrc/ESJTypes").ESJVector3D | undefined;
    get positionChanged(): import("xbsj-base").Listener<[import("@sdkSrc/ESJTypes").ESJVector3D | undefined, import("@sdkSrc/ESJTypes").ESJVector3D | undefined]>;
    get rotation(): import("@sdkSrc/ESJTypes").ESJVector3D | undefined;
    get roataionChanged(): import("xbsj-base").Listener<[import("@sdkSrc/ESJTypes").ESJVector3D | undefined, import("@sdkSrc/ESJTypes").ESJVector3D | undefined]>;
}
export declare namespace GeoPolylinePathCameraController {
    const createDefaultProps: () => {
        enabled: boolean;
        usePathPosition: boolean;
        usePathRotation: boolean;
        viewDistance: number;
        offsetHeight: number;
        offsetRotation: import("xbsj-base").ReactiveVariable<[number, number, number]>;
        enabledRotationInput: boolean;
        enabledScaleInput: boolean;
        lineMode: "auto" | "manual" | undefined;
    };
}
export interface GeoPolylinePathCameraController extends UniteChanged<ReturnType<typeof GeoPolylinePathCameraController.createDefaultProps>> {
}
