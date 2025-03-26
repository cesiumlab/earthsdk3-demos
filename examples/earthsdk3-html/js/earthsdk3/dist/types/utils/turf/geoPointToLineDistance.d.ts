import { ESJVector2D, ESJVector3D } from '../../ESJTypes';
/**
 * @description 计算点到线的距离
 * @param p 点
 * @param l 线
 * @returns 距离单位米
 */
export declare function geoPointToLineDistance(p: ESJVector2D | ESJVector3D, l: (ESJVector2D | ESJVector3D)[]): number;
