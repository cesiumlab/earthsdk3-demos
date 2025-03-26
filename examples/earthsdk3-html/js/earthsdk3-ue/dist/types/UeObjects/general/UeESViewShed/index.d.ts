import { ESViewShed } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
import { UeESObjectWithLocation } from "../../../UeObjects/base";
export declare class UeESViewShed extends UeESObjectWithLocation<ESViewShed> {
    static readonly type: void;
    constructor(sceneObject: ESViewShed, ueViewer: ESUeViewer);
}
