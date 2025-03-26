import { ESClippingPlane } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
import { UeESObjectWithLocation } from "../../base";
export declare class UeESClippingPlane extends UeESObjectWithLocation<ESClippingPlane> {
    static readonly type: void;
    constructor(sceneObject: ESClippingPlane, ueViewer: ESUeViewer);
}
