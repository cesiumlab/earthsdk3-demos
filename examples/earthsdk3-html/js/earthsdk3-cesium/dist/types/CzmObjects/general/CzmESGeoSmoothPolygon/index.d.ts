import { CzmESGeoVector } from "../../base";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { ESGeoSmoothPolygon } from "../../../ESObjects";
import { GeoSmoothPolygon } from "./GeoSmoothPolygon";
import { ESJEditingBindModeType } from "earthsdk3";
export declare class CzmESGeoSmoothPolygon extends CzmESGeoVector<ESGeoSmoothPolygon> {
    static readonly type: void;
    editingBindMode: ESJEditingBindModeType;
    private _geoSmoothPolygon;
    get geoSmoothPolygon(): GeoSmoothPolygon;
    constructor(sceneObject: ESGeoSmoothPolygon, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    flyIn(duration: number | undefined, id: number): boolean;
}
