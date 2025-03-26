import { ESBlastParticleSystem } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
import { UeESObjectWithLocation } from "../../../UeObjects/base";
export declare class UeESBlastParticleSystem extends UeESObjectWithLocation<ESBlastParticleSystem> {
    static readonly type: void;
    constructor(sceneObject: ESBlastParticleSystem, ueViewer: ESUeViewer);
}
