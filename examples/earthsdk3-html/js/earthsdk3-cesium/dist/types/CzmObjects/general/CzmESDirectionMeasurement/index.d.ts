import { ESDirectionMeasurement } from "earthsdk3";
import { CzmESVisualObject } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { GeoDirectionMeasurement } from "./GeoDirectionMeasurement";
export declare class CzmESDirectionMeasurement extends CzmESVisualObject<ESDirectionMeasurement> {
    static readonly type: void;
    private _czmDirectionMeasurement;
    get czmDirectionMeasurement(): GeoDirectionMeasurement;
    constructor(sceneObject: ESDirectionMeasurement, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    flyIn(duration: number | undefined, id: number): boolean;
}
