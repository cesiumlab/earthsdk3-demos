import { Destroyable, Event } from "xbsj-base";
import { ObjResettingWithEvent } from "../baseExt";
import { ImageProcessing } from "./ImageProcessing";
import { CzmPixelFormatType } from "./CzmPixelFormatType";
import { ComplexImageType } from "./ComplexImageType";
import { CzmTextureCopyParams } from "./CzmTextureCopyParams";
import { VideoProcessing } from "./VideoProcessing";
import { GifProcessing } from "./GifProcessing";
import { HlsProcessing } from "./HlsProcessing";
import { FlvProcessing } from "./FlvProcessing";
export declare function getTypeFromImageUri(imageUri: string): ComplexImageType | undefined;
/**
 * 用来加载png/jpg/gif/mp4/flv等，未来包括视频流等，然后它的结果可以用来创建一张纹理。
 */
export declare class ComplexImage extends Destroyable {
    static readonly types: string[];
    static readonly czmPixelFormats: string[];
    static readonly suffixTypes: {
        [k: string]: ComplexImageType;
    };
    private _enabled;
    get enabled(): boolean;
    set enabled(value: boolean);
    get enabledChanged(): import("xbsj-base").Listener<[boolean, boolean]>;
    private _uri;
    get uri(): string;
    set uri(value: string);
    get uriChanged(): import("xbsj-base").Listener<[string, string]>;
    private _type;
    get type(): ComplexImageType | undefined;
    set type(value: ComplexImageType | undefined);
    get typeChanged(): import("xbsj-base").Listener<[ComplexImageType | undefined, ComplexImageType | undefined]>;
    private _size;
    get size(): [width: number, height: number] | undefined;
    set size(value: [width: number, height: number] | undefined);
    get sizeChanged(): import("xbsj-base").Listener<[[width: number, height: number] | undefined, [width: number, height: number] | undefined]>;
    private _pixelFormat;
    get pixelFormat(): CzmPixelFormatType;
    set pixelFormat(value: CzmPixelFormatType);
    get pixelFormatChanged(): import("xbsj-base").Listener<[CzmPixelFormatType, CzmPixelFormatType]>;
    private _flipY;
    get flipY(): boolean;
    set flipY(value: boolean);
    get flipYChanged(): import("xbsj-base").Listener<[boolean, boolean]>;
    private _crossOriginReact;
    get crossOrigin(): string | null;
    set crossOrigin(value: string | null);
    get crossOriginChanged(): import("xbsj-base").Listener<[string | null, string | null]>;
    private _autoplayReact;
    get autoplay(): boolean;
    set autoplay(value: boolean);
    get autoplayChanged(): import("xbsj-base").Listener<[boolean, boolean]>;
    private _loopReact;
    get loop(): boolean;
    set loop(value: boolean);
    get loopChanged(): import("xbsj-base").Listener<[boolean, boolean]>;
    private _copyTextureEvent;
    get copyTextureEvent(): Event<[CzmTextureCopyParams]>;
    copyTexture(params: CzmTextureCopyParams): void;
    private _imageProcessingResettingEvent;
    private _imageProcessingResetting;
    get imageProcessingResetting(): ObjResettingWithEvent<ImageProcessing | VideoProcessing | GifProcessing | HlsProcessing | FlvProcessing, import("xbsj-base").NextAnimateFrameEvent>;
    private _createNativeTextureEvent;
    get createNativeTextureEvent(): import("xbsj-base").NextAnimateFrameEvent;
    copyFromCanvas(canvas: HTMLCanvasElement): void;
    constructor();
}
