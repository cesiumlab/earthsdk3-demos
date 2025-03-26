import { ESRtsTileset } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
import { UeESSceneObject } from "../../../UeObjects/base";
export declare class UeESRtsTileset<T extends ESRtsTileset = ESRtsTileset> extends UeESSceneObject<T> {
    static readonly type: void;
    static combinationClass: boolean;
    constructor(sceneObject: T, ueViewer: ESUeViewer);
}
