import { ESLevelRuntimeModel } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
import { UeESObjectWithLocation } from "../../../UeObjects/base";
export declare class UeESLevelRuntimeModel extends UeESObjectWithLocation<ESLevelRuntimeModel> {
    static readonly type: void;
    constructor(sceneObject: ESLevelRuntimeModel, ueViewer: ESUeViewer);
}
