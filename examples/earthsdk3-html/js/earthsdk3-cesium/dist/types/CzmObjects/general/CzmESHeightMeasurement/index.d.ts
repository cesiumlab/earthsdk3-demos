import { ESHeightMeasurement } from "earthsdk3";
import { CzmESVisualObject } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { GeoHeightMeasurement } from "./GeoHeightMeasurement";
export declare class CzmESHeightMeasurement extends CzmESVisualObject<ESHeightMeasurement> {
    static readonly type: void;
    private _geoHeightMeasurement;
    get czmHeightMeasurement(): GeoHeightMeasurement;
    constructor(sceneObject: ESHeightMeasurement, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    flyIn(duration: number | undefined, id: number): boolean;
}
