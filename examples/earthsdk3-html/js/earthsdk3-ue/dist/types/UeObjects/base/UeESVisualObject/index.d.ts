import { ESVisualObject } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
import { UeESSceneObject } from "../UeESSceneObject";
export declare class UeESVisualObject<T extends ESVisualObject = ESVisualObject> extends UeESSceneObject<T> {
    constructor(sceneObject: T, ueViewer: ESUeViewer);
}
