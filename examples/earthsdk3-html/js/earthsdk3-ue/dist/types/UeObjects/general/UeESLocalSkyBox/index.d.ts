import { ESLocalSkyBox } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
import { UeESObjectWithLocation } from "../../../UeObjects/base";
export declare class UeESLocalSkyBox extends UeESObjectWithLocation<ESLocalSkyBox> {
    static readonly type: void;
    constructor(sceneObject: ESLocalSkyBox, ueViewer: ESUeViewer);
}
