import { JsonValue } from "xbsj-base";
export type CzmSplitDirectionType = 'LEFT' | 'NONE' | 'RIGHT';
export declare type CzmTimeIntervalCollectionJsonType = {
    type: 'fromIso8601';
    iso8601: string;
    isStartIncluded?: boolean;
    isStopIncluded?: boolean;
    leadingInterval?: boolean;
    trailingInterval?: boolean;
} | {
    type: 'fromIso8601DateArray';
    iso8601Dates?: string[];
    isStartIncluded?: boolean;
    isStopIncluded?: boolean;
    leadingInterval?: boolean;
    trailingInterval?: boolean;
};
export declare type ESTilingSchemaJsonType = {
    type: 'WebMercatorTilingScheme';
    ellipsoid?: [x: number, y: number, z: number];
    numberOfLevelZeroTilesX?: number;
    numberOfLevelZeroTilesY?: number;
    rectangleSouthwestInMeters?: [number, number];
    rectangleNortheastInMeters?: [number, number];
} | {
    type: 'GeographicTilingScheme';
    ellipsoid?: [x: number, y: number, z: number];
    rectangle?: [west: number, south: number, east: number, north: number];
    numberOfLevelZeroTilesX?: number;
    numberOfLevelZeroTilesY?: number;
} | {
    type: 'ToGCJ02WebMercatorTilingScheme';
    ellipsoid?: [x: number, y: number, z: number];
    numberOfLevelZeroTilesX?: number;
    numberOfLevelZeroTilesY?: number;
    rectangleSouthwestInMeters?: [number, number];
    rectangleNortheastInMeters?: [number, number];
} | {
    type: 'ToWGS84WebMercatorTilingScheme';
    ellipsoid?: [x: number, y: number, z: number];
    numberOfLevelZeroTilesX?: number;
    numberOfLevelZeroTilesY?: number;
    rectangleSouthwestInMeters?: [number, number];
    rectangleNortheastInMeters?: [number, number];
};
export type ESImageryLayerOptionsType = {
    type: 'tms';
    fileExtension?: string;
    credit?: string;
    tilingScheme?: ESTilingSchemaJsonType;
    ellipsoid?: [x: number, y: number, z: number];
    tileWidth?: number;
    tileHeight?: number;
    flipXY?: boolean;
} | {
    type: 'xyz';
    subdomains?: string | string[];
    credit?: string;
    tilingScheme?: ESTilingSchemaJsonType;
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
    type: 'wms';
    layers: string;
    parameters?: JsonValue;
    getFeatureInfoParameters?: JsonValue;
    enablePickFeatures?: boolean;
    tilingScheme?: ESTilingSchemaJsonType;
    ellipsoid?: [x: number, y: number, z: number];
    tileWidth?: number;
    tileHeight?: number;
    crs?: string;
    srs?: string;
    credit?: string;
    subdomains?: string | string[];
    times?: CzmTimeIntervalCollectionJsonType;
    getFeatureInfoUrl?: string;
} | {
    type: 'wmts';
    format?: string;
    layer: string;
    style: string;
    tileMatrixSetID: string;
    tileMatrixLabels?: string[];
    times?: CzmTimeIntervalCollectionJsonType;
    dimensions?: JsonValue;
    tileWidth?: number;
    tileHeight?: number;
    tilingScheme?: ESTilingSchemaJsonType;
    ellipsoid?: [x: number, y: number, z: number];
    credit?: string;
    subdomains?: string | string[];
} | {
    type: 'ion';
    accessToken?: string;
    server?: string;
};
export declare const optionsStr = "\n# \u58F0\u660E\u6587\u4EF6\n### options \u7C7B\u578B\n```javascript\n   export type ESImageryLayerOptionsType =\n    {\n        \"type\": \"tms\";\n        \"fileExtension\"?: string; \n        \"credit\"?: string;\n        \"tilingScheme\"?: ESTilingSchemaJsonType; \n        \"ellipsoid\"?: [x: number, y: number, z: number]; \n        \"tileWidth\"?: number; \n        \"tileHeight\"?: number; \n        \"flipXY\"?: boolean; \n    } |\n    {\n        type: 'xyz';\n        subdomains?: string | string[];\n        credit?: string;\n        tilingScheme?: ESTilingSchemaJsonType;\n        ellipsoid?: [x: number, y: number, z: number]; \n        tileWidth?: number; \n        tileHeight?: number; \n        hasAlphaChannel?: boolean;\n        pickFeaturesUrl?: string;\n        enablePickFeatures?: boolean;\n        urlSchemeZeroPadding?: JsonValue,\n        customTags?: { [k: string]: string };\n    } |\n    {\n        type: 'wms';\n        layers: string;\n        parameters?: JsonValue,\n        getFeatureInfoParameters?: JsonValue,\n        enablePickFeatures?: boolean,\n        tilingScheme?: ESTilingSchemaJsonType; \n        ellipsoid?: [x: number, y: number, z: number];\n        tileWidth?: number; \n        tileHeight?: number; \n        crs?: string,\n        srs?: string,\n        credit?: string;\n        subdomains?: string | string[]; \n        times?: CzmTimeIntervalCollectionJsonType; \n        getFeatureInfoUrl?: string\n    } |\n    {\n        type: 'wmts';\n        format?: string; \n        layer: string;\n        style: string; \n        tileMatrixSetID: string;\n        tileMatrixLabels?: string[];\n        times?: CzmTimeIntervalCollectionJsonType;\n        dimensions?: JsonValue;\n        tileWidth?: number;\n        tileHeight?: number;\n        tilingScheme?: ESTilingSchemaJsonType;\n        ellipsoid?: [x: number, y: number, z: number]; \n        credit?: string; \n        subdomains?: string | string[]; \n    } |\n    {\n        type: 'ion';\n        accessToken?: string,\n        server?: string\n    }\n```\n\n### tilingSchema\u7C7B\u578B\n```javascript\n    export type ESTilingSchemaJsonType = {\n        \"type\": \"WebMercatorTilingScheme\";\n        \"ellipsoid\"?: [x: number, y: number, z: number];\n        \"numberOfLevelZeroTilesX\"?: number; .\n        \"numberOfLevelZeroTilesY\"?: number;\n        \"rectangleSouthwestInMeters\"?: [number, number];\n        \"rectangleNortheastInMeters\"?: [number, number];\n    } | {\n        \"type\": \"GeographicTilingScheme\";\n        \"ellipsoid\"?: [x: number, y: number, z: number];\n        \"rectangle\"?: [west: number, south: number, east: number, north: number];\n        \"numberOfLevelZeroTilesX\"?: number;\n        \"numberOfLevelZeroTilesY\"?: number;\n    }\n```\n\n### times\u7C7B\u578B\n```javascript\nexport type CzmTimeIntervalCollectionJsonType = {\n    type: 'fromIso8601';\n    iso8601: string;\n    isStartIncluded?: boolean;\n    isStopIncluded?: boolean;\n    leadingInterval?: boolean;\n    trailingInterval?: boolean;\n} | {\n    type: 'fromIso8601DateArray';\n    iso8601Dates?: string[];\n    isStartIncluded?: boolean;\n    isStopIncluded?: boolean;\n    leadingInterval?: boolean;\n    trailingInterval?: boolean;\n};\n\n```\n";
