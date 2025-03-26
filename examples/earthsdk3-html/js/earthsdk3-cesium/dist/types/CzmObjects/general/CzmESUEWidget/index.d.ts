import { ESUEWidget } from "earthsdk3";
import { CzmESObjectWithLocation, GeoDivSwitchPoi } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare class CzmESUEWidget extends CzmESObjectWithLocation<ESUEWidget> {
    static readonly type: void;
    private _czmGeoDivSwitchPoi;
    get czmGeoDivSwitchPoi(): GeoDivSwitchPoi;
    constructor(sceneObject: ESUEWidget, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
