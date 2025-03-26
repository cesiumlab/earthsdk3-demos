import { EngineObject, ESImageryLayer } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
export declare class UeESImageryLayer extends EngineObject<ESImageryLayer> {
    static readonly type: void;
    constructor(sceneObject: ESImageryLayer, ueViewer: ESUeViewer);
}
