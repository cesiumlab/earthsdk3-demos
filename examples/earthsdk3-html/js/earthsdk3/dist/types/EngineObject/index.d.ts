import { ESSceneObject } from "../ESObjects";
import { ESViewer } from "../ESViewer";
import { Destroyable, Event } from "xbsj-base";
import { EngineObjectsContext } from "./EngineObjectsContext";
export declare class EngineObject<T extends ESSceneObject = ESSceneObject, V extends ESViewer = ESViewer> extends Destroyable {
    private _sceneObject;
    private _viewer;
    static readonly context: EngineObjectsContext;
    static readonly register: <R extends ESSceneObject, V_1 extends ESViewer>(viewerType: string, sceneObjectTypeName: string, objConstructor: new (sceneObject: R, viewer: V_1) => EngineObject<R, ESViewer>) => void;
    private _createdEvent;
    get createdEvent(): Event<[]>;
    get sceneObject(): T;
    get viewer(): V;
    private static _accumId;
    private _id;
    get id(): number;
    constructor(_sceneObject: T, _viewer: V);
}
