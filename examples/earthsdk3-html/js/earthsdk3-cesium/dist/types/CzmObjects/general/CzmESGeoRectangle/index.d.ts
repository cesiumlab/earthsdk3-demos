import { ESGeoRectangle } from "earthsdk3";
import { CzmESGeoVector, CzmRectangle } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare class CzmESGeoRectangle<T extends ESGeoRectangle = ESGeoRectangle> extends CzmESGeoVector<T> {
    static readonly type: void;
    private _czmGeoESRectangle;
    get czmGeoESRectangle(): CzmRectangle;
    private _geoPolyline;
    constructor(sceneObject: T, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    flyIn(duration: number | undefined, id: number): boolean;
}
