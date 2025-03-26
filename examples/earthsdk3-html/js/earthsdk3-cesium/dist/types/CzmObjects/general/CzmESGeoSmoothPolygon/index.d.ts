import { CzmESVisualObject } from "../../base";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { ESGeoSmoothPolygon } from "../../../ESObjects";
import { GeoSmoothPolygon } from "./GeoSmoothPolygon";
export declare class CzmESGeoSmoothPolygon extends CzmESVisualObject<ESGeoSmoothPolygon> {
    static readonly type: void;
    private _geoSmoothPolygon;
    get geoSmoothPolygon(): GeoSmoothPolygon;
    constructor(sceneObject: ESGeoSmoothPolygon, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    flyIn(duration: number | undefined, id: number): boolean;
}
