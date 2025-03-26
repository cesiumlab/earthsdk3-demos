import { ESTerrainLayer } from "earthsdk3";
import { CzmESVisualObject } from "../../base";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import * as Cesium from 'cesium';
import { CzmTerrainProviderJsonType } from "../../../ESJTypesCzm/czmObject/CzmTerrainProviderJsonType";
export declare class CzmESTerrainLayer extends CzmESVisualObject<ESTerrainLayer> {
    static readonly type: void;
    private _provider;
    get provider(): Cesium.TerrainProvider | undefined;
    set provider(value: Cesium.TerrainProvider | undefined);
    get providerChanged(): import("xbsj-base").Listener<[Cesium.TerrainProvider | undefined, Cesium.TerrainProvider | undefined]>;
    private _czmProvider;
    get czmProvider(): CzmTerrainProviderJsonType | undefined;
    get czmProviderChanged(): import("xbsj-base").Listener<[CzmTerrainProviderJsonType | undefined, CzmTerrainProviderJsonType | undefined]>;
    constructor(sceneObject: ESTerrainLayer, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    flyIn(duration: number | undefined, id: number): boolean;
}
