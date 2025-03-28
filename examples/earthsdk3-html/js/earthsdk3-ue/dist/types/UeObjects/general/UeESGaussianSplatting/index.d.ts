import { ESGaussianSplatting } from "earthsdk3";
import { UeESObjectWithLocation } from "../../../UeObjects/base";
import { ESUeViewer } from "../../../ESUeViewer";
export declare class UeESGaussianSplatting extends UeESObjectWithLocation<ESGaussianSplatting> {
    static readonly type: void;
    constructor(sceneObject: ESGaussianSplatting, ueViewer: ESUeViewer);
}
