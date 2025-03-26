import { Destroyable, JsonValue, UniteChanged } from "xbsj-base";
import { ESSceneObject } from "../../ESObjects";
export type WatcherEvalFuncType = (sceneObjects: (ESSceneObject | undefined)[]) => void;
export declare class Watcher extends Destroyable {
    private _evalFunc?;
    get evalFunc(): WatcherEvalFuncType | undefined;
    set evalFunc(value: WatcherEvalFuncType | undefined);
    private _forceExecute;
    /**
     * 强制执行
     */
    forceExecute(): void;
    constructor();
}
export type EvalModelType = 'Immediate' | 'NextAnimateFrame';
export declare namespace Watcher {
    const createDefaultProps: () => {
        enabled: boolean;
        objIdAndPropChangedNames: import("xbsj-base").ReactiveVariable<[id: string, propChangedName: string][]>;
        evalFuncStr: string;
        evalMode: EvalModelType;
        evalOnlyWhenObjsAllExist: boolean;
        debug: boolean;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
}
export interface Watcher extends UniteChanged<ReturnType<typeof Watcher.createDefaultProps>> {
}
