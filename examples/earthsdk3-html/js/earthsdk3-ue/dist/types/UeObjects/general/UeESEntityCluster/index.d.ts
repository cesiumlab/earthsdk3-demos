import { ESEntityCluster } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
import { UeESVisualObject } from "../../../UeObjects/base";
export declare class UeESEntityCluster extends UeESVisualObject<ESEntityCluster> {
    static readonly type: void;
    constructor(sceneObject: ESEntityCluster, ueViewer: ESUeViewer);
}
