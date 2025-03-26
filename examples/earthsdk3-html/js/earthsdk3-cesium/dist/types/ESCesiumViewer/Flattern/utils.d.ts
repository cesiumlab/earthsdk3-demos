import * as Cesium from 'cesium';
/**
 * 通过给定模型的位置，来计算此处的海拔位置矩阵
 * @exports xbsjGetElevationMatrix
 * @param {Cesium.Cartesian3} position 模型所在位置，可能高于海平面
 * @param {Cesium.Matrix4} [elevationMatrix] 用来存储海拔高度的位置矩阵，如果为undefined，则会创建一个新矩阵
 * @returns {Cesium.Matrix4} 返回海拔高度的位置矩阵
 *
 * @example
 * const autoElevationMatrix = Cesium.xbsjGetElevationMatrix(boundingSphere.center, autoElevationMatrix);
 */
export declare function getElevationMatrix(position: Cesium.Cartesian3, elevationMatrix?: Cesium.Matrix4): Cesium.Matrix4;
