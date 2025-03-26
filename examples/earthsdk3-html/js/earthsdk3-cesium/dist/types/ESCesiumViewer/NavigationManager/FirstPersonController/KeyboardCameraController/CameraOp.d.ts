import { Destroyable } from "xbsj-base";
import { KeyboardCameraControllerRunning } from "./KeyboardCameraControllerRunning";
export declare class CameraOp extends Destroyable {
    private _running;
    get running(): KeyboardCameraControllerRunning;
    get controller(): import("./KeyboardCameraController").KeyboardCameraController;
    private _actions;
    get actions(): {
        [k: string]: boolean;
    };
    private _resetActions;
    private _updateActions;
    constructor(_running: KeyboardCameraControllerRunning);
}
