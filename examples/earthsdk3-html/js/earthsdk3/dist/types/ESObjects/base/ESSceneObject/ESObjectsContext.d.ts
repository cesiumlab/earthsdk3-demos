import { Destroyable, JsonValue, Listener, ReactParamsType } from "xbsj-base";
import { ESSceneObject } from "./index";
import { RefsManager } from "./RefsManager";
/**
 * ESObjectsContext
 * ESObjects的上下文，用于管理ESObjects的注册/创建/销毁
 */
export declare class ESObjectsContext extends Destroyable {
    private _esObjConstructors;
    get typeNames(): IterableIterator<string>;
    private _sceneObjs;
    get sceneObjs(): IterableIterator<ESSceneObject>;
    private _sceneObjCreatedEvent;
    get sceneObjCreatedEvent(): Listener<[ESSceneObject]>;
    private _sceneObjToDestroyEvent;
    get sceneObjToDestroyEvent(): Listener<[ESSceneObject]>;
    private _refsManager;
    get refsManager(): RefsManager;
    get $refs(): {
        [k: string]: ESSceneObject | undefined;
    };
    constructor();
    register<T extends ESSceneObject>(sceneObjectType: string, sceneObjConstructor: new () => T, extraInfo?: {
        [k: string]: any;
    }): string;
    private _addSceneObject;
    private _deleteSceneObject;
    createSceneObjectFromClass<T extends ESSceneObject>(sceneObjConstructor: new (id?: string) => T, id?: string): T;
    createSceneObject<T extends ESSceneObject>(sceneObjectType: string | (new (id?: string) => T), id?: string): T | undefined;
    createSceneObjectFromJson<T extends ESSceneObject>(sceneObjectJson: JsonValue & {
        type: string;
        [k: string]: any;
    }): T | undefined;
    destroySceneObject(sceneObject: ESSceneObject): boolean;
    getSceneObjectById(id: string): ESSceneObject | undefined;
    getSceneObject(option?: string): ESSceneObject | ESSceneObject[] | undefined;
    private _getSceneObjConstructor;
    getProps(typeName: string): {
        [k: string]: any;
    } | undefined;
    setProps(typeName: string, props: {
        [k: string]: any;
    }): void;
    getProp<T>(typeName: string, propName: string): T | undefined;
    setProp<T = any>(typeName: string, propName: string, value: T): void;
    private _environmentVariables;
    get environmentVariables(): {
        [k: string]: string | undefined;
    };
    set environmentVariables(value: {
        [k: string]: string | undefined;
    });
    private _environmentVariablesChanged;
    get environmentVariablesChanged(): Listener<[varName: string, value: string | undefined, oldValue: string | undefined]>;
    /**
     * 设置环境变量
     * @param varName 环境变量名
     * @param value 环境变量值
     */
    setEnv(varName: string, value: string | undefined): void;
    /**
     * 获取环境变量
     * @param varName 环境变量名
     * @returns  环境变量值
     */
    getEnv(varName: string): string | undefined;
    /**
     * 根据含有环境变量的url获取真实路径
     * @param str 字符串 内部必须包含`${xxx-xxx}/xxx/abc.png` 环境变量名
     * @returns  转换为真实路径后的字符串
     */
    getStrFromEnv(str: string): string;
    /**
     * 创建一个经过env替换后的响应式变量
     * @param reactVar
     * @example
     * const reactUrl = this.dv(ESSceneObject.context.createEnvStrReact([sceneObject, 'uri']));
     * this.d(reactUrl.changed.don(update));
     */
    createEnvStrReact(reactVar: ReactParamsType<string | undefined>, defaultValue?: string): import("xbsj-base").ReactiveVariable<string | undefined>;
    /**
     * @deprecated 请使用createEnvStrReact
     */
    createEvnStrReact(reactVar: ReactParamsType<string | undefined>, defaultValue?: string): import("xbsj-base").ReactiveVariable<string | undefined>;
}
