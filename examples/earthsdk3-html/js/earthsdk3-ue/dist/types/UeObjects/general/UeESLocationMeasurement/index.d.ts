import { ESLocationMeasurement } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
import { UeESObjectWithLocation } from "../../../UeObjects/base";
export declare class UeESLocationMeasurement extends UeESObjectWithLocation<ESLocationMeasurement> {
    static readonly type: void;
    constructor(sceneObject: ESLocationMeasurement, ueViewer: ESUeViewer);
}
