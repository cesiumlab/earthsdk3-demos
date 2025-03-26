import { FirstPersonController } from "../FirstPersonController";
import { MouseCameraController } from "./MouseCameraController";
import { Destroyable } from 'xbsj-base';
export declare class MouseMoving extends Destroyable {
    private _firstPersonController;
    private _mouseCameraController;
    constructor(_firstPersonController: FirstPersonController, _mouseCameraController: MouseCameraController);
}
