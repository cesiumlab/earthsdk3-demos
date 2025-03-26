import { ESClassification } from "earthsdk3";
import { UeESGeoVector } from "../../base";
import { ESUeViewer } from "../../../ESUeViewer";
export declare class UeESClassification extends UeESGeoVector<ESClassification> {
    static readonly type: void;
    constructor(sceneObject: ESClassification, ueViewer: ESUeViewer);
}
