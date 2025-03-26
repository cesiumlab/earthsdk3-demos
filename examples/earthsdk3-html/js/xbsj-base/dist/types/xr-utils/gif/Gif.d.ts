import { Destroyable } from 'xbsj-base';
import { GifPlayer } from './GifPlayer';
export declare class Gif extends Destroyable {
    private _player;
    get player(): GifPlayer;
    private _url;
    set url(value: string);
    get url(): string;
    private _loadGifFramesProcessing;
    constructor(container?: HTMLDivElement | undefined);
    get loadedEvent(): import("xbsj-base").Event<[{
        gif: import("./gifuct-js").ParsedGif;
        gifFrames: import("./gifuct-js").ParsedFrame[];
        arrayBuffer: ArrayBuffer;
    }]>;
    get size(): readonly [number, number];
    get sizeChanged(): import("xbsj-base").Listener<[[number, number], [number, number]]>;
    get duration(): number;
    get durationChanged(): import("xbsj-base").Listener<[number, number]>;
}
