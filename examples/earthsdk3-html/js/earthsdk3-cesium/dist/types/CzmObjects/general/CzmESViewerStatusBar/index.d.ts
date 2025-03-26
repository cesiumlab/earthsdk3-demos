import { EngineObject, ESCustomDiv, ESViewerStatusBar } from "earthsdk3";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare class CzmESViewerStatusBar extends EngineObject<ESViewerStatusBar> {
    static readonly type: void;
    private _customDiv;
    get customDiv(): ESCustomDiv<{
        destroy(): undefined;
    }>;
    constructor(sceneObject: ESViewerStatusBar, czmViewer: ESCesiumViewer);
}
