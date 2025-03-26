import { ESDatasmithRuntimeModel } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
import { UeESObjectWithLocation } from "../../../UeObjects/base";
export declare class UeESDatasmithRuntimeModel extends UeESObjectWithLocation<ESDatasmithRuntimeModel> {
    static readonly type: void;
    constructor(sceneObject: ESDatasmithRuntimeModel, ueViewer: ESUeViewer);
}
