import { Destroyable, ObjResettingWithEvent } from "xbsj-base";
import { FirstPersonController } from "../FirstPersonController";
import { MouseCameraControllerRunning } from "./MouseCameraControllerRunning";
export declare class MouseCameraController extends Destroyable {
    private _firstPersonController;
    get firstPersonController(): FirstPersonController;
    private _enabled;
    get enabled(): boolean;
    set enabled(value: boolean);
    get enabledChanged(): import("xbsj-base").Listener<[boolean, boolean]>;
    enableViewerOriginInputs: (value: boolean) => void;
    private _mouseResetting;
    get mouseResetting(): ObjResettingWithEvent<MouseCameraControllerRunning, import("xbsj-base").Listener<[boolean, boolean]>>;
    constructor(_firstPersonController: FirstPersonController);
}
