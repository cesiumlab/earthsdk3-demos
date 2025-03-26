import { ESUeViewer } from "../../../ESUeViewer";
import { ESLocalVector2D } from "earthsdk3";
import { UeESLocalVector } from "../UeESLocalVector";
export declare class UeESLocalVector2D<T extends ESLocalVector2D = ESLocalVector2D> extends UeESLocalVector<T> {
    constructor(sceneObject: T, ueViewer: ESUeViewer);
}
