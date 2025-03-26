import { EngineObject, ESViewerStatusBar } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
export declare class UeESViewerStatusBar extends EngineObject<ESViewerStatusBar> {
    static readonly type: void;
    constructor(sceneObject: ESViewerStatusBar, ueViewer: ESUeViewer);
}
