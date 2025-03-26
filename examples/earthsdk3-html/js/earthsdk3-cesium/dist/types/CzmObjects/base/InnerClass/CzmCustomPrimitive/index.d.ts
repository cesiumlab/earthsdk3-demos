import { Destroyable, Event, ReactivePropsToNativePropsAndChanged, JsonValue, Listener, getMinMaxPosition, SceneObjectKey } from "xbsj-base";
import { triangleIndicesToLine } from "./funcs";
import { AttributesJsonType, BoundingVolumeJsonType, CzmCustomPrimitiveUniformMapType, CzmPassType, CzmPrimitiveType, IndexJsonType } from "./types";
import { CzmCustomPrimitiveImpl } from "./CzmCustomPrimitiveImpl";
import { ESJNativeNumber16 } from "earthsdk3";
import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { CzmViewDistanceRangeControl } from "../../../../utils";
import { CzmAttributesType, CzmIndexType } from "../../../../ESJTypesCzm";
export declare class CzmCustomPrimitive extends Destroyable {
    private _czmViewer;
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
    static readonly defaultDsAttribute: CzmAttributesType;
    static readonly defaultDsIndexTypedArray: Uint16Array;
    static triangleIndicesToLine: typeof triangleIndicesToLine;
    get attributesJson(): AttributesJsonType | undefined;
    set attributesJson(value: AttributesJsonType | undefined);
    get attributesJsonChanged(): Listener<[CzmAttributesType | undefined, CzmAttributesType | undefined]>;
    get indexTypedArrayJson(): IndexJsonType | undefined;
    set indexTypedArrayJson(value: IndexJsonType | undefined);
    get indexTypedArrayJsonChanged(): Listener<[CzmIndexType | undefined, CzmIndexType | undefined]>;
    private _attributes;
    get attributes(): CzmAttributesType | undefined;
    set attributes(value: CzmAttributesType | undefined);
    get attributesChanged(): Listener<[CzmAttributesType | undefined, CzmAttributesType | undefined]>;
    private _indexTypedArray;
    get indexTypedArray(): CzmIndexType | undefined;
    set indexTypedArray(value: CzmIndexType | undefined);
    get indexTypedArrayChanged(): Listener<[CzmIndexType | undefined, CzmIndexType | undefined]>;
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _sceneScaleEvent;
    get sceneScaleEvent(): Event<[sceneScale: number | undefined, viewer: ESCesiumViewer]>;
    static defaults: {
        position: [number, number, number];
        rotation: [number, number, number];
        scale: [number, number, number];
        modelMatrix: ESJNativeNumber16;
        viewDistanceRange: [number, number, number, number];
    };
    get czmViewer(): ESCesiumViewer;
    private _nativePrimitive?;
    get nativePrimitive(): CzmCustomPrimitiveImpl | undefined;
    private _lastCzmPickResult;
    private _czmViewVisibleDistanceRangeControl;
    get czmViewerVisibleDistanceRangeControl(): CzmViewDistanceRangeControl;
    get visibleAlpha(): number;
    get visibleAlphaChanged(): Listener<[number, number]>;
    private _id;
    get id(): SceneObjectKey;
    set id(value: SceneObjectKey);
    get idChanged(): Listener<[string, string]>;
    constructor(_czmViewer: ESCesiumViewer, id?: string | undefined);
    setUniformMap(value: CzmCustomPrimitiveUniformMapType): void;
    setLocalBoundingSphere(radius: number, center?: [number, number, number]): void;
    setLocalAxisedBoundingBox(min: [number, number, number], max: [number, number, number]): void;
    static getMinMaxPosition: typeof getMinMaxPosition;
    computeLocalAxisedBoundingBoxFromAttribute(attributeName?: string): {
        min: [number, number, number];
        max: [number, number, number];
    } | undefined;
}
export declare namespace CzmCustomPrimitive {
    const createDefaultProps: () => {
        show: boolean | undefined;
        allowPicking: boolean;
        allowPickingDepth: boolean;
        positionEditing: boolean;
        rotationEditing: boolean;
        editing: boolean;
        position: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        rotation: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        scale: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
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
export interface CzmCustomPrimitive extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmCustomPrimitive.createDefaultProps>> {
}
