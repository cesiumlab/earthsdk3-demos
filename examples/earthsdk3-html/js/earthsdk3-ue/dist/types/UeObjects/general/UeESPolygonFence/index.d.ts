import { ESPolygonFence } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
import { UeESGeoVector } from "../../../UeObjects/base";
export declare class UeESPolygonFence extends UeESGeoVector<ESPolygonFence> {
    static readonly type: void;
    constructor(sceneObject: ESPolygonFence, ueViewer: ESUeViewer);
}
