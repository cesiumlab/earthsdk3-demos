import { ESGeoWater } from "earthsdk3";
import { CzmESGeoVector, CzmPolyline, CzmWater, CzmWaterPrimitive, PositionsEditing } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare class CzmESGeoWater extends CzmESGeoVector<ESGeoWater> {
    static readonly type: void;
    geoPolyline: CzmPolyline | undefined;
    sPositionsEditing: PositionsEditing | undefined;
    czmWaterPrimitive: CzmWaterPrimitive | undefined;
    czmWater: CzmWater | undefined;
    constructor(sceneObject: ESGeoWater, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    private updateWater;
}
