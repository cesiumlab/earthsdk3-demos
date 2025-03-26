import { ESJResource } from "earthsdk3";
import { CzmTilingSchemaJsonType } from "./CzmTilingSchemaJsonType";
export type CzmTerrainProviderJsonType = {
    type: 'ArcGISTiledElevationTerrainProvider';
    url: string | ESJResource;
    token?: string;
    ellipsoid?: [x: number, y: number, z: number];
} | {
    type: 'CesiumTerrainProvider';
    url: string | ESJResource;
    requestVertexNormals?: boolean;
    requestWaterMask?: boolean;
    requestMetadata?: boolean;
    ellipsoid?: [x: number, y: number, z: number];
    credit?: string;
} | {
    type: 'CustomHeightmapTerrainProvider';
    callback: string;
    width: number;
    height: number;
    tilingScheme?: CzmTilingSchemaJsonType;
    ellipsoid?: [x: number, y: number, z: number];
    credit?: string;
} | {
    type: 'EllipsoidTerrainProvider';
    tilingScheme?: CzmTilingSchemaJsonType;
    ellipsoid?: [x: number, y: number, z: number];
} | {
    type: 'GoogleEarthEnterpriseTerrainProvider';
    url: string;
    metadata: string;
    ellipsoid?: [x: number, y: number, z: number];
    credit?: string;
} | {
    type: 'VRTheWorldTerrainProvider';
    url: string | ESJResource;
    ellipsoid?: [x: number, y: number, z: number];
    credit?: string;
};
