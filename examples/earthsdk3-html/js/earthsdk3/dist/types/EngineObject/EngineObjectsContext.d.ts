import { EngineObjsMap } from "../ESJTypes";
import { ESSceneObject } from "../ESObjects";
import { ESViewer } from "../ESViewer";
import { EngineObject } from "./index";
import { Destroyable } from "xbsj-base";
export declare class EngineObjectsContext extends Destroyable {
    registerEngines: {
        [key: string]: EngineObjsMap;
    };
    register<R extends ESSceneObject, V extends ESViewer>(viewerType: string, sceneObjectTypeName: string, objConstructor: new (sceneObject: R, viewer: V) => EngineObject<R>): void;
    getEngineObjConstructor<R extends ESSceneObject, V extends ESViewer>(sceneObjectTypeName: string, viewerType: string): (new (sceneObject: R, viewer: V) => EngineObject<R>) | undefined;
    createEngineObject<R extends ESSceneObject, V extends ESViewer>(sceneObject: R, viewer: V): EngineObject<R, ESViewer>;
}
