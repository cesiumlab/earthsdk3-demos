import { Destroyable, Event, JsonValue, ObservableSet, ReactiveVariable, UniteChanged } from "xbsj-base";
import { ESViewer } from "../../../ESViewer";
import { ESObjectsContext } from "./ESObjectsContext";
import { ESPropertiesType, Property } from "../../../ESJTypes";
export declare abstract class ESSceneObject extends Destroyable {
    static readonly context: ESObjectsContext;
    static readonly register: <T extends ESSceneObject>(sceneObjectType: string, sceneObjConstructor: new () => T, extraInfo?: {
        [k: string]: any;
    } | undefined) => string;
    static readonly create: <T extends ESSceneObject>(sceneObjectType: string | (new (id?: string | undefined) => T), id?: string | undefined) => T | undefined;
    static readonly createFromClass: <T extends ESSceneObject>(sceneObjConstructor: new (id?: string | undefined) => T, id?: string | undefined) => T;
    static readonly createFromJson: <T extends ESSceneObject>(sceneObjectJson: JsonValue & {
        [k: string]: any;
        type: string;
    }) => T | undefined;
    static readonly destroySceneObject: (sceneObject: ESSceneObject) => boolean;
    static getSceneObjById: (id: string) => ESSceneObject | undefined;
    static getSceneObj: (option?: string | undefined) => ESSceneObject | ESSceneObject[] | undefined;
    static getEnv: (varName: string) => string | undefined;
    static setEnv: (varName: string, value: string | undefined) => void;
    static get envs(): {
        [k: string]: string | undefined;
    };
    static getStrFromEnv: (str: string) => string;
    static get $refs(): {
        [k: string]: ESSceneObject | undefined;
    };
    private _components;
    get components(): ObservableSet<ESSceneObject>;
    private _viewerAttached;
    get viewerAttached(): Event<[ESViewer]>;
    private _viewerDetached;
    get viewerDetached(): Event<[ESViewer]>;
    private _attachedViewers;
    get attachedViewers(): Set<ESViewer>;
    removefromViewer(viewer: ESViewer): void;
    addToViewer(viewer: ESViewer): void;
    registerAttachedObject(createViewerPropSceneObject: (viewer: ESViewer) => Destroyable | undefined): void;
    createAttachedObject(createViewerPropSceneObject: (viewer: ESViewer) => Destroyable | undefined): () => void;
    registerAttachedObjectForContainer(createContainerPropSceneObject: (viewer: ESViewer, container: HTMLDivElement) => Destroyable | undefined): void;
    /**
     * @deprecated 请使用getSceneObject代替
     * 获取场景对象
     * @param id 对象id
     * @returns
     */
    static readonly getSceneObjectById: (id: string) => ESSceneObject | undefined;
    static readonly getSceneObject: (option?: string | undefined) => ESSceneObject | ESSceneObject[] | undefined;
    private _createdEvent;
    /**
     * 对象创建事件,由实现类决定何时触发
     */
    get createdEvent(): Event<[]>;
    private _flushEvent;
    get flushEvent(): Event<[]>;
    /**
     * 刷新对象
     */
    flush(): void;
    private _id;
    get id(): string;
    abstract get typeName(): string;
    private _initName;
    get defaultProps(): {
        name: string;
        ref: string | undefined;
        extras: ReactiveVariable<JsonValue>;
        devTags: ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
    static defaults: {};
    protected _innerGetJson(ignoreDefaults?: boolean): JsonValue;
    protected _innerSetJson(value: JsonValue, filterKeys?: string[], partialSetting?: boolean): void;
    get json(): JsonValue;
    set json(value: JsonValue);
    get _jsonStr(): string;
    set _jsonStr(value: string);
    private _updateFuncReact;
    get updateFunc(): ((sceneObject: ESSceneObject, timeStamp: number) => void) | undefined;
    set updateFunc(value: ((sceneObject: ESSceneObject, timeStamp: number) => void) | undefined);
    get updateFuncChanged(): import("xbsj-base").Listener<[((sceneObject: ESSceneObject, timeStamp: number) => void) | undefined, ((sceneObject: ESSceneObject, timeStamp: number) => void) | undefined]>;
    private _toDestroyFuncReact;
    get toDestroyFunc(): ((sceneObject: ESSceneObject) => void) | undefined;
    set toDestroyFunc(value: ((sceneObject: ESSceneObject) => void) | undefined);
    get toDestroyFuncChanged(): import("xbsj-base").Listener<[((sceneObject: ESSceneObject) => void) | undefined, ((sceneObject: ESSceneObject) => void) | undefined]>;
    constructor(id?: string);
    getProperties(language?: string): Property[];
    getESProperties(): ESPropertiesType;
}
export declare namespace ESSceneObject {
    const createDefaultProps: () => {
        name: string;
        ref: string | undefined;
        extras: ReactiveVariable<JsonValue>;
        devTags: ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
}
export interface ESSceneObject extends UniteChanged<ReturnType<typeof ESSceneObject.createDefaultProps>> {
}
