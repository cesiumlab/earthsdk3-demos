import { ESFireParticleSystem } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
import { UeESObjectWithLocation } from "../../../UeObjects/base";
export declare class UeESFireParticleSystem extends UeESObjectWithLocation<ESFireParticleSystem> {
    static readonly type: void;
    constructor(sceneObject: ESFireParticleSystem, ueViewer: ESUeViewer);
}
