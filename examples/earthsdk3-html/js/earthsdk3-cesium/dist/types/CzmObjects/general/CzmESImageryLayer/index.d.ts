import { ESImageryLayer } from "earthsdk3";
import { CzmESVisualObject, CzmImagery } from "../../base";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare class CzmESImageryLayer extends CzmESVisualObject<ESImageryLayer> {
    static readonly type: void;
    private _czmImagery;
    get czmImagery(): CzmImagery;
    constructor(sceneObject: ESImageryLayer, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    flyIn(duration: number | undefined, id: number): boolean;
}
