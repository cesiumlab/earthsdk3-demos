import { ESSceneObject } from "../ESObjects";
import { Destroyable, JsonValue, Listener } from "xbsj-base";
export declare class SceneObjectsManager extends Destroyable {
    private _sceneObjects;
    get sceneObjects(): Set<ESSceneObject>;
    private _sceneObjectsToChange;
    get sceneObjectsToChange(): Listener<[toDels: ESSceneObject[], toAdds: ESSceneObject[]]>;
    constructor();
    addSceneObject<T extends ESSceneObject>(sceneObject: T): boolean;
    deleteSceneObject<T extends ESSceneObject>(sceneObject: T): boolean;
    createSceneObject<T extends ESSceneObject>(sceneObjectType: string | (new (id?: string) => T), id?: string): T | undefined;
    createSceneObjectFromClass<T extends ESSceneObject>(sceneObjConstructor: new (id?: string) => T, id?: string): T;
    createSceneObjectFromJson<T extends ESSceneObject>(sceneObjectJson: JsonValue & {
        type: string;
        [k: string]: any;
    }): T | undefined;
}
