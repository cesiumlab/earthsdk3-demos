import { ESUeViewer } from "../../../ESUeViewer";
import { UeESGeoVector } from "../../../UeObjects/base";
import { ESGeoPolygon } from "earthsdk3";
export declare class UeESGeoPolygon<T extends ESGeoPolygon = ESGeoPolygon> extends UeESGeoVector<T> {
    static readonly type: void;
    constructor(sceneObject: T, ueViewer: ESUeViewer);
}
