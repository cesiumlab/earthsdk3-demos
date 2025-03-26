import { ESCameraVisibleRange } from "earthsdk3";
import { UeESObjectWithLocation } from "../../base";
import { ESUeViewer } from "../../../ESUeViewer";
export declare class UeESCameraVisibleRange extends UeESObjectWithLocation<ESCameraVisibleRange> {
    static readonly type: void;
    constructor(sceneObject: ESCameraVisibleRange, ueViewer: ESUeViewer);
}
