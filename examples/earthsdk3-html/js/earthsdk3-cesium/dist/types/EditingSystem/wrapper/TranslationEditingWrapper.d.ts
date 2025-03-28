import { ESCesiumViewer } from "../../ESCesiumViewer";
import { ESSceneObject } from "earthsdk3";
import { BaseEditingWrapper } from "./BaseEditingWrapper";
export declare class TranslationEditingWrapper extends BaseEditingWrapper {
    static readonly type: void;
    constructor(sceneObject: ESSceneObject | ESSceneObject[], czmViewer: ESCesiumViewer);
}
