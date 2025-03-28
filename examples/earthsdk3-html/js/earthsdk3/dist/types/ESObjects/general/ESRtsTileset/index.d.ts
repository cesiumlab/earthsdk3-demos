import { Event, JsonValue, PartialWithUndefinedReactivePropsToNativeProps, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
import { LayerType } from "./types";
import { ESRtsFeatureEditing } from "../ESRtsFeatureEditing";
import { ES3DTileset } from "../ES3DTileset";
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
        czmAtmosphereScatteringIntensity: number;
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
        extras: import("xbsj-base").ReactiveVariable<JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
        layerConfig: import("xbsj-base").ReactiveVariable<JsonValue[] | undefined>;
    };
    get json(): JsonType;
    set json(value: JsonType);
    private _es3DTileset;
    get es3DTileset(): ES3DTileset;
    getFeatureProperty(featureId: string): Promise<{
        [k: string]: any;
    } | undefined>;
    getLayerConfig(): Promise<LayerType[] | undefined>;
    saveLayerConfig(): Promise<any>;
    private _highlightInner3DtilesetEvent;
    get highlightInner3DtilesetEvent(): Event<[sceneObject: ESRtsFeatureEditing]>;
    _highlightInner3Dtileset(sceneObject: ESRtsFeatureEditing): void;
    highlightDSFeature(sceneObject: ESRtsFeatureEditing): Promise<void>;
    private _removeHighlightInner3DtilesetEvent;
    get removeHighlightInner3DtilesetEvent(): Event<[sceneObject: ESRtsFeatureEditing]>;
    _removeHighlightInner3Dtileset(sceneObject: ESRtsFeatureEditing): void;
    removeHighlightDSFeature(sceneObject: ESRtsFeatureEditing): Promise<void>;
    pickFeature(viewer: any, screenPosition: [number, number]): Promise<{
        featureId: any;
        pickInnerFields: any;
    } | undefined>;
    private _tilesetServePort;
    get tilesetServePort(): string;
    get tilesetServePortChanged(): import("xbsj-base").Listener<[string, string]>;
    set tilesetServePort(value: string);
    getport(): Promise<string>;
    refresh(): Promise<void>;
    /**
     * 获取当前服务的ip和port http://localhost:9009/tileservice/service/info/sv1
     * 从this.url中获取http://localhost:9009 ,作为请求地址
     */
    get baseUrl(): string;
    /**
     * 图层服务名称 http://localhost:9009/tileservice/service/info/sv1
     * 从this.url中获取sv1
     */
    get tileServiceName(): string;
    /**
   * 获取当前服务的ip http://localhost:9009/ts/info/ts01
   * 从this.url中获取http://localhost
   */
    get tileServiceIp(): string;
    constructor(id?: SceneObjectKey);
    static defaults: {
        layerConfig: JsonValue[];
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
        czmAtmosphereScatteringIntensity: number;
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
        extras: import("xbsj-base").ReactiveVariable<JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
        layerConfig: import("xbsj-base").ReactiveVariable<JsonValue[] | undefined>;
    };
}
export interface ESRtsTileset extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof ESRtsTileset.createDefaultProps>> {
}
type JsonType = PartialWithUndefinedReactivePropsToNativeProps<ReturnType<typeof ESRtsTileset.createDefaultProps> & {
    type: string;
}>;
export {};
