import * as Cesium from 'cesium';
import { Destroyable, ObjResettingWithEvent } from "xbsj-base";
import { Czm3DTiles, Czm3DTilesCustomShaderClassType } from ".";
import { AbsoluteClippingPlaneCollectionUpdating } from "./AbsoluteClippingPlaneCollectionUpdating";
import { RelativeClippingPlaneCollectionUpdating } from "./RelativeClippingPlaneCollectionUpdating";
import { ClippingPolygonCollectionUpdating } from "./ClippingPolygonCollectionUpdating";
import { ESCesiumViewer } from "../../../../ESCesiumViewer";
export declare class NativeTilesetReadyResetting extends Destroyable {
    private _tileset;
    private _czm3DTiles;
    private _czmNativeViewer;
    private _czmViewer;
    get tileset(): Cesium.Cesium3DTileset;
    get czm3DTiles(): Czm3DTiles;
    private _clippingPlanesCollectionResetting;
    get clippingPlanesCollectionResetting(): ObjResettingWithEvent<AbsoluteClippingPlaneCollectionUpdating | RelativeClippingPlaneCollectionUpdating, import("xbsj-base").Listener<[boolean, boolean]>>;
    private _clippingPolygonCollectionResetting;
    get clippingPolygonCollectionResetting(): ClippingPolygonCollectionUpdating;
    private _flattenedCustomShader;
    get flattenedCustomShader(): Czm3DTilesCustomShaderClassType | undefined;
    set flattenedCustomShader(value: Czm3DTilesCustomShaderClassType | undefined);
    get flattenedCustomShaderChanged(): import("xbsj-base").Listener<[Czm3DTilesCustomShaderClassType | undefined, Czm3DTilesCustomShaderClassType | undefined]>;
    constructor(_tileset: Cesium.Cesium3DTileset, _czm3DTiles: Czm3DTiles, _czmNativeViewer: Cesium.Viewer, _czmViewer: ESCesiumViewer);
}
