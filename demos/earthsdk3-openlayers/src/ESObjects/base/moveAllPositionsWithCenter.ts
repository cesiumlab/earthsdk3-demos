import { fromLonLat, toLonLat } from 'ol/proj';

/**
 * 用来根据中心点的位置变化，获得最新的所有控制点的位置坐标
 * @param positions 所有的位置坐标
 * @param center 当前中心点的经纬度位置
 * @param oldCenter 中心点变化前的位置
 * @returns 返回一个新的位置数组
 */
export function moveAllPositionsWithCenter(positions: [number, number][], center: [number, number], oldCenter: [number, number]) {
    const old = fromLonLat(oldCenter) as [number, number];
    const current = fromLonLat(center) as [number, number];
    const diff = [current[0] - old[0], current[1] - old[1]] as [number, number];

    const coordinates = positions.map(e => fromLonLat(e)) as [number, number][];
    const newCoordinates = coordinates.map(e => [e[0] + diff[0], e[1] + diff[1]]);
    return newCoordinates.map(e => toLonLat(e)) as [number, number][];
}
