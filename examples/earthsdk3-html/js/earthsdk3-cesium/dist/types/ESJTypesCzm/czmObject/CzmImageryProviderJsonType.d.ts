import { ESJResource, ESJVector3D, ESJVector4D } from "earthsdk3";
import { CzmTilingSchemaJsonType } from "./CzmTilingSchemaJsonType";
import { JsonValue } from "xbsj-base";
import { CzmTimeIntervalCollectionJsonType } from "./CzmTimeIntervalJsonType";
export type CzmBingMapsStyle = 'AERIAL' | 'AERIAL_WITH_LABELS' | 'AERIAL_WITH_LABELS_ON_DEMAND' | 'ROAD' | 'ROAD_ON_DEMAND' | 'CANVAS_DARK' | 'CANVAS_LIGHT' | 'CANVAS_GRAY' | 'ORDNANCE_SURVEY' | 'COLLINS_BART';
export type CzmImageryProviderJsonType = {
    type: 'ArcGisMapServerImageryProvider';
    url: string | ESJResource;
    token?: string;
    usePreCachedTilesIfAvailable?: boolean;
    layers?: string;
    enablePickFeatures?: boolean;
    rectangle?: ESJVector4D;
    tilingScheme?: CzmTilingSchemaJsonType;
    ellipsoid?: ESJVector3D;
    credit?: string;
    tileWidth?: number;
    tileHeight?: number;
    maximumLevel?: number;
} | {
    type: 'BingMapsImageryProvider';
    url: string | ESJResource;
    key: string;
    tileProtocol?: string;
    mapStyle?: CzmBingMapsStyle;
    culture?: string;
    ellipsoid?: ESJVector3D;
} | {
    type: 'GoogleEarthEnterpriseImageryProvider';
    url: string | ESJResource;
    metadata: string;
    ellipsoid?: ESJVector3D;
    credit?: string;
} | {
    type: 'GridImageryProvider';
    tilingScheme?: CzmTilingSchemaJsonType;
    ellipsoid?: ESJVector3D;
    cells?: number;
    color?: ESJVector4D;
    glowColor?: ESJVector4D;
    glowWidth?: number;
    backgroundColor?: ESJVector4D;
    tileWidth?: number;
    tileHeight?: number;
    canvasSize?: number;
} | {
    type: 'IonImageryProvider';
    assetId: number;
    accessToken?: string;
    server?: string;
} | {
    type: 'MapboxImageryProvider';
    url?: string;
    mapId: string;
    accessToken: string;
    format?: string;
    ellipsoid?: ESJVector3D;
    minimumLevel?: number;
    maximumLevel?: number;
    rectangle?: ESJVector4D;
    credit?: string;
} | {
    type: 'MapboxStyleImageryProvider';
    url?: string;
    username?: string;
    styleId: string;
    accessToken: string;
    tilesize?: number;
    scaleFactor?: boolean;
    rectangle?: [west: number, south: number, east: number, north: number];
    credit?: string;
    ellipsoid?: [x: number, y: number, z: number];
    minimumLevel?: number;
    maximumLevel?: number;
} | {
    type: 'OpenStreetMapImageryProvider';
    url: string;
    rectangle?: [west: number, south: number, east: number, north: number];
    credit?: string;
    ellipsoid?: [x: number, y: number, z: number];
    minimumLevel?: number;
    maximumLevel?: number;
    fileExtension?: string;
} | {
    type: 'SingleTileImageryProvider';
    url: string | ESJResource;
    rectangle?: [west: number, south: number, east: number, north: number];
    credit?: string;
    ellipsoid?: [x: number, y: number, z: number];
} | {
    type: 'TileCoordinatesImageryProvider';
    tilingScheme?: CzmTilingSchemaJsonType;
    ellipsoid?: [x: number, y: number, z: number];
    color: [number, number, number, number];
    tileWidth?: number;
    tileHeight?: number;
} | {
    type: 'TileMapServiceImageryProvider';
    url?: string | ESJResource;
    fileExtension?: string;
    credit?: string;
    minimumLevel?: number;
    maximumLevel?: number;
    rectangle?: [west: number, south: number, east: number, north: number];
    tilingScheme?: CzmTilingSchemaJsonType;
    ellipsoid?: [x: number, y: number, z: number];
    tileWidth?: number;
    tileHeight?: number;
    flipXY?: boolean;
} | {
    type: 'UrlTemplateImageryProvider';
    url: string | ESJResource;
    subdomains?: string | string[];
    credit?: string;
    minimumLevel?: number;
    maximumLevel?: number;
    rectangle?: [west: number, south: number, east: number, north: number];
    tilingScheme?: CzmTilingSchemaJsonType;
    ellipsoid?: [x: number, y: number, z: number];
    tileWidth?: number;
    tileHeight?: number;
    hasAlphaChannel?: boolean;
    pickFeaturesUrl?: string;
    enablePickFeatures?: boolean;
    urlSchemeZeroPadding?: JsonValue;
    customTags?: {
        [k: string]: string;
    };
} | {
    type: 'WebMapServiceImageryProvider';
    url: string | ESJResource;
    layers: string;
    parameters?: JsonValue;
    getFeatureInfoParameters?: JsonValue;
    enablePickFeatures?: boolean;
    rectangle?: [west: number, south: number, east: number, north: number];
    tilingScheme?: CzmTilingSchemaJsonType;
    ellipsoid?: [x: number, y: number, z: number];
    minimumLevel?: number;
    maximumLevel?: number;
    tileWidth?: number;
    tileHeight?: number;
    crs?: string;
    srs?: string;
    credit?: string;
    subdomains?: string | string[];
    times?: CzmTimeIntervalCollectionJsonType;
    getFeatureInfoUrl?: string;
} | {
    type: 'WebMapTileServiceImageryProvider';
    url: string | ESJResource;
    format?: string;
    layer: string;
    style: string;
    tileMatrixSetID: string;
    tileMatrixLabels?: string[];
    times?: CzmTimeIntervalCollectionJsonType;
    dimensions?: JsonValue;
    tileWidth?: number;
    tileHeight?: number;
    tilingScheme?: CzmTilingSchemaJsonType;
    rectangle?: [west: number, south: number, east: number, north: number];
    minimumLevel?: number;
    maximumLevel?: number;
    ellipsoid?: [x: number, y: number, z: number];
    credit?: string;
    subdomains?: string | string[];
} | {
    type: 'BDImageryProvider';
    url?: string;
    wgs84?: boolean;
    ellipsoid?: [x: number, y: number, z: number];
} | {
    type: 'GeHistoryImagery';
    indexTime: string | number;
} | {
    type: 'ArcgisHistoryImagery';
    indexTimeID: string | number;
} | {
    type: "MVTImageryProvider";
    url: string | {
        [xx: string]: any;
    } | ESJResource;
    accessToken?: string;
    tileSize?: number;
    maximumLevel?: number;
    minimumLevel?: number;
    enablePickFeatures?: boolean;
    rectangle?: [west: number, south: number, east: number, north: number];
    style?: {
        [xx: string]: any;
    }[];
};
