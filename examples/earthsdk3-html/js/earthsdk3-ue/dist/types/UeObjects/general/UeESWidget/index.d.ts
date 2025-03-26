import { ESWidget, ESWidgetInfoType } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
import { UeESLabel } from "../../../UeObjects/base";
export declare class UeESWidget extends UeESLabel<ESWidget> {
    static readonly type: void;
    static propValFuncs: {
        info: (val: ESWidgetInfoType) => string;
    };
    constructor(sceneObject: ESWidget, ueViewer: ESUeViewer);
}
