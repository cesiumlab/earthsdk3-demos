import { ESJFlyToParam, ESJVector2D, ESJVector2DArray, ESJVector3D, ESJVector4D, ESViewer, ESVOption, PickedResult } from "earthsdk3";
import OlMap from 'ol/Map.js';
import { UniteChanged } from "xbsj-base";
export declare class ESOlViewer extends ESViewer {
    static readonly type: string;
    private _viewer;
    get viewer(): OlMap | undefined;
    constructor(option: ESVOption);
    pick(screenPosition: ESJVector2D, attachedInfo?: any, parentInfo?: boolean): Promise<PickedResult | undefined>;
    pickPosition(screenPosition: ESJVector2D): Promise<ESJVector3D | undefined>;
    flyIn(position: ESJVector3D, rotation?: ESJVector3D, duration?: number): void;
    flyTo(flyToParam: ESJFlyToParam, position: ESJVector3D): void;
    flyToBoundingSphere(rectangle: ESJVector4D, distance?: number, duration?: number | undefined): void;
    getCurrentCameraInfo(): {
        position: ESJVector3D;
        rotation: ESJVector3D;
    } | undefined;
    getLengthInPixel(): number | undefined;
    changeToWalk(position: ESJVector3D): void;
    changeToMap(): void;
    changeToRotateGlobe(latitude?: number, height?: number, cycleTime?: number): void;
    changeToLine(geoLineStringId: string, speed?: number, heightOffset?: number, loop?: boolean, turnRateDPS?: number, lineMode?: "auto" | "manual"): void;
    changeToUserDefined(userDefinedPawn: string): void;
    changeToRotatePoint(position: ESJVector3D, distance?: number, orbitPeriod?: number, heading?: number, pitch?: number): void;
    changeToFollow(objectId: string, distance?: number, heading?: number, pitch?: number): void;
    getFPS(): number;
    getVersion(): Promise<any>;
    getHeightByLonLat(lon: number, lat: number, channel?: string): Promise<number | null>;
    getHeightsByLonLats(lonLats: ESJVector2DArray, channel?: string): Promise<(number | null)[] | undefined>;
    capture(resx?: number, resy?: number): Promise<string | undefined>;
    lonLatAltToScreenPosition(position: ESJVector3D): Promise<ESJVector2D | undefined>;
}
export declare namespace ESOlViewer {
    const createDefaultProps: () => {
        globeShow: boolean;
        ionAccessToken: string;
        lonLatFormat: import("earthsdk3").ESJLonLatFormatType;
        fov: number;
        textAvoidance: boolean;
        flyToBoundingSize: number | undefined;
        editingHeightOffset: number | undefined;
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
export interface OpenLayersViewer extends UniteChanged<ReturnType<typeof ESOlViewer.createDefaultProps>> {
}
