import { ESSurfaceAreaMeasurement } from "earthsdk3";
import { UeESGeoPolygon } from "../UeESGeoPolygon";
import { ESUeViewer } from "../../../ESUeViewer";
export declare class UeESSurfaceAreaMeasurement extends UeESGeoPolygon<ESSurfaceAreaMeasurement> {
    static readonly type: void;
    constructor(sceneObject: ESSurfaceAreaMeasurement, ueViewer: ESUeViewer);
}
