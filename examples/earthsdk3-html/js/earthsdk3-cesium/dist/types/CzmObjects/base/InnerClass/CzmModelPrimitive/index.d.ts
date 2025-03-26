import * as Cesium from 'cesium';
import { ESJNativeNumber16 } from "earthsdk3";
import { ESCesiumViewer } from '../../../../ESCesiumViewer';
import { CzmModelAnimationJsonType, CzmModelAnimationType, CzmModelNodeTransformations, CzmModelPrimitiveCustomShaderClassType, CzmModelPrimitiveCustomShaderInstanceClassType, CzmPassType } from '../../../../ESJTypesCzm';
import { Destroyable, Event, Listener, ReactivePropsToNativePropsAndChanged } from 'xbsj-base';
import { CzmViewDistanceRangeControl } from '../../../../utils';
export declare class CzmModelPrimitive extends Destroyable {
    private _czmViewer;
    static defaultUrl: string;
    static defaultSpecularEnvironmentMaps: string;
    private _readyEvent;
    get readyEvent(): Event<[Cesium.Model]>;
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _customShaderInstanceClass;
    get customShaderInstanceClass(): CzmModelPrimitiveCustomShaderInstanceClassType | undefined;
    set customShaderInstanceClass(value: CzmModelPrimitiveCustomShaderInstanceClassType | undefined);
    get customShaderInstanceClassChanged(): Listener<[CzmModelPrimitiveCustomShaderInstanceClassType | undefined, CzmModelPrimitiveCustomShaderInstanceClassType | undefined]>;
    private _updateCustomShaderEvent;
    get updateCustomShaderEvent(): Event<[(customShaderInstance: CzmModelPrimitiveCustomShaderClassType, sceneObject: CzmModelPrimitive, viewer: ESCesiumViewer) => void]>;
    updateCustomShader(func: (customShaderInstance: CzmModelPrimitiveCustomShaderClassType) => void): void;
    private _activeAnimations;
    get activeAnimations(): CzmModelAnimationType[] | undefined;
    get activeAnimationsChanged(): Listener<[CzmModelAnimationType[] | undefined, CzmModelAnimationType[] | undefined]>;
    set activeAnimations(value: CzmModelAnimationType[] | undefined);
    static defaults: {
        activeAnimationsAnimateWhilePaused: boolean;
        viewDistanceRange: [number, number, number, number];
    };
    private _primitive?;
    setPrimitive(value: Cesium.Model | undefined): void;
    get primitive(): Cesium.Model | undefined;
    private _customShaderInstance?;
    private _gltf;
    get gltf(): any;
    set gltf(value: any);
    get gltfChanged(): Listener<[any, any]>;
    private _czmViewVisibleDistanceRangeControl;
    get czmViewerVisibleDistanceRangeControl(): CzmViewDistanceRangeControl;
    get visibleAlpha(): number;
    get visibleAlphaChanged(): Listener<[number, number]>;
    private _sceneScaleFromPixelSize;
    get sceneScaleFromPixelSize(): import("xbsj-base").ReactiveVariable<number | undefined>;
    private _finalShowReact;
    get finalShow(): boolean;
    private _finalModelUriReact;
    get finalModelUriReact(): import("xbsj-base").ReactiveVariable<string | undefined>;
    private _finalSpecularEnvironmentMapsReact;
    get finalSpecularEnvironmentMapsReact(): import("xbsj-base").ReactiveVariable<string | undefined>;
    get czmViewer(): ESCesiumViewer;
    private _id;
    get id(): string | undefined;
    set id(value: string | undefined);
    get idChanged(): Listener<[string | undefined, string | undefined]>;
    constructor(_czmViewer: ESCesiumViewer, id?: string);
    get ready(): boolean;
    /**
     * 打开本地目录，加载本地gltf数据，注意只能打开gltf文件所在目录
    */
    openLocalDir(): Promise<void>;
    /**
     * 删除某个node节点的transformation配置
     * @param nodeName
     * @returns
     */
    deleteNodeTransformation(nodeName: string): void;
    setNodeTranslation(nodeName: string, translation: [number, number, number]): void;
    getNodeTranslation(nodeName: string): [number, number, number] | undefined;
    setNodeRotation(nodeName: string, rotation: [number, number, number]): void;
    getNodeRotation(nodeName: string): [number, number, number] | undefined;
    setNodeScale(nodeName: string, scale: [number, number, number]): void;
    getNodeScale(nodeName: string): [number, number, number] | undefined;
    private _printDebugInfoEvent;
    get printDebugInfoEvent(): Event<[]>;
    printDebugInfo(): void;
    private _smoothMoving;
    private _smoothMovingBinding;
    private _smoothMovingBinding2;
    smoothMove(destination: [number, number, number], duration: number): void;
}
export declare namespace CzmModelPrimitive {
    const createDefaultProps: () => {
        show: boolean | undefined;
        url: string | undefined;
        editing: boolean;
        positionEditing: boolean;
        rotationEditing: boolean;
        allowPicking: boolean | undefined;
        allowPickingDepth: boolean;
        maximumScale: number | undefined;
        minimumScale: number | undefined;
        pixelSize: number | undefined;
        showSceneScale: boolean | undefined;
        position: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        rotation: import("xbsj-base").ReactiveVariable<[number, number, number]>;
        scale: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        localPosition: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        localRotation: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        localScale: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        localModelMatrix: import("xbsj-base").ReactiveVariable<ESJNativeNumber16 | undefined>;
        modelMatrix: import("xbsj-base").ReactiveVariable<ESJNativeNumber16 | undefined>;
        forwardAxis: 0 | 1 | 2 | undefined;
        upAxis: 0 | 1 | 2 | undefined;
        color: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        silhouetteColor: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        shadows: "DISABLED" | "ENABLED" | "CAST_ONLY" | "RECEIVE_ONLY" | undefined;
        credit: string | undefined;
        basePath: string | undefined;
        gltfJson: import("xbsj-base").ReactiveVariable<undefined>;
        heightReference: "NONE" | "RELATIVE_TO_GROUND" | "CLAMP_TO_GROUND" | undefined;
        distanceDisplayCondition: [number, number] | undefined;
        colorBlendMode: "HIGHLIGHT" | "REPLACE" | "MIX" | undefined;
        incrementallyLoadTextures: boolean | undefined;
        asynchronous: boolean | undefined;
        clampAnimations: boolean | undefined;
        debugShowBoundingVolume: boolean | undefined;
        debugWireframe: boolean | undefined;
        backFaceCulling: boolean | undefined;
        showOutline: boolean | undefined;
        colorBlendAmount: number | undefined;
        silhouetteSize: number | undefined;
        imageBasedLightingFactor: [number, number] | undefined;
        lightColor: [number, number, number] | undefined;
        luminanceAtZenith: number | undefined;
        atmosphereScatteringIntensity: number | undefined;
        sphericalHarmonicCoefficients: [number, number, number][] | undefined;
        specularEnvironmentMaps: string | undefined;
        customShaderInstanceClassStr: string | undefined;
        activeAnimationsJson: import("xbsj-base").ReactiveVariable<CzmModelAnimationJsonType[] | undefined>;
        activeAnimationsAnimateWhilePaused: boolean | undefined;
        nodeTransformations: import("xbsj-base").ReactiveVariable<CzmModelNodeTransformations | undefined>;
        viewDistanceRange: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        viewDistanceDebug: boolean;
        nativeMinimumPixelSize: number;
        nativeMaximumScale: number | undefined;
        nativeScale: number;
        opaquePass: CzmPassType;
    };
}
export interface CzmModelPrimitive extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmModelPrimitive.createDefaultProps>> {
}
