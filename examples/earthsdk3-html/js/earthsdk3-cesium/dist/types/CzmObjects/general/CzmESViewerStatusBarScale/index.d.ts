import { EngineObject, ESCustomDiv, ESViewerStatusBarScale } from "earthsdk3";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare class CzmESViewerStatusBarScale extends EngineObject<ESViewerStatusBarScale> {
    static readonly type: void;
    private _customDiv;
    get customDiv(): ESCustomDiv<{
        destroy(): undefined;
    }>;
    constructor(sceneObject: ESViewerStatusBarScale, czmViewer: ESCesiumViewer);
}
