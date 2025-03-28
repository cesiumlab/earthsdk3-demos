import { CzmES3DTileset } from "../CzmES3DTileset";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { ESRtsFeatureEditing } from "earthsdk3";
export declare class CzmESRtsFeatureEditing extends CzmES3DTileset<ESRtsFeatureEditing> {
    static readonly type: void;
    constructor(sceneObject: ESRtsFeatureEditing, czmViewer: ESCesiumViewer);
}
