import { ESHeightMeasurement, ESJEditingBindModeType } from "earthsdk3";
import { CzmESGeoVector } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { GeoHeightMeasurement } from "./GeoHeightMeasurement";
export declare class CzmESHeightMeasurement extends CzmESGeoVector<ESHeightMeasurement> {
    static readonly type: void;
    editingBindMode: ESJEditingBindModeType;
    private _geoHeightMeasurement;
    get czmHeightMeasurement(): GeoHeightMeasurement;
    constructor(sceneObject: ESHeightMeasurement, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    flyIn(duration: number | undefined, id: number): boolean;
}
