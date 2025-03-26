import * as Cesium from 'cesium';
import { ESJConditionItem } from 'earthsdk3';
export type ColorStyleConditionItem = {
    condition: ESJConditionItem[];
    color: [number, number, number, number];
};
export type ShowStyleConditionItem = {
    condition: ESJConditionItem[];
    show: boolean;
};
export declare const quColor: (color: [number, number, number, number], result?: Cesium.Color) => Cesium.Color;
export declare const getStrColor: (item: ESJConditionItem, pvalue: any) => boolean;
export declare const getNumColor: (item: ESJConditionItem, pvalue: any) => boolean;
export declare const getColor: (item: ColorStyleConditionItem, feature: Cesium.Cesium3DTileFeature) => boolean[];
export declare const getShow: (item: ShowStyleConditionItem, feature: Cesium.Cesium3DTileFeature) => boolean[];
export declare const getStrBool: (item: ESJConditionItem, pvalue: any) => boolean;
export declare const getNumBool: (item: ESJConditionItem, pvalue: any) => boolean;
