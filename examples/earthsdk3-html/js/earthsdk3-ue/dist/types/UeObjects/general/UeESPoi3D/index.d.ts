import { ESPoi3D } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
import { UeESObjectWithLocation } from "../../../UeObjects/base";
export declare class UeESPoi3D extends UeESObjectWithLocation<ESPoi3D> {
    static readonly type: void;
    constructor(sceneObject: ESPoi3D, ueViewer: ESUeViewer);
}
