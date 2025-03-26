import { Event, UniteChanged } from "xbsj-base";
import { ES3DTileset } from "../ES3DTileset";
import { ESDSFeature } from "./ESDSFeature";
import { FeatureItem, LayerType } from "./types";
export declare class ESRtsTileset extends ES3DTileset {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        url: string | import("../../../ESJTypes").ESJResource;
        actorTag: string;
        materialMode: "normal" | "technology";
        highlight: boolean;
        maximumScreenSpaceError: number;
        highlightID: number;
        highlightColor: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJColor>;
        offset: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJVector3D | undefined>;
        rotation: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJVector3D>;
        czmImageBasedLightingFactor: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJVector2D>;
        czmLuminanceAtZenith: number;
        czmMaximumMemoryUsage: number;
        czmClassificationType: string;
        czmStyleJson: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        czmBackFaceCulling: boolean;
        czmDebugShowBoundingVolume: boolean;
        czmDebugShowContentBoundingVolume: boolean;
        czmSkipLevelOfDetail: boolean;
        cacheBytes: number;
        colorBlendMode: "HIGHLIGHT" | "REPLACE" | "MIX";
        clippingPlaneEnabled: boolean;
        unionClippingRegions: boolean;
        clippingPlaneEdgeColor: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJColor>;
        clippingPlaneEdgeWidth: number;
        materialParams: import("../../../ESJTypes").ESJsonObjectType;
        allowPicking: boolean;
        show: boolean;
        collision: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJFlyToParam | undefined>;
        flyInParam: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJFlyInParam | undefined>;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
        layerConfig: import("xbsj-base").ReactiveVariable<LayerType | undefined>;
    };
    private _es3DTileset;
    get es3DTileset(): ES3DTileset;
    private _featureMap;
    get featureMap(): Map<string, FeatureItem>;
    getEditing(): FeatureItem[];
    getFeatureItem(id: string): FeatureItem | undefined;
    /**
     * 获取已创建的或者创建一个返回
     * @param featureId 要素id
     * @returns FeatureItem
     */
    _getCurrentFeatureItem(featureId: string): Promise<FeatureItem>;
    private _currentESDSFeature;
    get currentESDSFeature(): ESDSFeature | undefined;
    get currentESDSFeatureChanged(): import("xbsj-base").Listener<[ESDSFeature | undefined, ESDSFeature | undefined]>;
    set currentESDSFeature(value: ESDSFeature | undefined);
    setCurrentESDSFeature(value: ESDSFeature): void;
    getLayerConfig(): Promise<LayerType>;
    saveLayerConfig(): Promise<string>;
    _createESDSFeatureItem(id: string): Promise<FeatureItem>;
    showOnlyFeature(id: string): Promise<void>;
    findDatasetById(featureId: string): Promise<string>;
    getFeatureProperty(featureId: string): Promise<any>;
    flyToFeature(id: string): Promise<void>;
    private _highlightInner3DtilesetEvent;
    get highlightInner3DtilesetEvent(): Event<[sceneObject: ES3DTileset]>;
    _highlightInner3Dtileset(sceneObject: ES3DTileset): void;
    highlightDSFeature(id: string): Promise<void>;
    private _removeHighlightInner3DtilesetEvent;
    get removeHighlightInner3DtilesetEvent(): Event<[sceneObject: ES3DTileset]>;
    _removeHighlightInner3Dtileset(sceneObject: ES3DTileset): void;
    reamoveHighlightDSFeature(id: string): Promise<void>;
    pickFeature(viewer: any, screenPosition: [number, number]): Promise<{
        featureId: any;
        pickInnerFields: any;
    } | undefined>;
    moveFeature(id: string): Promise<void>;
    rotateFeature(id: string): Promise<void>;
    setFeatureOffset(id: string, offset: [number, number, number]): Promise<void>;
    setFeatureHpr(id: string, hpr: [number, number, number]): Promise<void>;
    setFeatureScale(id: string, scale: number): Promise<void>;
    /**
    * 重置单个编辑操作，不移除Map中的FeatureItem,只恢复dsFeature到初始位置;
    */
    undoEditing(id: string): void;
    /**
     * 模拟移除feature show = false
     */
    removeFeature(id: string): Promise<void>;
    /**
     * 模拟恢复feature show=true
     */
    resetFeature(id: string): Promise<void>;
    /**
     * 撤销单个编辑操作,移除Map中的FeatureItem,恢复原始tileset中的tile块;
     */
    cancelFeature(id: string): void;
    /**
     * 撤销所有编辑操作,移除Map中的所有FeatureItem
     */
    clearEditing(): void;
    commitEditings(): Promise<{
        [k: string]: any;
    } | undefined>;
    private _tilesetServePort;
    get tilesetServePort(): string;
    get tilesetServePortChanged(): import("xbsj-base").Listener<[string, string]>;
    set tilesetServePort(value: string);
    getport(): Promise<string>;
    refresh(): Promise<void>;
    /**
     * 获取当前服务的ip和port http://localhost:9009/ts/info/ts01
     * 从this.url中获取http://localhost:9009 ,作为请求地址
     */
    get baseUrl(): string;
    /**
     * 图层服务名称 http://localhost:9009/ts/info/ts01
     * 从this.url中获取sv1
     */
    get tileServiceName(): string;
    /**
   * 获取当前服务的ip http://localhost:9009/ts/info/ts01
   * 从this.url中获取http://localhost
   */
    get tileServiceIp(): string;
    constructor(id?: string);
    static defaults: {
        layerConfig: LayerType;
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
    getProperties(language?: string): import("../../../ESJTypes").Property[];
}
export declare namespace ESRtsTileset {
    const createDefaultProps: () => {
        url: string | import("../../../ESJTypes").ESJResource;
        actorTag: string;
        materialMode: "normal" | "technology";
        highlight: boolean;
        maximumScreenSpaceError: number;
        highlightID: number;
        highlightColor: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJColor>;
        offset: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJVector3D | undefined>;
        rotation: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJVector3D>;
        czmImageBasedLightingFactor: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJVector2D>;
        czmLuminanceAtZenith: number;
        czmMaximumMemoryUsage: number;
        czmClassificationType: string;
        czmStyleJson: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        czmBackFaceCulling: boolean;
        czmDebugShowBoundingVolume: boolean;
        czmDebugShowContentBoundingVolume: boolean;
        czmSkipLevelOfDetail: boolean;
        cacheBytes: number;
        colorBlendMode: "HIGHLIGHT" | "REPLACE" | "MIX";
        clippingPlaneEnabled: boolean;
        unionClippingRegions: boolean;
        clippingPlaneEdgeColor: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJColor>;
        clippingPlaneEdgeWidth: number;
        materialParams: import("../../../ESJTypes").ESJsonObjectType;
        allowPicking: boolean;
        show: boolean;
        collision: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJFlyToParam | undefined>;
        flyInParam: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJFlyInParam | undefined>;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
        layerConfig: import("xbsj-base").ReactiveVariable<LayerType | undefined>;
    };
}
export interface ESRtsTileset extends UniteChanged<ReturnType<typeof ESRtsTileset.createDefaultProps>> {
}
