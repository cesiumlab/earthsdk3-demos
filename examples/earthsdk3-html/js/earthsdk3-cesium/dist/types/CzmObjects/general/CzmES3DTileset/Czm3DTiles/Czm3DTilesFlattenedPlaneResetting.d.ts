import { ESJNativeNumber16 } from "earthsdk3";
import { Destroyable } from "xbsj-base";
import { NativeTilesetReadyResetting } from "./NativeTilesetReadyResetting";
import * as Cesium from 'cesium';
import { CzmFlattenedPlane } from "../../CzmESPolygonFlattenedPlane";
export declare class Czm3DTilesFlattenedPlaneResetting extends Destroyable {
    private _nativeTilesetReadyResetting;
    private _czmFlattenedPlane;
    get czm3DTiles(): import(".").Czm3DTiles;
    get tileset(): Cesium.Cesium3DTileset;
    get czmFlattenedPlane(): CzmFlattenedPlane;
    setFlattened(value: boolean): void;
    setFlattenedBound(value: [number, number, number, number]): void;
    setElevationMatrix(value: ESJNativeNumber16): void;
    constructor(_nativeTilesetReadyResetting: NativeTilesetReadyResetting, _czmFlattenedPlane: CzmFlattenedPlane);
}
