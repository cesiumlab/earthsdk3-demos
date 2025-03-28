import { Destroyable, Event, JsonValue, UniteChanged } from "xbsj-base";
import { ESJSwitchToCesiumViewerOptionType, ESJSwitchToUEViewerOptionType, ESJVector3D, ESObjectsManagerJsonType, ESVOption, ESVOptionCzm, ESVOptionUe } from "../ESJTypes";
import { ESCameraViewCollection, ESSceneObject } from "../ESObjects";
import { ESViewer } from "../ESViewer";
import { DragStartDataManager, PropUiTreeManager, SceneTree } from "../utils";
import { PathAnimationManager } from "./PathAnimationManager";
import { propTreeCallbackParamsType } from "./propTreeCallback";
import { SceneObjectsManager } from "./SceneObjectsManager";
import { SceneObjectEditingManager } from "./SceneObjectEditingManager";
export declare class ESObjectsManager extends Destroyable {
    static getSceneObjById: (id: string) => ESSceneObject | undefined;
    static getEnv: (varName: string) => string | undefined;
    static setEnv: (varName: string, value: string | undefined) => void;
    static get envs(): {
        [k: string]: string | undefined;
    };
    /**
     * @deprecated 请使用getSceneObject代替
     * 获取场景对象
     * @param id 对象id
     * @returns
     */
    getSceneObjectById(id: string): ESSceneObject | undefined;
    getSceneObject(option?: string): ESSceneObject | ESSceneObject[] | undefined;
    get $refs(): {
        [k: string]: ESSceneObject | undefined;
    };
    private _drgm;
    get dragstartDataMananger(): DragStartDataManager;
    private _sobjm;
    private _vrm;
    get sceneObjectsManager(): SceneObjectsManager;
    get viewers(): Readonly<Set<ESViewer>>;
    getViewers(): readonly ESViewer[];
    private _sceneObjectEditingManager;
    get sceneObjectEditingManager(): SceneObjectEditingManager;
    private _activeViewer;
    get activeViewer(): ESViewer | undefined;
    set activeViewer(value: ESViewer | undefined);
    get activeViewerChanged(): import("xbsj-base").Listener<[ESViewer | undefined, ESViewer | undefined]>;
    private _syncOtherViewersToActived;
    get syncOtherViewersToActived(): boolean;
    set syncOtherViewersToActived(value: boolean);
    get syncOtherViewersToActivedChanged(): import("xbsj-base").Listener<[boolean, boolean]>;
    private _cmrvm;
    private _cmrvmdon;
    get cameraViewsManager(): ESCameraViewCollection;
    private _asset;
    get json(): ESObjectsManagerJsonType;
    set json(value: ESObjectsManagerJsonType);
    private _sceneTree;
    get sceneTree(): SceneTree;
    get jsonLoadingEvent(): Event<[{
        type: "init" | "loading" | "loaded";
    } | {
        type: "error";
        error?: string | undefined;
    }]>;
    private _propUiTreeManager;
    get propUiTreeManager(): PropUiTreeManager;
    propTreeCallback(params: propTreeCallbackParamsType): void;
    private _sceneTreeMap;
    getSceneTrees(): SceneTree[];
    getSceneTree(id?: string): SceneTree | undefined;
    createSceneTree(id: string, itemDivHeight?: number): SceneTree | undefined;
    private _viewerCreatedEvent;
    get viewerCreatedEvent(): Event<[ESViewer]>;
    createViewer(option: ESVOption): ESViewer;
    destroyViewer<T extends ESViewer>(viewer: T): boolean;
    /**
     * 内部同步视口相机信息，外部勿用
     */
    _lastCameraInfo: {
        position: ESJVector3D;
        rotation: ESJVector3D;
    } | undefined;
    switchViewer<T extends ESViewer>(option: ESVOption, viewSync?: boolean, attributeSync?: boolean, destroy?: boolean): T;
    switchToCesiumViewer<T extends ESViewer>(option: ESJSwitchToCesiumViewerOptionType): T;
    switchToCesiumViewer<T extends ESViewer>(container: HTMLDivElement | string, viewSync?: boolean, attributeSync?: boolean, destroy?: boolean): T;
    switchToUEViewer<T extends ESViewer>(options: ESJSwitchToUEViewerOptionType): T;
    switchToUEViewer<T extends ESViewer>(container: HTMLDivElement | string, uri: string, app: string, token?: string, viewSync?: boolean, attributeSync?: boolean, destroy?: boolean): T;
    switchToUEViewer<T extends ESViewer>(container: HTMLDivElement | string, ws: string, esmsg?: string, viewSync?: boolean, attributeSync?: boolean, destroy?: boolean): T;
    readonly syncEvent: import("xbsj-base").NextAnimateFrameEvent;
    private _syncEventDon;
    createCesiumViewer<T extends ESViewer>(params: ESVOptionCzm): T;
    createCesiumViewer<T extends ESViewer>(container: HTMLDivElement | string, options?: JsonValue, id?: string): T;
    createUeViewer<T extends ESViewer>(params: ESVOptionUe): T;
    createUeViewer<T extends ESViewer>(container: HTMLDivElement | string, uri: string, app: string, token?: string, id?: string): T;
    createUeViewer<T extends ESViewer>(container: HTMLDivElement | string, ws: string, esmsg?: string, id?: string): T;
    createSceneObject<T extends ESSceneObject>(sceneObjectType: string | (new (id?: string) => T), id?: string): T | undefined;
    createSceneObjectFromClass<T extends ESSceneObject>(sceneObjConstructor: new (id?: string) => T, id?: string): T;
    createSceneObjectFromJson<T extends ESSceneObject>(sceneObjectJson: JsonValue & {
        type: string;
        [k: string]: any;
    }): T | undefined;
    destroySceneObject<T extends ESSceneObject>(sceneObject: T): boolean;
    destroyAllSceneObjects(): void;
    private _esPlyarAndPathTime;
    private _pathAnimationManager;
    /**
     * 路径动画管理器
     * 1.channels : { pathId: string, sceneObjectIds: string[] }[]；
     * 2.player : ESPlayer；
     * 3.指定的id的sceneObject必须拥有position和rotation属性,path类型为 ESPath；
     */
    get pathAnimationManager(): PathAnimationManager;
    constructor(...args: any[]);
}
export declare namespace ESObjectsManager {
    const createDefaultProps: () => {};
}
export interface ESObjectsManager extends UniteChanged<ReturnType<typeof ESObjectsManager.createDefaultProps>> {
}
