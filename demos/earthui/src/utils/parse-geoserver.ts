/**
 * 解析GeoServer的 wms/wmts服务,格式以cesium支持的格式返回
 */

import { getUuid } from "./getUuid"

// http://localhost:8080/earthui/index.html?from=GeoServer&url=http%3A%2F%2F192.168.0.137%3A8080%2Fgeoserver%2Fvectorrts%2Fwms%3Fservice%3DWMS%26version%3D1.1.1%26request%3DGetMap%26layers%3Dvectorrts%3Avector_rts_50&type=images&name=%E9%85%8D%E5%9B%BE%E6%A8%A1%E6%9D%BF&west=115.4294304&east=117.508829&south=39.5054387&north=41.0582213


//解析后
// {
//     "id": "35197185-d58e-4c03-bbbb-38085dfc72bf",
//     "type": "ESImageryLayer",
//     "name": "vectorrts:vector_rts_50",
//     "url": "http://192.168.0.137:8080/geoserver/vectorrts/wms",
//     "options": {
//         "type": "wms",
//         "layers": "vectorrts:vector_rts_50",
//         "parameters": {
//             "service": "WMS",
//             "version": "1.1.1"
//         }
//     },
//     "zIndex": 3
// }



//wms 参数格式
// {
//     credit ?: string;
//     crs ?: string;
//     ellipsoid ?: [x: number, y: number, z: number];
//     enablePickFeatures ?: boolean;
//     getFeatureInfoParameters ?: JsonValue;
//     getFeatureInfoUrl ?: string;
//     layers: string;
//     parameters ?: JsonValue;
//     srs ?: string;
//     subdomains ?: string | string[];
//     tileHeight ?: number;
//     tileWidth ?: number;
//     tilingScheme ?: ESTilingSchemaJsonType;
//     times ?: ESJTimeIntervalCollectionJsonType;
//     type: "wms";
// }


// ESTilingSchemaJsonType:
//     | {
//     ellipsoid?: [x: number, y: number, z: number];
//     numberOfLevelZeroTilesX?: number;
//     numberOfLevelZeroTilesY?: number;
//     rectangleNortheastInMeters?: [number, number];
//     rectangleSouthwestInMeters?: [number, number];
//     type: "WebMercatorTilingScheme";
// }
//     | {
//     ellipsoid?: [x: number, y: number, z: number];
//     numberOfLevelZeroTilesX?: number;
//     numberOfLevelZeroTilesY?: number;
//     rectangle?: [west: number, south: number, east: number, north: number];
//     type: "GeographicTilingScheme";
// }
//     | {
//     ellipsoid?: [x: number, y: number, z: number];
//     numberOfLevelZeroTilesX?: number;
//     numberOfLevelZeroTilesY?: number;
//     rectangleNortheastInMeters?: [number, number];
//     rectangleSouthwestInMeters?: [number, number];
//     type: "ToGCJ02WebMercatorTilingScheme";
// }
//     | {
//     ellipsoid?: [x: number, y: number, z: number];
//     numberOfLevelZeroTilesX?: number;
//     numberOfLevelZeroTilesY?: number;
//     rectangleNortheastInMeters?: [number, number];
//     rectangleSouthwestInMeters?: [number, number];
//     type: "ToWGS84WebMercatorTilingScheme";
// }


// ESJTimeIntervalCollectionJsonType:
//     | {
//     iso8601: string;
//     isStartIncluded?: boolean;
//     isStopIncluded?: boolean;
//     leadingInterval?: boolean;
//     trailingInterval?: boolean;
//     type: "fromIso8601";
// }
//     | {
//     iso8601Dates?: string[];
//     isStartIncluded?: boolean;
//     isStopIncluded?: boolean;
//     leadingInterval?: boolean;
//     trailingInterval?: boolean;
//     type: "fromIso8601DateArray";
// }

export const parseGeoServer = () => {
    const params = new URLSearchParams(window.location.search);

    const name = params.get('name') ?? '未知图层';
    const west = params.get('west') ?? '-180';
    const east = params.get('east') ?? '180';
    const south = params.get('south') ?? '-90';
    const north = params.get('north') ?? '90';
    const rectangle = [+west, +south, +east, +north];

    const wmsUrl = params.get('url') ?? '';
    const wmsParam = new URL(wmsUrl);
    const service = wmsParam.searchParams.get('service') ?? 'WMS';
    const height = wmsParam.searchParams.get('height') ?? undefined;
    const width = wmsParam.searchParams.get('width') ?? undefined;

    // const version = wmsParam.get('version') ?? undefined;
    // const layers = wmsParam.get('layers') ?? undefined;
    // const styles = wmsParam.get('styles') ?? undefined;
    // const format = wmsParam.get('format') ?? undefined;
    // const srs = wmsParam.get('srs');
    // const crs = wmsParam.get('crs');
    // const credit = wmsParam.get('credit');
    // const ellipsoid = wmsParam.get('ellipsoid');
    // const enablePickFeatures = wmsParam.get('enablePickFeatures');
    // const getFeatureInfoParameters = wmsParam.get('getFeatureInfoParameters');
    // const getFeatureInfoUrl = wmsParam.get('getFeatureInfoUrl');
    // const subdomains = wmsParam.get('subdomains');

    const paramsObj = Object.fromEntries(wmsParam.searchParams.entries());
    console.log('paramsObj', paramsObj);

    const layer = {
        id: getUuid(),
        type: 'ESImageryLayer',
        zIndex: 1,
        name,
        rectangle,
        url: wmsParam.origin + wmsParam.pathname,
        options: {
            type: service.toLowerCase(),
            tileHeight: height,
            tileWidth: width,
            // layers: layers,
            // srs,
            // credit,
            // crs,
            // ellipsoid,
            // enablePickFeatures,
            // getFeatureInfoParameters,
            // getFeatureInfoUrl,
            // subdomains,
            ...paramsObj,
            parameters: {
                service,
                // version,
                // styles,
                // format,
                ...paramsObj
            }
        }
    }

    return layer;
}
