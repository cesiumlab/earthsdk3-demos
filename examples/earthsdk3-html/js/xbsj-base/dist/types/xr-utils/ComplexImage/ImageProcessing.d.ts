import { Destroyable } from "xbsj-base";
import { ComplexImage } from "./ComplexImage";
/**
 * 针对普通的网页可以加载的PNG/JPG/WebP图片，或者BitMap图片
 * TODO BitMap图片可能还未能支持
 */
export declare class ImageProcessing extends Destroyable {
    private _complexImage;
    private _imageUri;
    private _processing;
    private _processingStart;
    get processing(): import("../Processings").Processing<void, []>;
    constructor(_complexImage: ComplexImage, _imageUri: string);
}
