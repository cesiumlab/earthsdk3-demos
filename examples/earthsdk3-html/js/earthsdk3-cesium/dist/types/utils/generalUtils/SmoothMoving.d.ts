import { Destroyable } from "xbsj-base";
export declare class SmoothMoving extends Destroyable {
    private _currentPosition;
    get currentPosition(): [number, number, number] | undefined;
    get currentPositionChanged(): import("xbsj-base").Listener<[[number, number, number] | undefined, [number, number, number] | undefined]>;
    private _currentHeading;
    get currentHeading(): number | undefined;
    get currentHeadingChanged(): import("xbsj-base").Listener<[number | undefined, number | undefined]>;
    private _startPosition;
    private _processing;
    get processing(): import("xbsj-base").Processing<void, [destination: [number, number, number], duration: number]>;
    restart(destination: [number, number, number], duration: number): void;
    cancel(): void;
}
