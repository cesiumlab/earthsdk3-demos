import * as Cesium from 'cesium';
export declare class XbsjTileserArcgisHisImageryProvider extends Cesium.UrlTemplateImageryProvider {
    private _indexTimeID;
    get indexTimeID(): number | string;
    set indexTimeID(value: number | string);
    constructor(options: any);
    requestImage(x: any, y: any, level: any, request: any): Promise<Cesium.ImageryTypes | Cesium.CompressedTextureBuffer | undefined>;
    buildImageUrl(indexTimeID: any, x: any, y: any, level: any): string;
}
export declare function getCurrentTileCoordinates(viewer: {
    scene: any;
}): Promise<any>;
