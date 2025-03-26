import { CzmESVisualObject, CzmImagery } from "../../base";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { ESMVTLayer } from "../../../ESObjects";
export declare class CzmESMVTLayer extends CzmESVisualObject<ESMVTLayer> {
    static readonly type: void;
    private _czmImagery;
    get czmImagery(): CzmImagery;
    constructor(sceneObject: ESMVTLayer, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    flyIn(duration: number | undefined, id: number): boolean;
}
