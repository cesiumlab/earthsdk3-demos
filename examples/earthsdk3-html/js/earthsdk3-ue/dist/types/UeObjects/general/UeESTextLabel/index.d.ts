import { ESTextLabel } from "earthsdk3";
import { ESUeViewer } from '../../../ESUeViewer';
import { UeESLabel } from '../../../UeObjects/base';
export declare class UeESTextLabel extends UeESLabel<ESTextLabel> {
    static readonly type: void;
    constructor(sceneObject: ESTextLabel, ueViewer: ESUeViewer);
}
