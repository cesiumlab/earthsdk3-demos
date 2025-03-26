import { ESTerrainLayer } from "earthsdk3";
import { UeESVisualObject } from "../../base";
import { ESUeViewer } from "../../../ESUeViewer";
export declare class UeESTerrainLayer extends UeESVisualObject<ESTerrainLayer> {
    static readonly type: void;
    static forceUeUpdateProps: string[];
    static propValFuncs: {
        url: (val: string) => string;
        czmMaxzoom: null;
        czmMinzoom: null;
    };
    constructor(sceneObject: ESTerrainLayer, ueViewer: ESUeViewer);
}
