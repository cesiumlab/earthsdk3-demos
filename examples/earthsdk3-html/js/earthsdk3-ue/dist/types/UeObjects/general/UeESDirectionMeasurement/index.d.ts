import { ESDirectionMeasurement } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
import { UeESGeoVector } from "../../../UeObjects/base";
export declare class UeESDirectionMeasurement extends UeESGeoVector<ESDirectionMeasurement> {
    static readonly type: void;
    constructor(sceneObject: ESDirectionMeasurement, ueViewer: ESUeViewer);
}
