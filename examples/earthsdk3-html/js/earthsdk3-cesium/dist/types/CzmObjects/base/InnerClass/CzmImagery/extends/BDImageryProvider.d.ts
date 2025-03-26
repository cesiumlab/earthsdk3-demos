export function BDImageryProvider(options: any): void;
export class BDImageryProvider {
    constructor(options: any);
    _url: any;
    _tileWidth: number;
    _tileHeight: number;
    _maximumLevel: number;
    _tilingScheme: BDTilingScheme;
    _credit: any;
    _rectangle: any;
    _ready: boolean;
    getTileCredits(x: any, y: any, level: any): undefined;
    requestImage(x: any, y: any, level: any): any;
}
declare function BDTilingScheme(options: any): void;
declare class BDTilingScheme {
    constructor(options: any);
    _ellipsoid: any;
    _projection: any;
    _rectangleSouthwestInMeters: any;
    _rectangleNortheastInMeters: any;
    _rectangle: any;
    levelWidth: number[];
    /**
     * 根据级别返回再这个级别上的 x 方向块个数
     *
     * @param {Number} level The level-of-detail.
     * @returns {Number} The number of tiles in the X direction at the given level.
     */
    getNumberOfXTilesAtLevel(level: number): number;
    /**
     * 根据级别返回再这个级别上的 y 方向块个数
     *
     * @param {Number} level The level-of-detail.
     * @returns {Number} The number of tiles in the Y direction at the given level.
     */
    getNumberOfYTilesAtLevel(level: number): number;
    /**
     * Transforms a rectangle specified in geodetic radians to the native coordinate system
     * of this tiling scheme.
     *
     把经纬度范围（弧度表示）转换为 本地坐标系统的 矩形范围  这个只和project有关系，所以和 web墨卡托的方式一致
     * @param {Rectangle} rectangle The rectangle to transform.
     * @param {Rectangle} [result] The instance to which to copy the result, or undefined if a new instance
     *        should be created.
     * @returns {Rectangle} The specified 'result', or a new object containing the native rectangle if 'result'
     *          is undefined.
     */
    rectangleToNativeRectangle(rectangle: Rectangle, result?: any): Rectangle;
    /**
     * Converts tile x, y coordinates and level to a rectangle expressed in the native coordinates
     * of the tiling scheme.
     *
     根据x，y，z 索引转换本地坐标系统矩形范围 这块要修改
     * @param {Number} x The integer x coordinate of the tile.
     * @param {Number} y The integer y coordinate of the tile.
     * @param {Number} level The tile level-of-detail.  Zero is the least detailed.
     * @param {Object} [result] The instance to which to copy the result, or undefined if a new instance
     *        should be created.
     * @returns {Rectangle} The specified 'result', or a new object containing the rectangle
     *          if 'result' is undefined.
     */
    tileXYToNativeRectangle(x: number, y: number, level: number, result?: Object | undefined): Rectangle;
    /**
     * Converts tile x, y coordinates and level to a cartographic rectangle in radians.
     *
     根据x，y，level转经纬度范围矩形 不需要修改
     * @param {Number} x The integer x coordinate of the tile.
     * @param {Number} y The integer y coordinate of the tile.
     * @param {Number} level The tile level-of-detail.  Zero is the least detailed.
     * @param {Object} [result] The instance to which to copy the result, or undefined if a new instance
     *        should be created.
     * @returns {Rectangle} The specified 'result', or a new object containing the rectangle
     *          if 'result' is undefined.
     */
    tileXYToRectangle(x: number, y: number, level: number, result?: Object | undefined): Rectangle;
    /**
     * Calculates the tile x, y coordinates of the tile containing
     * a given cartographic position.
    
     给i当一个坐标点，计算它的 x，y，level索引
     *
     * @param {Cartographic} position The position.
     * @param {Number} level The tile level-of-detail.  Zero is the least detailed.
     * @param {Cartesian2} [result] The instance to which to copy the result, or undefined if a new instance
     *        should be created.
     * @returns {Cartesian2} The specified 'result', or a new object containing the tile x, y coordinates
     *          if 'result' is undefined.
     */
    positionToTileXY(position: Cartographic, level: number, result?: any): Cartesian2;
}
export {};
