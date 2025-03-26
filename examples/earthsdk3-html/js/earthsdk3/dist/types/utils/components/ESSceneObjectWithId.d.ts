import { ESSceneObject } from "../../ESObjects";
import { Destroyable, ObjResettingWithEvent, SceneObjectKey } from "xbsj-base";
/**
 * 这个类是为了解决有了ID，但是场景对象还未出现的问题。
 */
export declare class SceneObjectFromId<T extends ESSceneObject = ESSceneObject> extends Destroyable {
    private _id;
    private _sceneObject;
    get sceneObject(): T | undefined;
    get sceneObjectChanged(): import("xbsj-base").Listener<[T | undefined, T | undefined]>;
    get id(): string;
    constructor(_id: SceneObjectKey);
}
/**
 * ESSceneObjectWithId是给ESSceneObjectWithId内部使用的
 */
declare class SceneObjectFromIdWrapper<T extends ESSceneObject> extends Destroyable {
    private _id;
    private _sofi;
    constructor(_id: string, ESSceneObjectWithId: ESSceneObjectWithId<T>);
}
/**
 * id可以任意设置
 */
export declare class ESSceneObjectWithId<T extends ESSceneObject> extends Destroyable {
    private _id;
    get id(): string | undefined;
    get idChanged(): import("xbsj-base").Listener<[string | undefined, string | undefined]>;
    set id(value: string | undefined);
    private _sceneObject;
    get sceneObject(): T | undefined;
    get sceneObjectChanged(): import("xbsj-base").Listener<[T | undefined, T | undefined]>;
    set sceneObject(value: T | undefined);
    private _resetting;
    get resetting(): ObjResettingWithEvent<SceneObjectFromIdWrapper<T>, import("xbsj-base").Listener<[string | undefined, string | undefined]>>;
    constructor();
}
export {};
