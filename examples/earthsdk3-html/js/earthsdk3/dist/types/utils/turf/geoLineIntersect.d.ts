import { ESJVector3DArray } from '../../ESJTypes';
/**
 * @description  线段相交的点
 * @param l0  线段1
 * @param l1  线段2
 * @returns   线段1和线段2的交点
 */
export declare function geoLineIntersect(l0: ESJVector3DArray, l1: ESJVector3DArray): import("@turf/helpers").FeatureCollection<import("@turf/helpers").Point, import("@turf/helpers").Properties>;
