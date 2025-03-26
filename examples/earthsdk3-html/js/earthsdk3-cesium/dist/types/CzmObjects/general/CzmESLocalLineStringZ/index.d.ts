import { CzmESObjectWithLocation, CzmPolyline } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { ESLocalLineStringZ } from "../../../ESObjects";
export declare class CzmESLocalLineStringZ extends CzmESObjectWithLocation<ESLocalLineStringZ> {
    static readonly type: void;
    private _czmGeoPolyline;
    get czmGeoPolyline(): CzmPolyline;
    constructor(sceneObject: ESLocalLineStringZ, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
