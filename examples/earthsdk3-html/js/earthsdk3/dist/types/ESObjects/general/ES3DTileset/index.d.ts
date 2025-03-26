import { ESJColor, ESJResource, ESJsonObjectType, ESJVector2D, ESJVector3D, ESJVector4D } from "../../../ESJTypes";
import { ESVisualObject } from "../../../ESObjects";
import { Event, JsonValue, UniteChanged } from "xbsj-base";
import { ESJFeatureStyleType, FeatureColorJsonType, FeatureVisableJsonType } from "./type";
/**
 * https://www.wolai.com/earthsdk/scb9Mm6X1zR4GypJQreRvK
 */
export declare class ES3DTileset extends ESVisualObject {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        url: string | ESJResource;
        actorTag: string;
        materialMode: "normal" | "technology";
        highlight: boolean;
        maximumScreenSpaceError: number;
        highlightID: number;
        highlightColor: import("xbsj-base").ReactiveVariable<ESJColor>;
        offset: import("xbsj-base").ReactiveVariable<ESJVector3D | undefined>;
        rotation: import("xbsj-base").ReactiveVariable<ESJVector3D>;
        czmImageBasedLightingFactor: import("xbsj-base").ReactiveVariable<ESJVector2D>;
        czmLuminanceAtZenith: number;
        czmMaximumMemoryUsage: number;
        czmClassificationType: string;
        czmStyleJson: import("xbsj-base").ReactiveVariable<JsonValue>;
        czmBackFaceCulling: boolean;
        czmDebugShowBoundingVolume: boolean;
        czmDebugShowContentBoundingVolume: boolean;
        czmSkipLevelOfDetail: boolean;
        cacheBytes: number;
        colorBlendMode: "HIGHLIGHT" | "REPLACE" | "MIX";
        clippingPlaneEnabled: boolean;
        unionClippingRegions: boolean;
        clippingPlaneEdgeColor: import("xbsj-base").ReactiveVariable<ESJColor>;
        clippingPlaneEdgeWidth: number;
        materialParams: ESJsonObjectType;
        allowPicking: boolean;
        show: boolean;
        collision: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJFlyToParam | undefined>;
        flyInParam: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJFlyInParam | undefined>;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
    private _editing;
    get editing(): boolean;
    set editing(value: boolean);
    get editingChanged(): import("xbsj-base").Listener<[boolean, boolean]>;
    private _rotationEditing;
    get rotationEditing(): boolean;
    set rotationEditing(value: boolean);
    get rotationEditingChanged(): import("xbsj-base").Listener<[boolean, boolean]>;
    private _refreshTilesetEvent;
    get refreshTilesetEvent(): Event<[]>;
    refreshTileset(): void;
    private _tilesetReadyEvent;
    get tilesetReady(): Event<[tileset: any]>;
    private _supportEdit;
    get supportEdit(): boolean;
    set supportEdit(value: boolean);
    get supportEditChanged(): import("xbsj-base").Listener<[boolean, boolean]>;
    private _highlightFeatureEvent;
    get highlightFeatureEvent(): Event<[id: string | number, color?: string | undefined]>;
    highlightFeature(id: string | number, color?: string): void;
    private _highlightFeatureAndFlyToEvent;
    get highlightFeatureAndFlyToEvent(): Event<[id: string | number, sphere: ESJVector4D, color?: string | undefined, duration?: number | undefined]>;
    /**
     * @param id 节点id
     * @param sphere 笛卡尔坐标系[x, y, z, radius]
     * @param color 高亮颜色,不传就是默认颜色不高亮, 参数形式如 `rgba(255,0,0,1)`
     * @param duration 飞行时间，默认1s
     */
    highlightFeatureAndFlyTo(id: string | number, sphere: ESJVector4D, color?: string, duration?: number): void;
    private _getFeatureTableEvent;
    _featureTableResultEvent: Event<[{
        key: string;
        type: string | number;
    }[] | undefined]>;
    get getFeatureTableEvent(): Event<[]>;
    getFeatureTable(): Promise<{
        key: string;
        type: string | number;
    }[] | undefined>;
    private _setFeatureStyleEvent;
    get setFeatureStyleEvent(): Event<[ESJFeatureStyleType]>;
    /**
     * 根据条件设置style
     * @param json
     * @description json格式如下：
     * @param op:string类型，操作符(目前字符串属性支持：==  !=  contain empty; 数字属性支持：== != > >= < <=）
     * @example
     * [
         {
           condition:[{
                field:"id",
                op:"!=",
                value:"ss"
            },{
                field:"name",
                op:"contain",
                value:"杨"
            }],
            color:[1,0,0,1],
            show:true
         },
         {
           condition:{
                field:"height",
                op:"==",
                value:20
            },
            color:[1,1,0,1],
            show:false
         }
       ]
     */
    setFeatureStyle(json: ESJFeatureStyleType): void;
    /**
     * 根据属性设置颜色
     */
    private _setFeatureColorEvent;
    get setFeatureColorEvent(): Event<[string, FeatureColorJsonType[]]>;
    /**
     * 基于提供的条件为特定特征属性设置颜色。
     * @param featureName - 要修改的特征属性的名称。
     * @param json - 要素的条件和颜色。
     * 如果提供的是字符串，它应该是有效的 JSON 字符串。
     * 如果提供的是数组，它应该是 FeatureColorJsonType 对象的数组。
     * @remarks
     * 条件可以基于要素的值、最小值或最大值。
     * 颜色为0~1的映射数组，例如[1,0,0,1] 表示红色。
     * @example
     * ```typescript
     * const featureName = "height";
     * const conditions: FeatureColorJsonType[] = [
     *   { minValue: 100000, color: [1,0,0,1] },
     *   { maxValue: 500000, color: [1,1,0,1] },
     * ];
     * setFeatureColor(featureName, conditions);
     * ```
     * @throws 如果提供的条件无效，将引发错误。
     */
    setFeatureColor(featureName: string, json: string | FeatureColorJsonType[]): void;
    /**
     * 根据属性控制show
     */
    private _setFeatureVisableEvent;
    get setFeatureVisableEvent(): Event<[string, FeatureVisableJsonType[]]>;
    /**
     * 根据提供的条件设置要素的可见性。
     *
     * @param featureName - 要修改的属性名称。
     * @param json - 要素的条件和可见性。
     * 如果提供的是字符串，它应该是有效的 JSON 字符串。
     * 如果提供的是数组，它应该是 FeatureVisableJsonType 对象的数组。
     *
     * @remarks
     * 条件可以基于要素的值、最小值或最大值。
     * 可见性可以设置为 true 或 false。
     *
     * @example
     * ```typescript
     * const featureName = "height";
     * const conditions: FeatureVisableJsonType[] = [
     *   { value: 1000000, visable: false },
     *   { minValue: 5000000, visable: true },
     *   { maxValue: 10000000, visable: false },
     * ];
     * setFeatureVisable(featureName, conditions);
     * ```
     * @throws 如果提供的条件无效，将引发错误。
     */
    setFeatureVisable(featureName: string, json: string | FeatureVisableJsonType[]): void;
    /**
     * 还原样式设置
     */
    private _resetFeatureStyleEvent;
    get resetFeatureStyleEvent(): Event<[]>;
    resetFeatureStyle(): void;
    private _clippingPlanesId;
    get clippingPlanesId(): string;
    set clippingPlanesId(value: string);
    get clippingPlanesIdChanged(): import("xbsj-base").Listener<[string, string]>;
    /**
     * 面裁切 ESClippingPlane
     */
    private _clippingPlaneIds;
    get clippingPlaneIds(): string[];
    set clippingPlaneIds(value: string[]);
    get clippingPlaneIdsChanged(): import("xbsj-base").Listener<[string[], string[]]>;
    private _flattenedPlaneId;
    get flattenedPlaneId(): string;
    set flattenedPlaneId(value: string);
    get flattenedPlaneIdChanged(): import("xbsj-base").Listener<[string, string]>;
    private _flattenedPlaneEnabled;
    get flattenedPlaneEnabled(): boolean;
    set flattenedPlaneEnabled(value: boolean);
    get flattenedPlaneEnabledChanged(): import("xbsj-base").Listener<[boolean, boolean]>;
    /**
     * 体裁切 ESBoxClippingPlanes + 挖坑
     */
    private _clippingPlaneId;
    get clippingPlaneId(): string;
    set clippingPlaneId(value: string);
    get clippingPlaneIdChanged(): import("xbsj-base").Listener<[string, string]>;
    private _excavateId;
    get excavateId(): string[];
    set excavateId(value: string[]);
    get excavateIdChanged(): import("xbsj-base").Listener<[string[], string[]]>;
    static defaults: {
        url: string;
        actorTag: string;
        materialMode: string;
        materialModes: [string, string][];
        offset: number[];
        materialParams: {
            baseColor: number[];
        };
        cacheBytes: number;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("../../../ESJTypes").ESJFlyToParam;
        flyInParam: import("../../../ESJTypes").ESJFlyInParam;
    };
    getESProperties(): {
        defaultMenu: string;
        basic: import("../../../ESJTypes").Property[];
        dataSource: import("../../../ESJTypes").Property[];
        coordinate: import("../../../ESJTypes").Property[];
        general: import("../../../ESJTypes").Property[];
        location: import("../../../ESJTypes").Property[];
        style: import("../../../ESJTypes").Property[];
    };
    getProperties(language?: string): import("../../../ESJTypes").Property[];
}
export declare namespace ES3DTileset {
    const createDefaultProps: () => {
        url: string | ESJResource;
        actorTag: string;
        materialMode: "normal" | "technology";
        highlight: boolean;
        maximumScreenSpaceError: number;
        highlightID: number;
        highlightColor: import("xbsj-base").ReactiveVariable<ESJColor>;
        offset: import("xbsj-base").ReactiveVariable<ESJVector3D | undefined>;
        rotation: import("xbsj-base").ReactiveVariable<ESJVector3D>;
        czmImageBasedLightingFactor: import("xbsj-base").ReactiveVariable<ESJVector2D>;
        czmLuminanceAtZenith: number;
        czmMaximumMemoryUsage: number;
        czmClassificationType: string;
        czmStyleJson: import("xbsj-base").ReactiveVariable<JsonValue>;
        czmBackFaceCulling: boolean;
        czmDebugShowBoundingVolume: boolean;
        czmDebugShowContentBoundingVolume: boolean;
        czmSkipLevelOfDetail: boolean;
        cacheBytes: number;
        colorBlendMode: "HIGHLIGHT" | "REPLACE" | "MIX";
        clippingPlaneEnabled: boolean;
        unionClippingRegions: boolean;
        clippingPlaneEdgeColor: import("xbsj-base").ReactiveVariable<ESJColor>;
        clippingPlaneEdgeWidth: number;
        materialParams: ESJsonObjectType;
        allowPicking: boolean;
        show: boolean;
        collision: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJFlyToParam | undefined>;
        flyInParam: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJFlyInParam | undefined>;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
}
export interface ES3DTileset extends UniteChanged<ReturnType<typeof ES3DTileset.createDefaultProps>> {
}
