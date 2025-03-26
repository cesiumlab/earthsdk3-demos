import { ESLocalRectangle } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
import { UeESLocalVector2D } from "../../../UeObjects/base";
export declare class UeESLocalRectangle extends UeESLocalVector2D<ESLocalRectangle> {
    static readonly type: void;
    constructor(sceneObject: ESLocalRectangle, ueViewer: ESUeViewer);
}
