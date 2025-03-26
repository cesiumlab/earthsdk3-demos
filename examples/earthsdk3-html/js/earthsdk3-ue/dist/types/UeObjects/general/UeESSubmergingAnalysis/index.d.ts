import { ESSubmergingAnalysis } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
import { UeESObjectWithLocation } from "../../../UeObjects/base";
export declare class UeESSubmergingAnalysis extends UeESObjectWithLocation<ESSubmergingAnalysis> {
    static readonly type: void;
    constructor(sceneObject: ESSubmergingAnalysis, ueViewer: ESUeViewer);
}
