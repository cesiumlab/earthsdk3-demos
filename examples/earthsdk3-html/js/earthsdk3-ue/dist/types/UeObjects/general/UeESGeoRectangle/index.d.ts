import { ESGeoRectangle } from "earthsdk3";
import { UeESGeoVector } from "../../../UeObjects";
import { ESUeViewer } from "../../../ESUeViewer";
export declare class UeESGeoRectangle<T extends ESGeoRectangle = ESGeoRectangle> extends UeESGeoVector<T> {
    static readonly type: void;
    constructor(sceneObject: T, ueViewer: ESUeViewer);
}
