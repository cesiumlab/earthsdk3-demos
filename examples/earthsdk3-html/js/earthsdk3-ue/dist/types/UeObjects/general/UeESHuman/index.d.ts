import { ESHuman } from "earthsdk3";
import { ESUeViewer } from '../../../ESUeViewer';
import { UeESObjectWithLocation } from '../../../UeObjects/base';
export declare class UeESHuman extends UeESObjectWithLocation<ESHuman> {
    static readonly type: void;
    constructor(sceneObject: ESHuman, ueViewer: ESUeViewer);
}
