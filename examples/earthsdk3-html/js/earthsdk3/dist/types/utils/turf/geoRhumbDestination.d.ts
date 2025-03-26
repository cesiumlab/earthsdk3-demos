import { ESJVector3D } from '../../ESJTypes';
/**
 * @description 根据给定的位置、距离和方向计算新的位置 椭球模型
 * @param position  [经度,纬度,高度]
 * @param distance  距离 m
 * @param heading   方向
 * @param result    [经度,纬度,高度]
 * @returns
 */
export declare function geoRhumbDestination(position: ESJVector3D, distance: number, heading: number, result?: ESJVector3D): ESJVector3D | undefined;
