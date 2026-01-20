import { createVNode, render } from "vue";
import TilesetStyleEditor from "./TilesetStyleEditor.vue"

/**
 * 操作符类型
 */
export type OperatorType = '==' | '!=' | '>' | '>=' | '<' | '<=' | 'contain' | 'empty';

/**
 * 字段值类型
 */
export type FieldValueType = string | number | boolean;

/**
 * 规则条件
 */
export interface RuleCondition {
    /** 字段名 */
    field: string;
    /** 操作符 */
    op: OperatorType;
    /** 值 */
    value: FieldValueType;
}

/**
 * 样式规则
 */
export interface StyleRule {
    /** 条件列表 */
    condition: (RuleCondition | boolean)[];
    /** 颜色 [r, g, b, a]，范围 0-1 */
    color: [number, number, number, number];
    /** 是否显示 */
    show: boolean;
}

/**
 * 样式数据接口
 */
export interface StyleData {
    /** 样式ID */
    id: string;
    /** 样式名称 */
    name: string;
    /** 样式规则代码 */
    code: StyleRule[];
    /** 缩略图 */
    thumbnail: string;
}

/**
 * 字段类型定义
 */
export interface FeatureType {
    /** 字段名 */
    key: string;
    /** 字段类型 */
    type: 'string' | 'number';
}

/**
 * 字段列表项 [显示名称, 字段值]
 */
export type FieldListItem = [string, string | boolean];

/**
 * 编辑器配置选项
 */
export interface TilesetStyleEditorOptions {
    /** 样式列表数据 */
    styleList?: StyleData[];
    /** 字段列表 */
    fieldList?: FieldListItem[];
    /** 字段类型列表 */
    featureTypes?: FeatureType[];
    /** 初始规则数据 */
    initialRule?: StyleRule[];
}

/**
 * 打开样式编辑器对话框
 * @param options - 编辑器配置选项
 * @returns Promise，返回编辑后的规则数据，如果取消则返回 undefined
 */
export function getTilesetStyle(options?: TilesetStyleEditorOptions): Promise<StyleRule[] | undefined> {
    return new Promise((resolve) => {
        const container = document.createElement('div');
        document.body.appendChild(container);
        const vnode = createVNode(TilesetStyleEditor, {
            show: true,
            styleList: options?.styleList || [],
            fieldList: options?.fieldList || [['id', 'id']],
            featureTypes: options?.featureTypes || [{ key: 'id', type: 'string' }],
            initialRule: options?.initialRule || [],
            resolve: (data: StyleRule[] | undefined) => {
                render(null, container);
                container.remove();
                resolve(data);
            },
        });
        render(vnode, container);
    });
}
