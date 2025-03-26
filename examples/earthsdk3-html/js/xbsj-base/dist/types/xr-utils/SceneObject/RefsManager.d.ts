import { Destroyable, Listener } from "xbsj-base";
import { SceneObject } from ".";
import { SceneObjectsContext } from "./SceneObjectsContext";
export declare class RefsManager extends Destroyable {
    private _sceneObjRefs;
    get sceneObjRefs(): Map<string, SceneObject[]>;
    private _refs;
    get refs(): {
        [k: string]: SceneObject | undefined;
    };
    private _refsChagned;
    get refsChanged(): Listener<[SceneObject | undefined, SceneObject | undefined]>;
    getLastSceneObject(ref: string): SceneObject | undefined;
    getSceneObjects(ref: string): SceneObject[] | undefined;
    constructor(context: SceneObjectsContext);
}
