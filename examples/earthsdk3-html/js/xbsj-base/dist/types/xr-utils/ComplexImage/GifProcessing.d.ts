import { Gif } from "../gif";
import { Destroyable } from "../base";
import { ComplexImage } from "./ComplexImage";
export declare class GifProcessing extends Destroyable {
    private _complexImage;
    private _imageUri;
    private _gif;
    get gif(): Gif;
    update(): void;
    private _update;
    private _updateStart;
    constructor(_complexImage: ComplexImage, _imageUri: string);
}
