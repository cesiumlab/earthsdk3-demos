import { Destroyable } from "xbsj-base";
import { SceneObjectsManager } from "./SceneObjectsManager";
import { ESSceneObject } from "../ESObjects";
export type CreateSceneObjectListeningFuncType = (sceneObject: ESSceneObject) => {
    destroy: () => void;
} | undefined;
export declare class SceneObjectsListening extends Destroyable {
    private _sceneObjectsMananger;
    private _createSceneObjectListeningFunc;
    private _listeningSceneObjects;
    get listeningSceneObjects(): Map<ESSceneObject, {
        destroy: () => void;
    }>;
    get createSceneObjectListeningFunc(): CreateSceneObjectListeningFuncType;
    constructor(_sceneObjectsMananger: SceneObjectsManager, _createSceneObjectListeningFunc: CreateSceneObjectListeningFuncType);
}
