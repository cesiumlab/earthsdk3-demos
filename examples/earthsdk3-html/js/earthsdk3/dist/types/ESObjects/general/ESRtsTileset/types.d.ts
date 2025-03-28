/**
 * @params k - layerId 图层id
 * @params v - visible 控制显示隐藏
 * @params c - color  css的color值string
 * @example { '6fa8d4b9-19c9-46f8-9f1f-dc6d8b6f1044': { visible: true, color: '#00f701' } }
 */
export interface LayerType {
    dataset: number;
    layer: number;
    value: {
        visible: boolean;
        color: string | null;
    };
}
/**
 * 默认 替换 混合
 */
export type ColorModeType = "HIGHLIGHT" | "REPLACE" | "MIX";
export declare const apis: {
    layerconfigfind: string;
    layerconfigsave: string;
    featureproperty: string;
    featureeditormuti: string;
    getts: string;
};
/**
 * 获取图层配置
 * @param tileServiceName - 服务名称
 * @returns LayerType - 图层配置
 */
export declare const _getLayerConfig: (baseUrl: string, tileServiceName: string) => Promise<LayerType[] | undefined>;
/**
 * 保存图层配置
 * @param tileServiceName - 服务名称
 * @returns LayerType - 图层配置
 */
export declare const _saveLayerConfig: (baseUrl: string, tileServiceName: string, layerConfig?: LayerType[]) => Promise<any>;
/**
 * 获取切片服务的端口
 * @param {*} tileServiceName
 * @returns
 */
export declare const _getport: (url: string) => Promise<string | undefined>;
/**
 * 获取要素属性
 * @param {*} tileServiceName
 * @returns
 */
export declare const _getFeatureProperty: (baseUrl: string, tileServiceName: string, featureId: string) => Promise<{
    [k: string]: any;
} | undefined>;
