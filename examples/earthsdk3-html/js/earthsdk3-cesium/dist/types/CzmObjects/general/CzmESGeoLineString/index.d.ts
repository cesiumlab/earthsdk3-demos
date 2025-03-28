import { ESGeoLineString, ESJEditingBindModeType } from "earthsdk3";
import { CzmESGeoVector, CzmPolyline } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare class CzmESGeoLineString<T extends ESGeoLineString = ESGeoLineString> extends CzmESGeoVector<T> {
    static readonly type: void;
    editingBindMode: ESJEditingBindModeType;
    private _geoPolyline;
    get geoPolyline(): CzmPolyline;
    constructor(sceneObject: T, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    flyIn(duration: number | undefined, id: number): boolean;
}
