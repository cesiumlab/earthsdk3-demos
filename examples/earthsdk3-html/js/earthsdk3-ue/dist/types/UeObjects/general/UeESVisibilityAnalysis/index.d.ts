import { ESVisibilityAnalysis } from "earthsdk3";
import { UeESGeoVector } from "../../../UeObjects/base";
import { ESUeViewer } from "../../../ESUeViewer";
export declare class UeESVisibilityAnalysis extends UeESGeoVector<ESVisibilityAnalysis> {
    static readonly type: void;
    constructor(sceneObject: ESVisibilityAnalysis, ueViewer: ESUeViewer);
}
