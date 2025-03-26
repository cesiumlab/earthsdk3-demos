import { ESDSFeature } from "./ESDSFeature";
/**
 * @params k - layerId 图层id
 * @params v - visible 控制显示隐藏
 * @params c - color  css的color值string
 * @example { '6fa8d4b9-19c9-46f8-9f1f-dc6d8b6f1044': { visible: true, color: '#00f701' } }
 */
export interface LayerType {
    [k: string]: {
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
export declare const _getLayerConfig: (baseUrl: string, tileServiceName: string) => Promise<LayerType>;
/**
 * 保存图层配置
 * @param tileServiceName - 服务名称
 * @returns LayerType - 图层配置
 */
export declare const _saveLayerConfig: (baseUrl: string, tileServiceName: string, layerConfig?: LayerType) => Promise<string>;
export declare const _getFeatureProperty: (baseUrl: string, tileServiceName: string, featureId: string) => Promise<{
    [k: string]: any;
} | undefined>;
export declare const _commitEditings: (baseUrl: string, data: {
    features: CommitItemType[];
}) => Promise<{
    [k: string]: any;
} | undefined>;
/**
 * 获取切片服务的端口
 * @param {*} tileServiceName
 * @returns
 */
export declare const _getport: (url: string) => Promise<string | undefined>;
/**
 * @params id - Feature 图层id
 * @params name - 属性name
 * @params datasetName - 数据集名称
 * @params removed - 是否被移除
 * @params properties - 属性
 * @params dsFeature - ESDSFeature对象
 */
export type FeatureItem = {
    id: string;
    removed: boolean;
    dsFeature: ESDSFeature;
    name?: string;
    datasetName: string;
    properties?: any;
};
export type CommitItemType = {
    datasetName: string;
    featureId: string;
    removed: boolean;
    x: number;
    y: number;
    z: number;
    h: number;
    p: number;
    r: number;
    s: number;
};
