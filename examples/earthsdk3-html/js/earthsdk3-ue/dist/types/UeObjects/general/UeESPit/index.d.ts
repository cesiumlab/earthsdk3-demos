import { ESPit } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
import { UeESGeoPolygon } from "../UeESGeoPolygon";
export declare class UeESPit extends UeESGeoPolygon<ESPit> {
    static readonly type: void;
    constructor(sceneObject: ESPit, ueViewer: ESUeViewer);
}
