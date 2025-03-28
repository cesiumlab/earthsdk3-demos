import { ESCesiumViewer } from "../../ESCesiumViewer";
import { ESSceneObject } from "earthsdk3";
import { BaseEditingWrapper } from "./BaseEditingWrapper";
export declare class PlaceEditingWrapper extends BaseEditingWrapper {
    static readonly type: void;
    constructor(sceneObject: ESSceneObject, czmViewer: ESCesiumViewer);
}
