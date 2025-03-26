/**
 * 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
 * 即 百度 转 谷歌、高德
 * @param bd_lon
 * @param bd_lat
 * @returns {*}
 * @ignore
 */
export function bd09togcj02(bd_lon: any, bd_lat: any): any;
/**
 * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
 * 即谷歌、高德 转 百度
 * @param lng
 * @param lat
 * @returns {*}
 * @ignore
 */
export function gcj02tobd09(lng: any, lat: any): any;
/**
 * WGS84转GCj02
 * @param lng
 * @param lat
 * @returns {*}
 * @ignore
 */
export function wgs84togcj02(lng: any, lat: any): any;
/**
 * GCJ02 转换为 WGS84
 * @param lng
 * @param lat
 * @returns {*}
 * @ignore
 */
export function gcj02towgs84(lng: any, lat: any): any;
