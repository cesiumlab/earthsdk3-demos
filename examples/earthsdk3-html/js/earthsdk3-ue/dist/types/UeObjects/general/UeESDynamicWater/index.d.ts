import { ESDynamicWater } from "earthsdk3";
import { ESUeViewer } from '../../../ESUeViewer';
import { UeESLocalPolygon } from '../UeESLocalPolygon';
export declare class UeESDynamicWater extends UeESLocalPolygon<ESDynamicWater> {
    static readonly type: void;
    constructor(sceneObject: ESDynamicWater, ueViewer: ESUeViewer);
}
