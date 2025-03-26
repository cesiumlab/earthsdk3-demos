import { ESGeoWater } from "earthsdk3";
import { ESUeViewer } from '../../../ESUeViewer';
import { UeESGeoPolygon } from '../UeESGeoPolygon';
export declare class UeESGeoWater extends UeESGeoPolygon<ESGeoWater> {
    static readonly type: void;
    constructor(sceneObject: ESGeoWater, ueViewer: ESUeViewer);
}
