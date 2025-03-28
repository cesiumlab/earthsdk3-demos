import { Destroyable, Event, JsonValue, ReactiveVariable, UniteChanged } from "xbsj-base";
import { EngineObject } from "../EngineObject";
import { ESJFlyToParam, ESJLonLatFormatType, ESJNavigationMode, ESJStatusInfoType, ESJVector2D, ESJVector2DArray, ESJVector3D, ESJVector4D, ESVOption, PickedResult, Property, ViewerStatus } from "../ESJTypes";
import { ESSceneObject } from "../ESObjects";
import { ViewerContainer } from "./ViewerContainer";
import { ViewerContext } from "./ViewerContext";
export declare abstract class ESViewer extends Destroyable {
    static readonly context: ViewerContext;
    static readonly register: <T extends ESViewer>(viewerType: string, viewerConstructor: new (option: ESVOption) => T) => string;
    private _forceRecreateEvent;
    forceRecreate(): void;
    protected _container: ReactiveVariable<HTMLDivElement | undefined>;
    get container(): HTMLDivElement | undefined;
    set container(value: HTMLDivElement | undefined);
    set containerOrId(value: HTMLDivElement | string);
    get containerChanged(): import("xbsj-base").Listener<[HTMLDivElement | undefined, HTMLDivElement | undefined]>;
    private _containerSize;
    get containerSize(): ESJVector2D | undefined;
    set containerSize(value: ESJVector2D | undefined);
    get containerSizeChanged(): import("xbsj-base").Listener<[ESJVector2D | undefined, ESJVector2D | undefined]>;
    private _editStatusEvent;
    get editStatusEvent(): Event<[{
        sceneObjectID: string[];
        editing: boolean;
        et?: string | undefined;
        eid?: string | undefined;
    }]>;
    private _status;
    get status(): ViewerStatus;
    get statusChanged(): import("xbsj-base").Listener<[ViewerStatus, ViewerStatus]>;
    setStatus(value: ViewerStatus): void;
    private _statusLog;
    get statusLog(): string;
    get statusLogChanged(): import("xbsj-base").Listener<[string, string]>;
    setStatusLog(value: string): void;
    private _statusContainer;
    private _useCustomInteraction;
    get useCustomInteraction(): boolean;
    set useCustomInteraction(value: boolean);
    private _resetInteractionEvent;
    private _interactionResetting;
    private _viewerChanged;
    get viewerChanged(): Event<[innerViewer: any]>;
    private _containerResetEvent;
    get containerResetEvent(): import("xbsj-base").NextAnimateFrameEvent;
    private _containerResetting;
    get subContainer(): HTMLDivElement | undefined;
    get subContainerChanged(): import("xbsj-base").Listener<[ViewerContainer | undefined, ViewerContainer | undefined]>;
    get overlayContainer(): HTMLDivElement | undefined;
    get overlayContainerChanged(): import("xbsj-base").Listener<[ViewerContainer | undefined, ViewerContainer | undefined]>;
    /**
       * 获取当前视口中的所有对象
       */
    private _sceneObjectsMap;
    get sceneObjectsMap(): Map<ESSceneObject, EngineObject<ESSceneObject, ESViewer> | undefined>;
    get sceneObjects(): IterableIterator<ESSceneObject>;
    add<T extends ESSceneObject>(...sceneObjects: T[]): void;
    delete<T extends ESSceneObject>(...sceneObjects: T[]): void;
    disposableAdd<T extends ESSceneObject>(...sceneObjects: T[]): () => void;
    disAdd<T extends ESSceneObject>(...sceneObjects: T[]): () => void;
    has<T extends ESSceneObject>(sceneObject: T): boolean;
    clearAllSceneObjects(): void;
    private _id;
    get id(): string;
    set id(value: string);
    private _typeName;
    get typeName(): string;
    private _initName;
    get defaultProps(): {
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
        editingPointColor: ReactiveVariable<ESJVector4D | undefined>;
        editingAuxiliaryPointColor: ReactiveVariable<ESJVector4D | undefined>;
        editingLineWidth: number | undefined;
        editingLineColor: ReactiveVariable<ESJVector4D | undefined>;
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
        extras: ReactiveVariable<JsonValue>;
        devTags: ReactiveVariable<string[] | undefined>;
        debug: boolean | undefined;
        show: boolean | undefined;
        opacity: number | undefined;
        zIndex: string | undefined;
        useDefaultStatusDiv: boolean;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
    private _getJson;
    private _setJson;
    get json(): JsonValue;
    set json(value: JsonValue);
    private _updateFuncReact;
    get updateFunc(): ((sceneObject: ESViewer, timeStamp: number) => void) | undefined;
    set updateFunc(value: ((sceneObject: ESViewer, timeStamp: number) => void) | undefined);
    get updateFuncChanged(): import("xbsj-base").Listener<[((sceneObject: ESViewer, timeStamp: number) => void) | undefined, ((sceneObject: ESViewer, timeStamp: number) => void) | undefined]>;
    private _toDestroyFuncReact;
    get toDestroyFunc(): ((sceneObject: ESViewer) => void) | undefined;
    set toDestroyFunc(value: ((sceneObject: ESViewer) => void) | undefined);
    get toDestroyFuncChanged(): import("xbsj-base").Listener<[((sceneObject: ESViewer) => void) | undefined, ((sceneObject: ESViewer) => void) | undefined]>;
    constructor(option: ESVOption);
    static defaults: {
        show: boolean;
        debug: boolean;
        statusInfo: ESJStatusInfoType;
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
    protected _statusInfo: ESJStatusInfoType;
    protected _navigationMode: ReactiveVariable<ESJNavigationMode>;
    get navigationMode(): ESJNavigationMode;
    get navigationModeChanged(): import("xbsj-base").Listener<[ESJNavigationMode, ESJNavigationMode]>;
    getNavigationMode(): ESJNavigationMode;
    getEngineType(): string;
    private _syncViewer;
    get syncViewer(): ESViewer | undefined;
    set syncViewer(value: ESViewer | undefined);
    get syncViewerChanged(): import("xbsj-base").Listener<[ESViewer | undefined, ESViewer | undefined]>;
    private _syncEventDon;
    syncOtherViewer(viewer: ESViewer | undefined): void;
    private _timeSyncdon;
    /**
     * 设置当前时间
     * @param value 时间戳(毫秒)数值或者时间格式字符串
     * 字符串格式 2024 06 26 12:34:56 或者 2023-09-29或者2023/09/29 12:34:56
     */
    setCurrentTime(value: number | string): void;
    abstract pick(screenPosition: ESJVector2D, attachedInfo?: any, parentInfo?: boolean): Promise<PickedResult | undefined>;
    abstract pickPosition(screenPosition: ESJVector2D): Promise<ESJVector3D | undefined>;
    abstract flyIn(position: ESJVector3D, rotation?: ESJVector3D, duration?: number): void;
    abstract flyTo(flyToParam: ESJFlyToParam, position: ESJVector3D): void;
    abstract flyToBoundingSphere(rectangle: ESJVector4D, distance?: number, duration?: number | undefined): void;
    abstract getCurrentCameraInfo(): {
        position: ESJVector3D;
        rotation: ESJVector3D;
    } | undefined;
    abstract getLengthInPixel(): number | undefined;
    abstract changeToWalk(position: ESJVector3D, jumpZVelocity: number): void;
    abstract changeToMap(): void;
    abstract changeToRotateGlobe(latitude?: number, height?: number, cycleTime?: number): void;
    abstract changeToLine(geoLineStringId: string, speed?: number, heightOffset?: number, loop?: boolean, turnRateDPS?: number, lineMode?: "auto" | "manual"): void;
    abstract changeToUserDefined(userDefinedPawn: string): void;
    abstract changeToRotatePoint(position: ESJVector3D, distance?: number, orbitPeriod?: number, heading?: number, pitch?: number): void;
    abstract changeToFollow(objectId: string, distance?: number, heading?: number, pitch?: number, relativeRotation?: boolean): void;
    abstract getFPS(): number;
    abstract getBoundSphere(id: string): Promise<{
        center?: [number, number, number];
        radius?: number;
        tips?: string;
    } | undefined>;
    getVersion(): Promise<any>;
    abstract getHeightByLonLat(lon: number, lat: number, channel?: string): Promise<number | null>;
    abstract getHeightsByLonLats(lonLats: ESJVector2DArray, channel?: string): Promise<(number | null)[] | undefined>;
    abstract capture(resx?: number, resy?: number): Promise<string | undefined>;
    abstract lonLatAltToScreenPosition(position: ESJVector3D): Promise<ESJVector2D | undefined>;
    abstract startEditing(sceneObject: ESSceneObject, modes: string[] | string, useTabToSwitch?: boolean): void;
    abstract moveObjects(sceneObjects: ESSceneObject[]): void;
    /**
     * 鼠标悬停事件 悬停时长可由hoverTime属性控制
     */
    get hoverEvent(): Event<[{
        screenPosition: ESJVector2D;
        pointerEvent?: PointerEvent | undefined;
    }]>;
    private _hoverEvent;
    private _pointerOverEvent;
    get pointerOverEvent(): Event<[{
        screenPosition: ESJVector2D;
        pointerEvent?: PointerEvent | undefined;
    }]>;
    private _pointerMoveEvent;
    get pointerMoveEvent(): Event<[{
        screenPosition: ESJVector2D;
        pointerEvent?: PointerEvent | undefined;
    }]>;
    private _pointerDownEvent;
    get pointerDownEvent(): Event<[{
        screenPosition: ESJVector2D;
        pointerEvent?: PointerEvent | undefined;
    }]>;
    private _pointerUpEvent;
    get pointerUpEvent(): Event<[{
        screenPosition: ESJVector2D;
        pointerEvent?: PointerEvent | undefined;
    }]>;
    private _pointerOutEvent;
    get pointerOutEvent(): Event<[{
        screenPosition: ESJVector2D;
        pointerEvent?: PointerEvent | undefined;
    }]>;
    private _clickEvent;
    get clickEvent(): Event<[{
        screenPosition?: ESJVector2D | undefined;
        pointerEvent?: PointerEvent | undefined;
    }]>;
    private _dblclickEvent;
    get dblclickEvent(): Event<[{
        screenPosition?: ESJVector2D | undefined;
        pointerEvent?: PointerEvent | undefined;
    }]>;
    protected _keyDownEvent: Event<[KeyboardEvent]>;
    get keyDownEvent(): Event<[KeyboardEvent]>;
    protected _keyUpEvent: Event<[KeyboardEvent]>;
    get keyUpEvent(): Event<[KeyboardEvent]>;
    protected _wheelEvent: Event<[WheelEvent]>;
    get wheelEvent(): Event<[WheelEvent]>;
    getProperties(language?: string): Property[];
    private _actived;
    get actived(): boolean;
    set actived(value: boolean);
    get activedChanged(): import("xbsj-base").Listener<[boolean, boolean]>;
}
export declare namespace ESViewer {
    const createBaseProps: () => {
        name: string;
        extras: ReactiveVariable<JsonValue>;
        devTags: ReactiveVariable<string[] | undefined>;
        debug: boolean | undefined;
        show: boolean | undefined;
        opacity: number | undefined;
        zIndex: string | undefined;
        useDefaultStatusDiv: boolean;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
    const createCommonProps: () => {
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
        editingPointColor: ReactiveVariable<ESJVector4D | undefined>;
        editingAuxiliaryPointColor: ReactiveVariable<ESJVector4D | undefined>;
        editingLineWidth: number | undefined;
        editingLineColor: ReactiveVariable<ESJVector4D | undefined>;
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
    };
    const createDefaultProps: () => {
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
        editingPointColor: ReactiveVariable<ESJVector4D | undefined>;
        editingAuxiliaryPointColor: ReactiveVariable<ESJVector4D | undefined>;
        editingLineWidth: number | undefined;
        editingLineColor: ReactiveVariable<ESJVector4D | undefined>;
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
        extras: ReactiveVariable<JsonValue>;
        devTags: ReactiveVariable<string[] | undefined>;
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
export interface ESViewer extends UniteChanged<ReturnType<typeof ESViewer.createDefaultProps>> {
}
