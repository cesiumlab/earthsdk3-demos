import { ESJResource, ESPoiTileset } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
import { UeESVisualObject } from "../../../UeObjects/base";
export declare class UeESPoiTileset extends UeESVisualObject<ESPoiTileset> {
    static readonly type: void;
    static forceUeUpdateProps: string[];
    static propValFuncs: {
        url: (val: string | ESJResource) => string | ESJResource;
    };
    constructor(sceneObject: ESPoiTileset, ueViewer: ESUeViewer);
}
