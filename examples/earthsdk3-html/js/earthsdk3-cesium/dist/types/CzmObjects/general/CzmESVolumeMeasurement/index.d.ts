import { ESVolumeMeasurement } from "earthsdk3";
import { CzmESGeoVector } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { GeoVolumeMeasurement } from "./GeoVolumeMeasurement";
export declare class CzmESVolumeMeasurement<T extends ESVolumeMeasurement = ESVolumeMeasurement> extends CzmESGeoVector<T> {
    static readonly type: void;
    private _geoVolumeMeasurement;
    get geoVolumeMeasurement(): GeoVolumeMeasurement;
    constructor(sceneObject: T, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
