import { ESDataMesh } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
import { UeESObjectWithLocation } from "../../base";
export declare class UeESDataMesh extends UeESObjectWithLocation<ESDataMesh> {
    static readonly type: void;
    constructor(sceneObject: ESDataMesh, ueViewer: ESUeViewer);
}
