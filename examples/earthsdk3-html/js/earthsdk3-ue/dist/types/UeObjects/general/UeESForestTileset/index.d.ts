import { ESForestTileset } from "earthsdk3";
import { UeESVisualObject } from "../../base";
import { ESUeViewer } from "../../../ESUeViewer";
export declare class UeESForestTileset extends UeESVisualObject<ESForestTileset> {
    static readonly type: void;
    constructor(sceneObject: ESForestTileset, ueViewer: ESUeViewer);
}
