import { EngineObject, ESCzml } from "earthsdk3";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare class CzmESCzml<T extends ESCzml = ESCzml, V extends ESCesiumViewer = ESCesiumViewer> extends EngineObject<T, V> {
    static readonly type: void;
    constructor(sceneObject: T, czmViewer: V);
}
