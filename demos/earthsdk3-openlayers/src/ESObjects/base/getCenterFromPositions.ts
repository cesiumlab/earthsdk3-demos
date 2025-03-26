import { getMinMaxCoordinates } from './getMinMaxCoordinates';
import { fromLonLat, toLonLat } from 'ol/proj';

/**
 * 获取一堆位置数组的中心位置
 * @param positions 所有控制点的位置数组
 * @returns 返回中心点位置
 */
export function getCenterFromPositions(positions: [number, number][]) {
    const coordinates = positions.map(e => fromLonLat(e)) as [number, number][];
    const { minPos, maxPos } = getMinMaxCoordinates(coordinates);
    const center = [.5*(minPos[0] + maxPos[0]), .5*(minPos[1] + maxPos[1])] as [number, number];
    return toLonLat(center) as [number, number];
}
