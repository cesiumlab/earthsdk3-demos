import { ESImageLabel } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
import { UeESLabel } from "../../../UeObjects/base";
export declare class UeESImageLabel<T extends ESImageLabel = ESImageLabel> extends UeESLabel<T> {
    static readonly type: void;
    static forceUeUpdateProps: string[];
    static propValFuncs: {
        url: (val: string) => string;
    };
    constructor(sceneObject: T, ueViewer: ESUeViewer);
}
