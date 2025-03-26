import { ESBoxClipping } from "earthsdk3";
import { UeESObjectWithLocation } from "../../../UeObjects";
import { ESUeViewer } from "../../../ESUeViewer";
export declare class UeESBoxClipping extends UeESObjectWithLocation<ESBoxClipping> {
    static readonly type: void;
    constructor(sceneObject: ESBoxClipping, ueViewer: ESUeViewer);
}
