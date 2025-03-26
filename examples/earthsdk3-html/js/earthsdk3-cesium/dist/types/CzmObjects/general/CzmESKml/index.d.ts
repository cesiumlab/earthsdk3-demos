import { EngineObject } from "earthsdk3";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { ESKml } from "../../../ESObjects";
export declare class CzmESKml extends EngineObject<ESKml> {
    static readonly type: void;
    constructor(sceneObject: ESKml, czmViewer: ESCesiumViewer);
}
