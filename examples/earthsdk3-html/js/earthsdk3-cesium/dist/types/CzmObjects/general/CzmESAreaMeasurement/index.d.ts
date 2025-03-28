import { ESAreaMeasurement } from "earthsdk3";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { GeoAreaMeasurement } from "./GeoAreaMeasurement";
import { CzmESGeoPolygon } from "../CzmESGeoPolygon";
export declare class CzmESAreaMeasurement<T extends ESAreaMeasurement = ESAreaMeasurement> extends CzmESGeoPolygon<T> {
    static readonly type: void;
    private _czmAreaMeasurement;
    get czmAreaMeasurement(): GeoAreaMeasurement;
    constructor(sceneObject: T, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    flyIn(duration: number | undefined, id: number): boolean;
}
