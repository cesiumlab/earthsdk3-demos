import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { EngineObject, ESHumanPoi } from "earthsdk3";
export declare class CzmESHumanPoi extends EngineObject<ESHumanPoi> {
    static readonly type: void;
    constructor(sceneObject: ESHumanPoi, czmViewer: ESCesiumViewer);
}
