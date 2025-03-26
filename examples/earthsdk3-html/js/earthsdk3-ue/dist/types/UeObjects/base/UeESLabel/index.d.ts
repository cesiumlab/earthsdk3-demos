import { ESLabel } from "earthsdk3";
import { UeESObjectWithLocation } from '../UeESObjectWithLocation';
import { ESUeViewer } from '../../../ESUeViewer';
export declare class UeESLabel<T extends ESLabel = ESLabel> extends UeESObjectWithLocation<T> {
    constructor(sceneObject: T, ueViewer: ESUeViewer);
}
