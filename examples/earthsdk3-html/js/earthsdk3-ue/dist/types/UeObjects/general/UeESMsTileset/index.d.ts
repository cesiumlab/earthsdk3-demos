import { ESMsTileset } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
import { UeES3DTileset } from "../UeES3DTileset";
export declare class UeESMsTileset extends UeES3DTileset<ESMsTileset> {
    static readonly type: void;
    constructor(sceneObject: ESMsTileset, ueViewer: ESUeViewer);
}
