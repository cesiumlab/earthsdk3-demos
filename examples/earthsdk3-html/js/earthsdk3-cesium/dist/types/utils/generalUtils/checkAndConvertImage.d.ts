/**
 * 判断是否可用，若图片是相对路径会转换为绝对路径
 * @param relativeUrl 图片地址
 * @param callback 回调函数
 * @example
 * const relativeUrl: string = 'images/picture.jpg';
 * checkAndConvertImage(relativeUrl, (absoluteUrl: string, isAvailable: boolean) => {
 * if (isAvailable) {
 *      console.log('图片地址可用: ' + absoluteUrl);
 *  } else {
 *      console.log('图片地址不可用: ' + absoluteUrl);
 *    }
 * });
 */
export declare function checkAndConvertImage(relativeUrl: string, callback: (absoluteUrl: string, isAvailable: boolean) => void): void;
/**
 * 相对地址转绝对地址，以'./'或者'../'或者'/'开头的路径，其他url则返回原值
 * @param url 相对路径，
 * @returns
 */
export declare function rpToap(url: string): string;
