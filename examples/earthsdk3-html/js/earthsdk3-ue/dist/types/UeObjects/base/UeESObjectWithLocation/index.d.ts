import { ESObjectWithLocation } from "earthsdk3";
import { UeESVisualObject } from "../UeESVisualObject";
import { ESUeViewer } from "../../../ESUeViewer";
export declare class UeESObjectWithLocation<T extends ESObjectWithLocation = ESObjectWithLocation> extends UeESVisualObject<T> {
    static forceUeUpdateProps: string[];
    static propValFuncs: {
        [x: string]: import("../UeESSceneObject/types").UeObjectPropValFuncType<any, any> | null | undefined;
    };
    constructor(sceneObject: T, ueViewer: ESUeViewer);
}
