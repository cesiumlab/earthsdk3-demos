import { ESExcavate } from "earthsdk3";
import { UeESGeoPolygon } from "../UeESGeoPolygon";
import { ESUeViewer } from "../../../ESUeViewer";
export declare class UeESExcavate extends UeESGeoPolygon<ESExcavate> {
    static readonly type: void;
    constructor(sceneObject: ESExcavate, ueViewer: ESUeViewer);
}
