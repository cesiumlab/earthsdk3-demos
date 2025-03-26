import { ESCameraView } from "earthsdk3";
import { UeESObjectWithLocation } from "../../base";
import { ESUeViewer } from "../../../ESUeViewer";
export declare class UeESCameraView extends UeESObjectWithLocation<ESCameraView> {
    static readonly type: void;
    constructor(sceneObject: ESCameraView, ueViewer: ESUeViewer);
}
