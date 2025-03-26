import * as Cesium from 'cesium';
export declare class XbsjTileserHisImageryProvider extends Cesium.UrlTemplateImageryProvider {
    private _indexTime;
    get indexTime(): number | string;
    set indexTime(value: number | string);
    constructor(options: any);
    requestImage(x: any, y: any, level: number, request: any): Promise<Cesium.ImageryTypes | Cesium.CompressedTextureBuffer | undefined>;
    buildImageUrl(indexTime: any, x: any, y: any, level: any): string;
}
export declare const getCurrentTileCoordinates: (viewer: any) => Promise<any>;
