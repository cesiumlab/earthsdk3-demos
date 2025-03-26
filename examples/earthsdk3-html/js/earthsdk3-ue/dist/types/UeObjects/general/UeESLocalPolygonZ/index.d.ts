import { ESLocalPolygonZ } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
import { UeESVisualObject } from "../../../UeObjects/base";
export declare class UeESLocalPolygonZ extends UeESVisualObject<ESLocalPolygonZ> {
    static readonly type: void;
    constructor(sceneObject: ESLocalPolygonZ, ueViewer: ESUeViewer);
}
