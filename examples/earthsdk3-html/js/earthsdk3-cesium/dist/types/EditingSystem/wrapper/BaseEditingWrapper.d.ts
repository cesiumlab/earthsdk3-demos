import { ESCesiumViewer } from "../../index";
import { EngineObject, ESSceneObject } from "earthsdk3";
export declare abstract class BaseEditingWrapper extends EngineObject {
    private _supportEditing;
    get supportEditing(): boolean;
    set supportEditing(value: boolean);
    get supportEditingChanged(): import("xbsj-base").Listener<[boolean, boolean]>;
    constructor(sceneObject: ESSceneObject, czmViewer: ESCesiumViewer, isEditing?: boolean);
}
