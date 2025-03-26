import { Destroyable, Event } from "xbsj-base";
import { ComplexImage } from "./ComplexImage";
export declare class HlsJsLoading extends Destroyable {
    static path: string;
    private _loading;
    get loading(): boolean;
    private _loadedEvent;
    get loadedEvent(): Event<[]>;
    private _loaded;
    get loaded(): boolean;
    private _loadedPromiseResolve;
    private _loadedPromise;
    get loadedPromise(): Promise<void>;
    private _processing;
    private _processingStart;
    get processing(): import("../Processings").Processing<void, []>;
    constructor();
    static _instance: HlsJsLoading | undefined;
    static instance(): HlsJsLoading;
}
declare class VideoDom extends Destroyable {
    private _complexImage;
    private _videoSrc;
    private _element;
    get element(): HTMLVideoElement;
    constructor(_complexImage: ComplexImage, _videoSrc: string);
}
declare class HlsVideoDom extends Destroyable {
    private _complexImage;
    private _videoSrc;
    get videoSrc(): string;
    private _videoDom;
    get videoDom(): VideoDom;
    get element(): HTMLVideoElement;
    private _processing;
    private _processingStartup;
    get processing(): import("../Processings").Processing<void, []>;
    constructor(_complexImage: ComplexImage, _videoSrc: string);
}
export declare class HlsProcessing extends Destroyable {
    private _complexImage;
    private _imageUri;
    private _videoDom;
    get videoDom(): HlsVideoDom;
    get videoElement(): HTMLVideoElement;
    update(): void;
    private _update;
    private _updateStart;
    constructor(_complexImage: ComplexImage, _imageUri: string);
}
export {};
