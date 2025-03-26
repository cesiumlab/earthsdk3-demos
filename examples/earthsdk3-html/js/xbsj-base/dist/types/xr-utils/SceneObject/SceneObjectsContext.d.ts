import { Destroyable, JsonValue, Listener, ReactParamsType } from "xbsj-base";
import { RefsManager } from "./RefsManager";
import { SceneObject, SceneObjectKey } from ".";
export declare class SceneObjectsContext extends Destroyable {
    private _sceneObjConstructorsMap;
    get typeNames(): IterableIterator<string>;
    private _sceneObjs;
    get sceneObjs(): IterableIterator<SceneObject>;
    private _sceneObjCreatedEvent;
    get sceneObjCreatedEvent(): Listener<[SceneObject]>;
    private _sceneObjToDestroyEvent;
    get sceneObjToDestroyEvent(): Listener<[SceneObject]>;
    private _refsManager;
    get refsManager(): RefsManager;
    get $refs(): {
        [k: string]: SceneObject | undefined;
    };
    constructor();
    register<T extends SceneObject>(sceneObjectType: string, sceneObjConstructor: new () => T, extraInfo?: {
        [k: string]: any;
    }): string;
    private _getSceneObjConstructor;
    getProps(typeName: string): {
        [k: string]: any;
    } | undefined;
    setProps(typeName: string, props: {
        [k: string]: any;
    }): void;
    getProp<T>(typeName: string, propName: string): T | undefined;
    setProp<T = any>(typeName: string, propName: string, value: T): void;
    _addSceneObject(sceneObject: SceneObject): void;
    _deleteSceneObject(sceneObject: SceneObject): void;
    createSceneObjectFromClass<T extends SceneObject>(sceneObjConstructor: new (id?: SceneObjectKey) => T, id?: SceneObjectKey): T;
    createSceneObject<T extends SceneObject>(sceneObjectType: string | (new (id?: SceneObjectKey) => T), id?: SceneObjectKey): T | undefined;
    createSceneObjectFromJson<T extends SceneObject>(sceneObjectJson: JsonValue & {
        type: string;
        [k: string]: any;
    }): T | undefined;
    getSceneObjectById(id: SceneObjectKey): SceneObject | undefined;
    getSceneObjectsByDevTags(devTags: string[]): SceneObject[];
    private _environmentVariables;
    get environmentVariables(): {
        [k: string]: string | undefined;
    };
    set environmentVariables(value: {
        [k: string]: string | undefined;
    });
    private _environmentVariablesChanged;
    get environmentVariablesChanged(): Listener<[varName: string, value: string | undefined, oldValue: string | undefined]>;
    setEnv(varName: string, value: string | undefined): void;
    getEnv(varName: string): string | undefined;
    getStrFromEnv(str: string): string;
    /**
     * 创建一个经过env替换后的响应式变量
     * @param reactVar
     * @returns
     * @example
     *
     * const finalModelUriReact = this.disposeVar(SceneObject.context.createEvnStrReact([model, 'uri']));
     * const updateUri = () => {
     *     if (model.uri) {
     *         entity.model.uri = finalModelUriReact.value;
     *     } else {
     *         entity.model.uri = undefined;
     *     }
     * }
     * updateUri();
     * this.dispose(finalModelUriReact.changed.disposableOn(updateUri));
     */
    createEnvStrReact(reactVar: ReactParamsType<string | undefined>, defaultValue?: string): import("xbsj-base").ReactiveVariable<string | undefined>;
    /**
     * @deprecated 请用createEnvStrReact替代 createEvnStrReact -> createEnvStrReact
     * @param reactVar
     * @param defaultValue
     * @returns
     */
    createEvnStrReact(reactVar: ReactParamsType<string | undefined>, defaultValue?: string): import("xbsj-base").ReactiveVariable<string | undefined>;
}
