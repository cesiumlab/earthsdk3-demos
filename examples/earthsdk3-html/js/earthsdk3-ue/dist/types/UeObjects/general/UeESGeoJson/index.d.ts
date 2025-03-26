import { ESGeoJson } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
import { UeESVisualObject } from "../../../UeObjects/base";
export declare class UeESGeoJson extends UeESVisualObject<ESGeoJson> {
    static readonly type: void;
    constructor(sceneObject: ESGeoJson, ueViewer: ESUeViewer);
}
