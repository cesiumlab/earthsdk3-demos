import { Destroyable } from "xbsj-base";
import { UniteChanged } from "xbsj-base";
import { GeoCameraController } from "./GeoCameraController";
import { ESCesiumViewer } from "../../index";
export declare class GeoSceneObjectCameraController extends Destroyable {
    private _geoCameraController;
    get geoCameraController(): GeoCameraController;
    constructor(czmViewer: ESCesiumViewer);
}
export declare namespace GeoSceneObjectCameraController {
    const createDefaultProps: () => {
        enabled: boolean | undefined;
        sceneObjectId: string | undefined;
        positionTracking: boolean | undefined;
        rotationTracking: boolean | undefined;
        positionPropertyName: string | undefined;
        positionChangedPropertyName: string | undefined;
        rotationPropertyName: string | undefined;
        rotationChangedPropertyName: string | undefined;
    };
}
export interface GeoSceneObjectCameraController extends UniteChanged<ReturnType<typeof GeoSceneObjectCameraController.createDefaultProps>> {
}
