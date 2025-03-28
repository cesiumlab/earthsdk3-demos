import { Event, UniteChanged } from "xbsj-base";
import { ES3DTileset } from "./ES3DTileset";
/**
 * https://www.wolai.com/earthsdk/oTfNEhFjwzUwkKHrHvSG2H
 */
export declare class ESPipeserTileset extends ES3DTileset {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        url: string | import("../../ESJTypes").ESJResource;
        actorTag: string;
        materialMode: "normal" | "technology";
        highlight: boolean;
        maximumScreenSpaceError: number;
        highlightID: number;
        highlightColor: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJColor>;
        offset: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector3D | undefined>;
        rotation: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector3D>;
        czmImageBasedLightingFactor: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector2D>;
        czmLuminanceAtZenith: number;
        czmAtmosphereScatteringIntensity: number;
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
        clippingPlaneEdgeColor: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJColor>;
        clippingPlaneEdgeWidth: number;
        materialParams: import("../../ESJTypes").ESJsonObjectType;
        allowPicking: boolean;
        show: boolean;
        collision: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJFlyToParam | undefined>;
        flyInParam: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJFlyInParam | undefined>;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
        colorMode: string;
    };
    static description: {
        colorMode: [string, string][];
    };
    private _setLayerVisibleEvent;
    get setLayerVisibleEvent(): Event<[name: string, layerJson: string | {
        [key: string]: any;
    }[]]>;
    setLayerVisible(name: string, layerJson: string | ({
        [key: string]: any;
    }[])): void;
    private _setLayerColorEvent;
    get setLayerColorEvent(): Event<[name: string, layerJson: string | {
        [key: string]: any;
    }[]]>;
    setLayerColor(name: string, layerJson: string | ({
        [key: string]: any;
    }[])): void;
    constructor(id?: string);
    getProperties(language?: string): import("../../ESJTypes").Property[];
}
export declare namespace ESPipeserTileset {
    const createDefaultProps: () => {
        url: string | import("../../ESJTypes").ESJResource;
        actorTag: string;
        materialMode: "normal" | "technology";
        highlight: boolean;
        maximumScreenSpaceError: number;
        highlightID: number;
        highlightColor: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJColor>;
        offset: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector3D | undefined>;
        rotation: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector3D>;
        czmImageBasedLightingFactor: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector2D>;
        czmLuminanceAtZenith: number;
        czmAtmosphereScatteringIntensity: number;
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
        clippingPlaneEdgeColor: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJColor>;
        clippingPlaneEdgeWidth: number;
        materialParams: import("../../ESJTypes").ESJsonObjectType;
        allowPicking: boolean;
        show: boolean;
        collision: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJFlyToParam | undefined>;
        flyInParam: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJFlyInParam | undefined>;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
        colorMode: string;
    };
}
export interface ESPipeserTileset extends UniteChanged<ReturnType<typeof ESPipeserTileset.createDefaultProps>> {
}
