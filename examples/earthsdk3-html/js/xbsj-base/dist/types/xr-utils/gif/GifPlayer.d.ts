import { Player } from '../Player';
import { ParsedFrame } from './gifuct-js';
export declare class GifPlayer extends Player {
    private _container;
    private _gifFrames;
    private _gifDurations;
    private _gifDuration;
    private _gifSize;
    private _autoPlayOnLoad;
    private _gifCanvas;
    get gifCanvas(): HTMLCanvasElement;
    constructor(_container: HTMLDivElement | undefined, autoPlayOnLoad?: boolean, gifFrames?: ParsedFrame[]);
    set gifFrames(value: ParsedFrame[] | undefined);
    get gifFrames(): ParsedFrame[] | undefined;
    get gifFramesChanged(): import("xbsj-base").Listener<[ParsedFrame[] | undefined, ParsedFrame[] | undefined]>;
    get gifSize(): readonly [number, number];
    get gifSizeChanged(): import("xbsj-base").Listener<[[number, number], [number, number]]>;
    get gifDuration(): number;
    get gifDurationChanged(): import("xbsj-base").Listener<[number, number]>;
    get autoPlayOnLoad(): boolean;
    set autoPlayOnLoad(value: boolean);
    get autoPlayOnLoadChanged(): import("xbsj-base").Listener<[boolean, boolean]>;
    private _getFrame;
}
