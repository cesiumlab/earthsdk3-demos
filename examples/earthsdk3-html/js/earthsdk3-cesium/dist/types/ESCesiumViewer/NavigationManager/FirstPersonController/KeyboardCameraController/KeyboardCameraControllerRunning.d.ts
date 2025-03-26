import { Destroyable } from "xbsj-base";
import { KeyStatus } from "./KeyStatus";
import { CameraOp } from "./CameraOp";
import { KeyboardCameraController } from "./KeyboardCameraController";
export declare class KeyboardCameraControllerRunning extends Destroyable {
    private _keyboardCameraController;
    get keyboardCameraController(): KeyboardCameraController;
    private _keyStatus;
    get keyStatus(): KeyStatus;
    private _cameraOp;
    get cameraOp(): CameraOp;
    constructor(_keyboardCameraController: KeyboardCameraController);
}
