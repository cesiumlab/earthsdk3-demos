import { ESPolygonFlattenedPlane } from "earthsdk3";
import { UeESGeoPolygon } from "../UeESGeoPolygon";
import { ESUeViewer } from "../../../ESUeViewer";
export declare class UeESPolygonFlattenedPlane extends UeESGeoPolygon<ESPolygonFlattenedPlane> {
    static readonly type: void;
    constructor(sceneObject: ESPolygonFlattenedPlane, ueViewer: ESUeViewer);
}
