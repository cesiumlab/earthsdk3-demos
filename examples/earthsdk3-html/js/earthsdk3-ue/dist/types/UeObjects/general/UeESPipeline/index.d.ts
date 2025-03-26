import { ESPipeline } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
import { UeESGeoLineString } from "../UeESGeoLineString";
export declare class UeESPipeline extends UeESGeoLineString<ESPipeline> {
    static readonly type: void;
    constructor(sceneObject: ESPipeline, ueViewer: ESUeViewer);
}
