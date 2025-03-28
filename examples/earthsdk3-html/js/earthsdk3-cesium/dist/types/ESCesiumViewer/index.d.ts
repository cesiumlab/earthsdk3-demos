import * as Cesium from 'cesium';
import { ESJFlyToParam, ESJLonLatFormatType, ESJVector2D, ESJVector2DArray, ESJVector3D, ESJVector4D, ESSceneObject, ESViewer, ESVisualObject, ESVOption } from 'earthsdk3';
import { Event, ObjResettingWithEvent, UniteChanged } from 'xbsj-base';
import { CzmClippingPlaneCollectionJsonType, CzmClippingPolygonCollectionJsonType, CzmSceneGlobeShadowsType, CzmSceneSkyBoxSourcesType } from '../ESJTypesCzm';
import { ObjectsToExcludeWrapper } from './ObjectsToExcludeWrapper';
import { ViewerInstance } from './ViewerInstance';
import { ViewerLegend } from './ViewerLegend';
import { getCesiumIonToken } from './getCesiumIonToken';
export * from './Flattern';
export * from './ViewerExtensions';
export declare class ESCesiumViewer extends ESViewer {
    static readonly type: string;
    static getCesiumIonToken: typeof getCesiumIonToken;
    static currentDefaultAccessToken: string;
    static latestDefaultAccessToken: string | undefined;
    static ObjectsToExcludeWrapper: typeof ObjectsToExcludeWrapper;
    /**
     * _disabledInputStack记录外部disable的数量，当为0时才可能正常使用！
     */
    private _disabledInputStack;
    get disabledInputStack(): number;
    get disabledInputStackChanged(): import("xbsj-base").Listener<[number, number]>;
    incrementDisabledInputStack(): void;
    decrementDisabledInputStack(): void;
    private _viewer;
    get viewer(): Cesium.Viewer | undefined;
    get extensions(): import("./ViewerExtensions").ViewerExtensions | undefined;
    private _viewerInstance;
    get viewerInstance(): ObjResettingWithEvent<ViewerInstance, Event<[innerViewer: any]>>;
    private _cameraChanged;
    get cameraChanged(): Event<[]>;
    private _viewerLegend;
    get viewerLegend(): ViewerLegend;
    pickCustomAttachedInfo: any;
    private _fps;
    static defaults: {
        flashLighting: boolean;
        resolutionScale: number;
        msaaSamples: number;
        sceneSplitPosition: number;
        depthTestAgainstTerrain: boolean;
        sceneGlobeShadows: CzmSceneGlobeShadowsType;
        sceneGlobeUndergroundColor: [number, number, number, number];
        sceneGlobeUndergroundColorAlphaByDistance: [number, number, number, number];
        sceneGlobeTranslucencyEnabled: boolean;
        sceneGlobeTranslucencyBackFaceAlpha: number;
        sceneGlobeTranslucencyBackFaceAlphaByDistance: [number, number, number, number];
        sceneGlobeTranslucencyFrontFaceAlpha: number;
        sceneGlobeTranslucencyFrontFaceAlphaByDistance: [number, number, number, number];
        sceneGlobeTranslucencyRectangle: [number, number, number, number];
        sun: boolean;
        sceneSunGlowFactor: number;
        moon: boolean;
        sceneMoonTextureUrl: string;
        sceneMoonOnlySunLighting: boolean;
        sceneSkyBoxSources: CzmSceneSkyBoxSourcesType;
        xbsjLocalBoxSources: CzmSceneSkyBoxSourcesType;
        sceneFogEnabled: boolean;
        sceneFogDensity: number;
        sceneFogScreenSpaceErrorFactor: number;
        sceneFogMinimumBrightness: number;
        sceneSsccEnableInputs: boolean;
        sceneSsccEnableCollisionDetection: boolean;
        sceneSsccZoomFactor: number;
        scenePpsfxaaEnabled: boolean;
        sceneDebugShowFramesPerSecond: boolean;
        sceneDebugShowCommands: boolean;
        sceneDebugShowFrustums: boolean;
        sceneDebugShowFrustumPlanes: boolean;
        sceneDebugShowDepthFrustum: number;
        showCesiumInspector: boolean;
        cesiumInspectorWireframe: boolean;
        showCesium3DTilesInspector: boolean;
        show: boolean;
        debug: boolean;
        statusInfo: import("earthsdk3").ESJStatusInfoType;
        terrainShader: {
            slope: {
                show: boolean;
            };
            aspect: {
                show: boolean;
            };
            elevationRamp: {
                show: boolean;
            };
            elevationContour: {
                show: boolean;
                color: ESJVector4D;
                spacing: number;
                width: number;
            };
        };
        globeShow: boolean;
    };
    constructor(option: ESVOption);
    pick(screenPosition: ESJVector2D, attachedInfo?: any, parentInfo?: boolean): Promise<import("earthsdk3").PickedResult | undefined>;
    pickPosition(screenPosition: ESJVector2D): Promise<[number, number, number] | undefined>;
    quickPickPosition(screenPosition: ESJVector2D): Promise<[number, number, number] | undefined>;
    static getHeightsScartchCarto: Cesium.Cartographic;
    /**
     * 获取某个经纬度上的地形高度，注意有可能获取不到，需要考虑undefined的情况！
     * @param positions
     * @returns 注意高度有可能是undefined!
     */
    getTerrainHeight(position: [number, number] | [number, number, number]): number | undefined;
    getCameraInfo(): {
        position: [number, number, number];
        rotation: [number, number, number];
    } | undefined;
    calcFlyToParam(targetPosition: [number, number, number]): ESJFlyToParam | undefined;
    flyIn(position: ESJVector3D, rotation?: ESJVector3D, _duration?: number): Promise<boolean> | undefined;
    flyTo(flyToParam: ESJFlyToParam, position: ESJVector3D): Promise<boolean> | undefined;
    flyToBoundingSphere(rectangle: ESJVector4D, distance?: number, duration?: number): Promise<boolean> | undefined;
    getCurrentCameraInfo(): {
        position: [number, number, number];
        rotation: [number, number, number];
    } | undefined;
    getLengthInPixel(): number;
    changeToWalk(position: ESJVector3D, jumpZVelocity?: number): void;
    changeToMap(): void;
    changeToRotateGlobe(latitude?: number, height?: number, cycleTime?: number): void;
    changeToLine(geoLineStringId: string, speed?: number, heightOffset?: number, loop?: boolean, turnRateDPS?: number, lineMode?: "auto" | "manual"): void;
    changeToUserDefined(userDefinedPawn: string): void;
    changeToRotatePoint(position: ESJVector3D, distance?: number, orbitPeriod?: number, heading?: number, pitch?: number): void;
    changeToFollow(objectId: string, distance?: number, heading?: number, pitch?: number, changeToFollow?: boolean): void;
    getFPS(): number;
    getBoundSphere(id: string): Promise<undefined>;
    getVersion(): Promise<any>;
    getHeightByLonLat(lon: number, lat: number, channel?: string): Promise<number | null>;
    getHeightsByLonLats(lonLats: ESJVector2DArray, channel?: string): Promise<(number | null)[]>;
    capture(resx?: number, resy?: number): Promise<string | undefined>;
    lonLatAltToScreenPosition(position: ESJVector3D): Promise<ESJVector2D | undefined>;
    private _notSupportEditingCount;
    get notSupportEditingCount(): number;
    set notSupportEditingCount(value: number);
    get notSupportEditingCountChanged(): import("xbsj-base").Listener<[number, number]>;
    private _editingSystem;
    startEditing(sceneObject: ESVisualObject, modes: string[] | string, useTabToSwitch?: boolean): void;
    private _moveObjectsProcess;
    moveObjects(sceneObjects: ESSceneObject[]): void;
    getCzmObject(sceneObject: ESSceneObject): import("earthsdk3").EngineObject<ESSceneObject, ESViewer> | undefined;
    setCurrentDefaultAccessToken(): void;
    setLatestDefaultAccessToken(): void;
    getProperties(): import("earthsdk3").Property[];
}
export declare namespace ESCesiumViewer {
    const createDefaultProps: () => {
        createCesiumViewerFuncStr: string | undefined;
        flashLighting: boolean | undefined;
        resolutionScale: number | undefined;
        msaaSamples: number | undefined;
        shadows: boolean;
        sceneSplitPosition: number | undefined;
        depthTestAgainstTerrain: boolean | undefined;
        sceneGlobeShadows: CzmSceneGlobeShadowsType | undefined;
        sceneGlobeTerrainExaggeration: number;
        sceneGlobeTerrainExaggerationRelativeHeight: number;
        sceneGlobeVerticalExaggeration: number;
        sceneGlobeVerticalExaggerationRelativeHeight: number;
        sceneGlobeBackFaceCulling: boolean;
        sceneGlobeShowSkirts: boolean;
        sceneGlobeShowWaterEffect: boolean;
        sceneGlobeBaseColor: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        sceneGlobeCartographicLimitRectangle: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        sceneGlobeClippingPlanes: import("xbsj-base").ReactiveVariable<CzmClippingPlaneCollectionJsonType | undefined>;
        sceneGlobeClippingPlanesId: string;
        sceneGlobeClippingPolygons: import("xbsj-base").ReactiveVariable<CzmClippingPolygonCollectionJsonType | undefined>;
        sceneGlobeClippingPolygonsId: import("xbsj-base").ReactiveVariable<string[]>;
        sceneGlobeUndergroundColor: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        sceneGlobeUndergroundColorAlphaByDistance: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        sceneGlobeTranslucencyEnabled: boolean | undefined;
        sceneGlobeTranslucencyBackFaceAlpha: number | undefined;
        sceneGlobeTranslucencyBackFaceAlphaByDistance: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        sceneGlobeTranslucencyFrontFaceAlpha: number | undefined;
        sceneGlobeTranslucencyFrontFaceAlphaByDistance: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        sceneGlobeTranslucencyRectangle: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        sun: boolean | undefined;
        sceneSunGlowFactor: number | undefined;
        moon: boolean | undefined;
        sceneMoonTextureUrl: string | undefined;
        sceneMoonOnlySunLighting: boolean | undefined;
        sceneSkyBoxShow: boolean;
        sceneSkyBoxSources: import("xbsj-base").ReactiveVariable<CzmSceneSkyBoxSourcesType>;
        xbsjUseBackground: boolean;
        xbsjBackgroundImageUri: string;
        xbsjBackgroundColor: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        xbsjLocalBoxSources: import("xbsj-base").ReactiveVariable<CzmSceneSkyBoxSourcesType | undefined>;
        sceneBackgroundColor: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        sceneFogEnabled: boolean | undefined;
        sceneFogDensity: number | undefined;
        sceneFogScreenSpaceErrorFactor: number | undefined;
        sceneFogMinimumBrightness: number | undefined;
        sceneSsccEnableInputs: boolean | undefined;
        sceneSsccEnableCollisionDetection: boolean | undefined;
        sceneSsccZoomFactor: number | undefined;
        scenePpsfxaaEnabled: boolean | undefined;
        scenePpsAmbientOcclusionEnabled: boolean;
        scenePpsAmbientOcclusionAmbientOcclusionOnly: boolean;
        scenePpsAmbientOcclusionIntensity: number;
        scenePpsAmbientOcclusionBias: number;
        scenePpsAmbientOcclusionLengthCap: number;
        scenePpsAmbientOcclusionStepSize: number;
        scenePpsAmbientOcclusionBlurStepSize: number;
        scenePpsBloomEnabled: boolean;
        scenePpsBloomGlowOnly: boolean;
        scenePpsBloomContrast: number;
        scenePpsBloomBrightness: number;
        scenePpsBloomDelta: number;
        scenePpsBloomSigma: number;
        scenePpsBloomStepSize: number;
        sceneDebugShowFramesPerSecond: boolean | undefined;
        sceneDebugShowCommands: boolean | undefined;
        sceneDebugShowFrustums: boolean | undefined;
        sceneDebugShowFrustumPlanes: boolean | undefined;
        sceneDebugShowDepthFrustum: number | undefined;
        showCesiumInspector: boolean | undefined;
        cesiumInspectorWireframe: boolean | undefined;
        showCesium3DTilesInspector: boolean | undefined;
        globeShow: boolean;
        ionAccessToken: string;
        lonLatFormat: ESJLonLatFormatType;
        fov: number;
        textAvoidance: boolean;
        flyToBoundingSize: number | undefined;
        hoverTime: number;
        currentTime: number;
        simulationTime: number;
        timeSync: boolean;
        rain: number;
        snow: number;
        cloud: number;
        fog: number;
        depthOfField: number;
        atmosphere: boolean;
        editingPointSize: number | undefined;
        editingPointColor: import("xbsj-base").ReactiveVariable<ESJVector4D | undefined>;
        editingAuxiliaryPointColor: import("xbsj-base").ReactiveVariable<ESJVector4D | undefined>;
        editingLineWidth: number | undefined;
        editingLineColor: import("xbsj-base").ReactiveVariable<ESJVector4D | undefined>;
        editingAxisSize: number | undefined;
        editingAuxiliaryPointSize: number | undefined;
        editingHeightOffset: number | undefined;
        editingLineShow: boolean;
        terrainShader: {
            slope: {
                show: boolean;
            };
            aspect: {
                show: boolean;
            };
            elevationRamp: {
                show: boolean;
            };
            elevationContour: {
                show: boolean;
                color: ESJVector4D;
                spacing: number;
                width: number;
            };
        };
        name: string;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        debug: boolean | undefined;
        show: boolean | undefined;
        opacity: number | undefined;
        zIndex: string | undefined;
        useDefaultStatusDiv: boolean;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
}
export interface ESCesiumViewer extends UniteChanged<ReturnType<typeof ESCesiumViewer.createDefaultProps>> {
}
