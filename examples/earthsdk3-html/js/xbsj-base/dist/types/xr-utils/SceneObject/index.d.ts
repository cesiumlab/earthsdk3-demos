import { Destroyable, Event, JsonValue, ReactivePropsToNativePropsAndChanged, ReactiveVariable } from "xbsj-base";
import { ObservableSet } from "../baseExt";
import { SceneObjectsContext } from "./SceneObjectsContext";
export type SceneObjectKey = string;
export declare abstract class SceneObject extends Destroyable {
    static readonly context: SceneObjectsContext;
    static readonly register: <T extends SceneObject>(sceneObjectType: string, sceneObjConstructor: new () => T, extraInfo?: {
        [k: string]: any;
    } | undefined) => string;
    static readonly create: <T extends SceneObject>(sceneObjectType: string | (new (id?: string | undefined) => T), id?: string | undefined) => T | undefined;
    static readonly createFromClass: <T extends SceneObject>(sceneObjConstructor: new (id?: string | undefined) => T, id?: string | undefined) => T;
    static readonly createFromJson: <T extends SceneObject>(sceneObjectJson: JsonValue & {
        [k: string]: any;
        type: string;
    }) => T | undefined;
    static get sceneObjs(): IterableIterator<SceneObject>;
    static getSceneObjById(id: SceneObjectKey): SceneObject | undefined;
    static getSceneObjsByDevTags(tags: string[]): SceneObject[];
    static get $refs(): {
        [k: string]: SceneObject | undefined;
    };
    abstract get typeName(): string;
    get defaultProps(): {};
    private _id;
    get id(): SceneObjectKey;
    private set id(value);
    protected _components: ObservableSet<SceneObject>;
    get components(): ObservableSet<SceneObject>;
    private _setDefaultName;
    constructor(id?: SceneObjectKey);
    protected _innerGetJson(ignoreDefaults?: boolean): JsonValue;
    protected _innerSetJson(value: JsonValue, filterKeys?: string[], partialSetting?: boolean): void;
    abstract get json(): JsonValue;
    abstract set json(value: JsonValue);
    setJsonWithoutDefaults(value: JsonValue): void;
    setJsonWithDefaults(value: JsonValue): void;
    getJsonWithDefaults(): JsonValue;
    getJsonWithoutDefaults(): JsonValue;
    get jsonStr(): string;
    set jsonStr(value: string);
    addDevTag(...devTags: string[]): void;
    deleteDevTag(...devTags: string[]): void;
    private _selfCreatedEvent?;
    /**
     * 注意该事件只有在客户调用SceneObject.create来创建对象时才会生效，如果使用new XXXX()创建场景对象则不会生效！
     */
    get selfCreatedEvent(): Event<[]>;
}
export declare namespace SceneObject {
    const createDefaultProps: () => {
        name: string;
        ref: string | undefined;
        devTags: ReactiveVariable<string[] | undefined>;
        extras: ReactiveVariable<JsonValue>;
    };
}
export interface SceneObject extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof SceneObject.createDefaultProps>> {
}
export * from './SceneObjectFromId';
