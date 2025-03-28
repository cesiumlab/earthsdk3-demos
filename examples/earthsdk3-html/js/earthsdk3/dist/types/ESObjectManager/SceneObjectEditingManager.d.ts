import { Destroyable } from "xbsj-base";
import { ESSceneObject } from "..";
export declare class SceneObjectEditing extends Destroyable {
    private _sceneObject;
    get sceneObject(): ESSceneObject;
    constructor(_sceneObject: ESSceneObject, sceneObjectEditingManager: SceneObjectEditingManager);
}
export type ActiveEditingInfoType = [sceneObject: ESSceneObject, editingPropName: string];
export declare class SceneObjectEditingManager extends Destroyable {
    private _currentActiveEditing;
    get currentActiveEditing(): ActiveEditingInfoType | undefined;
    set currentActiveEditing(value: ActiveEditingInfoType | undefined);
    get currentActiveEditingChanged(): import("xbsj-base").Listener<[ActiveEditingInfoType | undefined, ActiveEditingInfoType | undefined]>;
    private _currentActiveEditingLastChangedTime;
    get currentActiveEditingLastChangedTime(): number;
    constructor();
}
