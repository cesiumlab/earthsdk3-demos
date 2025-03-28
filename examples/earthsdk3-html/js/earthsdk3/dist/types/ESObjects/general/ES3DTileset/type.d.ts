import * as Cesium from 'cesium';
import { ESJColor } from '../../../ESJTypes';
export type FeatureColorJsonType = {
    value?: string | number;
    minValue?: number;
    maxValue?: number;
    rgba: ESJColor;
};
export type FeatureVisableJsonType = {
    value?: string | number;
    minValue?: number;
    maxValue?: number;
    visable: boolean;
};
export type ES3DTilesCustomShaderClassType = {
    destroy(): undefined;
    get customShader(): Cesium.CustomShader;
};
export type ESJNumConditionItem = {
    field: string;
    op: "==" | "!=" | ">" | ">=" | "<" | "<=";
    value: number;
};
export type ESJStrConditionItem = {
    field: string;
    op: "==" | "!=" | "contain" | "empty";
    value: string;
};
export type ESJConditionItem = ESJNumConditionItem | ESJStrConditionItem | boolean;
export type ESJFeatureStyleConditionItemType = {
    condition: ESJConditionItem | ESJConditionItem[];
    color?: [number, number, number, number];
    show?: boolean;
};
export type ESJStyleConditionItemType = {
    condition: ESJConditionItem;
    color: [number, number, number, number];
    show: boolean;
};
export type ESJFeatureStyleType = ESJFeatureStyleConditionItemType[];
