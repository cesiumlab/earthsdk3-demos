import { ESJVector2D, ESJVector3D, ESJVector4D } from "earthsdk3";
export type CzmTilingSchemaJsonType = {
    type: 'WebMercatorTilingScheme';
    ellipsoid?: ESJVector3D;
    numberOfLevelZeroTilesX?: number;
    numberOfLevelZeroTilesY?: number;
    rectangleSouthwestInMeters?: ESJVector2D;
    rectangleNortheastInMeters?: ESJVector2D;
} | {
    type: 'GeographicTilingScheme';
    ellipsoid?: ESJVector3D;
    rectangle?: ESJVector4D;
    numberOfLevelZeroTilesX?: number;
    numberOfLevelZeroTilesY?: number;
} | {
    type: 'ToGCJ02WebMercatorTilingScheme';
    ellipsoid?: ESJVector3D;
    numberOfLevelZeroTilesX?: number;
    numberOfLevelZeroTilesY?: number;
    rectangleSouthwestInMeters?: ESJVector2D;
    rectangleNortheastInMeters?: ESJVector2D;
} | {
    type: 'ToWGS84WebMercatorTilingScheme';
    ellipsoid?: ESJVector3D;
    numberOfLevelZeroTilesX?: number;
    numberOfLevelZeroTilesY?: number;
    rectangleSouthwestInMeters?: ESJVector2D;
    rectangleNortheastInMeters?: ESJVector2D;
};
