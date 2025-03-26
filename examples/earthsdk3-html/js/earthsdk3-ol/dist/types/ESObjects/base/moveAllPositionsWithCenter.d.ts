/**
 * 用来根据中心点的位置变化，获得最新的所有控制点的位置坐标
 * @param positions 所有的位置坐标
 * @param center 当前中心点的经纬度位置
 * @param oldCenter 中心点变化前的位置
 * @returns 返回一个新的位置数组
 */
export declare function moveAllPositionsWithCenter(positions: [number, number][], center: [number, number], oldCenter: [number, number]): [number, number][];
