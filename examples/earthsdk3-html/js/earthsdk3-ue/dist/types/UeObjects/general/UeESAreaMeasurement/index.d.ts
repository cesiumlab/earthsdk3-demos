import { ESAreaMeasurement } from "earthsdk3";
import { UeESGeoPolygon } from "../UeESGeoPolygon";
import { ESUeViewer } from "../../../ESUeViewer";
export declare class UeESAreaMeasurement extends UeESGeoPolygon<ESAreaMeasurement> {
    static readonly type: void;
    constructor(sceneObject: ESAreaMeasurement, ueViewer: ESUeViewer);
}
