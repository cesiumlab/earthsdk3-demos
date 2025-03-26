import { ESPipeFence } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
import { UeESGeoVector } from "../../../UeObjects/base";
export declare class UeESPipeFence extends UeESGeoVector<ESPipeFence> {
    static readonly type: void;
    constructor(sceneObject: ESPipeFence, ueViewer: ESUeViewer);
}
