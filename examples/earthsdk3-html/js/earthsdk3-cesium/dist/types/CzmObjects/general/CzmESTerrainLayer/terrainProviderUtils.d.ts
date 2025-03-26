import * as Cesium from 'cesium';
import { CzmTerrainProviderJsonType } from '../../../ESJTypesCzm/czmObject/CzmTerrainProviderJsonType';
import { ESCesiumViewer } from '../../../ESCesiumViewer';
export declare function getFinalTerrainProviderUrl(url: string): string | Promise<Cesium.IonResource> | undefined;
export declare function getFinalTerrainProviderUrlString(url: string): string | undefined;
export declare function createTerrainProviderFromJson(terrainProviderJson: CzmTerrainProviderJsonType, czmViewer: ESCesiumViewer): Promise<Cesium.TerrainProvider | undefined>;
