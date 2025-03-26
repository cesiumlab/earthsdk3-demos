import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
import * as Cesium from 'cesium';
export declare class CzmGeoJson extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _loadFuncReact;
    get loadFun(): ((dataSource: Cesium.GeoJsonDataSource) => void) | undefined;
    set loadFun(value: ((dataSource: Cesium.GeoJsonDataSource) => void) | undefined);
    get loadFunChanged(): Listener<[((dataSource: Cesium.GeoJsonDataSource) => void) | undefined, ((dataSource: Cesium.GeoJsonDataSource) => void) | undefined]>;
    private _dataSource;
    get dataSource(): Cesium.GeoJsonDataSource | undefined;
    set dataSource(value: Cesium.GeoJsonDataSource | undefined);
    private _data;
    private _defaultHeight;
    private _defaultBoundingSphere;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
    private _isJSONString;
    private _countBytes;
    private _isEntityShow;
    static defaults: {
        show: boolean;
        allowPicking: boolean;
        url: string;
        defaultLoadFuncStr: string;
        defaultLoadFuncDocStr: string;
        data: {
            type: string;
            features: {
                type: string;
                geometry: {
                    type: string;
                    coordinates: number[];
                };
                properties: {
                    title: string;
                    "marker-symbol": string;
                    "marker-color": string;
                };
            }[];
        };
        dataMd: string;
        stroked: boolean;
        strokeWidth: number;
        strokeWidthType: string;
        strokeColor: [number, number, number, number];
        strokeMaterial: string;
        strokeMaterialParams: {};
        strokeGround: boolean;
        filled: boolean;
        fillColor: [number, number, number, number];
        fillMaterial: string;
        fillMaterialParams: {};
        fillGround: boolean;
        imageShow: boolean;
        imageUrl: string;
        imageSize: [number, number];
        imageAnchor: [number, number];
        imageOffset: [number, number];
        textShow: boolean;
        textProperty: string;
        textDefaultText: string;
        textColor: [number, number, number, number];
        textBackgroundColor: [number, number, number, number];
        textFontFamily: string;
        textFontSize: number;
        textFontWeight: string;
        textFontStyle: string;
        textAnchor: [number, number];
        textOffset: [number, number];
        strokeWidthTypes: [name: string, value: string][];
        minFeatureVisibleDistance: number;
        maxFeatureVisibleDistance: number;
        heightReferences: [name: string, value: string][];
    };
}
export declare namespace CzmGeoJson {
    const createDefaultProps: () => {
        show: boolean;
        allowPicking: boolean | undefined;
        loadFuncStr: string | undefined;
        url: string | {
            [xx: string]: any;
        } | undefined;
        stroked: boolean | undefined;
        strokeWidth: number | undefined;
        strokeWidthType: string;
        strokeColor: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        strokeMaterial: string | undefined;
        strokeMaterialParams: import("xbsj-base").ReactiveVariable<any>;
        strokeGround: boolean | undefined;
        filled: boolean | undefined;
        fillColor: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        fillMaterial: string | undefined;
        fillMaterialParams: import("xbsj-base").ReactiveVariable<any>;
        fillGround: boolean | undefined;
        imageShow: boolean | undefined;
        imageUrl: string | undefined;
        imageSize: import("xbsj-base").ReactiveVariable<[number, number] | undefined>;
        imageAnchor: import("xbsj-base").ReactiveVariable<[number, number] | undefined>;
        imageOffset: import("xbsj-base").ReactiveVariable<[number, number] | undefined>;
        textShow: boolean | undefined;
        textProperty: string | undefined;
        textDefaultText: string | undefined;
        textColor: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        textBackgroundColor: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        textFontFamily: string | undefined;
        textFontSize: number | undefined;
        textFontStyle: number | undefined;
        textFontWeight: number | undefined;
        textAnchor: import("xbsj-base").ReactiveVariable<[number, number] | undefined>;
        textOffset: import("xbsj-base").ReactiveVariable<[number, number] | undefined>;
        minFeatureVisibleDistance: number;
        maxFeatureVisibleDistance: number;
        heightReference: string;
    };
}
export interface CzmGeoJson extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmGeoJson.createDefaultProps>> {
}
