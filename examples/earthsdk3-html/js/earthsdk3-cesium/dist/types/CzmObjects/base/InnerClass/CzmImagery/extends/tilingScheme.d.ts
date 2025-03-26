import * as Cesium from 'cesium';
declare class ToGCJ02WebMercatorTilingScheme extends Cesium.WebMercatorTilingScheme {
    constructor(options: {
        ellipsoid?: Cesium.Ellipsoid;
        numberOfLevelZeroTilesX?: number;
        numberOfLevelZeroTilesY?: number;
        rectangleSouthwestInMeters?: Cesium.Cartesian2;
        rectangleNortheastInMeters?: Cesium.Cartesian2;
    });
}
declare class ToWGS84WebMercatorTilingScheme extends Cesium.WebMercatorTilingScheme {
    constructor(options: {
        ellipsoid?: Cesium.Ellipsoid;
        numberOfLevelZeroTilesX?: number;
        numberOfLevelZeroTilesY?: number;
        rectangleSouthwestInMeters?: Cesium.Cartesian2;
        rectangleNortheastInMeters?: Cesium.Cartesian2;
    });
}
export { ToGCJ02WebMercatorTilingScheme, ToWGS84WebMercatorTilingScheme };
