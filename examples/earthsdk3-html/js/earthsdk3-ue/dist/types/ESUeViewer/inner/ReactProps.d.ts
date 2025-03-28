import { ESUeViewer } from "../index";
import { ESJLonLatFormatType, ESJVector3D } from "earthsdk3";
declare const createReactProps: () => {
    apiKey: string;
    apiUrl: string;
    secretKey: string;
    speechVoiceMode: string;
    geoReferenceOrigin: import("xbsj-base").ReactiveVariable<ESJVector3D | undefined>;
    keepWorldOriginNearCamera: boolean | undefined;
    useCache: boolean | undefined;
    widgetInteractionDistance: number | undefined;
    memReportInterval: number | undefined;
    sceneControlled: boolean | undefined;
    brightness: number | undefined;
    emissiveIntensity: number | undefined;
    statusUpdateInterval: number | undefined;
    baseUrl: string | undefined;
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
    editingPointColor: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJVector4D | undefined>;
    editingAuxiliaryPointColor: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJVector4D | undefined>;
    editingLineWidth: number | undefined;
    editingLineColor: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJVector4D | undefined>;
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
            color: import("earthsdk3").ESJVector4D;
            spacing: number;
            width: number;
        };
    };
};
declare const reactPropDefaults: {
    geoReferenceOrigin: ESJVector3D | undefined;
    keepWorldOriginNearCamera: boolean;
    useCache: boolean;
    widgetInteractionDistance: number;
    memReportInterval: number;
    sceneControlled: boolean;
    brightness: number;
    emissiveIntensity: number;
    statusUpdateInterval: number;
    baseUrl: string;
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
            color: import("earthsdk3").ESJVector4D;
            spacing: number;
            width: number;
        };
    };
    globeShow: boolean;
};
declare function getGlobalPropsKey(): string[];
declare function getGlobalPropsValue(viewer: ESUeViewer): {
    [key: string]: any;
};
export { getGlobalPropsKey, getGlobalPropsValue, createReactProps, reactPropDefaults };
