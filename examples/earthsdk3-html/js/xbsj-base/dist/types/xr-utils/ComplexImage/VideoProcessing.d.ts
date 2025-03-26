import { Destroyable } from "xbsj-base";
import { ComplexImage } from "./ComplexImage";
declare class VideoDom extends Destroyable {
    private _complexImage;
    private _videoSrc;
    private _element;
    get element(): HTMLVideoElement;
    constructor(_complexImage: ComplexImage, _videoSrc: string);
}
export declare class VideoProcessing extends Destroyable {
    private _complexImage;
    private _imageUri;
    private _videoDom;
    get videoDom(): VideoDom;
    get videoElement(): HTMLVideoElement;
    update(): void;
    private _update;
    private _updateStart;
    constructor(_complexImage: ComplexImage, _imageUri: string);
}
export {};
