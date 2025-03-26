import { ESDistanceMeasurement } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
import { UeESGeoVector } from "../../base";
export declare class UeESDistanceMeasurement extends UeESGeoVector<ESDistanceMeasurement> {
    static readonly type: void;
    constructor(sceneObject: ESDistanceMeasurement, ueViewer: ESUeViewer);
}
