import { CzmESGeoVector } from "../../base";
import { ESGeoPolygon, ESJEditingBindModeType } from "earthsdk3";
import { ESCesiumViewer } from '../../../ESCesiumViewer';
import { CzmESGeoPolygonImpl } from './CzmESGeoPolygonImpl';
export * from './CzmESGeoPolygonImpl';
export declare class CzmESGeoPolygon<T extends ESGeoPolygon = ESGeoPolygon> extends CzmESGeoVector<T> {
    static readonly type: void;
    editingBindMode: ESJEditingBindModeType;
    private _geoPolygon;
    get geoPolygon(): CzmESGeoPolygonImpl | undefined;
    constructor(sceneObject: T, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    flyIn(duration: number | undefined, id: number): boolean;
}
