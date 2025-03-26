import { ESPipeserTileset } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
import { UeES3DTileset } from "../UeES3DTileset";
export declare class UeESPipeserTileset extends UeES3DTileset<ESPipeserTileset> {
    static readonly type: void;
    constructor(sceneObject: ESPipeserTileset, ueViewer: ESUeViewer);
}
