import { ESCar } from "earthsdk3";
import { UeESObjectWithLocation } from "../../../UeObjects";
import { ESUeViewer } from "../../../ESUeViewer";
export declare class UeESCar extends UeESObjectWithLocation<ESCar> {
    static readonly type: void;
    constructor(sceneObject: ESCar, ueViewer: ESUeViewer);
}
