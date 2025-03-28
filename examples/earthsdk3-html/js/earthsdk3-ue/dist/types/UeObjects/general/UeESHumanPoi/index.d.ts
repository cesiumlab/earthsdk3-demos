import { ESUeViewer } from "../../../ESUeViewer";
import { EngineObject, ESHumanPoi } from "earthsdk3";
export declare class UeESHumanPoi extends EngineObject<ESHumanPoi> {
    static readonly type: void;
    constructor(sceneObject: ESHumanPoi, ueViewer: ESUeViewer);
}
