import { ESSunshineAnalysis } from "earthsdk3";
import { ESUeViewer } from '../../../ESUeViewer';
import { UeESGeoPolygon } from '../UeESGeoPolygon';
export declare class UeESSunshineAnalysis extends UeESGeoPolygon<ESSunshineAnalysis> {
    static readonly type: void;
    constructor(sceneObject: ESSunshineAnalysis, ueViewer: ESUeViewer);
}
