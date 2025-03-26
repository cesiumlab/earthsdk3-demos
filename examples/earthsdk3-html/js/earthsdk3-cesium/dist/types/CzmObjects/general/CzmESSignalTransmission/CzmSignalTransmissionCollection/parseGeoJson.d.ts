import { Feature, GeoJSON, Geometry } from 'geojson';
import { STCRoutePathType } from '.';
export declare function getGeoJsonNodeIterator(geoJsonNode: GeoJSON): Generator<[Geometry, Feature<Geometry, import("geojson").GeoJsonProperties>], void, undefined>;
export declare function geoPolylinesFromGeoJson(geoJsonNode: GeoJSON): Generator<[number[][], Feature<Geometry, import("geojson").GeoJsonProperties>], void, unknown>;
export declare function getSTCRoutePathsFromGeoJson(geoJsonNode: GeoJSON, width: number, repeatLength: number): STCRoutePathType[];
