import { ESUEWidget, ESUEWidgetInfoType } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
import { UeESLabel } from "../../../UeObjects/base";
export declare class UeESUEWidget extends UeESLabel<ESUEWidget> {
    static readonly type: void;
    static propValFuncs: {
        info: (val: ESUEWidgetInfoType) => string;
    };
    constructor(sceneObject: ESUEWidget, ueViewer: ESUeViewer);
}
