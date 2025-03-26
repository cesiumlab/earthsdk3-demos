import { EngineObject, ESCustomDiv, ESNavigator } from "earthsdk3";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare class CzmESNavigator extends EngineObject<ESNavigator> {
    static readonly type: void;
    private _customDiv;
    get customDiv(): ESCustomDiv<{
        destroy(): undefined;
    }>;
    constructor(sceneObject: ESNavigator, czmViewer: ESCesiumViewer);
}
