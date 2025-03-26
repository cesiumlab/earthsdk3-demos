import { Destroyable, Listener } from "xbsj-base";
import { ESSceneObject } from "./index";
import { ESObjectsContext } from "./ESObjectsContext";
export declare class RefsManager extends Destroyable {
    private _sceneObjRefs;
    get sceneObjRefs(): Map<string, ESSceneObject[]>;
    private _refs;
    get refs(): {
        [k: string]: ESSceneObject | undefined;
    };
    private _refsChagned;
    get refsChanged(): Listener<[ESSceneObject | undefined, ESSceneObject | undefined]>;
    getLastSceneObject(ref: string): ESSceneObject | undefined;
    getSceneObjects(ref: string): ESSceneObject[] | undefined;
    constructor(context: ESObjectsContext);
}
