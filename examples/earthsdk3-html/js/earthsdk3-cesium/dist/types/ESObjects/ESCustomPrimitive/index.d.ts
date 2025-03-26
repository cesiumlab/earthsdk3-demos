import { ESJNativeNumber16, ESObjectWithLocation } from "earthsdk3";
import { CzmAttributesType, CzmIndexType } from "../../ESJTypesCzm";
import { getMinMaxPosition, JsonValue, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
import { AttributesJsonType, BoundingVolumeJsonType, CzmCustomPrimitiveUniformMapType, CzmPassType, CzmPrimitiveType, IndexJsonType } from "./types";
/**
 * https://www.wolai.com/earthsdk/o97QLCu4MuaXekD4B5DZ9r
 */
export declare class ESCustomPrimitive extends ESObjectWithLocation {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        position: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJVector3D>;
        rotation: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJVector3D>;
        scale: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJVector3D>;
        minVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        maxVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJFlyToParam | undefined>;
        flyInParam: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJFlyInParam | undefined>;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
        maximumScale: number | undefined;
        minimumScale: number | undefined;
        pixelSize: number | undefined;
        showSceneScale: boolean | undefined;
        modelMatrix: import("xbsj-base").ReactiveVariable<ESJNativeNumber16 | undefined>;
        cull: import("xbsj-base").ReactiveVariable<boolean | undefined>;
        boundingVolume: import("xbsj-base").ReactiveVariable<BoundingVolumeJsonType | undefined>;
        renderState: import("xbsj-base").ReactiveVariable<JsonValue>;
        primitiveType: CzmPrimitiveType | undefined;
        pass: CzmPassType | undefined;
        vertexShaderSource: string | undefined;
        fragmentShaderSource: string | undefined;
        uniformMap: import("xbsj-base").ReactiveVariable<CzmCustomPrimitiveUniformMapType | undefined>;
        localPosition: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        localRotation: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        localScale: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        localModelMatrix: import("xbsj-base").ReactiveVariable<ESJNativeNumber16 | undefined>;
        occlude: boolean | undefined;
        count: number | undefined;
        offset: number | undefined;
        instanceCount: number | undefined;
        castShadows: boolean | undefined;
        receiveShadows: boolean | undefined;
        executeInClosestFrustum: boolean | undefined;
        debugShowBoundingVolume: boolean | undefined;
        debugOverlappingFrustums: number | undefined;
        pickOnly: boolean | undefined;
        depthForTranslucentClassification: boolean | undefined;
        viewDistanceRange: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        viewDistanceDebug: boolean;
    };
    static readonly defaultRenderState: {
        depthTest: {
            enabled: boolean;
        };
        cull: {
            enabled: boolean;
            face: number;
        };
        depthMask: boolean;
        blending: {
            enabled: boolean;
            equationRgb: number;
            equationAlpha: number;
            functionSourceRgb: number;
            functionSourceAlpha: number;
            functionDestinationRgb: number;
            functionDestinationAlpha: number;
        };
    };
    static readonly defaultVertexShaderSource = "in vec3 position;\nin vec3 normal;\nin vec2 st;\nout vec3 v_normalEC;\nout vec2 v_st;\nvoid main()\n{\n    // \u5982\u679C\u8FD9\u4E00\u53E5\u6CE8\u91CA\uFF0C\u8981\u76F8\u5E94\u5730\u6CE8\u91CA\u6389attribute\u4E2D\u7684normal\uFF0C\u4E5F\u5C31\u662F\u8BF4\u9876\u70B9\u5C5E\u6027\u8981\u548Cshader\u4E2D\u7684\u4E00\u4E00\u5339\u914D\uFF01\n    v_normalEC = czm_normal * normal; \n    v_st = st;\n    gl_Position = czm_modelViewProjection * vec4(position, 1.0);\n}\n";
    static readonly defaultFragmentShaderSource = "in vec2 v_st;\nuniform sampler2D u_image;\nuniform vec4 u_color;\nvoid main()\n{\n    vec4 imageColor = texture(u_image, v_st);\n    out_FragColor = imageColor * u_color;\n}\n";
    static readonly defaultUniformMap: CzmCustomPrimitiveUniformMapType;
    static readonly defaultBoundingVolume: BoundingVolumeJsonType;
    static readonly defaultAttribute: CzmAttributesType;
    static readonly defaultIndexTypedArray: Uint16Array;
    get attributesJson(): AttributesJsonType | undefined;
    set attributesJson(value: AttributesJsonType | undefined);
    get attributesJsonChanged(): import("xbsj-base").Listener<[CzmAttributesType | undefined, CzmAttributesType | undefined]>;
    get indexTypedArrayJson(): IndexJsonType | undefined;
    set indexTypedArrayJson(value: IndexJsonType | undefined);
    get indexTypedArrayJsonChanged(): import("xbsj-base").Listener<[CzmIndexType | undefined, CzmIndexType | undefined]>;
    private _attributes;
    get attributes(): CzmAttributesType | undefined;
    set attributes(value: CzmAttributesType | undefined);
    get attributesChanged(): import("xbsj-base").Listener<[CzmAttributesType | undefined, CzmAttributesType | undefined]>;
    private _indexTypedArray;
    get indexTypedArray(): CzmIndexType | undefined;
    set indexTypedArray(value: CzmIndexType | undefined);
    get indexTypedArrayChanged(): import("xbsj-base").Listener<[CzmIndexType | undefined, CzmIndexType | undefined]>;
    static defaults: {
        allowPicking: boolean;
        position: [number, number, number];
        rotation: [number, number, number];
        scale: [number, number, number];
        modelMatrix: ESJNativeNumber16;
        viewDistanceRange: [number, number, number, number];
        show: boolean;
        collision: boolean;
        flyToParam: import("earthsdk3").ESJFlyToParam;
        flyInParam: import("earthsdk3").ESJFlyInParam;
    };
    constructor(id?: SceneObjectKey);
    setUniformMap(value: CzmCustomPrimitiveUniformMapType): void;
    setLocalBoundingSphere(radius: number, center?: [number, number, number]): void;
    setLocalAxisedBoundingBox(min: [number, number, number], max: [number, number, number]): void;
    static getMinMaxPosition: typeof getMinMaxPosition;
    computeLocalAxisedBoundingBoxFromAttribute(attributeName?: string): {
        min: [number, number, number];
        max: [number, number, number];
    } | undefined;
    getProperties(language?: string): import("earthsdk3").Property[];
}
export declare namespace ESCustomPrimitive {
    const createDefaultProps: () => {
        position: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJVector3D>;
        rotation: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJVector3D>;
        scale: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJVector3D>;
        minVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        maxVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJFlyToParam | undefined>;
        flyInParam: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJFlyInParam | undefined>;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
        maximumScale: number | undefined;
        minimumScale: number | undefined;
        pixelSize: number | undefined;
        showSceneScale: boolean | undefined;
        modelMatrix: import("xbsj-base").ReactiveVariable<ESJNativeNumber16 | undefined>;
        cull: import("xbsj-base").ReactiveVariable<boolean | undefined>;
        boundingVolume: import("xbsj-base").ReactiveVariable<BoundingVolumeJsonType | undefined>;
        renderState: import("xbsj-base").ReactiveVariable<JsonValue>;
        primitiveType: CzmPrimitiveType | undefined;
        pass: CzmPassType | undefined;
        vertexShaderSource: string | undefined;
        fragmentShaderSource: string | undefined;
        uniformMap: import("xbsj-base").ReactiveVariable<CzmCustomPrimitiveUniformMapType | undefined>;
        localPosition: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        localRotation: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        localScale: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        localModelMatrix: import("xbsj-base").ReactiveVariable<ESJNativeNumber16 | undefined>;
        occlude: boolean | undefined;
        count: number | undefined;
        offset: number | undefined;
        instanceCount: number | undefined;
        castShadows: boolean | undefined;
        receiveShadows: boolean | undefined;
        executeInClosestFrustum: boolean | undefined;
        debugShowBoundingVolume: boolean | undefined;
        debugOverlappingFrustums: number | undefined;
        pickOnly: boolean | undefined;
        depthForTranslucentClassification: boolean | undefined;
        viewDistanceRange: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        viewDistanceDebug: boolean;
    };
}
export interface ESCustomPrimitive extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof ESCustomPrimitive.createDefaultProps>> {
}
