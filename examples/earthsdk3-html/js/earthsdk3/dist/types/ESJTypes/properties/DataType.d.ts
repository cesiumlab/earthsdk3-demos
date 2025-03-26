/**
 * @example [116.397428, 39.90923]
 */
export type ESJVector2D = [number, number];
/**
 * @example [[1,2],[3,4]]
 */
export type ESJVector2DArray = ESJVector2D[];
/**
 * @example [116.397428, 39.90923 ,100]
 */
export type ESJVector3D = [number, number, number];
/**
 * @example [[1,2,3],[4,5,6]]
 */
export type ESJVector3DArray = ESJVector3D[];
/**
 * @example [-180, -90, 180, 90]
 */
export type ESJVector4D = [number, number, number, number];
/**
 * @example [[1,2,3,4],[5,6,7,8]]
 */
export type ESJVector4DArray = ESJVector4D[];
/**
 * @description 颜色类型
 * @example r,g,b为[0,255] 映射到 0~1 , a为[0,1],例如[1, 0, 0, 1] 表示红色;
 */
export type ESJColor = [r: number, g: number, b: number, a: number];
/**
 * @description ESImageryLayer 类型
 */
export type ESJImageryType = 'tms' | 'xyz' | 'wms' | 'wmts' | 'auto' | 'ion';
export type ESJNativeNumber16 = [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
