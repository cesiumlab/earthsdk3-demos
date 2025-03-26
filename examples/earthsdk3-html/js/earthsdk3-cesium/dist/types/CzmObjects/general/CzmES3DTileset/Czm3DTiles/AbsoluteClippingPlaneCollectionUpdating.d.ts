import { Destroyable, Event } from "xbsj-base";
import { Czm3DTiles } from ".";
import * as Cesium from 'cesium';
export declare class AbsoluteClippingPlaneCollectionUpdating extends Destroyable {
    private _tileset;
    private _czm3DTiles;
    private _updateMatrixEvent;
    get tileset(): Cesium.Cesium3DTileset;
    get czm3DTiles(): Czm3DTiles;
    constructor(_tileset: Cesium.Cesium3DTileset, _czm3DTiles: Czm3DTiles, _updateMatrixEvent: Event);
}
