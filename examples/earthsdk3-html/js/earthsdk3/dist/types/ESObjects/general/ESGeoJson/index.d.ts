import { BooleanProperty, ColorProperty, EnumProperty, ESJFillStyle, ESJFlyInParam, ESJRenderType, ESJStrokeStyle, ESJVector2D, ESJVector4D, FunctionProperty, GroupProperty, JsonProperty, Number2Property, NumberProperty, Property, StringProperty } from "../../../ESJTypes";
import { ESVisualObject } from "../../../ESObjects/base";
import { JsonValue, Listener, UniteChanged } from "xbsj-base";
import { ESJImageStyle, ESJTextStyle } from "./type";
/**
 * GeoJson数据加载
 * ESGeoJson - https://www.wolai.com/earthsdk/uU8Lc9viWAjB7xnAxBabjx
 */
export declare class ESGeoJson extends ESVisualObject {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        show: boolean;
        allowPicking: boolean;
        loadFuncStr: string | undefined;
        url: string | {
            [xx: string]: any;
        } | undefined;
        stroked: boolean;
        strokeStyle: import("xbsj-base").ReactiveVariable<ESJStrokeStyle>;
        filled: boolean;
        fillStyle: import("xbsj-base").ReactiveVariable<ESJFillStyle>;
        imageShow: boolean;
        imageStyle: import("xbsj-base").ReactiveVariable<ESJImageStyle>;
        textShow: boolean;
        textStyle: import("xbsj-base").ReactiveVariable<ESJTextStyle>;
        minFeatureVisibleDistance: number;
        maxFeatureVisibleDistance: number;
        flyInParam: import("xbsj-base").ReactiveVariable<ESJFlyInParam | undefined>;
        heightReference: "NONE" | "CLAMP_TO_GROUND" | "RELATIVE_TO_GROUND";
        collision: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJFlyToParam | undefined>;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
    private _flyToFeatureEvent;
    get flyToFeatureEvent(): Listener<[string, any, number | undefined]>;
    flyToFeature(key: string, value: any, duration?: number): void;
    private _flyToFeatureIndexEvent;
    get flyToFeatureIndexEvent(): Listener<[number, number | undefined]>;
    flyToFeatureIndex(index: number, duration?: number): void;
    private _features;
    get features(): {
        [xx: string]: any;
    } | undefined;
    set features(value: {
        [xx: string]: any;
    } | undefined);
    get featuresChanged(): Listener<[{
        [xx: string]: any;
    } | undefined, {
        [xx: string]: any;
    } | undefined]>;
    pickedInfoType: string;
    getFeatures(): {
        [xx: string]: any;
    } | undefined;
    constructor(id?: string);
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
        strokeColor: ESJVector4D;
        strokeMaterial: string;
        strokeMaterialParams: {};
        strokeGround: boolean;
        filled: boolean;
        fillColor: ESJVector4D;
        fillMaterial: string;
        fillMaterialParams: {};
        fillGround: boolean;
        imageShow: boolean;
        imageUrl: string;
        imageSize: ESJVector2D;
        imageAnchor: ESJVector2D;
        imageOffset: ESJVector2D;
        textShow: boolean;
        textProperty: string;
        textDefaultText: string;
        textColor: ESJVector4D;
        textBackgroundColor: ESJVector4D | undefined;
        textFontFamily: string;
        textFontStyle: string;
        textFontSize: number;
        textFontWeight: string;
        textAnchor: ESJVector2D;
        textOffset: ESJVector2D;
        strokeWidthTypes: [name: string, value: string][];
        flyInParam: ESJFlyInParam;
        minFeatureVisibleDistance: number;
        maxFeatureVisibleDistance: number;
        heightReferences: [name: string, value: string][];
        collision: boolean;
        flyToParam: import("../../../ESJTypes").ESJFlyToParam;
    };
    getESProperties(): {
        defaultMenu: string;
        basic: never[];
        general: (StringProperty | FunctionProperty<[]> | BooleanProperty)[];
        dataSource: (NumberProperty | EnumProperty<string> | JsonProperty<string>)[];
        location: never[];
        coordinate: never[];
        style: (GroupProperty | StringProperty | NumberProperty | BooleanProperty | EnumProperty<string> | ColorProperty | Number2Property | JsonProperty<{}>)[];
    };
    getProperties(language?: string): Property[];
    get strokeWidth(): number;
    set strokeWidth(value: number);
    get strokeWidthChanged(): Listener<[ESJStrokeStyle, ESJStrokeStyle]>;
    get strokeWidthType(): ESJRenderType;
    set strokeWidthType(value: ESJRenderType);
    get strokeWidthTypeChanged(): Listener<[ESJStrokeStyle, ESJStrokeStyle]>;
    get strokeColor(): ESJVector4D;
    set strokeColor(value: ESJVector4D);
    get strokeColorChanged(): Listener<[ESJStrokeStyle, ESJStrokeStyle]>;
    get strokeMaterial(): string;
    set strokeMaterial(value: string);
    get strokeMaterialChanged(): Listener<[ESJStrokeStyle, ESJStrokeStyle]>;
    get strokeMaterialParams(): JsonValue;
    set strokeMaterialParams(value: JsonValue);
    get strokeMaterialParamsChanged(): Listener<[ESJStrokeStyle, ESJStrokeStyle]>;
    get strokeGround(): boolean;
    set strokeGround(value: boolean);
    get strokeGroundChanged(): Listener<[ESJStrokeStyle, ESJStrokeStyle]>;
    get fillColor(): ESJVector4D;
    set fillColor(value: ESJVector4D);
    get fillColorChanged(): Listener<[ESJFillStyle, ESJFillStyle]>;
    get fillMaterial(): string;
    set fillMaterial(value: string);
    get fillMaterialChanged(): Listener<[ESJFillStyle, ESJFillStyle]>;
    get fillMaterialParams(): JsonValue | undefined;
    set fillMaterialParams(value: JsonValue | undefined);
    get fillMaterialParamsChanged(): Listener<[ESJFillStyle, ESJFillStyle]>;
    get fillGround(): boolean;
    set fillGround(value: boolean);
    get fillGroundChanged(): Listener<[ESJFillStyle, ESJFillStyle]>;
    get textProperty(): string;
    set textProperty(value: string);
    get textPropertyChanged(): Listener<[ESJTextStyle, ESJTextStyle]>;
    get textDefaultText(): string;
    set textDefaultText(value: string);
    get textDefaultTextChanged(): Listener<[ESJTextStyle, ESJTextStyle]>;
    get textColor(): ESJVector4D;
    set textColor(value: ESJVector4D);
    get textColorChanged(): Listener<[ESJTextStyle, ESJTextStyle]>;
    get textBackgroundColor(): ESJVector4D | undefined;
    set textBackgroundColor(value: ESJVector4D | undefined);
    get textBackgroundColorChanged(): Listener<[ESJTextStyle, ESJTextStyle]>;
    get textFontFamily(): string;
    set textFontFamily(value: string);
    get textFontFamilyChanged(): Listener<[ESJTextStyle, ESJTextStyle]>;
    get textFontStyle(): string;
    set textFontStyle(value: string);
    get textFontStyleChanged(): Listener<[ESJTextStyle, ESJTextStyle]>;
    get textFontWeight(): string;
    set textFontWeight(value: string);
    get textFontWeightChanged(): Listener<[ESJTextStyle, ESJTextStyle]>;
    get textFontSize(): number;
    set textFontSize(value: number);
    get textFontSizeChanged(): Listener<[ESJTextStyle, ESJTextStyle]>;
    get textAnchor(): ESJVector2D;
    set textAnchor(value: ESJVector2D);
    get textAnchorChanged(): Listener<[ESJTextStyle, ESJTextStyle]>;
    get textOffset(): ESJVector2D;
    set textOffset(value: ESJVector2D);
    get textOffsetChanged(): Listener<[ESJTextStyle, ESJTextStyle]>;
    get imageUrl(): string;
    set imageUrl(value: string);
    get imageUrlChanged(): Listener<[ESJImageStyle, ESJImageStyle]>;
    get imageSize(): ESJVector2D;
    set imageSize(value: ESJVector2D);
    get imageSizeChanged(): Listener<[ESJImageStyle, ESJImageStyle]>;
    get imageAnchor(): ESJVector2D;
    set imageAnchor(value: ESJVector2D);
    get imageAnchorChanged(): Listener<[ESJImageStyle, ESJImageStyle]>;
    get imageOffset(): ESJVector2D;
    set imageOffset(value: ESJVector2D);
    get imageOffsetChanged(): Listener<[ESJImageStyle, ESJImageStyle]>;
}
export declare namespace ESGeoJson {
    const createDefaultProps: () => {
        show: boolean;
        allowPicking: boolean;
        loadFuncStr: string | undefined;
        url: string | {
            [xx: string]: any;
        } | undefined;
        stroked: boolean;
        strokeStyle: import("xbsj-base").ReactiveVariable<ESJStrokeStyle>;
        filled: boolean;
        fillStyle: import("xbsj-base").ReactiveVariable<ESJFillStyle>;
        imageShow: boolean;
        imageStyle: import("xbsj-base").ReactiveVariable<ESJImageStyle>;
        textShow: boolean;
        textStyle: import("xbsj-base").ReactiveVariable<ESJTextStyle>;
        minFeatureVisibleDistance: number;
        maxFeatureVisibleDistance: number;
        flyInParam: import("xbsj-base").ReactiveVariable<ESJFlyInParam | undefined>;
        heightReference: "NONE" | "CLAMP_TO_GROUND" | "RELATIVE_TO_GROUND";
        collision: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJFlyToParam | undefined>;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
}
export interface ESGeoJson extends UniteChanged<ReturnType<typeof ESGeoJson.createDefaultProps>> {
}
