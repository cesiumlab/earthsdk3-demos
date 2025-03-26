import { Destroyable, Event } from "xbsj-base";
import { KeyboardCameraControllerRunning } from "./KeyboardCameraControllerRunning";
export declare class KeyStatus extends Destroyable {
    private _keyboardCameraControllerRunning;
    static getKeyId(options: {
        code: string;
        shiftKey: boolean;
        ctrlKey: boolean;
        altKey: boolean;
        metaKey: boolean;
    }): string;
    private _currentKeyIds;
    get currentKeyIds(): Set<string>;
    private _currentKeyIdsChanged;
    get currentKeyIdsChanged(): Event<[]>;
    private _debug;
    get debug(): boolean;
    set debug(value: boolean);
    get debugChanged(): import("xbsj-base").Listener<[boolean, boolean]>;
    private _debugResetting;
    constructor(_keyboardCameraControllerRunning: KeyboardCameraControllerRunning);
}
