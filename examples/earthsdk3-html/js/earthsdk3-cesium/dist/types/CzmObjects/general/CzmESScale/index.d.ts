import { EngineObject, ESCustomDiv, ESScale } from "earthsdk3";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare class CzmESScale extends EngineObject<ESScale> {
    static readonly type: void;
    private _customDiv;
    get customDiv(): ESCustomDiv<{
        destroy(): undefined;
    }>;
    constructor(sceneObject: ESScale, czmViewer: ESCesiumViewer);
}
