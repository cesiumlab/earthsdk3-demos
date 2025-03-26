import { ESPoi2D } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
import { UeESLabel } from "../../../UeObjects/base";
export declare class UeESPoi2D extends UeESLabel<ESPoi2D> {
    static readonly type: void;
    constructor(sceneObject: ESPoi2D, ueViewer: ESUeViewer);
}
