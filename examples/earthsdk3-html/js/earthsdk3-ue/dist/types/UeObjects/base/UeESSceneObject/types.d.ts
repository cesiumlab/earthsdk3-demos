import { ESUeViewer } from "../../../ESUeViewer";
import { EngineObject, ESSceneObject } from "earthsdk3";
export type UeObjectPropValFuncType<T = any, R = any> = (val: T, ueObj: EngineObject, ueViewer: ESUeViewer, sceneObject: ESSceneObject) => R;
