import { EngineObject, ESNavigator } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
export declare class UeESNavigator extends EngineObject<ESNavigator> {
    static readonly type: void;
    constructor(sceneObject: ESNavigator, ueViewer: ESUeViewer);
}
