import { ESVideoFusion } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
import { UeESObjectWithLocation } from "../../../UeObjects/base";
export declare class UeESVideoFusion extends UeESObjectWithLocation<ESVideoFusion> {
    static readonly type: void;
    constructor(sceneObject: ESVideoFusion, ueViewer: ESUeViewer);
}
