import { Destroyable } from "xbsj-base";
import { Czm3DTiles } from ".";
import * as Cesium from 'cesium';
export declare class RelativeClippingPlaneCollectionUpdating extends Destroyable {
    private _tileset;
    private _czm3DTiles;
    get tileset(): Cesium.Cesium3DTileset;
    get czm3DTiles(): Czm3DTiles;
    constructor(_tileset: Cesium.Cesium3DTileset, _czm3DTiles: Czm3DTiles);
}
