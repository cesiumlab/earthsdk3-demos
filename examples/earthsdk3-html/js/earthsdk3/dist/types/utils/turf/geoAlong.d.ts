import { ESJVector3D, ESJVector3DArray } from '../../ESJTypes';
/**
 * @description 根据距离获取线段上的点
 * @param positions @type {ESJVector3DArray} 线段坐标数组
 * @param distance  单位为米
 * @returns  [lat,lng,alt]
 */
export declare function geoAlong(positions: ESJVector3DArray, distance: number): ESJVector3D;
