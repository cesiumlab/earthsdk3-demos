import { ESUeViewer } from '../../../ESUeViewer';
import { ESVolumeMeasurement } from "earthsdk3";
import { UeESGeoPolygon } from '../UeESGeoPolygon';
export declare class UeESVolumeMeasurement extends UeESGeoPolygon<ESVolumeMeasurement> {
    static readonly type: void;
    constructor(sceneObject: ESVolumeMeasurement, ueViewer: ESUeViewer);
}
