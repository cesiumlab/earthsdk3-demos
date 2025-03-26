import { ESJVector2DArray, ESJVector3D, ESJVector3DArray } from '../../ESJTypes';
/**
 * @description 两个多边形交集计算
 * @param polygon1 多边形1
 * @param polygon2 多边形2
 * @returns  两个多边形交集多边形
 */
declare function geoIntersect(polygon1: ESJVector3DArray, polygon2: ESJVector3DArray): ESJVector2DArray[] | ESJVector2DArray[][] | undefined;
/**
 * @description 两个多边形并集计算
 * @param polygon1 多边形1
 * @param polygon2 多边形2
 * @returns  两个多边形并集多边形，一个或者多个多边形
 */
declare function geoUnion(polygon1: ESJVector3DArray, polygon2: ESJVector3DArray): ESJVector2DArray[] | ESJVector2DArray[][] | undefined;
/**
 * @description 线条缓冲区
 * @param line 线
 * @param radius  半径
 * @param units   单位默认m
 * @returns   线条缓冲区多边形
 */
declare function geoBuffer(line: ESJVector3DArray, radius?: number, units?: string): ESJVector2DArray[] | undefined;
/**
 * @description 两个多边形差异计算
 * @param polygon1 多边形1
 * @param polygon2  多边形2
 * @returns   两个多边形差异多边形，一个或者多个多边形
 */
declare function geoDifference(polygon1: ESJVector3DArray, polygon2: ESJVector3DArray): ESJVector2DArray[] | ESJVector2DArray[][] | undefined;
/**
 * @description 圆形转变多边形
 * @param center   圆心
 * @param radius  半径
 * @param steps   圆周点数
 * @param units   单位默认m
 * @returns   多边形
 */
declare function geoPolygonFromCircle(center: ESJVector3D, radius: number, steps?: number, units?: string): ESJVector2DArray[];
/**
 * @description 多边形是否在另一个多边形内
 * @param polygon1 多边形1
 * @param polygon2  多边形2
 * @returns  false | "oneBig" | "twoBig"
 */
declare function geoPolygonOverlap(polygon1: ESJVector3DArray, polygon2: ESJVector3DArray): false | "oneBig" | "twoBig";
export { geoIntersect, geoUnion, geoBuffer, geoDifference, geoPolygonFromCircle, geoPolygonOverlap };
