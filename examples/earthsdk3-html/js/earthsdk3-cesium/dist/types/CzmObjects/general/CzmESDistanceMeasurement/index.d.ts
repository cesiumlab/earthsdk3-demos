import { ESDistanceMeasurement } from "earthsdk3";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { GeoDistanceMeasurement } from "./GeoDistanceMeasurement";
import { CzmESGeoLineString } from "../CzmESGeoLineString";
export declare class CzmESDistanceMeasurement extends CzmESGeoLineString<ESDistanceMeasurement> {
    static readonly type: void;
    private _czmDistanceMeasurement;
    get czmDistanceMeasurement(): GeoDistanceMeasurement;
    constructor(sceneObject: ESDistanceMeasurement, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    flyIn(duration: number | undefined, id: number): boolean;
}
