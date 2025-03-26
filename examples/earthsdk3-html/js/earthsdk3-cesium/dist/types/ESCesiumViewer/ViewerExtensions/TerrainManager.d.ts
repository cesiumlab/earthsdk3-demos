import { Destroyable } from "xbsj-base";
import * as Cesium from 'cesium';
import { CzmESTerrainLayer } from "../../CzmObjects/general/CzmESTerrainLayer";
export declare class TerrainManager extends Destroyable {
    private _viewer;
    private _terrainMap;
    private _nextAnimateFrame;
    private _makeDirty;
    private get _changed();
    constructor(_viewer: Cesium.Viewer);
    add(terrain: CzmESTerrainLayer): void;
    delete(terrain: CzmESTerrainLayer): void;
}
