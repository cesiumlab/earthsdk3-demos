import { ESJVector3D } from "earthsdk3";
import { Destroyable, Event, UniteChanged } from "xbsj-base";
import { ESCesiumViewer } from "../../index";
export declare class GeoCameraController extends Destroyable {
    private _resetWithCameraEvent;
    get resetWithCameraEvent(): Event<[viewerTags: string[] | undefined]>;
    resetWithCamera(viewerTags?: string[]): void;
    static defaults: {
        position: ESJVector3D;
        rotation: ESJVector3D;
        offsetRotation: ESJVector3D;
        relativeRotation: boolean;
    };
    constructor(czmViewer: ESCesiumViewer);
}
export declare namespace GeoCameraController {
    const createDefaultProps: () => {
        enabled: boolean;
        showTarget: boolean;
        position: import("xbsj-base").ReactiveVariable<ESJVector3D | undefined>;
        rotation: import("xbsj-base").ReactiveVariable<ESJVector3D | undefined>;
        positionEditing: boolean;
        rotationEditing: boolean;
        viewDistance: number;
        offsetHeight: number;
        offsetRotation: import("xbsj-base").ReactiveVariable<ESJVector3D>;
        enabledRotationInput: boolean;
        enabledScaleInput: boolean;
        relativeRotation: boolean;
    };
}
export interface GeoCameraController extends UniteChanged<ReturnType<typeof GeoCameraController.createDefaultProps>> {
}
