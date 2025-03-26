import { ESAlarm } from "earthsdk3";
import { UeESObjectWithLocation } from "../../base";
import { ESUeViewer } from "../../../ESUeViewer";
export declare class UeESAlarm extends UeESObjectWithLocation<ESAlarm> {
    static readonly type: void;
    constructor(sceneObject: ESAlarm, ueViewer: ESUeViewer);
}
