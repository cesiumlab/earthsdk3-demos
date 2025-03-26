import * as Cesium from 'cesium';
import { ComplexImage, CzmTextureCopyParams, Destroyable, ObjResettingWithEvent } from 'xbsj-base';
export declare class CzmTextureImpl extends Destroyable {
    private _czmViewer;
    private _comlexImage;
    get czmViewer(): Cesium.Viewer;
    get comlexImage(): ComplexImage;
    private _nativeTextureResetting;
    get nativeTextureResetting(): ObjResettingWithEvent<Cesium.Texture, import("xbsj-base").NextAnimateFrameEvent>;
    get nativeTextureChanged(): import("xbsj-base").Listener<[Cesium.Texture | undefined, Cesium.Texture | undefined]>;
    get nativeTexture(): Cesium.Texture | undefined;
    copyTexture(params: CzmTextureCopyParams): void;
    constructor(_czmViewer: Cesium.Viewer, _comlexImage: ComplexImage);
}
