/**
 * 动态加载js文件
 * @param {string} jsFilePath JS文件路径
 * @returns {Promise}
 * @memberof HTML
 */
export declare function loadJs(jsFilePath: string, notRequireJS?: boolean): Promise<void>;
