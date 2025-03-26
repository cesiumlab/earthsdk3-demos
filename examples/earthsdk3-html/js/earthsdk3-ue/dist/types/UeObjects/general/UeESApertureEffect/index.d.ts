import { ESApertureEffect } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
import { UeESObjectWithLocation } from "../../../UeObjects/base";
export declare class UeESApertureEffect extends UeESObjectWithLocation<ESApertureEffect> {
    static readonly type: void;
    constructor(sceneObject: ESApertureEffect, ueViewer: ESUeViewer);
}
