import { Destroyable } from "xbsj-base";
export declare function getLegendNum(f: number): number[] | undefined;
export declare class Legend extends Destroyable {
    private _lengthInPixels;
    get lengthInPixels(): number | undefined;
    set lengthInPixels(value: number | undefined);
    get lengthInPixelsChanged(): import("xbsj-base").Listener<[number | undefined, number | undefined]>;
    private _resolution;
    get resolution(): number | undefined;
    set resolution(value: number | undefined);
    get resolutionChanged(): import("xbsj-base").Listener<[number | undefined, number | undefined]>;
    private _computedLengthInPixels;
    get computedLengthInPixels(): number | undefined;
    get computedLengthInPixelsChanged(): import("xbsj-base").Listener<[number | undefined, number | undefined]>;
    private _computedLengthInMeters;
    get computedLengthInMeters(): number | undefined;
    get computedLengthInMetersChanged(): import("xbsj-base").Listener<[number | undefined, number | undefined]>;
    private _computedLengthInStr;
    get computedLengthInStr(): string | undefined;
    get computedLengthInStrChanged(): import("xbsj-base").Listener<[string | undefined, string | undefined]>;
    constructor();
}
