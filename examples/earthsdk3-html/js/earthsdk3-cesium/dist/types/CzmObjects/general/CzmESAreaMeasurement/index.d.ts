import { ESAreaMeasurement } from "earthsdk3";
import { CzmESGeoVector } from "../..";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { GeoAreaMeasurement } from "./GeoAreaMeasurement";
export declare class CzmESAreaMeasurement<T extends ESAreaMeasurement = ESAreaMeasurement> extends CzmESGeoVector<T> {
    static readonly type: void;
    private _czmAreaMeasurement;
    get czmAreaMeasurement(): GeoAreaMeasurement;
    constructor(sceneObject: T, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    flyIn(duration: number | undefined, id: number): boolean;
}
