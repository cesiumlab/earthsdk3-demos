import { ESJFlyToParam, ESJsonObjectType, ESJVector2D, ESJVector2DArray, ESJVector3D, ESJVector4D, ESViewer, ESVOption } from "earthsdk3";
import { Event, UniteChanged } from 'xbsj-base';
import { UeCloudViewerBase } from './uemsg/UeCloudViewerBase';
import { NavigationModeCallFuncParam } from './uemsg/UeFuncsType';
export declare class ESUeViewer extends ESViewer {
    static readonly type: string;
    get defaultProps(): {
        resolutionScale: number;
        autoReconnect: boolean;
        propChangedListening: boolean | undefined;
        objectEventListening: boolean | undefined;
        widgetEventListening: boolean | undefined;
        speechRecognitionListening: boolean | undefined;
        customMessageListening: boolean | undefined;
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
    private _viewer;
    set viewer(value: UeCloudViewerBase | undefined);
    get viewer(): UeCloudViewerBase | undefined;
    private _speechRecognition;
    get speechRecognition(): Event<[{
        et: "speechRecognition";
        eid: string;
        result: string;
        error: string;
    }]>;
    private _propChanged;
    get propChanged(): Event<[{
        et: "propChanged";
        eid: string;
        objId: string;
        props: {
            [k: string]: any;
        };
    }]>;
    private _objectEvent;
    get objectEvent(): Event<[{
        et: "objectEvent";
        eid: string;
        type: string;
        id: string;
        p: {
            [k: string]: any;
        };
    }]>;
    private _widgetEvent;
    get widgetEvent(): Event<[{
        et: "widgetEvent";
        eid: string;
        objId: string;
        type: "leftClick" | "rightClick" | "mouseEnter" | "mouseLeave" | "childMouseLeave" | "childMouseEnter";
        add?: {
            children?: string[] | undefined;
            mousePos?: [number, number] | undefined;
            className?: string | undefined;
            mouseRelativePos?: [number, number] | undefined;
        } | undefined;
    }]>;
    private _customMessage;
    get customMessage(): Event<[{
        et: "customMessage";
        eid: string;
        message: string;
    }]>;
    private _statusUpdateEvent;
    get statusUpdateEvent(): Event<[{
        et: "statusUpdate";
        eid: string;
        FPS: number;
        length: number;
        position: [number, number, number];
        rotation: [number, number, number];
    }]>;
    private _statusUpdateEventdon;
    uePositionToLonLatAlt(UEPosition: ESJVector3D): Promise<ESJVector3D | undefined>;
    changeNavigationMode(parms: NavigationModeCallFuncParam): Promise<{
        error: string | undefined;
    } | undefined>;
    resetWithCurrentCamera(id: string): Promise<{
        error: string | undefined;
    } | undefined>;
    getAllSocketNamesByActorTag(ActorTag: string): Promise<string[] | undefined>;
    getgetBoundSphere(id: string): Promise<{
        center?: [number, number, number] | undefined;
        radius?: number | undefined;
        tips?: string | undefined;
    } | undefined>;
    getBoundSphereWithChildren(id: string): Promise<{
        center?: [number, number, number] | undefined;
        radius?: number | undefined;
        tips?: string | undefined;
    } | undefined>;
    getStrokeMaterialParamInfo(id: string): Promise<{
        params?: {
            name: string;
            type: string;
            value: number | [number, number, number, number];
        }[] | undefined;
    } | undefined>;
    getFillMaterialParamInfo(id: string): Promise<{
        params?: {
            name: string;
            type: string;
            value: number | [number, number, number, number];
        }[] | undefined;
    } | undefined>;
    getGlobalProperty(props: string[]): Promise<{
        [k: string]: any;
    } | undefined>;
    getObjectByInfo(info: {
        actorTag: string;
        componentTag?: string;
    }): Promise<{
        object?: {
            [k: string]: any;
            type: string;
        } | undefined;
    } | undefined>;
    defaultCameraFlyIn(duration?: number): Promise<{
        error: string | undefined;
    } | undefined>;
    startVoice(): Promise<{
        [k: string]: any;
    } | undefined>;
    stopVoice(): Promise<{
        [k: string]: any;
    } | undefined>;
    generateMemReport(): Promise<{
        [k: string]: any;
    } | undefined>;
    quit(): Promise<{
        error: string | undefined;
    } | undefined>;
    bindActorByTag(id: string, actorTag: string): Promise<{
        re: {
            type: number;
        };
        error: string | undefined;
    } | undefined>;
    restoreOriginalScene(): Promise<{
        error: string | undefined;
    } | undefined>;
    unBindActorByID(ID: string): Promise<{
        error: string | undefined;
    } | undefined>;
    unBindActorByTag(ActorTag: string): Promise<{
        error: string | undefined;
    } | undefined>;
    createActorByClass(ID: string, ActorClass: string): Promise<{
        re: {
            type: number;
        };
        error: string | undefined;
    } | undefined>;
    bind3DTilesetByTag(ID: string, ActorTag: string): Promise<{
        re: {
            type: number;
        };
        error: string | undefined;
    } | undefined>;
    unBind3DTilesetByTag(ActorTag: string): Promise<{
        error: string | undefined;
    } | undefined>;
    unBind3DTilesetById(ID: string): Promise<{
        error: string | undefined;
    } | undefined>;
    bindImageryByTag(ID: string, ActorTag: string, ComponentTag: string): Promise<{
        re: {
            type: number;
        };
        error: string | undefined;
    } | undefined>;
    unBindImageryByTag(ActorTag: string, ComponentTag: string): Promise<{
        error: string | undefined;
    } | undefined>;
    unBindImageryById(ID: string): Promise<{
        error: string | undefined;
    } | undefined>;
    getIdByComponentNameAndHitItem(id: string, ComponentName: string, HitItem: number): Promise<{
        re: {
            TreeId: string;
        };
        error: string | undefined;
    } | undefined>;
    /**
     * @returns Promise(高度)
     * @deprecated 获取当前视角相机相对地面的高度
     * Channels ?? 'ECC_Visibility'
     */
    getCameraRelativeHeight(Channel?: string): Promise<{
        re: {
            height: number;
        };
        error: string | undefined;
    } | undefined>;
    /**
     * 保存str到指定目录下
     *  Path ?? "WindowNoEditor\\ProjectName\\"
     *  File ?? "data.txt"
     */
    saveStringToFile(str: string, Path?: string, File?: string): Promise<{
        error: string | undefined;
    } | undefined>;
    highlightActorByTag(actorTag: string, isHighlight?: boolean): Promise<{
        error: string | undefined;
    } | undefined>;
    sendCustomMessage(Message: string): Promise<{
        error: string | undefined;
    } | undefined>;
    getStatus(): Promise<{
        FPS: number;
        position: [number, number, number];
        rotation: [number, number, number];
        length: number;
    } | undefined>;
    pick(screenPosition?: ESJVector2D, attachedInfo?: any, parentInfo?: boolean): Promise<import("earthsdk3").PickedResult | undefined>;
    pickPosition(screenPosition: ESJVector2D): Promise<[number, number, number] | undefined>;
    flyIn(position: ESJVector3D, rotation?: ESJVector3D, duration?: number): Promise<{
        endType: 0 | 1;
    } | undefined>;
    flyTo(flyToParam: ESJFlyToParam, position: ESJVector3D): Promise<{
        endType: 0 | 1;
    } | undefined>;
    flyToBoundingSphere(rectangle: ESJVector4D, distance?: number, duration?: number): void;
    /**
     * @description 获取当前相机信息
     * @returns @type {position:ESJVector3D, rotation:ESJVector3D}
     */
    getCurrentCameraInfo(): {
        position: ESJVector3D;
        rotation: ESJVector3D;
    };
    /**
     * @description 获取当前比例尺
     * @returns  比例尺
     */
    getLengthInPixel(): number;
    /**
     * @description 切换为第一人称漫游模式 w a s d可以控制相机移动
     * @param position 相机位置
     * @returns
     */
    changeToWalk(position: ESJVector3D, jumpZVelocity?: number): Promise<{
        error: string | undefined;
    } | undefined>;
    /**
     * 切换导航模式为“地图”模式。
     * 此模式允许用户在地图上自由导航。
     */
    changeToMap(): Promise<{
        error: string | undefined;
    } | undefined>;
    /**
     * 切换到“旋转地球”导航模式。
     * 此模式允许用户在连续循环中旋转地球。
     * @param latitude - 地球旋转的纬度。默认为 38 度。
     * @param height - 地球旋转的高度。默认为 10,000,000 米。
     * @param cycleTime - 一个完整循环所需的秒数。默认为 60 秒。
     */
    changeToRotateGlobe(latitude?: number, height?: number, cycleTime?: number): Promise<{
        error: string | undefined;
    } | undefined>;
    /**
     * 切换导航模式为“Line”（线路）沿线漫游。
     * 此模式允许用户沿指定的地理线路导航。
     * @param geoLineStringId - 要导航的地理线路的唯一标识符。
     * @param speed - 用户在线路上导航的速度 默认10m/s。
     * @param heightOffset - 用户在线路上导航的垂直偏移量 默认 10米。
     * @param loop - 一个布尔值，表示在到达线路末尾后是否导航回到起点循环。默认开启
     * @param turnRateDPS - 用户在线路上导航的转弯速度 度/秒。
     * @param lineMode - 路径漫游模式 auto/manual 默认 auto。
     */
    changeToLine(geoLineStringId: string, speed?: number, heightOffset?: number, loop?: boolean, turnRateDPS?: number, lineMode?: "auto" | "manual"): Promise<{
        error: string | undefined;
    } | undefined>;
    /**
     * 切换导航模式为“UserDefined” 仅UE支持。
     * 此模式允许用户自定义交互方式。
     * @param userDefinedPawn ue支持，用户自定义交互方式
     */
    changeToUserDefined(userDefinedPawn: string): Promise<{
        error: string | undefined;
    } | undefined>;
    /**
      * 切换导航模式为“RotatePoint”（绕点）绕点旋转。此模式允许用户绕点旋转。
      * @param position - 要环绕的点位置（经纬度）。
      * @param heading - 初始的环绕角度，默认0。
      * @param pitch - 初始的环绕俯仰角，默认-30。
      * @param distance - 距离点的距离，默认50000米 ，单位米
      * @param orbitPeriod - 默认环绕一周的时间 单位S,默认60S。
      */
    changeToRotatePoint(position: ESJVector3D, distance?: number, orbitPeriod?: number, heading?: number, pitch?: number): Promise<{
        error: string | undefined;
    } | undefined>;
    /**
     * 切换导航模式为“Follow”（跟随）跟随模式。 此模式允许视角跟随ES对象。
     * @param objectId - 要跟随的ES对象Id。
     * @param heading - 初始的环绕角度，默认0。
     * @param pitch - 初始的环绕俯仰角，默认-30。
     * @param distance - 距离点的距离，默认0米 ，单位米 传入0会自行计算距离为包围盒半径*3
     */
    changeToFollow(objectId: string, distance?: number, heading?: number, pitch?: number): Promise<{
        error: string | undefined;
    } | undefined>;
    getFPS(): number;
    getVersion(): Promise<any>;
    getHeightByLonLat(lon: number, lat: number, channel?: string): Promise<number | null>;
    getHeightsByLonLats(lonLats: ESJVector2DArray, channel?: string): Promise<(number | null)[] | undefined>;
    capture(resx?: number, resy?: number): Promise<string | undefined>;
    lonLatAltToScreenPosition(position: ESJVector3D): Promise<ESJVector2D | undefined>;
    setGlobalProperty(params: ESJsonObjectType): Promise<{
        error: string | undefined;
    } | undefined>;
    constructor(option: ESVOption);
    getProperties(): import("earthsdk3").Property[];
    static defaults: {
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
                color: ESJVector4D;
                spacing: number;
                width: number;
            };
        };
        globeShow: boolean;
    };
}
export declare namespace ESUeViewer {
    const createDefaultProps: () => {
        resolutionScale: number;
        autoReconnect: boolean;
        propChangedListening: boolean | undefined;
        objectEventListening: boolean | undefined;
        widgetEventListening: boolean | undefined;
        speechRecognitionListening: boolean | undefined;
        customMessageListening: boolean | undefined;
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
export interface ESUeViewer extends UniteChanged<ReturnType<typeof ESUeViewer.createDefaultProps>> {
}
