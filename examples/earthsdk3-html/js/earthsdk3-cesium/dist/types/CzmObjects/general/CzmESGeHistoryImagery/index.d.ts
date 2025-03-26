import { CzmESVisualObject } from "../../base";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { ESGeHistoryImagery } from "../../../ESObjects";
export declare class CzmESGeHistoryImagery extends CzmESVisualObject<ESGeHistoryImagery> {
    static readonly type: void;
    constructor(sceneObject: ESGeHistoryImagery, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    flyIn(duration: number | undefined, id: number): boolean;
}
