import { ESSurfaceAreaMeasurement } from "earthsdk3";
import { CzmESGeoPolygon } from "../CzmESGeoPolygon";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { CzmSpaceAreaMeasurement } from "./CzmSpaceAreaMeasurement";
export declare class CzmESSurfaceAreaMeasurement extends CzmESGeoPolygon<ESSurfaceAreaMeasurement> {
    static readonly type: void;
    private _czmAreaMeasurement;
    get czmAreaMeasurement(): CzmSpaceAreaMeasurement;
    constructor(sceneObject: ESSurfaceAreaMeasurement, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    flyIn(duration: number | undefined, id: number): boolean;
}
