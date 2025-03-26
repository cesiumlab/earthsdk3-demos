import { ESHeightMeasurement } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
import { UeESGeoVector } from "../../../UeObjects/base";
export declare class UeESHeightMeasurement extends UeESGeoVector<ESHeightMeasurement> {
    static readonly type: void;
    constructor(sceneObject: ESHeightMeasurement, ueViewer: ESUeViewer);
}
