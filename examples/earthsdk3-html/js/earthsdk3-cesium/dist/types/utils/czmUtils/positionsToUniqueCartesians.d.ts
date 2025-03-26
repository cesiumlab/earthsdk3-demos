import * as Cesium from 'cesium';
/**
 * 把positions批量转化成cartesians，并且进行去重处理，所以返回的结果的数量可能会有所减少。
 * 另外一点是只是进行相邻控制点去重，不是任意去重！
 * @param positions
 * @returns
 */
export declare function positionsToUniqueCartesians(positions: [number, number, number][]): Cesium.Cartesian3[];
