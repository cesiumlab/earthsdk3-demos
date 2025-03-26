import { EngineObject, ESSceneObject } from "earthsdk3";
import { UeObjectPropValFuncType } from "./types";
import { ESUeViewer } from "../../../ESUeViewer";
export declare class UeESSceneObject<T extends ESSceneObject = ESSceneObject> extends EngineObject<T> {
    static propValFuncs: {
        [k: string]: UeObjectPropValFuncType | undefined | null;
    };
    static forceUeUpdateProps: string[];
    static combinationClass: boolean;
    constructor(sceneObject: T, ueViewer: ESUeViewer);
}
