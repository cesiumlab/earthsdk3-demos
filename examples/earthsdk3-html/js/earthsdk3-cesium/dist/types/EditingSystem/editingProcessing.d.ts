import { ESCesiumViewer } from "../ESCesiumViewer";
import { ESSceneObject, ESVisualObject } from "earthsdk3";
export declare function createEditingSystemProcessing(): import("xbsj-base").Processing<void, [czmViewer: ESCesiumViewer, sceneObject: ESVisualObject, modes: string | string[], useTabToSwitch?: boolean | undefined]>;
export declare function createMoveObjectsProcessing(): import("xbsj-base").Processing<void, [czmViewer: ESCesiumViewer, sceneObjects: ESSceneObject[]]>;
