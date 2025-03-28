import { CzmES3DTileset } from "../CzmES3DTileset";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { ESMsTileset } from "earthsdk3";
export declare class CzmESMsTileset extends CzmES3DTileset<ESMsTileset> {
    static readonly type: void;
    constructor(sceneObject: ESMsTileset, czmViewer: ESCesiumViewer);
}
