import { ESVolumeMeasurement } from "earthsdk3";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { GeoVolumeMeasurement } from "./GeoVolumeMeasurement";
import { CzmESGeoPolygon } from "../CzmESGeoPolygon";
export declare class CzmESVolumeMeasurement extends CzmESGeoPolygon<ESVolumeMeasurement> {
    static readonly type: void;
    private _geoVolumeMeasurement;
    get geoVolumeMeasurement(): GeoVolumeMeasurement;
    constructor(sceneObject: ESVolumeMeasurement, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
