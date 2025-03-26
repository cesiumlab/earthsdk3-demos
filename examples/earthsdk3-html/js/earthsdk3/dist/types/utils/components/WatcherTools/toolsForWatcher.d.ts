import { Destroyable, SceneObjectKey } from "xbsj-base";
import { ESSceneObject } from "../../../ESObjects";
export type WatchObjectType = {
    debug?: boolean;
    evalMode?: 'NextAnimateFrame' | 'Immediate';
    evalOnlyWhenObjsAllExist?: boolean;
};
export declare class WatcherObjects extends Destroyable {
    private _doEvalEvent;
    /**
     * 强制执行
     */
    forceExecute(): void;
    constructor(objIdAndPropChangedNames: [SceneObjectKey, string][], watcher: WatchObjectType, evalFunc: (sceneObjects: (ESSceneObject | undefined)[]) => void);
}
