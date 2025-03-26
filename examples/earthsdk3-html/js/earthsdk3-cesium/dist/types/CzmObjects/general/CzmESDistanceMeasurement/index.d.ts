import { ESDistanceMeasurement } from "earthsdk3";
import { CzmESVisualObject } from "../../base";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { GeoDistanceMeasurement } from "./GeoDistanceMeasurement";
export declare class CzmESDistanceMeasurement extends CzmESVisualObject<ESDistanceMeasurement> {
    static readonly type: void;
    private _czmDistanceMeasurement;
    get czmDistanceMeasurement(): GeoDistanceMeasurement;
    constructor(sceneObject: ESDistanceMeasurement, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    flyIn(duration: number | undefined, id: number): boolean;
}
