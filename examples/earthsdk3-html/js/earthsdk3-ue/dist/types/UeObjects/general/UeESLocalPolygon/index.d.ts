import { ESLocalPolygon } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
import { UeESLocalVector2D } from "../../../UeObjects/base";
export declare class UeESLocalPolygon<T extends ESLocalPolygon = ESLocalPolygon> extends UeESLocalVector2D<T> {
    static readonly type: void;
    constructor(sceneObject: T, ueViewer: ESUeViewer);
}
