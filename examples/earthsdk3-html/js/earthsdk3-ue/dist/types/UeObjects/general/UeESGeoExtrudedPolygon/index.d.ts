import { ESGeoExtrudedPolygon } from "earthsdk3";
import { UeESGeoPolygon } from "../UeESGeoPolygon";
import { ESUeViewer } from "../../../ESUeViewer";
export declare class UeESGeoExtrudedPolygon extends UeESGeoPolygon<ESGeoExtrudedPolygon> {
    static readonly type: void;
    constructor(sceneObject: ESGeoExtrudedPolygon, ueViewer: ESUeViewer);
}
