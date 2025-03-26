import { Listener, ReactParamsType } from "xbsj-base";
import { SceneObject, SceneObjectKey } from ".";
import { Destroyable } from "../base";
import { ObjResettingWithEvent } from "../baseExt";
/**
 * @deprecated 请使用SceneObjectWithId这个类
 * 这个类是为了解决有了ID，但是场景对象还未出现的问题。
 */
export declare class SceneObjectFromId<T extends SceneObject = SceneObject> extends Destroyable {
    private _id;
    private _sceneObject;
    get sceneObject(): T | undefined;
    get sceneObjectChanged(): Listener<[T | undefined, T | undefined]>;
    get id(): string;
    constructor(_id: SceneObjectKey);
}
/**
 * @deprecated
 * TODO 考虑用SceneObjectWithId替代
 */
export declare function getSceneObjectReactFromId<T extends SceneObject = SceneObject>(idReact: ReactParamsType<string | undefined>): import("xbsj-base").ReactiveVariable<T | undefined>;
/**
 * @deprecated
 * TODO 考虑用SceneObjectWithId替代
 */
export declare class SceneObjectIdWatching<T extends SceneObject = SceneObject> extends Destroyable {
    constructor(idReact: ReactParamsType, createWatchingClass: (sceneObject: T) => ({
        destroy(): undefined;
    } | undefined));
}
/**
 * SceneObjectWithId是给SceneObjectWithId内部使用的
 */
declare class SceneObjectFromIdWrapper<T extends SceneObject> extends Destroyable {
    private _id;
    private _sofi;
    constructor(_id: string, sceneObjectWithId: SceneObjectWithId<T>);
}
/**
 * id可以任意设置
 */
export declare class SceneObjectWithId<T extends SceneObject> extends Destroyable {
    private _id;
    get id(): string | undefined;
    get idChanged(): Listener<[string | undefined, string | undefined]>;
    set id(value: string | undefined);
    private _sceneObject;
    get sceneObject(): T | undefined;
    get sceneObjectChanged(): Listener<[T | undefined, T | undefined]>;
    set sceneObject(value: T | undefined);
    private _resetting;
    get resetting(): ObjResettingWithEvent<SceneObjectFromIdWrapper<T>, Listener<[string | undefined, string | undefined]>>;
    constructor();
}
export {};
