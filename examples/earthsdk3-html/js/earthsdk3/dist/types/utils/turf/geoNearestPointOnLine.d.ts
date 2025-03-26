import { ESJVector2D, ESJVector3D } from '../../ESJTypes';
/**
 * @description 获取点在线上最近的点
 * @param l 线 数组
 * @param p 点
 * @returns
 */
export declare function geoNearestPointOnLine(l: (ESJVector2D | ESJVector3D)[], p: ESJVector2D | ESJVector3D): {
    geometry: {
        type: 'Point';
        coordinates: ESJVector3D;
    };
    properties: {
        dist: number;
        index: number;
        location: number;
    };
    type: "Feature";
};
