import * as Cesium from 'cesium';
import { CzmTilingSchemaJsonType } from '../../ESJTypesCzm';
export declare function createTilingSchema(tilingSchemaJson: CzmTilingSchemaJsonType): Cesium.GeographicTilingScheme | Cesium.WebMercatorTilingScheme | undefined;
