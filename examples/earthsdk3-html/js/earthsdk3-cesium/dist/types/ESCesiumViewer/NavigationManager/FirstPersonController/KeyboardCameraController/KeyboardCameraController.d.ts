import { Destroyable, Listener } from "xbsj-base";
import { FirstPersonController } from "../FirstPersonController";
import { CzmCameraActionType } from "../../../../ESJTypesCzm";
export declare class KeyboardCameraController extends Destroyable {
    private _firstPersonController;
    get firstPersonController(): FirstPersonController;
    private _enabled;
    get enabled(): boolean;
    set enabled(value: boolean);
    get enabledChanged(): Listener<[boolean, boolean]>;
    static readonly defaultKeyStatusMap: {
        [k: string]: CzmCameraActionType;
    };
    private _keyStatusMap;
    get keyStatusMap(): {
        [k: string]: CzmCameraActionType;
    };
    set keyStatusMap(value: {
        [k: string]: CzmCameraActionType;
    });
    get keyStatusMapChanged(): Listener<[{
        [k: string]: CzmCameraActionType;
    }, {
        [k: string]: CzmCameraActionType;
    }]>;
    /**
     * 米/毫秒
     */
    private _speed;
    get speed(): number;
    set speed(value: number);
    get speedChanged(): Listener<[number, number]>;
    /**
     * 度/毫秒
     */
    private _rotateSpeed;
    get rotateSpeed(): number;
    set rotateSpeed(value: number);
    get rotateSpeedChanged(): Listener<[number, number]>;
    private _alwaysWithCamera;
    get alwaysWithCamera(): boolean;
    set alwaysWithCamera(value: boolean);
    get alwaysWithCameraChanged(): Listener<[boolean, boolean]>;
    private _keyDownEvent;
    get keyDownEvent(): Listener<[KeyboardEvent]>;
    keyDown(event: KeyboardEvent): void;
    private _keyUpEvent;
    get keyUpEvent(): Listener<[KeyboardEvent]>;
    keyUp(event: KeyboardEvent): void;
    private _abortEvent;
    get abortEvent(): Listener<[]>;
    abort(): void;
    constructor(_firstPersonController: FirstPersonController);
}
