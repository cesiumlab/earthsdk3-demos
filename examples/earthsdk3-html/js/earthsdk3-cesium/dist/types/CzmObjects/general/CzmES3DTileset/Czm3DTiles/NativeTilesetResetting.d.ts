import { Destroyable, ObjResettingWithEvent } from "xbsj-base";
import { NativeTilesetReadyResetting } from "./NativeTilesetReadyResetting";
import { ESJResource } from "earthsdk3";
import { Czm3DTiles } from ".";
import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import * as Cesium from 'cesium';
export declare class NativeTilesetResetting extends Destroyable {
    private _url;
    private _czm3DTiles;
    private _czmNativeViewer;
    private _czmViewer;
    get url(): string | ESJResource;
    get czm3DTiles(): Czm3DTiles;
    get czmViewer(): ESCesiumViewer;
    private _tileset;
    get tileset(): Cesium.Cesium3DTileset | undefined;
    set tileset(value: Cesium.Cesium3DTileset | undefined);
    get tilesetChanged(): import("xbsj-base").Listener<[Cesium.Cesium3DTileset | undefined, Cesium.Cesium3DTileset | undefined]>;
    private _readyResetting;
    get readyResetting(): ObjResettingWithEvent<NativeTilesetReadyResetting, import("xbsj-base").Listener<[Cesium.Cesium3DTileset | undefined, Cesium.Cesium3DTileset | undefined]>>;
    constructor(_url: string | ESJResource, _czm3DTiles: Czm3DTiles, _czmNativeViewer: Cesium.Viewer, _czmViewer: ESCesiumViewer);
}
