import { EngineObject, ESUnrealActor } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
export declare class UeESUnrealActor extends EngineObject<ESUnrealActor> {
    static readonly type: void;
    constructor(sceneObject: ESUnrealActor, ueViewer: ESUeViewer);
}
