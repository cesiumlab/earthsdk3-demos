import { ESLocalCircle } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
import { UeESLocalVector2D } from "../../../UeObjects/base";
export declare class UeESLocalCircle extends UeESLocalVector2D<ESLocalCircle> {
    static readonly type: void;
    constructor(sceneObject: ESLocalCircle, ueViewer: ESUeViewer);
}
