import { ESDirectionMeasurement, ESJEditingBindModeType } from "earthsdk3";
import { CzmESGeoVector } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { GeoDirectionMeasurement } from "./GeoDirectionMeasurement";
export declare class CzmESDirectionMeasurement extends CzmESGeoVector<ESDirectionMeasurement> {
    static readonly type: void;
    editingBindMode: ESJEditingBindModeType;
    private _czmDirectionMeasurement;
    get czmDirectionMeasurement(): GeoDirectionMeasurement;
    constructor(sceneObject: ESDirectionMeasurement, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    flyIn(duration: number | undefined, id: number): boolean;
}
