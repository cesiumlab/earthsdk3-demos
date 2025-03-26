import { max, min, objsIterator } from 'xbsj-base';

/**
 * 获取一堆位置数组的最小最大位置点
 * @param positions 
 * @returns 
 */
export function getMinMaxCoordinates(positions: [number, number][]) {
    const minX = min(objsIterator(positions, ['0']));
    const minY = min(objsIterator(positions, ['1']));
    const maxX = max(objsIterator(positions, ['0']));
    const maxY = max(objsIterator(positions, ['1']));
    return { minPos: [minX, minY] as [number, number], maxPos: [maxX, maxY] as [number, number] };
}
