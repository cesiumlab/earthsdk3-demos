import { EngineObject, ESRtsTileset } from "earthsdk3";
import { ESCesiumViewer } from '../../../ESCesiumViewer';
export declare class CzmESRtsTileset<T extends ESRtsTileset = ESRtsTileset> extends EngineObject<T> {
    static readonly type: void;
    constructor(sceneObject: T, czmViewer: ESCesiumViewer);
}
