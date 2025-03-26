import { ESJVector3D } from '../../ESJTypes';
/**
 * @description 根据点位、距离、方向计算目标点位 球模型
 * @param position @type {ESJVector3D} 点位
 * @param distance  距离
 * @param heading  方向
 * @param result  返回值
 * @returns  @type {ESJVector3D}
 */
export declare function geoDestination(position: ESJVector3D, distance: number, heading: number, result?: ESJVector3D): ESJVector3D | undefined;
