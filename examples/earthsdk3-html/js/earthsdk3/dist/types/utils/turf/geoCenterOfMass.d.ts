import { ESJVector3D, ESJVector3DArray } from '../../ESJTypes';
/**
 * @description 获取中心点
 * @param positions @type { ESJVector3DArray } 点位数组
 * @returns  @type { ESJVector3D } 中心点
 */
export declare function geoCenterOfMass(positions: ESJVector3DArray): ESJVector3D;
