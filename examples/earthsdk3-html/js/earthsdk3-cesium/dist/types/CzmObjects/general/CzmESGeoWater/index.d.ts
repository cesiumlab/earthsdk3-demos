import { ESGeoWater } from "earthsdk3";
import { CzmPolyline, CzmWater } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { CzmESGeoPolygon } from "../CzmESGeoPolygon";
export declare class CzmESGeoWater extends CzmESGeoPolygon<ESGeoWater> {
    static readonly type: void;
    geoPolyline: CzmPolyline | undefined;
    czmWater: CzmWater;
    constructor(sceneObject: ESGeoWater, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    private updateWater;
}
