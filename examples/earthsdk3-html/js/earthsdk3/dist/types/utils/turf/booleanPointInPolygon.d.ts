import { ESJVector2D, ESJVector2DArray } from '../../ESJTypes';
/**
 * @description 判断点是否在多边形内
 * @param positions @type { ESJVector2DArray } 多边形坐标
 * @param point @type { ESJVector2D } 点坐标
 * @returns  true/false
 */
export declare function booleanPointInPolygon(positions: ESJVector2DArray, point: ESJVector2D): boolean;
