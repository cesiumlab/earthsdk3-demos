import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { Event, ComplexImage, CzmPixelFormatType, CzmTextureCopyParams, Destroyable, ReactivePropsToNativePropsAndChanged } from "xbsj-base";
import { CzmTextureImpl } from "./CzmTextureImpl";
import * as Cesium from 'cesium';
export * from './SharedTexturePool';
export declare class CzmTexture extends Destroyable {
    private _czmViewer;
    static readonly types: string[];
    static readonly suffixTypes: {
        [k: string]: import("xbsj-base").ComplexImageType;
    };
    private _complexImage;
    get complexImage(): ComplexImage;
    copyTexture(params: CzmTextureCopyParams): void;
    copyFromImage(image: HTMLImageElement): void;
    copyFromCanvas(canvas: HTMLCanvasElement): void;
    private _copyFromClipboardProcessing;
    copyFromClipboard(): void;
    reset(): void;
    private _readyEvent;
    get readyEvent(): Event<[ESCesiumViewer]>;
    private _czmNativeTexture;
    get czmNativeTexture(): CzmTextureImpl;
    getDefaultTexture(): Cesium.Texture;
    get texture(): Cesium.Texture;
    get czmViewer(): ESCesiumViewer;
    private _id;
    get id(): string;
    set id(value: string);
    get idChanged(): import("xbsj-base").Listener<[string, string]>;
    constructor(_czmViewer: ESCesiumViewer, id?: string);
    static defaults: {
        size: [number, number];
        uriType: string;
        czmPixelFormats: string[];
        uriTypes: string[];
    };
}
export declare namespace CzmTexture {
    const createDefaultProps: () => {
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
        enabled: boolean;
        showPreview: boolean;
        size: import("xbsj-base").ReactiveVariable<[width: number, height: number] | undefined>;
        pixelFormat: CzmPixelFormatType;
        flipY: boolean;
        uri: string | undefined;
        uriType: import("xbsj-base").ComplexImageType | undefined;
        crossOrigin: string;
        autoplay: boolean;
        loop: boolean;
    };
}
export interface CzmTexture extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmTexture.createDefaultProps>> {
}
