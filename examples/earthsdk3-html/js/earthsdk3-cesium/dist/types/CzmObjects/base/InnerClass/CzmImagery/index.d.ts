import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { CzmImageryProviderJsonType, CzmTilingSchemaJsonType } from "../../../../ESJTypesCzm";
import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
import * as Cesium from 'cesium';
export * from './extends/tilingScheme';
export declare function getTilingSchemeStr(tilingScheme: CzmTilingSchemaJsonType): "new Cesium.GeographicTilingScheme()" | "new Cesium.WebMercatorTilingScheme()" | undefined;
export declare function getCzmCode(imageryProviderJson: CzmImageryProviderJsonType): string | undefined;
export declare function getCzmCodeFromCzmImagery(czmImagery: CzmImagery): string | undefined;
export declare class CzmImagery extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    getCzmCode(): string | undefined;
    private _layer;
    get layer(): Cesium.ImageryLayer | undefined;
    set layer(value: Cesium.ImageryLayer | undefined);
    get layerChanged(): Listener<[Cesium.ImageryLayer | undefined, Cesium.ImageryLayer | undefined]>;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
    static defaults: {
        show: boolean;
        rectangle: [number, number, number, number];
        alpha: number;
        nightAlpha: number;
        dayAlpha: number;
        brightness: number;
        contrast: number;
        hue: number;
        saturation: number;
        gamma: number;
        splitDirection: CzmSplitDirectionType;
        minificationFilter: CzmTextureMinificationFilterType;
        magnificationFilter: CzmTextureMagnificationFilterType;
        maximumAnisotropy: number;
        minimumTerrainLevel: number;
        maximumTerrainLevel: number;
        cutoutRectangle: [number, number, number, number];
        colorToAlpha: [number, number, number, number];
        colorToAlphaThreshold: number;
        imageryProvider: CzmImageryProviderJsonType;
        zIndex: number;
        hasAlphaChannel: boolean;
        pickFeaturesUrl: string;
    };
}
export type CzmSplitDirectionType = 'LEFT' | 'NONE' | 'RIGHT';
export type CzmTextureMinificationFilterType = 'NEAREST' | 'LINEAR' | 'NEAREST_MIPMAP_NEAREST' | 'LINEAR_MIPMAP_NEAREST' | 'NEAREST_MIPMAP_LINEAR' | 'LINEAR_MIPMAP_LINEAR';
export type CzmTextureMagnificationFilterType = 'NEAREST' | 'LINEAR';
export declare namespace CzmImagery {
    const createDefaultProps: () => {
        show: boolean | undefined;
        rectangle: import("xbsj-base").ReactiveVariable<[west: number, south: number, east: number, north: number] | undefined>;
        alpha: number | undefined;
        nightAlpha: number | undefined;
        dayAlpha: number | undefined;
        brightness: number | undefined;
        contrast: number | undefined;
        hue: number | undefined;
        saturation: number | undefined;
        gamma: number | undefined;
        splitDirection: CzmSplitDirectionType | undefined;
        minificationFilter: CzmTextureMinificationFilterType | undefined;
        magnificationFilter: CzmTextureMagnificationFilterType | undefined;
        maximumAnisotropy: number | undefined;
        minimumTerrainLevel: number | undefined;
        maximumTerrainLevel: number | undefined;
        cutoutRectangle: import("xbsj-base").ReactiveVariable<[west: number, south: number, east: number, north: number] | undefined>;
        colorToAlpha: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        colorToAlphaThreshold: number | undefined;
        imageryProvider: import("xbsj-base").ReactiveVariable<CzmImageryProviderJsonType | undefined>;
        zIndex: number;
        hasAlphaChannel: boolean | undefined;
        pickFeaturesUrl: string | undefined;
    };
}
export interface CzmImagery extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmImagery.createDefaultProps>> {
}
