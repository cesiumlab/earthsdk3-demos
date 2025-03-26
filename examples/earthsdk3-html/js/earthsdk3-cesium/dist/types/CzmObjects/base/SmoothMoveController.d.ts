import { ESCesiumViewer } from "../../ESCesiumViewer";
import { Destroyable } from "xbsj-base";
export declare class SmoothMoveController extends Destroyable {
    private _czmViewer;
    private _currentPosition;
    get currentPosition(): [number, number, number] | undefined;
    get currentPositionChanged(): import("xbsj-base").Listener<[[number, number, number] | undefined, [number, number, number] | undefined]>;
    private _currentRotation;
    get currentRotation(): [number, number, number] | undefined;
    get currentRotationChanged(): import("xbsj-base").Listener<[[number, number, number] | undefined, [number, number, number] | undefined]>;
    private _currentHeading;
    get currentHeading(): number | undefined;
    get currentHeadingChanged(): import("xbsj-base").Listener<[number | undefined, number | undefined]>;
    private _isRotating;
    get isRotating(): boolean;
    set isRotating(value: boolean);
    get isRotatingChanged(): import("xbsj-base").Listener<[boolean, boolean]>;
    private _isGround;
    get isGround(): boolean;
    set isGround(value: boolean);
    get isGroundChanged(): import("xbsj-base").Listener<[boolean, boolean]>;
    private _startPosition;
    private _startRotation;
    private _processing;
    get processing(): import("xbsj-base").Processing<void, [destination: [number, number, number], rotation: [number, number, number], duration: number]>;
    restart(destination: [number, number, number], rotation: [number, number, number], duration: number): void;
    cancel(): void;
    constructor(_czmViewer: ESCesiumViewer);
}
