import { MouseMoving } from "./MouseMoving";
import { MouseCameraController } from "./MouseCameraController";
import { Destroyable } from "xbsj-base";
export declare class MouseCameraControllerRunning extends Destroyable {
    private _mouseCameraController;
    static origin_setPointerCapture: (pointerId: number) => void;
    get mouseCameraController(): MouseCameraController;
    get firstPersonController(): import("..").FirstPersonController;
    private _mouseMoving;
    get mouseMoving(): MouseMoving;
    constructor(_mouseCameraController: MouseCameraController);
}
